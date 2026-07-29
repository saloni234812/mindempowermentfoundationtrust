import React from "react";
import Image from "next/image";

interface LogoProps {
  /**
   * When true shows the full wordmark (default usage in header/footer/hero).
   * The className controls the container size — always set explicit h-* and w-*.
   */
  showText?: boolean;
  /** Tailwind classes for the outer container. Must include explicit h-* and w-*. */
  className?: string;
}

export default function Logo({ showText = false, className = "h-12 w-36" }: LogoProps) {
  // The logo PNG already includes the full wordmark text, so showText is only
  // kept for API compatibility. We always render the same image.
  return (
    <div className={`relative ${className}`}>
      <Image
        src="/logo.png"
        alt="Mind Empowerment Foundation Trust"
        fill
        className="object-contain object-center"
        priority
      />
    </div>
  );
}
