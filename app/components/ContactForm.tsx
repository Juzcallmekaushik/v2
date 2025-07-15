import React, { useState } from "react";
import { RiInstagramFill, RiGithubFill, RiDiscordFill } from "@remixicon/react";

const ContactForm: React.FC = () => {
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("sending");
        
        try {
            const formData = new FormData();
            formData.append("name", form.name);
            formData.append("email", form.email);
            formData.append("message", form.message);

            const response = await fetch("/api/contact", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                setStatus("sent");
                setForm({ name: "", email: "", message: "" });
            } else {
                setStatus("error");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            setStatus("error");
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <form
                onSubmit={handleSubmit}
                className="bg-[#0b0b0b] border border-[#2a2a2a] rounded-lg p-4 sm:p-8 space-y-6 max-w-sm sm:max-w-full mx-auto"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-gray-300 mb-2 text-sm" htmlFor="name">
                            Name
                        </label>
                        <input
                            className="w-full px-4 py-3 bg-[#151515] border border-[#2a2a2a] rounded-md text-white placeholder-[#4c4c4c] focus:outline-none focus:border-gray-400 transition-colors"
                            type="text"
                            id="name"
                            name="name"
                            placeholder="John Doe"
                            value={form.name}
                            onChange={handleChange}
                            required
                            autoComplete="off"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-300 mb-2 text-sm" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="w-full px-4 py-3 bg-[#151515] border border-[#2a2a2a] rounded-md text-white placeholder-[#4c4c4c] focus:outline-none focus:border-gray-400 transition-colors"
                            type="email"
                            id="email"
                            name="email"
                            placeholder="john.doe@example.com"
                            value={form.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                
                <div>
                    <label className="block text-gray-300 mb-2 text-sm" htmlFor="message">
                        Project description
                    </label>
                    <textarea
                        className="w-full px-4 py-3 bg-[#151515] border border-[#2a2a2a] rounded-md text-white placeholder-[#4c4c4c] focus:outline-none focus:border-gray-400 transition-colors"
                        id="message"
                        placeholder="I would like to discuss..."
                        name="message"
                        rows={6}
                        value={form.message}
                        onChange={handleChange}
                        required
                    />
                </div>
                
                <div className="flex justify-center">
                    <button
                        type="submit"
                        disabled={status === "sending"}
                        className="px-8 py-3 items-center justify-center bg-white text-black font-semibold rounded-md hover:bg-gray-200 transition-colors duration-200 disabled:opacity-60 md:mb-0"
                    >
                        {status === "sending" ? "Sending..." : "Send Message"}
                    </button>
                </div>
                
                {status === "sent" && (
                    <p className="text-green-400 text-center mt-4">
                        Thank you! Your message
                        <br className="block sm:hidden" />
                        has been sent.
                    </p>
                )}
                {status === "error" && (
                    <p className="text-red-400 text-center mt-4">
                        Oops! Something went
                        <br className="block sm:hidden" />
                        wrong. Please try again.
                    </p>
                )}
            </form>
            
            <div className="flex flex-row items-center justify-center gap-2 sm:gap-3 mt-6 max-w-sm sm:max-w-full mx-auto px-4">
                <a 
                    href="https://github.com/Juzcallmekaushik" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="inline-flex items-center justify-center space-x-2 bg-[#151515] hover:bg-[#252525] text-white px-2 sm:px-3 py-1.5 rounded-md transition-colors duration-200 text-xs sm:text-sm flex-1 sm:flex-none"
                >
                    <RiGithubFill className="w-4 h-4 text-green-400" />
                    <span>Github</span>
                </a>
                <a 
                    href="https://www.instagram.com/Juzcallmekaushik" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="inline-flex items-center justify-center space-x-2 bg-[#151515] hover:bg-[#252525] text-white px-2 sm:px-3 py-1.5 rounded-md transition-colors duration-200 text-xs sm:text-sm flex-1 sm:flex-none"
                >
                    <RiInstagramFill className="w-4 h-4 text-green-400" />
                    <span>Instagram</span>
                </a>
                <a 
                    href="https://discord.com/users/838682557976936509" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="inline-flex items-center justify-center space-x-2 bg-[#151515] hover:bg-[#252525] text-white px-2 sm:px-3 py-1.5 rounded-md transition-colors duration-200 text-xs sm:text-sm flex-1 sm:flex-none"
                >
                    <RiDiscordFill className="w-4 h-4 text-green-400" />
                    <span>Discord</span>
                </a>
            </div>
        </div>
    );
};

export default ContactForm;