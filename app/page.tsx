import VerificationFlow from "@/components/VerificationFlow";
import { PremiumBackground } from "@/components/PremiumBackground";
import * as motion from "framer-motion/client";

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center bg-slate-50">
      <PremiumBackground />

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
        className="absolute bottom-8 left-1/2 -translate-x-1/2 w-full text-center text-slate-400 text-[10px] uppercase tracking-[0.4em] font-bold z-10 px-4"
      >
        Portail de Vérification de Tickets Sécurisé
      </motion.div>
    </main>
  );
}