import type { MetaFunction } from "@remix-run/node";
import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Introduction from "../components/Introduction";
import AboutMe from "../components/AboutMe";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import ContactForm from "../components/ContactForm";
import Footer from "../components/Footer";
import Loading from "../components/Loading";
import GoToTop from "../components/GoToTop";
import PreviousVersions from "../components/PreviousVersions";

export const meta: MetaFunction = () => {
  return [
    { title: "Kaushik Reddy" },
    { name: "description", content: "Fullstack Developer | Graphic Designer" },
  ];
};

export default function Index() {
  const [isLoading, setIsLoading] = useState(() => {
    if (typeof window !== "undefined") {
      return !sessionStorage.getItem("hasVisited");
    }
    return true;
  });
  const [isLoaded, setIsLoaded] = useState(false);
  const [showGoToTop, setShowGoToTop] = useState(false);
  const [showPreviousVersions, setShowPreviousVersions] = useState(false);

  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => {
        setIsLoading(false);
        sessionStorage.setItem("hasVisited", "true");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        setIsLoaded(true);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  useEffect(() => {
    const handleScroll = () => {
      setShowGoToTop(window.scrollY > 0);
      const scrolledToBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 2;
      setShowPreviousVersions(scrolledToBottom);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div
        className={`min-h-screen bg-black text-white transition-opacity duration-500 ${
          isLoading ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <NavBar />
        <main
          className={`container mx-auto px-4 transition-all duration-700 ease-out ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
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
          <section id="contact" className="py-12 md:py-20">
            <ContactForm />
          </section>
        </main>
        <Footer />
      </div>
      {showGoToTop && <GoToTop />}
      {showPreviousVersions && <PreviousVersions />}
      {isLoading && <Loading />}
    </>
  );
}
