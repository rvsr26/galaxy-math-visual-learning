import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { useSound } from './useSound';
import ParticleField from './ParticleField';
import MagneticWrapper from './MagneticWrapper';
import studentPhoto from './image.png';


const AboutPage = ({ onBack }) => {
    const { playClick, playCount, playUnlock } = useSound();

    // 3D Tilt Logic for Profile Card
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["15deg", "-15deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-15deg", "15deg"]);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseXVal = e.clientX - rect.left;
        const mouseYVal = e.clientY - rect.top;
        const xPct = mouseXVal / width - 0.5;
        const yPct = mouseYVal / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    // Secret Mode
    const [clickCount, setClickCount] = useState(0);
    const handleProfileClick = () => {
        setClickCount(prev => prev + 1);
        playClick();
        if (clickCount + 1 === 5) {
            playUnlock();
            // Could add a confetti effect here in future
        }
    };

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: "spring", stiffness: 100 }
        }
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="min-h-screen pt-20 px-4 pb-12 flex flex-col items-center overflow-x-hidden relative" style={{ backgroundColor: 'var(--bg-main)' }}
        >
            {/* Interactive Background */}
            <ParticleField />

            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[100px]" />
            </div>

            {/* Header */}
            <motion.div variants={itemVariants} className="w-full max-w-6xl flex items-center mb-8 relative z-10 font-sans">
                <MagneticWrapper>
                    <button
                        onClick={() => { playClick(); onBack(); }}
                        onMouseEnter={() => playClick()}
                        className="group px-5 py-2.5 bg-slate-800/50 hover:bg-slate-700 text-white rounded-xl font-bold border border-white/10 transition-all active:scale-95 flex items-center gap-2 backdrop-blur-sm"
                    >
                        <span className="group-hover:-translate-x-1 transition-transform">⬅</span> Back
                    </button>
                </MagneticWrapper>
            </motion.div>

            {/* Hero Section */}
            <motion.div variants={itemVariants} className="w-full max-w-6xl relative z-10 mb-16">
                <div className="relative bg-gradient-to-r from-slate-900/80 to-slate-800/80 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 md:p-12 overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 p-8 opacity-20 pointer-events-none">
                        <motion.div
                            animate={{ y: [0, -15, 0], rotate: [0, 5, -5, 0] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                            className="text-9xl"
                        >
                            🚀
                        </motion.div>
                    </div>

                    <div className="relative z-10 max-w-3xl">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                            className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm font-semibold"
                        >
                            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
                            Lab Project 2026
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight text-shadow-xl"
                        >
                            Visual Math Learning Portal
                        </motion.h1>

                        <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-2xl font-light">
                            Empowering children with <span className="text-white font-medium">autism</span> to master mathematical concepts through
                            an immersive, gamified visual learning experience.
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* Main Grid */}
            <div className="w-full max-w-6xl z-10 grid md:grid-cols-12 gap-8">

                {/* Left Column - Profile (4 cols) With 3D Tilt */}
                <motion.div variants={itemVariants} className="md:col-span-4 h-full perspective-1000">
                    <motion.div
                        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                        onClick={handleProfileClick}
                        className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-3xl p-6 h-full shadow-lg flex flex-col items-center text-center hover:border-white/20 transition-colors duration-300 relative group cursor-pointer"
                    >
                        <div style={{ transform: "translateZ(50px)" }} className="relative mb-6">
                            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-full blur-2xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
                            <div className="relative w-48 h-48 rounded-full p-1 bg-gradient-to-br from-cyan-400 to-purple-500">
                                <img
                                    src={studentPhoto}
                                    alt="Student"
                                    className="w-full h-full object-cover rounded-full border-4 border-slate-900"
                                    onError={(e) => { e.target.onerror = null; e.target.src = 'https://ui-avatars.com/api/?name=VS&background=0D8ABC&color=fff&size=200'; }}
                                />
                            </div>
                            <div className="absolute bottom-2 right-2 bg-slate-900 border border-slate-700 p-1.5 rounded-full text-xl shadow-lg">👨‍💻</div>
                        </div>

                        <div style={{ transform: "translateZ(30px)" }}>
                            <h2 className="text-2xl font-bold text-white mb-1">R. Vishnu Sathwick</h2>
                            <p className="text-slate-400 mb-4 font-mono text-sm">CB.SC.U4CSE23644</p>
                        </div>

                        <div className="w-full h-px bg-white/10 my-4"></div>

                        <div style={{ transform: "translateZ(20px)" }} className="flex flex-wrap justify-center gap-2 mb-8">
                            {['React', 'Node.js', 'MongoDB', 'Tailwind'].map((tag) => (
                                <span key={tag} className="px-2.5 py-1 bg-slate-800 text-slate-300 text-xs rounded-md border border-white/5 font-medium">
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <div style={{ transform: "translateZ(20px)" }} className="mt-auto w-full space-y-3">
                            <MagneticWrapper>
                                <a
                                    href="https://galaxy-math-visual-learning.vercel.app/"
                                    target="_blank"
                                    rel="noreferrer"
                                    onMouseEnter={() => playClick()}
                                    className="flex items-center justify-center gap-2 w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-all border border-blue-400/20 shadow-lg shadow-blue-900/20"
                                >
                                    <span>Live Preview</span>
                                    <span className="text-blue-200">🚀</span>
                                </a>
                            </MagneticWrapper>
                            <MagneticWrapper>
                                <a
                                    href="https://github.com/rvsr26/galaxy-math-visual-learning"
                                    target="_blank"
                                    rel="noreferrer"
                                    onMouseEnter={() => playClick()}
                                    className="flex items-center justify-center gap-2 w-full py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold transition-all border border-white/5 hover:border-white/20"
                                >
                                    <span>GitHub Repository</span>
                                    <span className="text-slate-500">↗</span>
                                </a>
                            </MagneticWrapper>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Right Column - Info (8 cols) */}
                <div className="md:col-span-8 flex flex-col gap-6">

                    {/* Stats / Info Row */}
                    <div className="grid sm:grid-cols-2 gap-6">
                        <motion.div variants={itemVariants} className="bg-slate-900/60 backdrop-blur-md border border-white/10 rounded-3xl p-6 hover:bg-slate-800/60 transition-colors hover:scale-[1.02]">
                            <div className="w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center text-2xl mb-4">📚</div>
                            <h3 className="text-lg font-bold text-white mb-2">Academic Context</h3>
                            <ul className="space-y-2 text-sm text-slate-400">
                                <li className="flex justify-between border-b border-white/5 pb-1"><span>Course</span> <span className="text-slate-200">Full Stack Frameworks</span></li>
                                <li className="flex justify-between border-b border-white/5 pb-1"><span>Code</span> <span className="text-slate-200">23CSE461</span></li>
                                <li className="flex justify-between pt-1"><span>Semester</span> <span className="text-slate-200">VI (2026)</span></li>
                            </ul>
                        </motion.div>

                        <motion.div variants={itemVariants} className="bg-slate-900/60 backdrop-blur-md border border-white/10 rounded-3xl p-6 hover:bg-slate-800/60 transition-colors hover:scale-[1.02]">
                            <div className="w-12 h-12 rounded-2xl bg-purple-500/20 flex items-center justify-center text-2xl mb-4">🎯</div>
                            <h3 className="text-lg font-bold text-white mb-2">Project Mentorship</h3>
                            <div className="flex items-center gap-3 mt-3">
                                <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center font-bold text-slate-300">SK</div>
                                <div>
                                    <p className="text-slate-200 font-medium font-sans">Dr. T. Senthil Kumar</p>
                                    <p className="text-slate-500 text-xs">Faculty Guide</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* features Grid */}
                    <motion.div variants={itemVariants} className="bg-slate-900/60 backdrop-blur-md border border-white/10 rounded-3xl p-6 flex-1">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-2xl">🧩</div>
                            <div>
                                <h3 className="text-xl font-bold text-white">Interactive Modules</h3>
                                <p className="text-slate-400 text-sm">Gamified exercises with musical interactions</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {[
                                { icon: '🍎', name: 'Counting', color: 'bg-red-500/10 border-red-500/20 text-red-300' },
                                { icon: '➕', name: 'Addition', color: 'bg-blue-500/10 border-blue-500/20 text-blue-300' },
                                { icon: '🧠', name: 'Memory', color: 'bg-yellow-500/10 border-yellow-500/20 text-yellow-300' },
                                { icon: '🎨', name: 'Patterns', color: 'bg-purple-500/10 border-purple-500/20 text-purple-300' },
                                { icon: '🍕', name: 'Fractions', color: 'bg-orange-500/10 border-orange-500/20 text-orange-300' },
                                { icon: '🍪', name: 'Sharing', color: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300' },
                            ].map((item, i) => (
                                <motion.div
                                    key={item.name}
                                    whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.05)" }}
                                    whileTap={{ scale: 0.95 }}
                                    onMouseEnter={() => playCount(i + 1)}
                                    className={`p-3 rounded-xl border ${item.color} flex flex-col items-center justify-center gap-2 text-center transition-all cursor-pointer`}
                                >
                                    <span className="text-2xl filter drop-shadow-lg">{item.icon}</span>
                                    <span className="text-xs font-bold">{item.name}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Accessibility Note */}
                    <motion.div variants={itemVariants} className="bg-gradient-to-r from-blue-900/40 to-cyan-900/40 border border-blue-500/20 rounded-3xl p-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-3xl -mr-10 -mt-10"></div>
                        <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2 relative z-10">
                            <span className="text-2xl">♿</span> Accessibility First
                        </h3>
                        <p className="text-slate-300 text-sm leading-relaxed relative z-10">
                            Designed with high-contrast visuals, simplified navigation, and clear feedback loops specifically tailored for neurodiverse learners.
                        </p>
                    </motion.div>

                </div>
            </div>

            {/* Research Foundations Section */}
            <motion.div variants={itemVariants} className="w-full max-w-6xl z-10 mt-12 mb-16">
                <div className="flex items-center gap-4 mb-8">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/10"></div>
                    <h2 className="text-3xl font-black text-white px-6">Research Foundations</h2>
                    <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/10"></div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                        {
                            title: "Math Interventions for Students With ASD",
                            source: "Council for Exceptional Children",
                            link: "https://doi.org/10.1177/0014402915625066",
                            desc: "Synthesis of best-evidence math interventions specifically for children with Autism Spectrum Disorder (ASD)."
                        },
                        {
                            title: "Technology-Assisted Educational Intervention",
                            source: "University of Tarragona",
                            link: "https://doi.org/10.17345/ute.2025.4142",
                            desc: "Investigates the effectiveness of digital apps in improving arithmetic and geometry skills in autistic children."
                        },
                        {
                            title: "Cognitive Correlates of Math Abilities",
                            source: "PLOS ONE",
                            link: "https://doi.org/10.1371/journal.pone.0310525",
                            desc: "Explores why multi-modal answering (Voice/Visual) is critical for bypassing memory barriers in ASD."
                        },
                        {
                            title: "Mathematical Interventions for Individuals with ASD",
                            source: "Springer Nature",
                            link: "https://doi.org/10.1007/s40489-016-0078-9",
                            desc: "Confirms that engagement-based game mechanics are highly effective for student learning accuracy."
                        },
                        {
                            title: "The CRA Sequence for Students with Autism",
                            source: "Hammill Institute on Disabilities",
                            link: "https://doi.org/10.1177/1053451219832987",
                            desc: "Supports the visual-to-numeric transition used in our Fraction and Sharing games."
                        },
                        {
                            title: "Flashcards for Information Retention",
                            source: "Psychology Journal",
                            link: "https://doi.org/10.4236/psych.2020.1111108",
                            desc: "Validates the Memory and Pattern game logic for enhancing focus and retention in neurodiverse learners."
                        }
                    ].map((paper, idx) => (
                        <motion.a
                            key={idx}
                            href={paper.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ y: -5, backgroundColor: "rgba(255,255,255,0.03)" }}
                            className="group bg-slate-900/40 backdrop-blur-md border border-white/5 rounded-2xl p-6 flex flex-col justify-between transition-all hover:border-blue-500/30"
                        >
                            <div>
                                <div className="flex justify-between items-start mb-4">
                                    <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">{paper.source}</span>
                                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
                                </div>
                                <h4 className="text-white font-bold mb-3 line-clamp-2 leading-snug group-hover:text-blue-300 transition-colors">{paper.title}</h4>
                                <p className="text-slate-400 text-sm leading-relaxed">{paper.desc}</p>
                            </div>
                        </motion.a>
                    ))}
                </div>

                <div className="mt-8 p-6 bg-blue-500/5 border border-blue-500/10 rounded-2xl text-center">
                    <p className="text-blue-300/80 text-sm italic">
                        "Technology-assisted interventions are most effective when they provide clear visual structure and immediate feedback."
                    </p>
                </div>
            </motion.div>

            {/* Footer */}
            <motion.div variants={itemVariants} className="mt-8 text-center text-slate-600 text-sm relative z-10">
                <p>© 2026 Visual Math Learning Portal · Amrita School of Computing</p>
            </motion.div>

        </motion.div>
    );
};

export default AboutPage;
