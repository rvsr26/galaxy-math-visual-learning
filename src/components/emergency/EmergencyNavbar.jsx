import { Component } from "react";
import { motion } from "framer-motion";

export default class Navbar extends Component {
    render() {
        return (
            <motion.nav
                initial={{ y: -60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                role="navigation"
                aria-label="Main navigation"
                className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4"
            >
                <div
                    className="
            w-full max-w-7xl
            glass
            rounded-2xl
            px-6 py-3
            flex items-center justify-between
          "
                >

                    {/* Logo / App Title */}
                    <div className="flex items-center gap-3">
                        <span className="text-3xl filter drop-shadow-sm" aria-hidden="true">🚨</span>
                        <h1 className="text-xl font-bold text-gray-800 tracking-tight font-display">
                            Emergency Awareness
                        </h1>
                    </div>

                    {/* Right Info */}
                    <div className="hidden sm:flex items-center gap-6">
                        <span className="text-sm text-gray-600 font-medium">
                            Autism-Friendly Safety App
                        </span>

                        <span
                            className="
                relative
                px-4 py-1.5 rounded-full
                bg-red-50 text-red-600
                border border-red-200
                text-sm font-bold
                flex items-center gap-2
                shadow-sm
              "
                            aria-label="Emergency status ready"
                        >
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                            </span>
                            SOS Ready
                        </span>
                    </div>
                </div>
            </motion.nav>
        );
    }
}
