import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AccessibilityMenu from "@/components/AccessibilityMenu";
import { DatabaseService } from "@/lib/supabase";
import { FileText, Download, ShieldAlert, Award, FileSpreadsheet, Scale } from "lucide-react";

export const revalidate = 3600;

export default async function TransparencyPage() {
  const documents = await DatabaseService.getTransparencyDocs();

  const certificates = documents.filter((doc) => doc.category === "certificate");
  const financialReports = documents.filter((doc) => doc.category !== "certificate");

  return (
    <>
      <Header />
      
      <main id="main-content" className="flex-grow bg-bg-base py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h1 className="font-heading text-4xl font-bold tracking-tight text-txt-base">
              Transparency & Public Disclosures
            </h1>
            <p className="text-base text-txt-muted leading-relaxed">
              We hold ourselves to the highest standards of financial governance and regulatory compliance. Here you can verify our government registrations, tax exemptions, and audited financial statements.
            </p>
          </div>

          {/* Core Trust Alert Block */}
          <div className="rounded-3xl border-2 border-secondary/20 bg-secondary/5 p-6 md:p-8 space-y-4 max-w-4xl mx-auto">
            <div className="flex gap-3 items-start text-secondary">
              <Scale className="h-6 w-6 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h3 className="font-heading text-base font-bold text-txt-base">
                  Trustee Compensation & Governance Policy
                </h3>
                <p className="text-xs text-txt-muted leading-relaxed">
                  Mind Empowerment Foundation Trust is governed by a volunteer Board of Trustees. In accordance with our commitment to transparency:
                </p>
                <ul className="list-disc pl-4 text-xxs text-txt-muted space-y-1 mt-2">
                  <li><strong>Zero Board Salary:</strong> No trustee or board member receives any salary, stipend, or sitting fees.</li>
                  <li><strong>Expense Reimbursement:</strong> Travel or administrative expenses incurred by trustees are self-funded and never billed to public donations.</li>
                  <li><strong>Conflict of Interest:</strong> No family contracts or related-party commercial operations are permitted under trust resources.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Legal Registrations & Tax Certificates Grid */}
          <div className="space-y-6">
            <h2 className="font-heading text-2xl font-bold text-txt-base border-b border-border-base pb-3">
              Government Registrations & Tax Exemptions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {certificates.map((doc) => (
                <div
                  key={doc.id}
                  className="p-6 rounded-3xl border border-border-base bg-bg-muted flex flex-col justify-between gap-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Award className="h-5 w-5 text-primary shrink-0" />
                      <h3 className="font-heading text-base font-bold text-txt-base">{doc.title}</h3>
                    </div>
                    <p className="text-xs text-txt-muted leading-relaxed">{doc.description}</p>
                    <span className="inline-block text-xxs font-semibold bg-bg-base border border-border-base px-2 py-0.5 rounded text-txt-muted">
                      Validity: {doc.year}
                    </span>
                  </div>
                  <a
                    href={doc.fileUrl}
                    download
                    className="flex items-center justify-center gap-1.5 rounded-xl bg-primary py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-primary-hover transition-all focus:outline-none"
                  >
                    <Download className="h-4 w-4" /> Download Certificate (PDF)
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Annual Audits & Activity Reports */}
          <div className="space-y-6">
            <h2 className="font-heading text-2xl font-bold text-txt-base border-b border-border-base pb-3">
              Audited Financial Accounts & Activity Reports
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {financialReports.map((doc) => (
                <div
                  key={doc.id}
                  className="p-6 rounded-3xl border border-border-base bg-bg-muted flex flex-col justify-between gap-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-primary shrink-0" />
                      <h3 className="font-heading text-base font-bold text-txt-base">{doc.title}</h3>
                    </div>
                    <p className="text-xs text-txt-muted leading-relaxed">{doc.description}</p>
                    <span className="inline-block text-xxs font-semibold bg-bg-base border border-border-base px-2 py-0.5 rounded text-txt-muted">
                      Financial Year: {doc.year}
                    </span>
                  </div>
                  <a
                    href={doc.fileUrl}
                    download
                    className="flex items-center justify-center gap-1.5 rounded-xl border border-border-base bg-bg-base py-2.5 text-xs font-semibold text-txt-base hover:bg-bg-muted transition-all focus:outline-none"
                  >
                    <Download className="h-4 w-4 text-primary" /> Download Report (PDF)
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Transparency FAQ */}
          <div className="rounded-3xl border border-border-base p-6 md:p-8 space-y-4">
            <h3 className="font-heading text-lg font-bold text-txt-base">Transparency FAQs</h3>
            <div className="space-y-4 divide-y divide-border-base">
              <div className="pt-4 first:pt-0 space-y-1">
                <h4 className="text-sm font-bold text-txt-base">How are my donations split between admin and program costs?</h4>
                <p className="text-xs text-txt-muted leading-relaxed">
                  We maintain a strict 90/10 split. 90% of all public donations are spent directly on program supplies, counseling sessions, medications, and project infrastructure. Only 10% is allocated to general trust admin (website servers, essential communications, audit compliance).
                </p>
              </div>
              <div className="pt-4 space-y-1">
                <h4 className="text-sm font-bold text-txt-base">Are certificates of tax deduction issued instantly?</h4>
                <p className="text-xs text-txt-muted leading-relaxed">
                  Yes, for Indian taxpayers, a 50% tax deduction under Section 80G is available. Upon successful transaction through Razorpay, a digital receipt with the trust&apos;s 80G credentials is automatically generated and emailed to you. Form 10BE is filed annually with the IT Dept.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <AccessibilityMenu />
    </>
  );
}
