import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
    const navigate = useNavigate();

    return (
        <motion.nav
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            role="navigation"
            aria-label="Main navigation"
            className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4"
        >
            <div
                className="
                    w-full max-w-7xl
                    bg-white/90 backdrop-blur-xl border border-slate-200
                    rounded-2xl
                    px-6 py-4
                    flex items-center justify-between
                    shadow-xl shadow-slate-200/50
                "
            >

                {/* Logo / App Title */}
                <div
                    className="flex items-center gap-4 cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => navigate('/emergency')}
                >
                    <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center border border-red-200">
                        <span className="text-2xl filter drop-shadow-sm" aria-hidden="true">🚨</span>
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-slate-900 tracking-tight leading-none">
                            Emergency Awareness
                        </h1>
                        <span className="text-xs text-slate-500 font-medium">Safety Mode Active</span>
                    </div>
                </div>

                {/* Right Info */}
                <div className="hidden sm:flex items-center gap-4">

                    <button
                        onClick={() => navigate('/emergency/guide')}
                        className="
                            px-4 py-2 rounded-xl
                            bg-slate-50 hover:bg-slate-100
                            text-slate-600 hover:text-slate-900 font-bold text-sm
                            border border-slate-200
                            transition-all flex items-center gap-2
                        "
                    >
                        <span>❓</span> Guide
                    </button>

                    <button
                        onClick={() => navigate('/emergency/profile')}
                        className="
                            px-4 py-2 rounded-xl
                            bg-slate-50 hover:bg-slate-100
                            text-slate-600 hover:text-slate-900 font-bold text-sm
                            border border-slate-200
                            transition-all flex items-center gap-2
                        "
                    >
                        <span>🆔</span> My Safety ID
                    </button>

                    <span
                        className="
                            relative
                            px-4 py-1.5 rounded-full
                            bg-red-50 text-red-600
                            border border-red-100
                            text-sm font-bold
                            flex items-center gap-2
                            shadow-sm
                        "
                        aria-label="Emergency status ready"
                    >
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                        </span>
                        SOS Ready
                    </span>
                </div>
            </div>
        </motion.nav>
    );
}
