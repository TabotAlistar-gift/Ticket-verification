"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

interface LandingStepProps {
  onNext: () => void;
}

export function LandingStep({ onNext }: LandingStepProps) {
  return (
    <motion.div
      key="landing"
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -30, scale: 0.95 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="glass p-8 md:p-12 rounded-[2.5rem] text-center space-y-8 bg-white/[0.85] border border-white"
    >
      <div className="flex justify-center mb-2">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="relative w-36 h-24"
        >
          <Image 
            src="/logo.jpeg" 
            alt="Application Logo" 
            fill 
            className="object-contain"
            priority
          />
        </motion.div>
      </div>

      <div className="space-y-4">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl leading-[1.1]">
          Check your ticket <span className="text-primary underline decoration-primary/10 decoration-[6px] underline-offset-[6px]">securely</span>
        </h1>
        <p className="text-[15px] text-slate-500 max-w-[260px] mx-auto leading-relaxed font-medium">
          Official verification portal. <br />We do not store any codes.
        </p>
      </div>
      <Button 
        size="lg" 
        onClick={onNext}
        className="w-full h-14 text-base font-bold rounded-2xl bg-primary hover:bg-primary/90 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-primary/20"
      >
        Check my ticket
        <ArrowRight className="ml-2 w-4 h-4" />
      </Button>
    </motion.div>
  );
}
