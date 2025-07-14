import { json } from "@remix-run/node";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useState, useEffect } from "react";
import { getProjects } from "~/services/contentful.server";
import type { ProjectFields } from "~/types/contentful";
import { RiLinksFill, RiGithubFill, RiSearchLine } from "@remixicon/react";

import NavBar from "~/components/NavBar";
import Footer from "~/components/Footer";
import GoToTop from "~/components/GoToTop";

interface Project {
    fields: ProjectFields;
    sys: {
        id: string;
    };
}

interface LoaderData {
    projects: Project[];
    success: boolean;
    error?: string;
}

export async function loader({ request }: LoaderFunctionArgs) {
    try {
        const url = new URL(request.url);
        const preview = url.searchParams.get("preview") === "true";
        
        const projects = await getProjects(preview);
        
        return json({ 
            projects,
            success: true 
        });
    } catch (error) {
        console.error("Error fetching projects:", error);
        return json({ 
            projects: [], 
            success: false, 
            error: "Failed to fetch projects" 
        }, { status: 500 });
    }
}

export default function ProjectsPage() {
    const { projects } = useLoaderData<LoaderData>();
    const [searchTerm, setSearchTerm] = useState("");
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // Trigger animation after component mounts
        const timer = setTimeout(() => {
            setIsLoaded(true);
        }, 100);
        return () => clearTimeout(timer);
    }, []);

    const filteredProjects = projects.filter(project =>
        project.fields.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.fields.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.fields.tech?.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="min-h-screen bg-black text-white">
            <NavBar />
            
            {/* Header Section */}
            <div className={`max-w-6xl mx-auto px-4 pt-8 pb-3 transition-all duration-700 ease-out ${
                isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}>
                <div className="flex flex-row items-center justify-between gap-4 mb-3">
                    <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white">
                        Projects
                    </h1>
                    <div className="relative w-full max-w-[200px] sm:max-w-xs md:max-w-md lg:w-80">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <RiSearchLine className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search projects"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-8 sm:pl-10 pr-2 sm:pr-4 py-2 sm:py-3 bg-[#111111] border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors text-sm sm:text-base"
                        />
                    </div>
                </div>
            </div>
            <div className={`max-w-6xl mx-auto px-4 transition-all duration-700 ease-out delay-100 ${
                isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}>
                <hr className="border-t border-gray-800 w-full mb-8" />
            </div>
                        
            {/* Projects Grid */}
            <div className={`max-w-6xl mx-auto px-4 pb-16 transition-all duration-700 ease-out delay-200 ${
                isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}>
                {filteredProjects.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-400 text-lg">
                            {searchTerm ? "No projects found matching your search." : "No projects available."}
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                        {filteredProjects.map((project, index) => (
                            <div 
                                key={project.sys.id} 
                                className={`bg-[#101010] rounded-lg overflow-hidden shadow-sm transition-all duration-500 ease-out ${
                                    isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                                }`}
                                style={{
                                    transitionDelay: `${300 + index * 100}ms`
                                }}
                            >
                                {project.fields.cover && (
                                    <div className="bg-gray-500 overflow-hidden">
                                        <img
                                            src={typeof project.fields.cover.fields?.file?.url === "string"
                                                ? project.fields.cover.fields.file.url
                                                : ""}
                                            alt={project.fields.name}
                                            className="w-50 h-50 object-cover"
                                        />
                                    </div>
                                )}

                                <div className="p-6">
                                    <div className="flex h-2 items-center justify-between mb-5">
                                        <h3 className="text-lg font-semibold text-white">
                                            {project.fields.name}
                                        </h3>
                                        <div className="flex items-center gap-3">
                                            {project.fields.website && (
                                                <a
                                                    href={project.fields.website}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-gray-400 hover:text-green-300 hover:scale-105 transition-colors"
                                                >
                                                    <RiLinksFill className="w-5 h-5" />
                                                </a>
                                            )}
                                            {project.fields.github && (
                                                <a
                                                    href={project.fields.github}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-gray-400 hover:text-[#2dba4e] hover:scale-105 transition-colors"
                                                >
                                                    <RiGithubFill className="w-5 h-5" />
                                                </a>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-2 mb-3">
                                        {project.fields.tech?.map((technology) => (
                                            <span
                                                key={technology}
                                                className="px-[0.4rem] py-[0.1rem] bg-[#654f03] text-yellow-200 text-[0.70rem] font-medium rounded-md"
                                            >
                                                {technology}
                                            </span>
                                        ))}
                                    </div>
                                    <div>
                                        <hr className="border-t border-gray-700 my-2" />
                                    </div>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        {project.fields.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            
            <Footer />
            <GoToTop />
        </div>
    );
}
