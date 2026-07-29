"use client";

import React, { useState, useEffect, Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AccessibilityMenu from "@/components/AccessibilityMenu";
import { DatabaseService } from "@/lib/supabase";
import { Heart, CreditCard, ShieldCheck, CheckCircle2, Copy, Sparkles, MessageSquare, AlertCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";
import Script from "next/script";

const generateReceiptId = () => `rcpt_${Date.now()}`;

function DonateContent() {
  const searchParams = useSearchParams();
  const defaultCampaign = searchParams.get("campaign") || searchParams.get("program") || "general";

  const [frequency, setFrequency] = useState<"one-time" | "monthly">("one-time");
  const [selectedAmount, setSelectedAmount] = useState<number | "custom">("custom");
  const [customAmount, setCustomAmount] = useState("");
  const [campaign, setCampaign] = useState(defaultCampaign);
  
  const [donorInfo, setDonorInfo] = useState({
    name: "",
    email: "",
    phone: "",
    isAnonymous: false,
  });

  const [loading, setLoading] = useState(false);
  const [receipt, setReceipt] = useState<{ id: string; paymentId: string; amount: number; date: string; donor: string; campaign: string } | null>(null);
  
  // Custom sandbox state for testing without API keys
  const [showSandbox, setShowSandbox] = useState(false);
  const [sandboxOrder, setSandboxOrder] = useState<{ id: string; amount: number } | null>(null);

  const getActiveAmount = () => {
    if (selectedAmount === "custom") {
      return Number(customAmount) || 0;
    }
    return selectedAmount;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setDonorInfo((prev) => ({ ...prev, [name]: checked }));
    } else {
      setDonorInfo((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Process Donation
  const handleDonationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const amount = getActiveAmount();
    if (amount <= 0) return;

    setLoading(true);

    try {
      // 1. Try to call the Next.js API to create order (Razorpay)
      const res = await fetch("/api/donate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount,
          currency: "INR",
          receipt: generateReceiptId(),
        }),
      });

      if (res.ok) {
        const order = await res.json() as { id: string; amount: number; currency: string };
        launchRazorpay(order);
      } else {
        // API key missing or error, fallback to interactive sandbox mode for verification
        console.warn("API order creation failed, launching interactive sandbox mode.");
        launchSandboxMode(amount);
      }
    } catch (err) {
      console.error(err);
      launchSandboxMode(amount);
    }
  };

  // Launch Live Razorpay Checkout Modal
  const launchRazorpay = (order: { id: string; amount: number; currency: string }) => {
    const amount = getActiveAmount();
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_placeholder",
      amount: order.amount,
      currency: order.currency,
      name: "Mind Empowerment Foundation Trust",
      description: `Donation: ${campaign}`,
      order_id: order.id,
      handler: async function (response: { razorpay_payment_id: string; razorpay_order_id: string; razorpay_signature: string }) {
        try {
          const verifyRes = await fetch("/api/donate/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              payment_id: response.razorpay_payment_id,
              order_id: response.razorpay_order_id,
              signature: response.razorpay_signature,
              donor_name: donorInfo.isAnonymous ? "Anonymous" : donorInfo.name,
              donor_email: donorInfo.email,
              donor_phone: donorInfo.phone,
              campaign_id: campaign,
              amount,
              is_anonymous: donorInfo.isAnonymous,
            }),
          });

          if (verifyRes.ok) {
            const data = await verifyRes.json();
            setReceipt({
              id: data.receiptId,
              paymentId: response.razorpay_payment_id,
              amount,
              date: new Date().toLocaleDateString("en-IN"),
              donor: donorInfo.isAnonymous ? "Anonymous" : donorInfo.name,
              campaign,
            });
          }
        } catch (err) {
          console.error("Verification failed", err);
        }
        setLoading(false);
      },
      prefill: {
        name: donorInfo.name,
        email: donorInfo.email,
        contact: donorInfo.phone,
      },
      theme: {
        color: "#1E88E5",
      },
      modal: {
        ondismiss: function () {
          setLoading(false);
        },
      },
    };

    const RazorpayCtor = (window as unknown as { Razorpay?: new (opts: unknown) => { open: () => void } }).Razorpay;
    if (RazorpayCtor) {
      const rzp = new RazorpayCtor(options);
      rzp.open();
    }
  };

  // Launch Simulated Sandbox mode
  const launchSandboxMode = (amount: number) => {
    setSandboxOrder({
      id: `order_sim_${Math.random().toString(36).substring(2, 9)}`,
      amount,
    });
    setShowSandbox(true);
  };

  // Confirm simulated payment
  const handleSandboxPaymentConfirm = async () => {
    setShowSandbox(false);
    const amount = getActiveAmount();

    // Register donation in local storage / mock db
    try {
      const paymentId = `pay_sim_${Math.random().toString(36).substring(2, 9)}`;
      const res = await DatabaseService.registerDonation({
        payment_id: paymentId,
        amount,
        donor_name: donorInfo.isAnonymous ? "Anonymous" : donorInfo.name,
        donor_email: donorInfo.email,
        donor_phone: donorInfo.phone,
        campaign_id: campaign,
        status: "success",
        is_anonymous: donorInfo.isAnonymous,
      });

      if (res.success) {
        setReceipt({
          id: res.receiptId,
          paymentId,
          amount,
          date: new Date().toLocaleDateString("en-IN"),
          donor: donorInfo.isAnonymous ? "Anonymous" : donorInfo.name,
          campaign,
        });
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      <Header />
      
      <main id="main-content" className="flex-grow bg-bg-base py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h1 className="font-heading text-4xl font-bold tracking-tight text-txt-base">
              Empower Lives Through Giving
            </h1>
            <p className="text-sm text-txt-muted leading-relaxed">
              Every contribution directly fuels clean clinical supplies, counseling centers, sewing machines, and child scholarships. Support us to drive lasting change.
            </p>
          </div>

          {/* Core donation layout */}
          {receipt ? (
            /* SUCCESS RECEIPT MODAL REPRESENTATION */
            <div className="bg-bg-muted border-2 border-secondary/20 rounded-3xl p-8 max-w-xl mx-auto text-center space-y-6 shadow-sm">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-secondary/15 text-secondary">
                <CheckCircle2 className="h-10 w-10" />
              </div>
              <div className="space-y-2">
                <h2 className="font-heading text-2xl font-bold text-txt-base">Thank You for Your Support!</h2>
                <p className="text-xs text-txt-muted">
                  A tax-exemption receipt under Section 80G has been generated and dispatched to your email.
                </p>
              </div>

              {/* Receipt card */}
              <div className="bg-bg-base border border-border-base rounded-2xl p-6 text-left space-y-3 text-xs">
                <div className="flex justify-between border-b border-border-base pb-2 font-bold">
                  <span className="text-txt-muted">Receipt ID:</span>
                  <span className="text-txt-base">{receipt.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-txt-muted">Donor Name:</span>
                  <span className="text-txt-base font-semibold">{receipt.donor}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-txt-muted">Payment Ref:</span>
                  <span className="text-txt-base font-semibold">{receipt.paymentId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-txt-muted">Campaign:</span>
                  <span className="text-txt-base font-semibold capitalize">{receipt.campaign}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-txt-muted">Date:</span>
                  <span className="text-txt-base font-semibold">{receipt.date}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-border-base font-bold text-sm">
                  <span className="text-txt-muted">Amount Contributed:</span>
                  <span className="text-primary">₹{receipt.amount.toLocaleString("en-IN")}</span>
                </div>
              </div>

              {/* Trust validation */}
              <div className="flex items-center gap-2 justify-center text-xxs text-txt-muted">
                <ShieldCheck className="h-4 w-4 text-secondary" />
                <span>50% Indian Income Tax Exemption applied (80G Registration)</span>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setReceipt(null)}
                  className="rounded-xl bg-primary px-6 py-2.5 text-xs font-semibold text-white hover:bg-primary-hover transition-colors"
                >
                  Make another contribution
                </button>
              </div>
            </div>
          ) : (
            /* DONATION INTERACTIVE PANEL */
            <div className="bg-bg-muted border border-border-base rounded-3xl p-6 md:p-10 shadow-sm">
              <form onSubmit={handleDonationSubmit} className="space-y-6">
                <h2 className="font-heading text-xl font-bold text-txt-base border-b border-border-base pb-3">
                  Secure Donation Panel
                </h2>

                {/* Frequency selector */}
                <div className="flex gap-2 p-1 bg-bg-base border border-border-base rounded-2xl max-w-xs">
                  <button
                    type="button"
                    onClick={() => setFrequency("one-time")}
                    className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all focus:outline-none ${
                      frequency === "one-time"
                        ? "bg-primary text-white"
                        : "text-txt-muted hover:text-primary"
                    }`}
                  >
                    One-Time Donation
                  </button>
                  <button
                    type="button"
                    onClick={() => setFrequency("monthly")}
                    className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all focus:outline-none ${
                      frequency === "monthly"
                        ? "bg-primary text-white"
                        : "text-txt-muted hover:text-primary"
                    }`}
                  >
                    Monthly Support
                  </button>
                </div>

                {/* Amount options */}
                <div className="space-y-3">
                  <label htmlFor="donation-amount" className="text-xxs font-bold uppercase tracking-wider text-txt-muted block">
                    Donation Amount (INR)
                  </label>
                  <p className="text-xs text-txt-muted">
                    Any amount is welcome! Anyone can donate any amount to support our mission.
                  </p>
                  <div className="relative max-w-xs">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-txt-muted">₹</span>
                    <input
                      type="number"
                      id="donation-amount"
                      placeholder="Enter any amount"
                      value={customAmount}
                      required
                      onChange={(e) => setCustomAmount(e.target.value)}
                      className="w-full rounded-2xl bg-bg-base border border-border-base pl-9 pr-4 py-3.5 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-txt-base shadow-sm"
                      min="1"
                    />
                  </div>
                </div>

                {/* Campaign Selection */}
                <div className="space-y-1">
                  <label htmlFor="campaign" className="text-xxs font-bold uppercase tracking-wider text-txt-muted block">
                    Direct Your Contribution
                  </label>
                  <select
                    name="campaign"
                    id="campaign"
                    value={campaign}
                    onChange={(e) => setCampaign(e.target.value)}
                    className="w-full sm:w-80 rounded-xl bg-bg-base border border-border-base px-4 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-primary text-txt-base capitalize"
                  >
                    <option value="general">General Trust Allocation (Where needed most)</option>
                    <option value="rural-mental-health-camps">Rural Mental Health Clinics 2026</option>
                    <option value="shakti-sewing-centers">Shakti Women Sewing Center Startup</option>
                    <option value="village-digital-classroom">Village Digital Classrooms</option>
                  </select>
                </div>

                {/* Donor Details */}
                <div className="space-y-4 border-t border-border-base pt-6">
                  <h3 className="font-heading text-sm font-semibold text-txt-base">Donor & Tax details</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label htmlFor="name" className="text-xxs font-bold uppercase tracking-wider text-txt-muted">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        required={!donorInfo.isAnonymous}
                        disabled={donorInfo.isAnonymous}
                        value={donorInfo.name}
                        onChange={handleInputChange}
                        placeholder={donorInfo.isAnonymous ? "Anonymous Donor" : "e.g. Meera Das"}
                        className="w-full rounded-xl bg-bg-base border border-border-base px-4 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-primary text-txt-base disabled:opacity-50"
                      />
                    </div>
                    <div className="space-y-1">
                      <label htmlFor="email" className="text-xxs font-bold uppercase tracking-wider text-txt-muted">
                        Email Address (For Tax Receipt) *
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        required
                        value={donorInfo.email}
                        onChange={handleInputChange}
                        placeholder="e.g. donor@email.com"
                        className="w-full rounded-xl bg-bg-base border border-border-base px-4 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-primary text-txt-base"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label htmlFor="phone" className="text-xxs font-bold uppercase tracking-wider text-txt-muted">
                        Phone Number (For UPI connection)
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        id="phone"
                        value={donorInfo.phone}
                        onChange={handleInputChange}
                        placeholder="e.g. +91 98765 43210"
                        className="w-full rounded-xl bg-bg-base border border-border-base px-4 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-primary text-txt-base"
                      />
                    </div>
                    <div className="flex items-center gap-3 pt-6">
                      <input
                        type="checkbox"
                        name="isAnonymous"
                        id="isAnonymous"
                        checked={donorInfo.isAnonymous}
                        onChange={handleInputChange}
                        className="rounded text-primary border-border-base focus:ring-primary"
                      />
                      <label htmlFor="isAnonymous" className="text-xs font-semibold text-txt-muted cursor-pointer">
                        Make donation anonymous to public lists
                      </label>
                    </div>
                  </div>
                </div>

                {/* Security and tax exemption callouts */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-bg-base border border-border-base rounded-2xl p-4 text-xxs text-txt-muted">
                  <div className="flex gap-2 items-start">
                    <ShieldCheck className="h-4 w-4 text-secondary shrink-0" />
                    <span>Razorpay SSL Secured payment. UPI, Card, Netbanking supported.</span>
                  </div>
                  <div className="flex gap-2 items-start">
                    <CreditCard className="h-4 w-4 text-secondary shrink-0" />
                    <span>50% tax exemption under Section 80G of the Indian IT Act.</span>
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-xs font-semibold text-white shadow-md hover:bg-primary-hover hover:shadow-lg transition-all focus:outline-none disabled:opacity-50"
                >
                  <Heart className="h-4 w-4 fill-white" />
                  {loading ? "Initializing Secure Gateway..." : `Proceed to Contribute ₹${getActiveAmount().toLocaleString("en-IN")}`}
                </button>
              </form>
            </div>
          )}
        </div>

        {/* SANDBOX CHECKOUT MODAL FALLBACK */}
        {showSandbox && sandboxOrder && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
            <div className="bg-bg-base border border-border-base rounded-3xl p-6 max-w-sm w-full space-y-6 shadow-2xl relative">
              <div className="flex items-center justify-between border-b border-border-base pb-3">
                <div className="flex items-center gap-1.5 text-primary">
                  <Sparkles className="h-5 w-5" />
                  <h3 className="font-heading text-sm font-bold text-txt-base">Razorpay Sandbox Sim</h3>
                </div>
                <span className="text-xxxxs bg-primary/10 border border-primary/20 text-primary px-1.5 py-0.5 rounded font-bold">
                  TEST MODE
                </span>
              </div>

              <div className="space-y-4">
                <div className="p-3 bg-primary/5 border border-primary/20 rounded-xl space-y-1 text-center">
                  <span className="text-xxxxs text-txt-muted block uppercase tracking-wider">Amount Payable</span>
                  <span className="text-xl font-heading font-bold text-primary">₹{sandboxOrder.amount.toLocaleString("en-IN")}</span>
                </div>

                <div className="space-y-3 text-xxs">
                  <div className="space-y-1">
                    <label className="font-bold text-txt-muted block">Select Payment Method</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button className="border border-primary bg-primary/5 text-primary rounded-lg py-2 font-semibold text-center focus:outline-none">
                        UPI / QR Code
                      </button>
                      <button className="border border-border-base hover:bg-bg-muted rounded-lg py-2 font-semibold text-center focus:outline-none">
                        Debit/Credit Card
                      </button>
                    </div>
                  </div>

                  <div className="rounded-xl border border-accent/20 bg-accent/5 p-3 flex gap-2 text-txt-muted leading-relaxed">
                    <AlertCircle className="h-4 w-4 text-accent-hover shrink-0 mt-0.5" />
                    <span>
                      This simulates payment connection. No actual funds will be transferred. Click confirm to simulate a successful transaction.
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setShowSandbox(false);
                    setLoading(false);
                  }}
                  className="flex-1 rounded-xl border border-border-base py-2.5 text-xxs font-semibold text-txt-base hover:bg-bg-muted transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSandboxPaymentConfirm}
                  className="flex-1 rounded-xl bg-primary py-2.5 text-xxs font-semibold text-white hover:bg-primary-hover shadow-sm transition-colors"
                >
                  Confirm Payment
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
      <AccessibilityMenu />
    </>
  );
}

export default function DonatePage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-txt-muted text-xs">Loading secure billing...</div>}>
      <DonateContent />
    </Suspense>
  );
}
