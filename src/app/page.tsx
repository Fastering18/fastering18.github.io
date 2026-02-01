import Navigation from "@/components/Navigation";
import Hero from "@/sections/Hero";
import About from "@/sections/About";
import Skills from "@/sections/Skills";
import Projects from "@/sections/Projects";
import Testimonials from "@/sections/Testimonials";
import Contact from "@/sections/Contact";
import Footer from "@/sections/Footer";
import { getConfig } from "@/app/actions/config";

export default async function Home() {
  const config = await getConfig();

  return (
    <>
      <Navigation />
      <main>
        {config["show_hero"] !== "false" && <Hero />}
        {config["show_about"] !== "false" && <About />}
        {config["show_skills"] !== "false" && <Skills />}
        {config["show_projects"] !== "false" && <Projects />}
        <Testimonials />
        {config["show_contact"] !== "false" && <Contact />}
      </main>
      <Footer />
    </>
  );
}
