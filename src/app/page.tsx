import Navigation from "@/components/Navigation";
import Hero from "@/sections/Hero";
import About from "@/sections/About";
import Skills from "@/sections/Skills";
import Projects from "@/sections/Projects";
import Testimonials from "@/sections/Testimonials";
import Contact from "@/sections/Contact";
import Footer from "@/sections/Footer";
import JsonLd from "@/components/JsonLd";
import { getConfig } from "@/app/actions/config";
import { getProjects } from "@/app/actions/projects";
import { itemListJsonLd, profilePageJsonLd } from "@/lib/seo";
import type { Metadata } from "next";
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_TITLE,
  SITE_URL,
} from "@/lib/seo";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: DEFAULT_TITLE,
  description: DEFAULT_DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    url: SITE_URL,
    type: "website",
  },
};

export default async function Home() {
  const [config, projects] = await Promise.all([getConfig(), getProjects()]);
  const visible = projects.filter((p) => p.isVisible);

  return (
    <>
      <JsonLd data={[profilePageJsonLd(), itemListJsonLd(visible)]} />
      <Navigation />
      <main id="main-content">
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
