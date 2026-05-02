import VerificationFlow from "@/components/VerificationFlow";
import * as motion from "framer-motion/client";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center bg-slate-50">
      {/* Light Premium Multi-Layered Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* The Base Image (Faded for light theme) */}
        <Image
          src="/underlaypicture.png"
          alt="Background"
          fill
          className="object-cover opacity-30 scale-110 blur-[12px]"
          priority
        />
        
        {/* Soft Vibrant Orbs (Pastel style) */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 30, 0],
            y: [0, 20, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-5%] left-[-5%] w-[70%] h-[70%] bg-primary/10 blur-[120px] rounded-full"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -30, 0],
            y: [0, -20, 0],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-5%] right-[-5%] w-[70%] h-[70%] bg-blue-400/10 blur-[120px] rounded-full"
        />

        {/* The Frosted Glass Overlay (Max Blur) */}
        <div className="absolute inset-0 bg-white/70 backdrop-blur-[40px]" />
        
        {/* Subtle Gradient for depth */}
        <div className="absolute inset-0 bg-gradient-to-tr from-slate-100/50 via-transparent to-white/50" />
        
        {/* Delicate Texture Overlay */}
        <div className="absolute inset-0 opacity-[0.08] pointer-events-none mix-blend-multiply bg-[url('https://res.cloudinary.com/dzv9rq7qr/image/upload/v1680517551/noise_u8t1z0.png')]" />
      </div>

      {/* Main Content */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full flex flex-col items-center"
      >
        <VerificationFlow />
      </motion.div>

      {/* Sophisticated branding footer */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 text-slate-400 text-[10px] uppercase tracking-[0.4em] font-bold z-10"
      >
        Secure Ticket Verification Portal
      </motion.div>
    </main>
  );
}