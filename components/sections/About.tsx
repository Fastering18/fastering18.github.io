import { motion } from 'framer-motion';
import Image from 'next/image';

export default function About() {
  return (
    <section id="about" className="section bg-white dark:bg-gray-900">
      <div className="container">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="section-title text-center"
        >
          About Me
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4"
          >
            <p className="text-gray-600 dark:text-gray-300">
              I'm a passionate developer with a strong focus on backend development and IoT systems. 
              My journey in programming began with Lua and Roblox game development, which sparked my 
              interest in software engineering.
            </p>
            
            <p className="text-gray-600 dark:text-gray-300">
              Over the years, I've expanded my expertise to include modern backend technologies like 
              Node.js and Go, while maintaining a keen interest in IoT development. I enjoy building 
              scalable, efficient systems and solving complex problems.
            </p>
            
            <p className="text-gray-600 dark:text-gray-300">
              When I'm not coding, you can find me exploring new technologies, contributing to open-source 
              projects, or working on personal IoT projects that combine my passion for programming with 
              hardware development.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="relative h-[400px] rounded-lg overflow-hidden"
          >
            <Image
              src="/profile.jpg"
              alt="Muhammad Brahmana Priambudi"
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
} 