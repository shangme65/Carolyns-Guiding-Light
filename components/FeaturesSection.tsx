"use client";

import { motion } from "framer-motion";
import { BookOpen, Zap, Calendar } from "lucide-react";

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

export default function FeaturesSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {features.map((feature, idx) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all"
            >
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: idx * 0.3,
                }}
              >
                <feature.icon className="h-12 w-12 text-purple-400 mx-auto mb-4" />
              </motion.div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-white/70">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
