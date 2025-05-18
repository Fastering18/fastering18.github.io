import { motion } from 'framer-motion';

const skillCategories = [
  {
    name: 'Front-end',
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
  },
  {
    name: 'Back-end',
    skills: ['Node.js', 'Express', 'Flask', 'Go'],
  },
  {
    name: 'Databases',
    skills: ['MongoDB', 'PostgreSQL', 'Firebase'],
  },
  {
    name: 'Languages',
    skills: ['Lua', 'C/C++', 'Python', 'TypeScript'],
  },
  {
    name: 'Tools',
    skills: ['Git', 'Docker', 'VS Code', 'Postman'],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="section bg-gray-950">
      <div className="container">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="section-title text-center text-gray-100"
        >
          Skills
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-900 rounded-xl p-8 shadow-lg flex flex-col items-center"
            >
              <h3 className="text-xl font-semibold text-gray-100 mb-4">
                {category.name}
              </h3>
              <div className="flex flex-wrap gap-2 justify-center">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-gray-800 text-gray-200 rounded-full text-sm font-medium shadow"
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