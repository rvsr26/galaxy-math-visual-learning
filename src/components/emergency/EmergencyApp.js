import React from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import EmergencyHome from "./EmergencyHome";
import EmergencySteps from "./EmergencySteps";
import EmergencyForm from "./EmergencyForm";
import EmergencyNavbar from "./EmergencyNavbar";

function AnimatedRoutes() {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<EmergencyHome />} />
                <Route path=":id" element={<EmergencySteps />} />
                <Route path="report" element={<EmergencyForm />} />
            </Routes>
        </AnimatePresence>
    );
}

export default function EmergencyApp() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#f0f4f8] relative overflow-x-hidden font-sans text-gray-900">
            {/* Background Mesh Gradients */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-400/30 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute top-[20%] right-[-5%] w-[35%] h-[35%] bg-purple-400/30 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] left-[20%] w-[50%] h-[50%] bg-teal-300/20 rounded-full blur-[100px]" />
            </div>

            {/* Top Navigation */}
            <EmergencyNavbar />

            {/* Back to Lab2 Main Menu */}
            <button
                onClick={() => navigate('/')}
                className="fixed top-4 left-4 z-50 px-4 py-2 bg-white/80 backdrop-blur-md rounded-full shadow-lg hover:bg-white transition-all text-sm font-medium text-gray-700"
            >
                ← Back to Galaxy
            </button>

            {/* Main Content */}
            <main className="relative z-10 px-4 sm:px-6 lg:px-8 pt-28 pb-12 max-w-7xl mx-auto">
                <AnimatedRoutes />
            </main>

            {/* Footer */}
            <footer className="relative z-10 text-center text-sm text-gray-500 py-6 glass border-t border-white/20">
                <p>Built for Autism Safety & Awareness 💙</p>
            </footer>
        </div>
    );
}
