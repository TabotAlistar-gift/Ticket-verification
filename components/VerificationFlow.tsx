"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { verifyTicket } from "@/app/actions";
import {
  Loader2,
  CheckCircle2,
  ShieldCheck,
  Ticket,
  Mail,
  Upload,
  ArrowRight,
  Eye,
  EyeOff,
  Lock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import Image from "next/image";

type Step = "landing" | "form" | "processing" | "success";

export default function VerificationFlow() {
  const [step, setStep] = useState<Step>("landing");
  const [email, setEmail] = useState("");
  const [ticketCode, setTicketCode] = useState("");
  const [showCode, setShowCode] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [timer, setTimer] = useState(5);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (step === "processing" && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (step === "processing" && timer === 0) {
      setStep("success");
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !ticketCode || !image) {
      setError("Please fill in all fields and upload an image.");
      return;
    }
    if (ticketCode.length !== 16) {
      setError("Ticket code must be 16 digits.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    const formData = new FormData();
    formData.append("email", email);
    formData.append("ticketCode", ticketCode);
    formData.append("ticketImage", image);

    try {
      const result = await verifyTicket(formData);
      if (result.success) {
        setStep("processing");
      } else {
        setError(result.error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setError("Failed to connect to the server.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-lg px-4 relative z-10">
      {/* Blurry Halo Glow behind the cards */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/5 blur-[100px] rounded-full pointer-events-none z-[-1]" />
      
      <AnimatePresence mode="wait">
        {step === "landing" && (
          <motion.div
            key="landing"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.95 }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            className="glass p-8 md:p-12 rounded-[2.5rem] text-center space-y-8 bg-white/80 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.08)] border-white/60"
          >
            <div className="flex justify-center mb-2">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="relative w-32 h-20"
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

            <div className="space-y-3">
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                Check your ticket <span className="text-primary underline decoration-primary/20 decoration-4 underline-offset-8">securely</span>
              </h1>
              <p className="text-sm text-slate-500 max-w-[240px] mx-auto leading-relaxed">
                We do not store any codes. Official verification only.
              </p>
            </div>
            <Button
              size="lg"
              onClick={() => setStep("form")}
              className="w-full h-14 text-base font-semibold rounded-2xl bg-primary hover:bg-primary/90 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-primary/20"
            >
              Check my ticket
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </motion.div>
        )}

        {step === "form" && (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            className="glass p-8 md:p-10 rounded-[2.5rem] bg-white/80 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.08)] border-white/60"
          >
            <form onSubmit={handleSubmit} className="space-y-8">
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
                      className="pl-11 h-12 text-sm rounded-xl border-slate-200 bg-white/50 focus:bg-white transition-all text-slate-900"
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
                      className="pl-11 pr-11 h-12 text-sm rounded-xl border-slate-200 bg-white/50 focus:bg-white transition-all font-mono tracking-[0.2em] text-slate-900"
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
                    <p className="text-[10px] font-medium text-slate-400">
                      Security: Masked Input
                    </p>
                    <p className="text-[10px] font-medium text-slate-400">
                      {ticketCode.length}/16 digits
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1">Upload Ticket Image</Label>
                  <div
                    className={`relative border-2 border-dashed rounded-xl p-6 transition-all cursor-pointer bg-white/50 group ${image ? 'border-green-500 bg-green-50' : 'border-slate-200 hover:border-primary/30'
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
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${image ? 'bg-green-100' : 'bg-slate-50 group-hover:scale-110'
                        }`}>
                        {image ? (
                          <CheckCircle2 className="w-6 h-6 text-green-600" />
                        ) : (
                          <Upload className="w-5 h-5 text-slate-400" />
                        )}
                      </div>
                      <span className={`text-xs font-medium transition-colors ${image ? 'text-green-700' : 'text-slate-500'
                        }`}>
                        {image ? "Image Selected Successfully" : "Click to upload ticket photo"}
                      </span>
                      {image && (
                        <p className="text-[10px] text-green-600 font-semibold truncate max-w-[200px]">
                          {image.name}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-[11px] text-red-500 bg-red-50 p-2.5 rounded-lg border border-red-100 font-medium"
                >
                  {error}
                </motion.p>
              )}

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 text-sm font-semibold rounded-xl bg-primary hover:bg-primary/90 transition-all shadow-lg shadow-primary/10 disabled:opacity-70"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Start verification"
                )}
              </Button>
            </form>
          </motion.div>
        )}

        {step === "processing" && (
          <motion.div
            key="processing"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="glass p-10 md:p-14 rounded-[2.5rem] text-center space-y-6 bg-white/80 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.08)] border-white/60"
          >
            <div className="relative w-20 h-20 mx-auto">
              <svg className="w-20 h-20 -rotate-90">
                <circle
                  cx="40"
                  cy="40"
                  r="36"
                  stroke="currentColor"
                  strokeWidth="6"
                  fill="transparent"
                  className="text-slate-100"
                />
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
              <h2 className="text-2xl font-bold text-slate-900">Verifying Ticket</h2>
              <p className="text-sm text-slate-500 leading-relaxed">
                You will receive a confirmation shortly,<br />please wait.
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
        )}

        {step === "success" && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass p-10 md:p-12 rounded-[2.5rem] text-center space-y-6 bg-white/80 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.08)] border-white/60"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto"
            >
              <CheckCircle2 className="w-10 h-10 text-green-500" />
            </motion.div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-slate-900">Verified Successfully</h2>
              <p className="text-sm text-slate-500">
                All details have been sent to <strong>{email}</strong>.
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => {
                setStep("landing");
                setEmail("");
                setTicketCode("");
                setImage(null);
                setTimer(5);
              }}
              className="w-full h-12 text-sm font-semibold rounded-xl border-slate-200 hover:bg-slate-50 text-slate-600 transition-all"
            >
              Start New Verification
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}