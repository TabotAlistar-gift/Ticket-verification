"use client";

import * as motion from "framer-motion/client";
import Image from "next/image";

export function PremiumBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* The Base Image */}
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

      {/* The Frosted Glass Overlay */}
      <div className="absolute inset-0 bg-white/70 backdrop-blur-[40px]" />
      
      {/* Subtle Gradient for depth */}
      <div className="absolute inset-0 bg-gradient-to-tr from-slate-100/50 via-transparent to-white/50" />
      
      {/* Delicate Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.08] pointer-events-none mix-blend-multiply bg-[url('https://res.cloudinary.com/dzv9rq7qr/image/upload/v1680517551/noise_u8t1z0.png')]" />
    </div>
  );
}
