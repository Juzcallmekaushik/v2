import { RiInstagramFill, RiGithubFill, RiDiscordFill } from "@remixicon/react";
import Lottie from "lottie-react";
import { useState, useEffect } from "react";

export default function Introduction() {
    const [helloAnimation, setHelloAnimation] = useState(null);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        
        const tryLoadAnimation = async () => {
            try {
                const response = await fetch('/lotties/Welcome Animation.json');
                
                if (response.ok) {
                    const data = await response.json();
                    setHelloAnimation(data);
                } else {
                    console.warn('Could not load Lottie animation');
                }
            } catch (error) {
                console.warn('Failed to load Lottie animation:', error);
            }
        };
        
        tryLoadAnimation();
    }, []);

    return (
        <div className="relative flex flex-col items-start justify-start w-full space-y-5 px-2 sm:px-4 md:ml-4 mt-6 md:mt-6 md:space-y-8 font-inter">
            {isClient && helloAnimation && (
                <div className="hidden lg:flex absolute inset-0 items-center justify-end pointer-events-none z-0">
                    <Lottie 
                        animationData={helloAnimation}
                        loop={true}
                        autoplay={true}
                        style={{ 
                            width: 500, 
                            height: 500,
                            opacity: 0.7
                        }}
                    />
                </div>
            )}

            <div className="relative z-10">
                <p className="relative z-10 text-green-400 text-xl sm:text-xl md:text-3xl font-bold">
                    Hey there! I&apos;m
                </p>
                <h1 className="relative z-10 text-white text-4xl sm:text-6xl md:text-8xl font-extrabold leading-[95%] tracking-tight mt-2">
                    Kaushik Reddy.
                </h1>
            </div>

            <div className="relative z-10">
                <h2 className="text-gray-400 text-md sm:text-xl md:text-xl font-medium tracking-tight">
                    <span className="text-white font-bold">Full-Stack Developer.</span> Self-taught with a strong passion for{" "}
                    <span className="hidden md:inline"><br /></span>
                    Computer Science and building end-to-end solutions.
                </h2>
            </div>

            <div className="relative z-10 text-gray-300 text-base sm:text-lg">
                <div className="flex items-start space-x-2">
                    <span>🙎🏻</span>
                    <div>
                        Specializing in full-stack development.
                    </div>
                </div>
                <div className="flex items-start space-x-2">
                    <span>⚡</span>
                    <div>
                        Currently working on{" "}
                        <span className="text-green-400 font-bold">Studeux</span>
                    </div>
                </div>
            </div>

            <div className="relative z-10 flex flex-row space-x-2 w-full sm:w-auto">
                <a
                    href="https://github.com/Juzcallmekaushik"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center space-x-2 bg-[#151515] hover:bg-[#252525] text-white px-3 py-1.5 rounded-md transition-colors duration-200 text-xs sm:text-sm w-auto"
                >
                    <RiGithubFill className="w-4 h-4 text-green-400" />
                    <span>Github</span>
                </a>
                <a
                    href="https://www.instagram.com/Juzcallmekaushik"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center space-x-2 bg-[#151515] hover:bg-[#252525] text-white px-3 py-1.5 rounded-md transition-colors duration-200 text-xs sm:text-sm w-auto"
                >
                    <RiInstagramFill className="w-4 h-4 text-green-400" />
                    <span>Instagram</span>
                </a>
                <a
                    href="https://discord.com/users/838682557976936509"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center space-x-2 bg-[#151515] hover:bg-[#252525] text-white px-3 py-1.5 rounded-md transition-colors duration-200 text-xs sm:text-sm w-auto"
                >
                    <RiDiscordFill className="w-4 h-4 text-green-400" />
                    <span>Discord</span>
                </a>
            </div>
        </div>
    );
}
