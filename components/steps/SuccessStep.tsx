"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";

interface SuccessStepProps {
  onReset: () => void;
}

export function SuccessStep({ onReset }: SuccessStepProps) {
  return (
    <motion.div
      key="success"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass p-10 md:p-12 rounded-[2.5rem] text-center space-y-6 bg-white/[0.85] backdrop-blur-[16px] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.3)] border border-white"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto"
      >
        <Clock className="w-10 h-10 text-blue-500" />
      </motion.div>
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-slate-900">Vérification en cours</h2>
        <p className="text-[15px] text-slate-500 font-medium">
          Vous recevrez un e-mail de confirmation sous peu.<br />veuillez patienter...
        </p>
      </div>
      <Button 
        variant="outline" 
        onClick={onReset}
        className="w-full h-12 text-sm font-bold rounded-xl border-slate-200 hover:bg-white/50 text-slate-600 transition-all backdrop-blur-sm"
      >
        Démarrer une nouvelle vérification
      </Button>
    </motion.div>
  );
}
