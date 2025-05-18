"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const projects = [
  {
    title: 'GBLK Programming Language',
    description: 'A custom programming language built with Node.js, featuring a live demo and comprehensive documentation.',
    image: '/projects/gblk.jpg',
    tags: ['Node.js', 'TypeScript', 'Compiler Design'],
    github: 'https://github.com/yourusername/gblk',
    demo: 'https://gblk-demo.example.com',
  },
  {
    title: 'Kliker Simulator',
    description: 'A mature clicking-based Roblox game simulator with advanced progression systems and multiplayer features.',
    image: '/projects/kliker.jpg',
    tags: ['Lua', 'Roblox', 'Game Development'],
    github: 'https://github.com/yourusername/kliker',
    demo: 'https://www.roblox.com/games/your-game-id',
  },
];

export default function Projects() {
  return (
    <section id="projects" className="section bg-gray-900">
      <div className="container">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="section-title text-center text-gray-100"
        >
          Projects
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-200 border border-gray-700"
            >
              <div className="relative h-56">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-gray-100 mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-400 mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-900 text-gray-300 rounded-full text-xs font-medium border border-gray-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex space-x-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-primary-400 transition-colors duration-200"
                    aria-label="View source code"
                  >
                    <FaGithub className="w-5 h-5" />
                  </a>
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-primary-400 transition-colors duration-200"
                    aria-label="View live demo"
                  >
                    <FaExternalLinkAlt className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 