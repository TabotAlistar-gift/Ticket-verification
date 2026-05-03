"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { verifyTicket } from "@/app/actions";

import { LandingStep } from "./steps/LandingStep";
import { FormStep } from "./steps/FormStep";
import { ProcessingStep } from "./steps/ProcessingStep";
import { SuccessStep } from "./steps/SuccessStep";

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

  const handleReset = () => {
    setStep("landing");
    setEmail("");
    setTicketCode("");
    setImage(null);
    setTimer(5);
    setError(null);
  };

  return (
    <div className="w-full max-w-lg px-4 relative z-10">
      {/* Blurry Halo Glow behind the cards */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/5 blur-[100px] rounded-full pointer-events-none z-[-1]" />
      
      <AnimatePresence mode="wait">
        {step === "landing" && <LandingStep onNext={() => setStep("form")} />}
        
        {step === "form" && (
          <FormStep 
            email={email} setEmail={setEmail}
            ticketCode={ticketCode} setTicketCode={setTicketCode}
            showCode={showCode} setShowCode={setShowCode}
            image={image} setImage={setImage}
            isSubmitting={isSubmitting} error={error}
            onSubmit={handleSubmit}
          />
        )}

        {step === "processing" && <ProcessingStep timer={timer} />}

        {step === "success" && <SuccessStep onReset={handleReset} />}
      </AnimatePresence>
    </div>
  );
}