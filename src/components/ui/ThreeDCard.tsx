"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface ThreeDCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

/**
 * A reusable premium component that provides:
 * 1. 3D entrance slide-in animation on scroll.
 * 2. 3D parallax tilt effect on mouse hover.
 */
export default function ThreeDCard({ children, className = "", delay = 0 }: ThreeDCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Mouse positions relative to card bounding box
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  // Smooth springs for tilt rotation
  const rotateX = useSpring(useTransform(y, [0, 1], [12, -12]), { damping: 25, stiffness: 120 });
  const rotateY = useSpring(useTransform(x, [0, 1], [-12, 12]), { damping: 25, stiffness: 120 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Normalized position from 0 to 1
    const relativeX = (e.clientX - rect.left) / width;
    const relativeY = (e.clientY - rect.top) / height;

    x.set(relativeX);
    y.set(relativeY);
  };

  const handleMouseLeave = () => {
    x.set(0.5);
    y.set(0.5);
  };

  // 3D slide-in entry animation
  const entranceVariants = {
    hidden: { 
      opacity: 0, 
      y: 70, 
      rotateX: 25,
      rotateY: -10,
      scale: 0.93,
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 60,
        damping: 14,
        delay: delay,
      }
    }
  };

  return (
    <div className="perspective-1000 flex w-full h-full" style={{ perspective: "1000px" }}>
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={entranceVariants}
        style={{
          transformStyle: "preserve-3d",
          rotateX: rotateX,
          rotateY: rotateY,
        }}
        className={`w-full ${className}`}
      >
        <div style={{ transform: "translateZ(20px)", transformStyle: "preserve-3d" }} className="w-full h-full">
          {children}
        </div>
      </motion.div>
    </div>
  );
}
