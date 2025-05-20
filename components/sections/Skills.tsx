"use client";

import { motion } from 'framer-motion';
import { siteConfig } from '@/config/siteConfig';

export default function Skills() {
  return (
    <section id="skills" className="section bg-gray-50 dark:bg-gray-950">
      <div className="container">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="section-title text-center text-gray-900 dark:text-gray-100"
        >
          Skills
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          {siteConfig.skills.map((category, index) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-900 rounded-xl p-8 shadow-lg flex flex-col items-center"
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                {category.category}
              </h3>
              <div className="flex flex-wrap gap-2 justify-center">
                {category.items.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-full text-sm font-medium shadow"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 