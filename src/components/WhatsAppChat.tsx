"use client";

import React from "react";
import { MessageCircle } from "lucide-react";

/**
 * Floating WhatsApp chat button — appears on every page at bottom-right.
 * Opens WhatsApp chat with the trust's official number on click.
 */
export default function WhatsAppChat() {
  const whatsappUrl =
    "https://wa.me/919853087665?text=Hello%20Mind%20Empowerment%20Foundation%20Trust%2C%20I%20would%20like%20to%20know%20more.";

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg hover:bg-[#20BA5A] hover:scale-110 hover:shadow-xl transition-all duration-200 focus:outline-none"
    >
      <MessageCircle className="h-7 w-7 fill-white" />
    </a>
  );
}
