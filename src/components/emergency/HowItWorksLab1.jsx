import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import SafetyDemoOverlay from "./SafetyDemoOverlay";

export default function HowItWorksLab1() {
    const navigate = useNavigate();
    const [showDemo, setShowDemo] = useState(false);
    const [demoType, setDemoType] = useState('fire');

    const features = [
        {
            icon: "🚨",
            title: "Identify the Emergency",
            desc: "Select the type of emergency from the home screen (e.g., Fire, Injury, Stranger). Use 'High Risk' filter for immediate dangers."
        },
        {
            icon: "👣",
            title: "Follow Safety Steps",
            desc: "Each emergency has simple, step-by-step instructions. Use the 'Read Aloud' button to hear them if you are overwhelmed."
        },
        {
            icon: "📞",
            title: "Call for Help",
            desc: "Tap the big red 'Call Emergency' button to dial registered services immediately. Use 'Submit Complaint' to report non-emergencies."
        },
        {
            icon: "🆔",
            title: "Use Safety Profile",
            desc: "Set up your 'My Safety ID' with medical info and contacts. First responders can view this digital card even if you can't speak."
        }
    ];

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="max-w-4xl mx-auto px-4"
        >
            <div className="bg-white border border-slate-200 rounded-[2rem] p-6 sm:p-10 shadow-xl shadow-slate-200/50 relative overflow-hidden">

                {/* Header Section */}
                <div className="text-center mb-10">
                    <div className="inline-block px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 font-black text-[10px] uppercase tracking-widest mb-4">
                        Lab 1: Explorer Guide
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-3">
                        How to Stay <span className="text-blue-600">Safe</span>
                    </h1>
                    <p className="text-base text-slate-500 max-w-xl mx-auto font-medium">
                        A simple guide to using the Emergency Awareness system safely and calmly.
                    </p>
                </div>

                {/* Video Tutorial Section */}
                <div className="mb-12">
                    <div className="bg-slate-50 rounded-3xl p-4 sm:p-6 border border-slate-200 shadow-inner">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="text-2xl">🎬</span>
                            <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">Safety Video Tutorial</h3>
                        </div>

                        {/* Video Placeholder - Now launches Interactive Demo */}
                        <div
                            onClick={() => {
                                setDemoType('fire');
                                setShowDemo(true);
                            }}
                            className="aspect-video bg-white rounded-2xl border-4 border-white shadow-lg overflow-hidden relative group cursor-pointer"
                        >
                            <div className="absolute inset-0 bg-slate-900/5 transition-colors group-hover:bg-transparent flex items-center justify-center">
                                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                    <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-white border-b-[10px] border-b-transparent ml-1.5"></div>
                                </div>
                            </div>
                            <img
                                src="https://images.unsplash.com/photo-1549419163-e380e210fa09?auto=format&fit=crop&q=80&w=1000"
                                alt="Video Tutorial Preview"
                                className="w-full h-full object-cover blur-[1px]"
                            />
                            <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md p-3 rounded-xl border border-white/50 flex justify-between items-center">
                                <span className="text-xs font-bold text-slate-900">Interactive Drill: Fire Safety</span>
                                <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Start Now</span>
                            </div>
                        </div>
                        <p className="text-center text-slate-400 text-xs mt-4 font-medium italic">
                            Click to start the interactive safety drill.
                        </p>
                    </div>
                </div>

                {/* Features Grid - Clean Light Cards */}
                <div className="grid md:grid-cols-2 gap-4">
                    {features.map((f, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white border border-slate-100 rounded-2xl p-5 hover:border-blue-200 hover:bg-blue-50/30 transition-all group"
                        >
                            <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-2xl mb-3 shadow-sm group-hover:bg-white group-hover:scale-110 transition-all">
                                {f.icon}
                            </div>
                            <h3 className="text-base font-black text-slate-900 mb-1.5">{f.title}</h3>
                            <p className="text-slate-500 leading-relaxed text-[13px] font-medium">
                                {f.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* CTA */}
                <div className="mt-10 text-center">
                    <button
                        onClick={() => navigate('/emergency')}
                        className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black text-base shadow-lg shadow-blue-100 hover:shadow-xl hover:-translate-y-0.5 transition-all uppercase tracking-wider"
                    >
                        Enter Safety Mode
                    </button>
                </div>

            </div>

            {/* Interactive Safety Demo */}
            <SafetyDemoOverlay
                isOpen={showDemo}
                onClose={() => setShowDemo(false)}
                type={demoType}
            />
        </motion.div>
    );
}
