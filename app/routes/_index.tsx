import type { MetaFunction } from "@remix-run/node";
import { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import Introduction from "../components/Introduction";
import AboutMe from "../components/AboutMe";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import ContactForm from "../components/ContactForm";
import Footer from "../components/Footer";
import Loading from "../components/Loading";
import GoToTop from "../components/GoToTop";

export const meta: MetaFunction = () => {
  return [
    { title: "Kaushik Reddy" },
    { name: "description", content: "Welcome to Kaushik Reddy's portfolio website" },
  ];
};

export default function Index() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className={`min-h-screen bg-black text-white ${isLoading ? 'opacity-0 pointer-events-none' : 'opacity-100'} transition-opacity duration-500`}>
        <NavBar />
        <main className="container mx-auto px-4">
          <Introduction />
          <div className="flex flex-col lg:flex-row lg:gap-8">
            <div className="lg:w-1/2">
              <AboutMe />
            </div>
            <div className="lg:w-1/2">
              <Skills />
            </div>
          </div>
          <Projects />
          {/* Contact Section */}
          <section id="contact" className="py-12 md:py-20">
            <ContactForm />
          </section>
        </main>
        <Footer />
        <GoToTop />
      </div>

      {isLoading && <Loading />}
    </>
  );
}
