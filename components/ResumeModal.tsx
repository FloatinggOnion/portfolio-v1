"use client";

import React, { useState } from "react";
import { PiX } from "react-icons/pi";

interface Resume {
    type: string;
    title: string;
    url: string;
}

interface ResumeModalProps {
    isOpen: boolean;
    onClose: () => void;
    resumes: Resume[];
}

const ResumeModal: React.FC<ResumeModalProps> = ({
    isOpen,
    onClose,
    resumes,
}) => {
    const [selectedResume, setSelectedResume] = useState(0);

    if (!isOpen || !resumes || resumes.length === 0) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-lg w-[95vw] h-[95vh] flex flex-col shadow-2xl">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-neutral-200">
                    <div className="flex gap-2 items-center">
                        <h2 className="text-xl font-bold">My Resume</h2>
                        {resumes.length > 1 && (
                            <div className="flex gap-2 ml-4">
                                {resumes.map((resume, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setSelectedResume(idx)}
                                        className={`px-3 py-1 text-sm rounded-md transition-all duration-200 ${
                                            selectedResume === idx
                                                ? "bg-black text-white"
                                                : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                                        }`}
                                    >
                                        {resume.title}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-neutral-100 rounded-full transition-all duration-200"
                        aria-label="Close modal"
                    >
                        <PiX size={24} />
                    </button>
                </div>

                {/* PDF Viewer */}
                <div className="flex-1 overflow-hidden">
                    <iframe
                        src={`${resumes[selectedResume]?.url}#toolbar=1`}
                        className="w-full h-full"
                        title={resumes[selectedResume]?.title}
                    />
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-neutral-200 flex justify-between items-center">
                    <p className="text-sm text-neutral-600">
                        Viewing: {resumes[selectedResume]?.title}
                    </p>
                    <a
                        href={resumes[selectedResume]?.url}
                        download
                        className="px-4 py-2 bg-black text-white rounded-md hover:bg-neutral-800 transition-all duration-200 text-sm"
                    >
                        Download PDF
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ResumeModal;
