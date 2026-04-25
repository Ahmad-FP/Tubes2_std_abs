"use client";

import { useEffect, useRef, useState } from "react";

interface SectionWrapperProps {
  children: React.ReactNode;
  id?: string;
  visible: boolean;
}

export default function SectionWrapper({
  children,
  id,
  visible,
}: SectionWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (visible && ref.current) {
      setTimeout(() => {
        ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <div ref={ref} id={id} className="animate-fade-in-up px-6 pb-12">
      {children}
    </div>
  );
}