import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AccessibilityMenu from "@/components/AccessibilityMenu";
import { Award, Eye, Heart, ShieldCheck, Target, User } from "lucide-react";
import ThreeDCard from "@/components/ui/ThreeDCard";

export default function AboutPage() {
  const timeline = [
    { year: "2023", title: "Trust Inception", desc: "Mind Empowerment Foundation Trust registered as a public charitable trust in Bhubaneswar, launching initial student counseling camps." },
    { year: "2024", title: "Shakti Skill Center", desc: "Established first vocational training sewing center for rural women and secured Section 12A status." },
    { year: "2025", title: "Expanding Medical Reach", desc: "Partnered with local psychiatrists to expand Swasth Mann into free mobile monthly health clinics in 12 villages, and received Section 80G tax exemption." },
    { year: "2026", title: "Digital Literacy & Beyond", desc: "Setting up rural digital smart-learning labs and looking to implement AI-driven volunteer coordination." },
  ];

  const boardMembers = [
    {
      name: "Mr. Manoj Kumar Pradhan",
      role: "Mind Programmer + MBA",
      image: "/founder.png",
      bio: "A visionary leader committed to empowering individuals through mind programming and environmental sustainability. Manoj founded MEFT to build stronger minds and a greener world."
    },
    {
      name: "Mrs. Purnima Pradhan",
      role: "Entrepreneur",
      bio: "A passionate entrepreneur advocating for women-led micro-enterprises and self-reliance. Purnima drives skill-building and cottage startup models."
    },
    {
      name: "Mr. Shyam Sundar Pradhan",
      role: "Retired Teacher",
      bio: "A seasoned educator with over thirty years of teaching experience. Shyam oversees academic mentorship and children learning classes."
    },
    {
      name: "Mr. Rajni Kanta Dey",
      role: "Retd. OAS Officer",
      bio: "A retired government administrative services officer. Rajni brings vast governance, compliance, and public policy experience to the trust."
    },
    {
      name: "Mr. Kailash Das",
      role: "Trustee",
      bio: "An active community welfare organizer. Kailash manages village outreach campaigns, green drives, and rural operations coordination."
    },
    {
      name: "Mr. Sumit Kumar",
      role: "Engineer",
      bio: "An engineer dedicated to sustainable community design. Sumit directs technical planning, digital labs setup, and ecological initiatives."
    }
  ];

  return (
    <>
      <Header />
      
      <main id="main-content" className="flex-grow bg-bg-base py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Page Title & Vision */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h1 className="font-heading text-4xl font-bold tracking-tight text-txt-base">
              Who We Are & What Drives Us
            </h1>
            <p className="text-base text-txt-muted leading-relaxed">
              Mind Empowerment Foundation Trust is built on the belief that a healthy mind, a skilled hand, and access to knowledge can lift families out of structural hardship.
            </p>
          </div>

          {/* History & Founder Message */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 relative aspect-[3/4] rounded-3xl overflow-hidden shadow-md border border-border-base bg-bg-muted">
              <img
                src="/founder.png"
                alt="Founder of Mind Empowerment Foundation Trust"
                className="h-full w-full object-cover object-top brightness-[1.10] contrast-[1.06] saturate-[1.02]"
              />
            </div>
            <div className="lg:col-span-7 space-y-6">
              <h2 className="font-heading text-2xl font-bold text-txt-base">
                &ldquo;Healing the mind is the first step to empowerment.&rdquo;
              </h2>
              <p className="text-sm text-txt-muted leading-relaxed italic">
                &ldquo;When we look at rural poverty, we often see the lack of material goods, but we miss the mental stress, anxiety, and depression that structural disadvantage forces on individuals. Mind Empowerment Foundation Trust was born to address both clinical mental wellness and functional economic capacity. By healing the mind and offering practical livelihood skills, we help individuals rebuild their lives with dignity.&rdquo;
              </p>
              <div>
                <h4 className="font-heading text-base font-bold text-txt-base">Manoj Kumar Pradhan</h4>
                <p className="text-xs text-txt-muted">Founder & Mind Programmer + MBA, MEFT</p>
              </div>
            </div>
          </div>

          {/* Mission, Vision, Objectives Cards */}
          {/* Mission, Vision, Objectives Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ThreeDCard delay={0.1} className="flex h-full">
              <div className="p-6 rounded-3xl bg-bg-muted border border-border-base text-center space-y-3 w-full h-full">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Target className="h-6 w-6" />
                </div>
                <h3 className="font-heading text-lg font-bold text-txt-base">Our Vision</h3>
                <p className="text-xs text-txt-muted leading-relaxed">
                  To create a society where mental wellness is destigmatized, women lead economic units, children thrive in classrooms, and youth hold productive, secure careers.
                </p>
              </div>
            </ThreeDCard>
            <ThreeDCard delay={0.2} className="flex h-full">
              <div className="p-6 rounded-3xl bg-bg-muted border border-border-base text-center space-y-3 w-full h-full">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary/10 text-secondary">
                  <Eye className="h-6 w-6" />
                </div>
                <h3 className="font-heading text-lg font-bold text-txt-base">Our Mission</h3>
                <p className="text-xs text-txt-muted leading-relaxed">
                  To establish decentralized mental wellness infrastructure, run practical skill centers for women and youth, and provide direct educational sponsorship to marginalized rural families.
                </p>
              </div>
            </ThreeDCard>
            <ThreeDCard delay={0.3} className="flex h-full">
              <div className="p-6 rounded-3xl bg-bg-muted border border-border-base text-center space-y-3 w-full h-full">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10 text-accent-hover">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <h3 className="font-heading text-lg font-bold text-txt-base">Our Values</h3>
                <p className="text-xs text-txt-muted leading-relaxed">
                  Empathetic care, strict financial governance, community-led execution, and radical, public audit reports to foster absolute trust.
                </p>
              </div>
            </ThreeDCard>
          </div>

          {/* Journey Timeline */}
          <div className="space-y-8">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="font-heading text-2xl font-bold text-txt-base">Our Journey Timeline</h2>
              <p className="text-xs text-txt-muted mt-1">Milestones and milestones reached since inception.</p>
            </div>

            <div className="relative border-l border-border-base ml-4 md:ml-32 space-y-8">
              {timeline.map((item, i) => (
                <div key={i} className="relative pl-6 md:pl-10">
                  {/* Timeline bullet */}
                  <span className="absolute -left-3 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white text-xs font-bold ring-4 ring-bg-base">
                    {item.year.substring(2)}
                  </span>
                  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-8">
                    <span className="font-heading text-lg font-bold text-primary min-w-[60px]">
                      {item.year}
                    </span>
                    <div>
                      <h3 className="font-heading text-base font-bold text-txt-base">{item.title}</h3>
                      <p className="text-xs text-txt-muted mt-1 leading-relaxed max-w-2xl">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Board of Trustees */}
          <div className="space-y-8">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="font-heading text-2xl font-bold text-txt-base">Board of Trustees</h2>
              <p className="text-xs text-txt-muted mt-1">The leadership team guiding our interventions and governance.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {boardMembers.map((member, i) => (
                <ThreeDCard key={i} delay={i * 0.1} className="flex h-full">
                  <div className="p-6 rounded-3xl border border-border-base bg-bg-muted flex flex-col items-center text-center space-y-4 w-full h-full">
                    {member.image && (
                      <div className="relative h-28 w-28 rounded-full overflow-hidden border-2 border-primary/20 shadow-sm bg-bg-base flex-shrink-0">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="h-full w-full object-cover object-top brightness-[1.10] contrast-[1.06] saturate-[1.02]"
                        />
                      </div>
                    )}
                    <div className="space-y-1">
                      <h3 className="font-heading text-base font-bold text-txt-base">{member.name}</h3>
                      <span className="inline-block text-xs font-semibold text-primary">{member.role}</span>
                    </div>
                    <p className="text-xs text-txt-muted leading-relaxed flex-grow">{member.bio}</p>
                  </div>
                </ThreeDCard>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <AccessibilityMenu />
    </>
  );
}
