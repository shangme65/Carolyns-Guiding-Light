"use client";

import { motion } from "framer-motion";
import { BookOpen, Zap, Heart, Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: BookOpen,
    title: "Spiritual Readings",
    description:
      "Gain deep insights into your life path, relationships, and purpose through intuitive spiritual readings.",
    features: [
      "Life Path Analysis",
      "Relationship Guidance",
      "Future Insights",
      "Chakra Reading",
    ],
  },
  {
    icon: Zap,
    title: "Energy Healing",
    description:
      "Restore balance and harmony through powerful energy healing sessions that address physical, emotional, and spiritual blockages.",
    features: [
      "Reiki Healing",
      "Chakra Balancing",
      "Aura Cleansing",
      "Energy Alignment",
    ],
  },
  {
    icon: Heart,
    title: "Life Coaching",
    description:
      "Transform your life with personalized coaching that helps you overcome obstacles and achieve your goals.",
    features: [
      "Goal Setting",
      "Personal Growth",
      "Mindset Transformation",
      "Life Purpose Discovery",
    ],
  },
  {
    icon: Sparkles,
    title: "Meditation Guidance",
    description:
      "Learn powerful meditation techniques to cultivate inner peace, clarity, and spiritual connection.",
    features: [
      "Guided Meditation",
      "Mindfulness Training",
      "Stress Relief",
      "Spiritual Connection",
    ],
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent mb-6">
            Our Services
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Discover transformative services designed to illuminate your path
            and unlock your highest potential
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-purple-500/20 hover:border-purple-400/40 transition-all"
            >
              <service.icon className="h-12 w-12 text-purple-400 mb-4" />
              <h2 className="text-2xl font-bold text-white mb-4">
                {service.title}
              </h2>
              <p className="text-white/80 mb-6">{service.description}</p>
              <ul className="space-y-2 mb-6">
                {service.features.map((feature) => (
                  <li key={feature} className="text-white/70 flex items-center">
                    <span className="text-cyan-400 mr-2">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center"
        >
          <Link href="/appointments">
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white px-8 py-6 text-lg"
            >
              Book Your Session
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
