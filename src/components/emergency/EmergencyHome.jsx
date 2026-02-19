import { useState } from "react";
import { emergencyData } from "../../data/emergencyData";
import EmergencyCard from "./EmergencyCard";
import { motion, useReducedMotion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function EmergencyHome() {
  const navigate = useNavigate();
  const reduceMotion = useReducedMotion();
  const [filter, setFilter] = useState("all");

  const onSelect = (emergency) => {
    navigate(`/emergency/${emergency.id}`);
  };

  const filteredData =
    filter === "all"
      ? emergencyData
      : emergencyData.filter(
        (e) => e.severity?.toLowerCase() === filter
      );

  return (
    <div className="w-full">
      {/* Header Section */}
      <div className="text-center mb-12 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-red-500/50 to-transparent"></div>

        <div className="inline-block mb-4 px-4 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 font-bold text-xs uppercase tracking-[0.2em] shadow-[0_0_15px_rgba(239,68,68,0.2)]">
          Lab 1 System
        </div>

        <motion.h1
          initial={reduceMotion ? false : { opacity: 0, y: -20 }}
          animate={reduceMotion ? false : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-6xl font-black tracking-tight mb-4 text-white drop-shadow-lg"
        >
          <span className="text-slate-100">Emergency</span> <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-amber-400">Awareness</span>
        </motion.h1>

        <motion.p
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={reduceMotion ? false : { opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-slate-400 max-w-2xl mx-auto"
        >
          Select an emergency type below to follow simple, safe, and autism-friendly instructions.
        </motion.p>
      </div>

      {/* Filter Tabs */}
      <div className="flex justify-center mb-12">
        <div className="bg-slate-900/60 p-1.5 rounded-full backdrop-blur-md border border-white/10 flex flex-wrap justify-center gap-1 sm:gap-2 shadow-xl">
          {["all", "high", "medium", "low"].map((level) => (
            <button
              key={level}
              onClick={() => setFilter(level)}
              className={`
                relative px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300
                focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-900
                ${filter === level
                  ? "text-white shadow-lg bg-gradient-to-r from-blue-600 to-indigo-600 scale-105"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
                }
              `}
            >
              {level === "all" ? "All" : `${level.charAt(0).toUpperCase() + level.slice(1)} Risk`}
            </button>
          ))}
        </div>
      </div>

      {/* Cards Grid */}
      <motion.div
        key={filter}
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 },
          },
        }}
        className="
          grid gap-8
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-3
          auto-rows-fr
        "
      >
        {filteredData.map((e) => (
          <motion.div
            key={e.id}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <EmergencyCard data={e} onClick={() => onSelect(e)} />
          </motion.div>
        ))}
      </motion.div>

      {/* Empty State */}
      {filteredData.length === 0 && (
        <div className="text-center py-20">
          <p className="text-xl text-slate-500 font-medium">
            No emergencies found for this risk level.
          </p>
        </div>
      )}
    </div>
  );
}
