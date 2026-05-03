"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock, Upload, Eye, EyeOff, Loader2, CheckCircle2 } from "lucide-react";

interface FormStepProps {
  email: string;
  setEmail: (val: string) => void;
  ticketCode: string;
  setTicketCode: (val: string) => void;
  showCode: boolean;
  setShowCode: (val: boolean) => void;
  image: File | null;
  setImage: (file: File | null) => void;
  isSubmitting: boolean;
  error: string | null;
  onSubmit: (e: React.FormEvent) => void;
}

export function FormStep({
  email, setEmail, ticketCode, setTicketCode, showCode, setShowCode,
  image, setImage, isSubmitting, error, onSubmit
}: FormStepProps) {
  return (
    <motion.div
      key="form"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      className="glass p-8 md:p-10 rounded-[2.5rem] bg-white/[0.85] backdrop-blur-[16px] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.3)] border border-white"
    >
      <form onSubmit={onSubmit} className="space-y-8">
        <div className="space-y-7">
          <div className="space-y-3">
            <Label htmlFor="email" className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1">Email Address</Label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-11 h-12 text-sm rounded-xl border-slate-200 bg-white/40 focus:bg-white transition-all text-slate-900 shadow-sm"
                required
              />
            </div>
          </div>

          <div className="space-y-3">
            <Label htmlFor="code" className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1">16-Digit Ticket Code</Label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
              <Input
                id="code"
                type={showCode ? "text" : "password"}
                placeholder="XXXX-XXXX-XXXX-XXXX"
                value={ticketCode}
                onChange={(e) => setTicketCode(e.target.value.replace(/[^0-9]/g, "").slice(0, 16))}
                className="pl-11 pr-11 h-12 text-sm rounded-xl border-slate-200 bg-white/40 focus:bg-white transition-all font-mono tracking-[0.2em] text-slate-900 shadow-sm"
                required
              />
              <button
                type="button"
                onClick={() => setShowCode(!showCode)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showCode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <div className="flex justify-between items-center px-1">
              <p className="text-[10px] font-medium text-slate-400">Security: Masked Input</p>
              <p className="text-[10px] font-medium text-slate-400">{ticketCode.length}/16 digits</p>
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1">Upload Ticket Image</Label>
            <div 
              className={`relative border-2 border-dashed rounded-xl p-6 transition-all cursor-pointer bg-white/40 group ${
                image ? 'border-green-500 bg-green-50/50' : 'border-slate-200 hover:border-primary/30 shadow-sm'
              }`}
              onClick={() => document.getElementById('image')?.click()}
            >
              <input
                id="image"
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files?.[0] || null)}
                className="hidden"
                required
              />
              <div className="flex flex-col items-center text-center space-y-2">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                  image ? 'bg-green-100' : 'bg-slate-50 group-hover:scale-110'
                }`}>
                  {image ? <CheckCircle2 className="w-6 h-6 text-green-600" /> : <Upload className="w-5 h-5 text-slate-400" />}
                </div>
                <span className={`text-xs font-medium transition-colors ${image ? 'text-green-700' : 'text-slate-500'}`}>
                  {image ? "Image Selected Successfully" : "Click to upload ticket photo"}
                </span>
                {image && <p className="text-[10px] text-green-600 font-semibold truncate max-w-[200px]">{image.name}</p>}
              </div>
            </div>
          </div>
        </div>

        {error && (
          <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-[11px] text-red-500 bg-red-50/50 p-2.5 rounded-lg border border-red-100 font-medium">
            {error}
          </motion.p>
        )}

        <Button type="submit" disabled={isSubmitting} className="w-full h-12 text-sm font-bold rounded-xl bg-primary hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 disabled:opacity-70">
          {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Processing...</> : "Start verification"}
        </Button>
      </form>
    </motion.div>
  );
}
