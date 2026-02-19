import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function HowItWorksLab1() {
    const navigate = useNavigate();

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
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto p-4"
        >
            <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 sm:p-12 shadow-2xl relative overflow-hidden">

                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 font-bold text-xs uppercase tracking-[0.2em] mb-6">
                        Lab 1 Guide
                    </div>
                    <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
                        How It Works
                    </h1>
                    <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                        A quick guide to staying safe with Emergency Awareness mode.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-2 gap-8">
                    {features.map((f, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-slate-800/50 border border-white/5 rounded-3xl p-6 hover:bg-slate-800 transition-colors"
                        >
                            <div className="w-16 h-16 bg-slate-700/50 rounded-2xl flex items-center justify-center text-3xl mb-4 shadow-inner">
                                {f.icon}
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">{f.title}</h3>
                            <p className="text-slate-400 leading-relaxed text-sm">
                                {f.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* CTA */}
                <div className="mt-12 text-center">
                    <button
                        onClick={() => navigate('/emergency')}
                        className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all"
                    >
                        Start Using Lab 1
                    </button>
                </div>

            </div>
        </motion.div>
    );
}
