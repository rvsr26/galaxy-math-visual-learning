import React from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import EmergencyHome from "./EmergencyHome";
import EmergencySteps from "./EmergencySteps";
import EmergencyForm from "./EmergencyForm";
import EmergencyNavbar from "./EmergencyNavbar";
import SafetyProfile from "./SafetyProfile";
import HowItWorksLab1 from "./HowItWorksLab1";

function AnimatedRoutes() {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<EmergencyHome />} />
                <Route path="profile" element={<SafetyProfile />} />
                <Route path="guide" element={<HowItWorksLab1 />} />
                <Route path=":id" element={<EmergencySteps />} />
                <Route path="report" element={<EmergencyForm />} />
            </Routes>
        </AnimatePresence>
    );
}

export default function EmergencyApp() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-slate-950 relative overflow-x-hidden font-sans text-slate-100 selection:bg-blue-500/30">
            {/* Background Effects */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-900/20 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-900/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light"></div>
            </div>

            {/* Top Navigation */}
            <EmergencyNavbar />

            {/* Back to Galaxy Button */}
            <button
                onClick={() => navigate('/')}
                className="fixed top-24 left-4 lg:left-8 z-40 px-5 py-2.5 bg-slate-900/80 backdrop-blur-md border border-white/10 rounded-xl shadow-lg hover:bg-slate-800 transition-all text-sm font-bold text-slate-300 hover:text-white flex items-center gap-2 group"
            >
                <span className="group-hover:-translate-x-1 transition-transform">←</span> Return to Galaxy
            </button>

            {/* Main Content */}
            <main className="relative z-10 px-4 sm:px-6 lg:px-8 pt-32 pb-12 max-w-7xl mx-auto min-h-[calc(100vh-80px)]">
                <AnimatedRoutes />
            </main>

            {/* Footer */}
            <footer className="relative z-10 text-center py-6 border-t border-white/5 bg-slate-900/50 backdrop-blur-sm">
                <p className="text-slate-500 text-sm font-medium">Built for Autism Safety & Awareness 💙</p>
            </footer>
        </div>
    );
}
