"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import { siteConfig } from '@/config/siteConfig';

export default function About() {
  return (
    <section id="about" className="section bg-gray-50 dark:bg-gray-900">
      <div className="container">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="section-title text-center text-gray-900 dark:text-gray-100"
        >
          About
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4 bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg"
          >
            <p className="text-gray-700 dark:text-gray-300 text-lg">
              {siteConfig.personalInfo.bio}
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Based in {siteConfig.personalInfo.location}, I specialize in modern web and game technologies, focusing on performance, accessibility, and minimalistic design. I enjoy collaborating with others and learning new things every day.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex justify-center items-center"
          >
            <div
              className="relative w-[300px] h-[300px] flex items-center justify-center"
              style={{ perspective: '1000px' }}
            >
              <motion.div
                initial={{ rotateY: -10, scale: 0.95, boxShadow: '0 10px 40px 0 rgba(0,0,0,0.25)' }}
                whileHover={{ rotateY: 10, scale: 1.03, boxShadow: '0 20px 60px 0 rgba(0,0,0,0.35)' }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                className="w-full h-full"
                style={{ willChange: 'transform' }}
              >
                <Image
                  src={siteConfig.assets.profileImage}
                  alt={`${siteConfig.personalInfo.name}'s profile`}
                  fill
                  sizes="(max-width: 768px) 100vw, 300px"
                  className="object-contain object-center drop-shadow-2xl"
                  priority
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 