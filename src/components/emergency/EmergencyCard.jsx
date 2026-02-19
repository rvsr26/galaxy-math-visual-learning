import { motion, useReducedMotion } from "framer-motion";

export default function EmergencyCard({ data, onClick }) {
  const reduceMotion = useReducedMotion();

  const severityMap = {
    high: {
      gradient: "from-red-500/10 to-red-500/5",
      badge: "bg-red-100 text-red-700 border-red-200",
      iconBg: "bg-red-100 text-red-600",
      border: "border-red-200/50"
    },
    medium: {
      gradient: "from-amber-500/10 to-amber-500/5",
      badge: "bg-amber-100 text-amber-700 border-amber-200",
      iconBg: "bg-amber-100 text-amber-600",
      border: "border-amber-200/50"
    },
    low: {
      gradient: "from-emerald-500/10 to-emerald-500/5",
      badge: "bg-emerald-100 text-emerald-700 border-emerald-200",
      iconBg: "bg-emerald-100 text-emerald-600",
      border: "border-emerald-200/50"
    },
  };

  const style = severityMap[data.severity] || severityMap.low;

  return (
    <motion.div
      role="button"
      tabIndex={0}
      aria-label={`Open ${data.title} emergency instructions`}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onClick();
      }}
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      animate={reduceMotion ? false : { opacity: 1, y: 0 }}
      whileHover={reduceMotion ? {} : { y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.3 }}
      className={`
        group relative h-full
        flex flex-col items-center text-center
        p-8 rounded-[2rem]
        glass-card
        hover:shadow-2xl hover:bg-white/90
        focus:outline-none focus:ring-4 focus:ring-blue-500/20
        transition-all duration-300
        ${style.border}
      `}
    >

      {/* Severity Badge */}
      <span
        className={`
          absolute top-6 right-6 px-3 py-1 rounded-full
          text-xs font-bold tracking-wide uppercase border
          ${style.badge}
        `}
      >
        {data.severity} Risk
      </span>

      {/* Icon Circle */}
      <div
        className={`
          mb-6 p-6 rounded-full 
          text-5xl shadow-sm
          ${style.iconBg}
          group-hover:scale-110 transition-transform duration-300
        `}
      >
        {data.icon}
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-between w-full">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2 font-display">
            {data.title}
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed px-2">
            Click to see immediate safety steps and instructions.
          </p>
        </div>

        {/* Emergency Number */}
        <div className="mt-6 pt-6 border-t border-gray-100 w-full">
          <p className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-1">Emergency No.</p>
          <p className="text-xl font-bold text-gray-800">{data.emergencyNumber ?? "N/A"}</p>
        </div>
      </div>

      {/* Hover visual cue */}
      <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-b-[2rem]" />
    </motion.div>
  );
}
