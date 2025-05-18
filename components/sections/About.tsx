import { motion } from 'framer-motion';
import Image from 'next/image';

export default function About() {
  return (
    <section id="about" className="section bg-gray-900">
      <div className="container">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="section-title text-center text-gray-100"
        >
          About
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4 bg-gray-800 rounded-xl p-8 shadow-lg"
          >
            <p className="text-gray-300 text-lg">
              I'm a developer passionate about crafting robust, scalable web experiences. My journey began with creative coding and has grown into a love for building impactful digital products.
            </p>
            <p className="text-gray-400">
              I specialize in modern web technologies, focusing on performance, accessibility, and beautiful design. I enjoy collaborating with others and learning new things every day.
            </p>
            <p className="text-gray-400">
              Outside of coding, I'm inspired by art, music, and the endless possibilities of technology.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="relative h-[350px] rounded-xl overflow-hidden shadow-lg border-4 border-gray-800"
          >
            <Image
              src="/profile.jpg"
              alt="Profile"
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