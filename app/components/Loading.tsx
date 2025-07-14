import React from 'react';

const Loading: React.FC = () => {
    return (
        <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
            <div className="flex flex-col items-center">
                <img
                    src="/favicon.ico"
                    alt="Loading"
                    className="w-16 h-16 md:w-16 md:h-16"
                    style={{
                        animation: 'simpleFade 1.5s ease-in-out infinite'
                    }}
                />
            </div>
        </div>
    );
};

export default Loading;
