import React, { useEffect, useState } from "react";
import type { SkillFields } from "~/types/contentful";

interface Skill {
    fields: SkillFields;
    sys: {
        id: string;
    };
}

async function fetchSkills(): Promise<Skill[]> {
    try {
        const res = await fetch('/api/skills');
        if (!res.ok) {
            throw new Error('Failed to fetch skills');
        }
        const data = await res.json();
        return data.skills;
    } catch (error) {
        console.error('Error fetching skills:', error);
        return [];
    }
}

type Category = "Frameworks & Languages" | "OS & Cloud Services" | "Browsers & IDE";

function getUniqueCategories(skills: Skill[]): Category[] {
    const categories = skills.map(skill => skill.fields.category as Category);
    const uniqueCategories = [...new Set(categories)];
    

    const desiredOrder: Category[] = [
        "Frameworks & Languages",
        "OS & Cloud Services", 
        "Browsers & IDE"
    ];
    
    return desiredOrder.filter(category => uniqueCategories.includes(category));
}

const Skills: React.FC = () => {
    const [skills, setSkills] = useState<Skill[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [openCategory, setOpenCategory] = useState<string | null>(null);

    useEffect(() => {
        fetchSkills().then((fetchedSkills) => {
            setSkills(fetchedSkills);
            const uniqueCategories = getUniqueCategories(fetchedSkills);
            setCategories(uniqueCategories);
        });
    }, []);

    const toggleCategory = (category: string) => {
        setOpenCategory(prev => prev === category ? null : category);
    };

    return (
        <section id="skills" className="py-12 md:py-20 bg-black dark:bg-gray-900">
            <div className="max-w-full px-4">
                <div className="space-y-4">
                    <h3 className="text-3xl font-bold mt-0 md:mt-2 text-white mb-4 md:mb-6">
                        Technologies
                    </h3>
                    
                    {categories.map((category) => {
                        const categorySkills = skills.filter(skill => skill.fields.category === category);
                        const isOpen = openCategory === category;
                        
                        return (
                            <div key={category} className="rounded-md overflow-hidden">
                                <button
                                    onClick={() => toggleCategory(category)}
                                    className="w-full px-4 py-2 bg-[#0e0e0e] text-left text-white font-semibold text-lg flex justify-between items-center transition-colors hover:bg-[#1a1a1a]"
                                >
                                    <span>{category || "Unnamed Category"}</span>
                                    <span className={`text-xl transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
                                        ▼
                                    </span>
                                </button>
                                
                                <div className={`transition-all duration-300 ease-in-out overflow-hidden ${
                                    isOpen 
                                        ? 'max-h-[500px] opacity-100' 
                                        : 'max-h-0 opacity-0'
                                }`}>
                                    <div className="px-4 pb-2 md:pb-3 bg-black border-b border-l border-r border-[#0e0e0e]">
                                        <div className="flex flex-wrap gap-2 mt-2 md:mt-3">
                                            {categorySkills.map((skill) => (
                                                <a
                                                    key={skill.sys.id}
                                                    href={skill.fields.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="px-2 py-1 bg-[#151515] rounded-md text-white hover:bg-[#202020] hover:text-green-300 transition-colors text-[12px] font-medium border border-[#010101] hover:border-[#1a1a1a]"
                                                >
                                                    {skill.fields.tech}
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                    {skills.length === 0 && (
                        null
                    )}
                </div>
            </div>
        </section>
    );
};

export default Skills;