'use client';

import { motion } from 'framer-motion';
import { Code2, Star, Users, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function HeroSection() {
  const router = useRouter();

  return (
    <section className="relative pt-20 overflow-hidden bg-gradient-to-br from-gray-50 via-white to-indigo-50 dark:from-[#0a0e17] dark:via-[#0d1117] dark:to-[#0a0e17]">
      
      {/* Animated Background Orbs – Subtle & Stunning */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ x: [0, 100, 0], y: [0, -100, 0] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-400/20 dark:bg-indigo-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -120, 0], y: [0, 80, 0] }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 -right-40 w-80 h-80 bg-purple-400/20 dark:bg-purple-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-pink-400/10 dark:bg-pink-500/5 rounded-full blur-3xl"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center">

          {/* LEFT: Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-3 px-5 py-2.5 bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/40 dark:to-purple-900/40 border border-indigo-200/50 dark:border-indigo-800 rounded-full mb-8"
            >
              <Code2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <span className="font-semibold text-indigo-700 dark:text-indigo-300">
                100% Free • Learning of Coding
              </span>
            </motion.div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Master Coding<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400">
                The Right Way
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Join <strong>500,000+</strong> developers learning modern web development, AI, Python, React, and more — with <strong>real projects, real mentors, real certificates</strong>.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
              <button
                onClick={() => router.push("/course")}
                className="group px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3"
              >
                Explore All Courses
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Trust Stats */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-8 text-sm sm:text-base">
              <div className="flex items-center gap-3">
                <Users className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
                <div>
                  <div className="font-bold text-gray-900 dark:text-white">500K+</div>
                  <div className="text-gray-600 dark:text-gray-400">Active Learners</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Star className="w-8 h-8 text-yellow-500 fill-yellow-500" />
                <div>
                  <div className="font-bold text-gray-900 dark:text-white">4.9/5.0</div>
                  <div className="text-gray-600 dark:text-gray-400">From 248K+ Reviews</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT: Hero Image + Floating Cards */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="relative"
          >
            {/* Main Image */}
            <div className="relative mx-auto w-full max-w-lg:max-w-md">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl ring-1 ring-black/5 dark:ring-white/10">
                <Image
                  src="/images/herosection.png"
                  alt="Learn coding with real projects"
                  width={800}
                  height={700}
                  className="w-full h-auto object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>
              {/* Live Activity Dot */}
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute top-6 right-6 flex items-center gap-2 bg-black/60 backdrop-blur px-4 py-2 rounded-full text-white text-sm"
              >
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                <span>3,421 learning now</span>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}