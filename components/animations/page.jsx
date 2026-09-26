"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const animationCards = [
  {
    title: "Fade In",
    description: "Smooth opacity transition for page elements.",
    className: "animate-fade",
  },
  {
    title: "Slide Up",
    description: "Content enters naturally from below.",
    className: "animate-slide-up",
  },
  {
    title: "Scale In",
    description: "Subtle scaling effect for cards and modals.",
    className: "animate-scale",
  },
  {
    title: "Float",
    description: "Soft continuous movement for visual elements.",
    className: "animate-float",
  },
];

function RevealOnScroll({ children }) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    amount: 0.2,
  });

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        y: 40,
      }}
      animate={
        isInView
          ? {
              opacity: 1,
              y: 0,
            }
          : {}
      }
      transition={{
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

function FloatingOrb({ delay = 0, size = 100 }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: [0, -18, 0],
        x: [0, 8, 0],
      }}
      transition={{
        opacity: {
          duration: 0.7,
          delay,
        },
        scale: {
          duration: 0.7,
          delay,
        },
        y: {
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay,
        },
        x: {
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay,
        },
      }}
      style={{
        width: size,
        height: size,
      }}
      className="absolute rounded-full bg-[#D45060]/30 blur-sm"
    />
  );
}

export default function AnimationsPage() {
  const [replay, setReplay] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (!showToast) return;

    const timer = setTimeout(() => {
      setShowToast(false);
    }, 2200);

    return () => clearTimeout(timer);
  }, [showToast]);

  return (
    <main className="min-h-screen overflow-hidden bg-[#F7ADAD]/15 text-[#800020]">
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-[#800020]/10 bg-white">
        <div className="absolute inset-0 pointer-events-none">
          <FloatingOrb delay={0} size={180} />
          <div className="absolute right-[10%] top-16">
            <FloatingOrb delay={0.5} size={120} />
          </div>
          <div className="absolute bottom-0 left-[40%]">
            <FloatingOrb delay={1} size={80} />
          </div>
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-10">
          <motion.div
            initial={{
              opacity: 0,
              y: 35,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="max-w-3xl"
          >
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#D45060]">
              Loom & Leaf Motion System
            </p>

            <h1 className="mt-4 text-5xl font-bold leading-tight sm:text-6xl">
              Motion that makes
              <span className="block text-[#D45060]">
                every interaction feel alive.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-sm leading-7 text-gray-500 sm:text-base">
              A collection of reusable animation patterns for
              entrances, hover states, scrolling sections, product
              interactions, and micro-interactions.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setReplay((value) => value + 1)}
                className="rounded-full bg-[#800020] px-6 py-3.5 text-xs font-bold text-white transition hover:bg-[#D45060]"
              >
                Replay Animations
              </button>

              <button
                type="button"
                onClick={() => setShowToast(true)}
                className="rounded-full border border-[#800020]/15 bg-white px-6 py-3.5 text-xs font-bold transition hover:bg-[#F7ADAD]/20"
              >
                Test Micro Interaction
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* BASIC ANIMATIONS */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <RevealOnScroll>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#D45060]">
              Entrance animations
            </p>

            <h2 className="mt-3 text-3xl font-bold">
              Basic Motion
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-400">
              Small, purposeful movements can make the interface
              feel smoother without distracting from the content.
            </p>
          </div>
        </RevealOnScroll>

        <div
          key={replay}
          className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {animationCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{
                opacity: 0,
                y: 35,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.55,
                delay: index * 0.12,
              }}
              className="rounded-[2rem] border border-[#800020]/10 bg-white p-6 shadow-sm"
            >
              <div
                className={`flex h-32 items-center justify-center rounded-2xl bg-[#F7ADAD]/20 ${card.className}`}
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#800020] text-2xl text-white shadow-xl">
                  ◈
                </div>
              </div>

              <h3 className="mt-5 font-bold">
                {card.title}
              </h3>

              <p className="mt-2 text-xs leading-5 text-gray-400">
                {card.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* HOVER INTERACTIONS */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
          <RevealOnScroll>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#D45060]">
              Interaction
            </p>

            <h2 className="mt-3 text-3xl font-bold">
              Hover & Pointer Motion
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-400">
              Product cards and interactive elements can respond
              subtly to pointer movement.
            </p>
          </RevealOnScroll>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {/* CARD 1 */}
            <motion.div
              whileHover={{
                y: -10,
                rotateX: 3,
                rotateY: -3,
              }}
              transition={{
                type: "spring",
                stiffness: 250,
                damping: 18,
              }}
              className="cursor-pointer rounded-[2rem] border border-[#800020]/10 bg-[#F7ADAD]/15 p-5"
            >
              <div className="flex h-60 items-center justify-center rounded-[1.5rem] bg-white">
                <motion.div
                  whileHover={{
                    scale: 1.08,
                    rotate: 4,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                  }}
                  className="flex h-36 w-36 items-center justify-center rounded-[2rem] bg-[#800020] text-4xl text-white shadow-2xl"
                >
                  ◈
                </motion.div>
              </div>

              <div className="mt-5">
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#D45060]">
                  Hover Scale
                </p>

                <h3 className="mt-2 text-lg font-bold">
                  Product Focus
                </h3>
              </div>
            </motion.div>

            {/* CARD 2 */}
            <motion.div
              whileHover={{
                y: -8,
              }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 18,
              }}
              className="cursor-pointer rounded-[2rem] border border-[#800020]/10 bg-[#F7ADAD]/15 p-5"
            >
              <div className="flex h-60 items-center justify-center rounded-[1.5rem] bg-[#800020]">
                <motion.div
                  whileHover={{
                    scale: 1.12,
                  }}
                  transition={{
                    duration: 0.35,
                  }}
                  className="text-center text-white"
                >
                  <div className="text-5xl">♡</div>

                  <p className="mt-3 text-xs font-bold uppercase tracking-widest text-[#F7ADAD]">
                    Wishlist
                  </p>
                </motion.div>
              </div>

              <div className="mt-5">
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#D45060]">
                  Hover Scale
                </p>

                <h3 className="mt-2 text-lg font-bold">
                  Wishlist Interaction
                </h3>
              </div>
            </motion.div>

            {/* CARD 3 */}
            <motion.div
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              className="cursor-pointer rounded-[2rem] border border-[#800020]/10 bg-[#F7ADAD]/15 p-5"
            >
              <div className="relative flex h-60 items-center justify-center overflow-hidden rounded-[1.5rem] bg-white">
                <motion.div
                  animate={{
                    rotate: isHovering ? 180 : 0,
                    scale: isHovering ? 1.12 : 1,
                  }}
                  transition={{
                    duration: 0.6,
                  }}
                  className="h-32 w-32 rounded-full bg-[#D45060]/30"
                />

                <motion.div
                  animate={{
                    rotate: isHovering ? -180 : 0,
                  }}
                  transition={{
                    duration: 0.6,
                  }}
                  className="absolute h-20 w-20 rounded-full bg-[#800020]"
                />
              </div>

              <div className="mt-5">
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#D45060]">
                  Hover Transform
                </p>

                <h3 className="mt-2 text-lg font-bold">
                  Interactive Orb
                </h3>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SCROLL REVEAL */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <RevealOnScroll>
          <div className="rounded-[2.5rem] bg-[#800020] p-8 text-white sm:p-12">
            <div className="grid items-center gap-10 lg:grid-cols-2">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#F7ADAD]">
                  Scroll reveal
                </p>

                <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
                  Content appears when it matters.
                </h2>

                <p className="mt-4 max-w-xl text-sm leading-7 text-white/60">
                  Scroll-triggered animations reveal sections
                  progressively, helping the page feel dynamic while
                  keeping the experience focused.
                </p>
              </div>

              <div className="relative flex min-h-[260px] items-center justify-center overflow-hidden rounded-[2rem] bg-white/5">
                <motion.div
                  animate={{
                    y: [0, -15, 0],
                    rotate: [0, 4, -4, 0],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="flex h-36 w-36 items-center justify-center rounded-[2rem] bg-[#D45060] text-4xl shadow-2xl"
                >
                  ◈
                </motion.div>

                <div className="absolute bottom-5 left-5 right-5 h-px bg-white/10" />
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </section>

      {/* SPRING MOTION */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
          <RevealOnScroll>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#D45060]">
              Spring physics
            </p>

            <h2 className="mt-3 text-3xl font-bold">
              Natural Motion
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-400">
              Spring-based transitions create responsive interactions
              that feel less mechanical.
            </p>
          </RevealOnScroll>

          <div className="mt-10 overflow-hidden rounded-[2rem] border border-[#800020]/10 bg-[#F7ADAD]/15 p-6 sm:p-10">
            <div className="relative h-32">
              <motion.div
                drag="x"
                dragConstraints={{
                  left: 0,
                  right: 0,
                }}
                whileTap={{
                  scale: 0.92,
                }}
                whileHover={{
                  scale: 1.08,
                }}
                animate={{
                  x: [0, 120, 240, 360, 480],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse",
                  type: "spring",
                  stiffness: 80,
                  damping: 15,
                }}
                className="absolute left-0 top-1/2 flex h-20 w-20 -translate-y-1/2 cursor-grab items-center justify-center rounded-2xl bg-[#800020] text-2xl text-white shadow-xl active:cursor-grabbing"
              >
                ◈
              </motion.div>
            </div>

            <p className="text-center text-xs text-gray-400">
              Drag or hover the element to interact.
            </p>
          </div>
        </div>
      </section>

      {/* LOADING / MICRO INTERACTIONS */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <RevealOnScroll>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#D45060]">
            Micro interactions
          </p>

          <h2 className="mt-3 text-3xl font-bold">
            Small Details
          </h2>
        </RevealOnScroll>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {/* PULSE */}
          <div className="rounded-[2rem] border border-[#800020]/10 bg-white p-7">
            <p className="text-sm font-bold">
              Pulse Indicator
            </p>

            <div className="mt-8 flex h-32 items-center justify-center">
              <div className="relative">
                <motion.div
                  animate={{
                    scale: [1, 1.7],
                    opacity: [0.5, 0],
                  }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                  }}
                  className="absolute inset-0 rounded-full bg-[#D45060]"
                />

                <div className="relative h-5 w-5 rounded-full bg-[#800020]" />
              </div>
            </div>
          </div>

          {/* LOADER */}
          <div className="rounded-[2rem] border border-[#800020]/10 bg-white p-7">
            <p className="text-sm font-bold">
              Loading Spinner
            </p>

            <div className="mt-8 flex h-32 items-center justify-center">
              <motion.div
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 1.1,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="h-12 w-12 rounded-full border-4 border-[#F7ADAD] border-t-[#800020]"
              />
            </div>
          </div>

          {/* DOTS */}
          <div className="rounded-[2rem] border border-[#800020]/10 bg-white p-7">
            <p className="text-sm font-bold">
              Loading Dots
            </p>

            <div className="mt-8 flex h-32 items-center justify-center gap-2">
              {[0, 1, 2].map((dot) => (
                <motion.span
                  key={dot}
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 0.7,
                    repeat: Infinity,
                    delay: dot * 0.15,
                  }}
                  className="h-3 w-3 rounded-full bg-[#800020]"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER NOTE */}
      <section className="border-t border-[#800020]/10 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-12 text-center lg:px-10">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#D45060]">
            Loom & Leaf
          </p>

          <h2 className="mt-3 text-2xl font-bold">
            Motion should enhance the experience.
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-gray-400">
            Animations are designed to guide attention, communicate
            state changes, and make interactions feel polished.
          </p>
        </div>
      </section>

      {/* TOAST */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
              x: "-50%",
            }}
            animate={{
              opacity: 1,
              y: 0,
              x: "-50%",
            }}
            exit={{
              opacity: 0,
              y: 20,
              x: "-50%",
            }}
            className="fixed bottom-6 left-1/2 z-[200] rounded-full bg-[#800020] px-6 py-3 text-sm font-semibold text-white shadow-2xl"
          >
            Interaction completed successfully.
          </motion.div>
        )}
      </AnimatePresence>

      {/* LOCAL ANIMATION STYLES */}
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }

          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(18px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }

          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-10px);
          }
        }

        .animate-fade {
          animation: fadeIn 1s ease-out both;
        }

        .animate-slide-up {
          animation: slideUp 0.9s ease-out both;
        }

        .animate-scale {
          animation: scaleIn 0.8s ease-out both;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            scroll-behavior: auto !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </main>
  );
}