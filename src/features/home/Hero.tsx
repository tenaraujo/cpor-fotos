import { motion } from "framer-motion";
import heroImage from "@/assets/images/hero.webp";
import { Button } from "@/components/ui/button";

export default function Hero() {
  const scrollToCategories = () => {
    const section = document.getElementById("categories");

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">

      {/* Background */}

      <motion.img
        src={heroImage}
        alt="Turma Marechal Waldemar Levy Cardoso"
        className="absolute inset-0 h-full w-full object-cover"
        initial={{ scale: 1 }}
        animate={{ scale: 1.08 }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />

      {/* Overlay */}

      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/85" />

      {/* Conteúdo */}

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center text-white">

        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: .6 }}
          className="text-xl uppercase tracking-[0.35em] text-yellow-400"
        >
          Portal da Turma
        </motion.h2>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: .15 }}
          style={{
            textShadow: "0 6px 25px rgba(0,0,0,.45)",
          }}
          className="mt-4 text-5xl font-black leading-tight md:text-7xl"
        >
          CPOR-SP 2012
        </motion.h1>

        <motion.h3
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: .35 }}
          className="mt-6 text-xl font-semibold text-yellow-300 md:text-2xl"
        >
          Turma Marechal Waldemar Levy Cardoso
        </motion.h3>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: .55 }}
          className="mx-auto mt-10 h-px w-40 bg-yellow-500"
        />

        <motion.h4
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: .7 }}
          className="mt-10 text-3xl font-semibold"
        >
          Nossa história continua aqui.
        </motion.h4>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: .9 }}
          className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-200 md:text-xl"
        >
          Reviva momentos, reencontre amigos e preserve a memória da
          <br />
          Turma Marechal Waldemar Levy Cardoso.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="mt-12"
        >
          <Button
            size="lg"
            onClick={scrollToCategories}
            className="rounded-full bg-yellow-600 px-10 py-7 text-lg font-semibold shadow-2xl transition-all hover:scale-105 hover:bg-yellow-500"
          >
            Reviver Momentos
          </Button>
        </motion.div>

      </div>

      {/* Scroll */}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          y: [0, 10, 0],
        }}
        transition={{
          delay: 2,
          duration: 2,
          repeat: Infinity,
        }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center text-white"
      >
        <p className="text-xs uppercase tracking-[0.3em] opacity-80">
          Explore
        </p>

        <div className="mt-2 text-3xl">
          ↓
        </div>
      </motion.div>

    </section>
  );
}