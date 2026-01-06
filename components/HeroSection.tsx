"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Calendar,
  BookOpen,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const Scene3D = dynamic(() => import("./Scene3D"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-purple-900/20 to-indigo-900/20 animate-pulse" />
  ),
});

const slides = [
  {
    title: "Illuminate Your Path",
    subtitle: "Discover Your True Purpose",
    description:
      "Experience transformative spiritual guidance and unlock your highest potential",
    gradient: "from-purple-900/80 via-indigo-900/80 to-blue-900/80",
  },
  {
    title: "Ancient Wisdom",
    subtitle: "Modern Insights",
    description:
      "Blend timeless spiritual practices with contemporary guidance for holistic growth",
    gradient: "from-indigo-900/80 via-purple-900/80 to-pink-900/80",
  },
  {
    title: "Healing Energy",
    subtitle: "Transform Your Life",
    description:
      "Harness the power of energy healing to restore balance and inner peace",
    gradient: "from-cyan-900/80 via-blue-900/80 to-indigo-900/80",
  },
  {
    title: "Your Journey Begins",
    subtitle: "Start Today",
    description:
      "Book your personal consultation and embark on a journey of spiritual awakening",
    gradient: "from-pink-900/80 via-purple-900/80 to-indigo-900/80",
  },
];

const features = [
  {
    icon: BookOpen,
    title: "Spiritual Readings",
    description: "Deep insights into your life path",
  },
  {
    icon: Zap,
    title: "Energy Healing",
    description: "Restore balance and harmony",
  },
  {
    icon: Calendar,
    title: "Personal Sessions",
    description: "One-on-one guidance",
  },
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [windowSize, setWindowSize] = useState({ width: 1920, height: 1080 });

  useEffect(() => {
    // Set initial window size
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    // Update on resize
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Scene3D />
      </div>

      {/* Gradient Overlay */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className={`absolute inset-0 bg-gradient-to-br ${slides[currentSlide].gradient} z-10`}
        />
      </AnimatePresence>

      {/* Animated Particles */}
      <div className="absolute inset-0 z-20">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full"
            animate={{
              x: [
                Math.random() * windowSize.width,
                Math.random() * windowSize.width,
              ],
              y: [
                Math.random() * windowSize.height,
                Math.random() * windowSize.height,
              ],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-30 min-h-screen px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="max-w-7xl mx-auto w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
              className="text-center space-y-8"
            >
              {/* Main Title */}
              <motion.div
                className="space-y-4"
                animate={{
                  scale: [1, 1.02, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
                  <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                    {slides[currentSlide].title}
                  </span>
                </h1>

                <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-white/90">
                  {slides[currentSlide].subtitle}
                </h2>
              </motion.div>

              <p className="text-xl sm:text-2xl text-white/80 max-w-3xl mx-auto">
                {slides[currentSlide].description}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
                <Link href="/appointments">
                  <Button
                    variant="spiritual"
                    size="lg"
                    className="text-lg px-8 py-6"
                  >
                    Book Your Session
                  </Button>
                </Link>
                <Link href="/about">
                  <Button
                    variant="outline"
                    size="lg"
                    className="text-lg px-8 py-6 bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20"
                  >
                    Learn More
                  </Button>
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
