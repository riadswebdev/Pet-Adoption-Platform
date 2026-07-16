"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

const faqs = [
  {
    category: "Adoption Process",
    items: [
      {
        q: "How do I adopt a pet?",
        a: "Browse our Explore Pets page, find a pet you love, and view their details page to contact the owner. After connecting, the owner will guide you through the handoff process.",
      },
      {
        q: "Is there an adoption fee?",
        a: "Each pet listing has its own adoption fee set by the individual owner or rescue. This fee typically covers veterinary care, vaccinations, and other associated costs.",
      },
      {
        q: "Can I adopt if I live in a different city?",
        a: "Yes! Many owners are willing to arrange travel for the right family. Check the pet's location on the details page and discuss arrangements directly with the owner.",
      },
    ],
  },
  {
    category: "Listing a Pet",
    items: [
      {
        q: "How do I list a pet for adoption?",
        a: "Create an account, log in, and use the 'Add Pet' page to fill in your pet's details including photos, health info, and adoption fee. Once submitted, it appears live on the platform.",
      },
      {
        q: "What information do I need to list a pet?",
        a: "You'll need the pet's name, breed, age, gender, health status (vaccinated/neutered), photos, a description, location, and an adoption fee. The more detail you provide, the faster you'll find a match.",
      },
      {
        q: "Can I edit or remove my listing?",
        a: "Yes. Visit the 'Manage Pets' page in your dashboard to update or delete any of your listings at any time.",
      },
    ],
  },
  {
    category: "Account & Safety",
    items: [
      {
        q: "Is my personal information safe?",
        a: "Absolutely. We use industry-standard encryption and secure authentication via Better Auth. We never sell your personal data to third parties.",
      },
      {
        q: "How do I reset my password?",
        a: "Click 'Forgot Password' on the login page and enter your email. We'll send you a secure link to reset your password within minutes.",
      },
      {
        q: "Are the pet listings verified?",
        a: "We encourage owners to provide detailed and accurate information. While we don't physically verify each pet, our community reporting system flags any suspicious listings promptly.",
      },
    ],
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-foreground/10 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center p-5 text-left bg-foreground/5 hover:bg-foreground/10 transition-colors"
        aria-expanded={open}
      >
        <span className="font-semibold text-foreground pr-4">{q}</span>
        {open ? <ChevronUp size={20} className="text-[#FF6B35] shrink-0" /> : <ChevronDown size={20} className="text-foreground/50 shrink-0" />}
      </button>
      {open && (
        <div className="px-5 py-4 bg-background border-t border-foreground/10">
          <p className="text-foreground/70 leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  );
}

export default function FAQPage() {
  return (
    <div className="bg-background min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-[#FF6B35]/10 text-[#FF6B35] px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <HelpCircle size={16} />
            Got Questions?
          </div>
          <h1 className="text-4xl font-extrabold text-foreground mb-4">
            Frequently Asked <span className="text-gradient">Questions</span>
          </h1>
          <p className="text-foreground/70 text-lg">
            Everything you need to know about adopting and listing pets on PetAdopt.
          </p>
        </div>

        <div className="space-y-10">
          {faqs.map((section) => (
            <div key={section.category}>
              <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <span className="w-2 h-6 bg-gradient-primary rounded-full inline-block"></span>
                {section.category}
              </h2>
              <div className="space-y-3">
                {section.items.map((item) => (
                  <FAQItem key={item.q} q={item.q} a={item.a} />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center bg-foreground/5 border border-foreground/10 rounded-2xl p-10">
          <h2 className="text-2xl font-bold text-foreground mb-3">Still have questions?</h2>
          <p className="text-foreground/70 mb-6">Our support team is happy to help with anything not covered above.</p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#FF6B35] text-white font-semibold px-6 py-3 rounded-xl hover:bg-[#FF3F6C] transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
