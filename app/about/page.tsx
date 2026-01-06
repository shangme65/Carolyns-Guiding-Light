"use client";

import { motion } from "framer-motion";
import { Heart, Sparkles, Star } from "lucide-react";

export default function AboutPage() {
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
            About Carolyn's Guiding Light
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Your trusted partner on the journey to spiritual awakening and
            personal transformation
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-purple-500/20"
          >
            <Heart className="h-12 w-12 text-pink-400 mb-4" />
            <h2 className="text-3xl font-bold text-white mb-4">Our Mission</h2>
            <p className="text-white/80 leading-relaxed">
              At Carolyn's Guiding Light, we are dedicated to helping
              individuals discover their true purpose and unlock their highest
              potential through transformative spiritual guidance, energy
              healing, and personalized consultations.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-purple-500/20"
          >
            <Sparkles className="h-12 w-12 text-cyan-400 mb-4" />
            <h2 className="text-3xl font-bold text-white mb-4">Our Approach</h2>
            <p className="text-white/80 leading-relaxed">
              We blend ancient spiritual wisdom with modern insights to provide
              holistic guidance that addresses your unique needs. Every session
              is tailored to help you achieve balance, clarity, and inner peace.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white/10 backdrop-blur-lg rounded-2xl p-12 border border-purple-500/20 text-center"
        >
          <Star className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-white mb-6">Why Choose Us</h2>
          <div className="grid sm:grid-cols-3 gap-8 mt-8">
            <div>
              <h3 className="text-xl font-semibold text-purple-300 mb-2">
                Experienced Guidance
              </h3>
              <p className="text-white/70">
                Years of practice in spiritual healing and life transformation
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-purple-300 mb-2">
                Personalized Care
              </h3>
              <p className="text-white/70">
                Every session is uniquely crafted for your journey
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-purple-300 mb-2">
                Proven Results
              </h3>
              <p className="text-white/70">
                Helping clients achieve lasting transformation and peace
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
