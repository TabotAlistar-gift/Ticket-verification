"use client";

import { motion } from "framer-motion";

interface ProcessingStepProps {
  timer: number;
}

export function ProcessingStep({ timer }: ProcessingStepProps) {
  return (
    <motion.div
      key="processing"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      className="glass p-10 md:p-14 rounded-[2.5rem] text-center space-y-6 bg-white/[0.85] backdrop-blur-[16px] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.3)] border border-white"
    >
      <div className="relative w-20 h-20 mx-auto">
        <svg className="w-20 h-20 -rotate-90">
          <circle cx="40" cy="40" r="36" stroke="currentColor" strokeWidth="6" fill="transparent" className="text-slate-100/50" />
          <motion.circle
            cx="40"
            cy="40"
            r="36"
            stroke="currentColor"
            strokeWidth="6"
            fill="transparent"
            strokeDasharray="226"
            initial={{ strokeDashoffset: 226 }}
            animate={{ strokeDashoffset: 226 - (226 * (5 - timer)) / 5 }}
            className="text-primary"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl font-bold text-slate-800">{timer}s</span>
        </div>
      </div>
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-slate-900">Vérification du Ticket</h2>
        <p className="text-sm text-slate-500 leading-relaxed font-medium">
          Vous recevrez une confirmation sous peu,<br />veuillez patienter.
        </p>
      </div>
      <div className="flex justify-center space-x-1.5">
        {[0, 0.2, 0.4].map((delay) => (
          <motion.div 
            key={delay}
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 1, 0.3] }}
            transition={{ repeat: Infinity, duration: 1, delay }}
            className="w-1.5 h-1.5 bg-primary rounded-full"
          />
        ))}
      </div>
    </motion.div>
  );
}
