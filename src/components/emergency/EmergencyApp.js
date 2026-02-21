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

    // Aggressively force light mode on the body for Lab 1
    React.useEffect(() => {
        const originalBg = document.body.style.backgroundColor;
        const originalColor = document.body.style.color;

        document.body.style.backgroundColor = "#f8fafc"; // bg-slate-50
        document.body.style.color = "#0f172a"; // text-slate-900

        return () => {
            document.body.style.backgroundColor = originalBg;
            document.body.style.color = originalColor;
        };
    }, []);

    return (
        <div className="min-h-screen bg-slate-50 relative overflow-x-hidden font-sans text-slate-900 selection:bg-blue-200">
            {/* Background Effects: Lighter and Soft for Light Mode */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-50/30 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-50/20 rounded-full blur-[120px]" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 mix-blend-multiply"></div>
            </div>

            {/* Top Navigation */}
            <EmergencyNavbar />

            {/* Back to Galaxy Button: Light Mode Styling */}
            <button
                onClick={() => navigate('/')}
                className="fixed top-24 left-4 lg:left-8 z-40 px-5 py-2.5 bg-white/80 backdrop-blur-md border border-slate-200 rounded-xl shadow-sm hover:bg-white hover:shadow-md transition-all text-sm font-bold text-slate-600 hover:text-blue-600 flex items-center gap-2 group"
            >
                <span className="group-hover:-translate-x-1 transition-transform">←</span> Return to Galaxy
            </button>

            {/* Main Content */}
            <main className="relative z-10 px-4 sm:px-6 lg:px-8 pt-32 pb-12 max-w-7xl mx-auto min-h-[calc(100vh-80px)]">
                <AnimatedRoutes />
            </main>

            {/* Footer: Light Mode Styling */}
            <footer className="relative z-10 text-center py-6 border-t border-slate-200 bg-white/50 backdrop-blur-sm">
                <p className="text-slate-400 text-sm font-medium italic">Built for Autism Safety & Awareness 💙</p>
            </footer>
        </div>
    );
}
