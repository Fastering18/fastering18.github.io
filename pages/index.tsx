import Layout from '@/components/Layout';
import Home from '@/components/sections/Home';
import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';
import Projects from '@/components/sections/Projects';
import Contact from '@/components/sections/Contact';

export default function Index() {
  return (
    <Layout>
      <Home />
      <About />
      <Skills />
      <Projects />
      <Contact />
    </Layout>
  );
} 