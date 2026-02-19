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
      <div className="text-center mb-12">
        <motion.h1
          initial={reduceMotion ? false : { opacity: 0, y: -20 }}
          animate={reduceMotion ? false : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4"
        >
          <span className="text-gradient">Unknown Emergency?</span>
          <br className="hidden sm:block" />
          <span className="text-gray-800"> We're here to help.</span>
        </motion.h1>

        <motion.p
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={reduceMotion ? false : { opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-gray-500 max-w-2xl mx-auto"
        >
          Select an emergency type below to follow simple, autism-friendly safety steps.
        </motion.p>
      </div>

      {/* Filter Tabs */}
      <div className="flex justify-center mb-12">
        <div className="bg-white/40 p-1.5 rounded-full backdrop-blur-md border border-white/40 shadow-sm flex flex-wrap justify-center gap-1 sm:gap-2">
          {["all", "high", "medium", "low"].map((level) => (
            <button
              key={level}
              onClick={() => setFilter(level)}
              className={`
                relative px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300
                focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-transparent
                ${filter === level
                  ? "text-white shadow-md bg-gradient-to-r from-blue-500 to-indigo-600"
                  : "text-gray-600 hover:text-gray-900 hover:bg-white/60"
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
          <p className="text-xl text-gray-400 font-medium">
            No emergencies found for this risk level.
          </p>
        </div>
      )}
    </div>
  );
}
