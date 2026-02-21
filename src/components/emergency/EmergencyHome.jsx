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
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-blue-200 to-transparent"></div>

        <div className="inline-block mb-4 px-4 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 font-bold text-xs uppercase tracking-widest shadow-sm">
          Lab 1: Safety System
        </div>

        <motion.h1
          initial={reduceMotion ? false : { opacity: 0, y: -20 }}
          animate={reduceMotion ? false : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl font-black tracking-tight mb-4 text-slate-900"
        >
          Emergency <span className="text-blue-600">Awareness</span>
        </motion.h1>

        <motion.p
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={reduceMotion ? false : { opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-slate-500 max-w-2xl mx-auto font-medium"
        >
          Stay safe and calm. Select an emergency below to see clear, easy-to-follow instructions.
        </motion.p>
      </div>

      {/* Filter Tabs - Light Mode Refinement */}
      <div className="flex justify-center mb-12">
        <div className="bg-white p-1.5 rounded-2xl border border-slate-200 flex flex-wrap justify-center gap-1 shadow-sm">
          {["all", "high", "medium", "low"].map((level) => (
            <button
              key={level}
              onClick={() => setFilter(level)}
              className={`
                relative px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300
                focus:outline-none focus:ring-2 focus:ring-blue-200
                ${filter === level
                  ? "text-white shadow-md bg-blue-600"
                  : "text-slate-400 hover:text-slate-600 hover:bg-slate-50"
                }
              `}
            >
              {level === "all" ? "All Levels" : `${level} Risk`}
            </button>
          ))}
        </div>
      </div>

      {/* Cards Grid - Tighter Layout */}
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
          grid gap-6
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
              hidden: { opacity: 0, y: 15 },
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
          <p className="text-xl text-slate-400 font-bold">
            No items found in this category.
          </p>
        </div>
      )}
    </div>
  );
}
