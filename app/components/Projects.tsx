import React, { useEffect, useState } from "react";
import { Link } from "@remix-run/react";
import type { ProjectFields } from "~/types/contentful";
import { RiLinksFill, RiGithubFill } from "@remixicon/react";

interface Project {
    fields: ProjectFields;
    sys: {
        id: string;
    };
}

async function fetchProjects(): Promise<Project[]> {
    try {
        const res = await fetch('/api/projects/featured');
        if (!res.ok) {
            console.warn('Featured projects endpoint not available or no content model exists');
            return [];
        }
        const data = await res.json();
        return data.projects || [];
    } catch (error) {
        console.warn('Error fetching featured projects (this is expected if Project content model does not exist yet):', error);
        return [];
    }
}

const Projects: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        fetchProjects().then(setProjects);
    }, []);

    if (projects.length === 0) {
        return null;
    }

    return (
        <section id="projects" className="py-2 bg-black">
            <div className="max-w-full px-4">
                <div className="space-y-4">
                    <div className="mb-4">
                        <h2 className="text-3xl font-bold text-white mb-2">
                            Stuff I Made

                        </h2>
                        <div className="flex items-center justify-between">
                            <p className="text-gray-400 text-md mb-3 hidden sm:block">
                                Here&apos;s some of my projects that I have worked on.
                            </p>
                            <Link 
                                to="/projects"
                                className="text-green-400 hover:text-green-300 text-sm font-medium inline-flex items-center transition-colors"
                            >
                                Explore more →
                            </Link>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                        {projects.map((project) => (
                            <div 
                                key={project.sys.id} 
                                className="bg-[#101010] rounded-lg overflow-hidden shadow-sm "
                            >
                                {project.fields.cover && (
                                    <div className="bg-gray-500 overflow-hidden">
                                        <img
                                            src={typeof project.fields.cover.fields?.file?.url === "string"
                                                ? project.fields.cover.fields.file.url
                                                : undefined}
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
                </div>
            </div>
        </section>
    );
};

export default Projects;
