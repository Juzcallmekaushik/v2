import React from "react";

const Footer: React.FC = () => (
    <footer className="w-full pt-0 pb-5 bg-black">
        <div className="max-w-4xl mx-auto px-4 text-center">
            <p className="text-white text-sm">
                © <span className="text-green-400 font-medium">Kaushik Reddy 2025</span>. All rights reserved.
            </p>
            <p className="text-gray-400 text-xs mt-2">
                Looking for the previous version? <a href="https://v1.kaushikreddy.me" className="underline hover:text-green-400" target="_blank" rel="noopener noreferrer">Check out v1 here</a>.
            </p>
        </div>
    </footer>
);

export default Footer;