import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const safetyDemos = {
    fire: {
        title: "Fire Safety Drill",
        icon: "🔥",
        color: "red",
        steps: [
            {
                title: "1. Stay Low",
                desc: "Smoke stays high. Stay low on the floor where the air is clean.",
                image: "/safety_fire_crawl_floor.png", // This will be the generated image
                alt: "Child crawling under smoke"
            },
            {
                title: "2. Crawl to Exit",
                desc: "Move quickly but calmly to the nearest door or window.",
                image: "https://images.unsplash.com/photo-1549419163-e380e210fa09?auto=format&fit=crop&q=80&w=1000",
                alt: "Child moving towards exit"
            },
            {
                title: "3. Go Outside",
                desc: "Once you are outside, stay at your family meeting spot.",
                image: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&q=80&w=1000",
                alt: "Safely standing outside"
            }
        ]
    },
    earthquake: {
        title: "Earthquake Drill",
        icon: "🏠",
        color: "blue",
        steps: [
            {
                title: "1. DROP",
                desc: "Drop down onto your hands and knees. This keeps you stable.",
                image: "https://images.unsplash.com/photo-1516733725897-1aa73b87c8e8?auto=format&fit=crop&q=80&w=1000",
                alt: "Child dropping to knees"
            },
            {
                title: "2. COVER",
                desc: "Crawl under a sturdy table or desk to protect your head.",
                image: "/safety_earthquake_drop_cover_hold.png", // This will be the generated image
                alt: "Child hiding under table"
            },
            {
                title: "3. HOLD ON",
                desc: "Hold onto the table leg with both hands until the shaking stops.",
                image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80&w=1000",
                alt: "Child holding table leg"
            }
        ]
    }
};

export default function SafetyDemoOverlay({ type, isOpen, onClose }) {
    const [stepIndex, setStepIndex] = useState(0);
    const demo = safetyDemos[type] || safetyDemos.fire;

    // Reset step index when opened
    useEffect(() => {
        if (isOpen) setStepIndex(0);
    }, [isOpen]);

    if (!isOpen) return null;

    const currentStep = demo.steps[stepIndex];
    const isFirst = stepIndex === 0;
    const isLast = stepIndex === demo.steps.length - 1;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md"
            >
                <motion.div
                    initial={{ scale: 0.9, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 20 }}
                    className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-2xl overflow-hidden border border-slate-200"
                >
                    {/* Header */}
                    <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                        <div className="flex items-center gap-3">
                            <span className="text-3xl grayscale-[0.2]">{demo.icon}</span>
                            <div>
                                <h3 className="text-xl font-black text-slate-900 tracking-tight">{demo.title}</h3>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                    Step {stepIndex + 1} of {demo.steps.length}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-600 hover:border-slate-300 transition-all font-bold"
                        >
                            ✕
                        </button>
                    </div>

                    {/* Content Section */}
                    <div className="p-8 sm:p-12">
                        {/* Progress Bar */}
                        <div className="w-full h-1.5 bg-slate-100 rounded-full mb-10 overflow-hidden">
                            <motion.div
                                className={`h-full bg-blue-600`}
                                initial={{ width: 0 }}
                                animate={{ width: `${((stepIndex + 1) / demo.steps.length) * 100}%` }}
                                transition={{ type: "spring", stiffness: 50 }}
                            />
                        </div>

                        <div className="flex flex-col items-center text-center">
                            {/* Visual Action Area */}
                            <motion.div
                                key={stepIndex}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.4 }}
                                className="w-full aspect-video bg-slate-50 rounded-3xl border-2 border-slate-100 shadow-inner overflow-hidden mb-8 relative"
                            >
                                <img
                                    src={currentStep.image}
                                    alt={currentStep.alt}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-white/90 to-transparent p-4">
                                    <div className="text-[10px] font-black text-blue-600 uppercase tracking-widest bg-white/50 backdrop-blur-sm inline-block px-3 py-1 rounded-full border border-blue-100 shadow-sm">
                                        Visual Guide
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                key={`text-${stepIndex}`}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                <h4 className="text-2xl font-black text-slate-900 mb-3 tracking-tight">
                                    {currentStep.title}
                                </h4>
                                <p className="text-slate-500 font-medium leading-relaxed max-w-sm">
                                    {currentStep.desc}
                                </p>
                            </motion.div>
                        </div>
                    </div>

                    {/* Footer Controls */}
                    <div className="px-8 py-6 bg-slate-50 border-t border-slate-100 flex gap-4">
                        <button
                            onClick={() => setStepIndex(prev => Math.max(0, prev - 1))}
                            disabled={isFirst}
                            className="flex-1 py-4 rounded-2xl font-bold text-slate-500 bg-white border border-slate-200 hover:bg-slate-50 hover:text-slate-700 disabled:opacity-0 transition-all text-sm uppercase tracking-wide"
                        >
                            Previous
                        </button>

                        {!isLast ? (
                            <button
                                onClick={() => setStepIndex(prev => Math.min(demo.steps.length - 1, prev + 1))}
                                className="flex-[2] py-4 rounded-2xl font-black text-white bg-blue-600 shadow-lg shadow-blue-100 hover:shadow-xl hover:bg-blue-500 hover:-translate-y-0.5 transition-all text-sm uppercase tracking-wider"
                            >
                                Next Step
                            </button>
                        ) : (
                            <button
                                onClick={onClose}
                                className="flex-[2] py-4 rounded-2xl font-black text-white bg-emerald-600 shadow-lg shadow-emerald-100 hover:shadow-xl hover:bg-emerald-500 hover:-translate-y-0.5 transition-all text-sm uppercase tracking-wider"
                            >
                                Finish Practice
                            </button>
                        )}
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
