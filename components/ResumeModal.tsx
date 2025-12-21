"use client";

import React, { useState } from "react";
import {
    PiX,
    PiCaretLeft,
    PiCaretRight,
    PiDownload,
    PiMagnifyingGlassMinus,
    PiMagnifyingGlassPlus,
} from "react-icons/pi";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// Configure worker for v7
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

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
    const [numPages, setNumPages] = useState<number>(0);
    const [pageNumber, setPageNumber] = useState(1);
    const [scale, setScale] = useState(1.0);

    const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
        setNumPages(numPages);
        setPageNumber(1);
    };

    const handleResumeChange = (idx: number) => {
        setSelectedResume(idx);
        setPageNumber(1);
        setScale(1.0);
    };

    const zoomIn = () => setScale((prev) => Math.min(prev + 0.2, 2.0));
    const zoomOut = () => setScale((prev) => Math.max(prev - 0.2, 0.6));

    if (!isOpen || !resumes || resumes.length === 0) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-2xl w-full max-w-5xl h-[90vh] flex flex-col shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-neutral-200">
                    <div className="flex flex-col gap-3 w-full">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold">My Resume</h2>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-neutral-100 rounded-full transition-all duration-200"
                                aria-label="Close modal"
                            >
                                <PiX size={24} />
                            </button>
                        </div>
                        {resumes.length > 1 && (
                            <div className="flex gap-2 flex-wrap">
                                {resumes.map((resume, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => handleResumeChange(idx)}
                                        className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                                            selectedResume === idx
                                                ? "bg-black text-white shadow-md"
                                                : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                                        }`}
                                    >
                                        {resume.title}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* PDF Viewer */}
                <div className="flex-1 overflow-auto bg-neutral-50 p-4 flex items-center justify-center">
                    <div className="shadow-lg">
                        <Document
                            file={resumes[selectedResume]?.url}
                            onLoadSuccess={onDocumentLoadSuccess}
                            loading={
                                <div className="flex items-center justify-center h-[600px] w-[450px] bg-white rounded-lg">
                                    <div className="text-center">
                                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
                                        <p className="text-neutral-600">
                                            Loading PDF...
                                        </p>
                                    </div>
                                </div>
                            }
                            error={
                                <div className="flex items-center justify-center h-[600px] w-[450px] bg-white rounded-lg">
                                    <div className="text-center text-red-600">
                                        <p className="font-semibold">
                                            Failed to load PDF
                                        </p>
                                        <p className="text-sm mt-2">
                                            Please try again
                                        </p>
                                    </div>
                                </div>
                            }
                        >
                            <Page
                                pageNumber={pageNumber}
                                scale={scale}
                                renderTextLayer={true}
                                renderAnnotationLayer={true}
                                className="shadow-xl"
                            />
                        </Document>
                    </div>
                </div>

                {/* Footer Controls */}
                <div className="p-4 border-t border-neutral-200 flex justify-between items-center bg-white rounded-b-2xl">
                    <div className="flex items-center gap-4">
                        {/* Zoom Controls */}
                        <div className="flex items-center gap-2 border border-neutral-300 rounded-lg p-1">
                            <button
                                onClick={zoomOut}
                                disabled={scale <= 0.6}
                                className="p-2 hover:bg-neutral-100 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                                aria-label="Zoom out"
                            >
                                <PiMagnifyingGlassMinus size={20} />
                            </button>
                            <span className="text-sm font-medium min-w-[60px] text-center">
                                {Math.round(scale * 100)}%
                            </span>
                            <button
                                onClick={zoomIn}
                                disabled={scale >= 2.0}
                                className="p-2 hover:bg-neutral-100 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                                aria-label="Zoom in"
                            >
                                <PiMagnifyingGlassPlus size={20} />
                            </button>
                        </div>

                        {/* Page Navigation */}
                        {numPages > 1 && (
                            <div className="flex items-center gap-2 border border-neutral-300 rounded-lg p-1">
                                <button
                                    onClick={() =>
                                        setPageNumber((prev) =>
                                            Math.max(prev - 1, 1)
                                        )
                                    }
                                    disabled={pageNumber <= 1}
                                    className="p-2 hover:bg-neutral-100 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                                    aria-label="Previous page"
                                >
                                    <PiCaretLeft size={20} />
                                </button>
                                <span className="text-sm font-medium min-w-[80px] text-center">
                                    Page {pageNumber} of {numPages}
                                </span>
                                <button
                                    onClick={() =>
                                        setPageNumber((prev) =>
                                            Math.min(prev + 1, numPages)
                                        )
                                    }
                                    disabled={pageNumber >= numPages}
                                    className="p-2 hover:bg-neutral-100 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                                    aria-label="Next page"
                                >
                                    <PiCaretRight size={20} />
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Download Button */}
                    <a
                        href={resumes[selectedResume]?.url}
                        download
                        className="flex items-center gap-2 px-5 py-2.5 bg-black text-white rounded-lg hover:bg-neutral-800 transition-all duration-200 text-sm font-medium shadow-md hover:shadow-lg"
                    >
                        <PiDownload size={18} />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ResumeModal;
