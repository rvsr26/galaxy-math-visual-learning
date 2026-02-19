import { motion, useReducedMotion } from "framer-motion";

export default function EmergencyCard({ data, onClick }) {
  const reduceMotion = useReducedMotion();

  const severityMap = {
    high: {
      gradient: "from-red-500/20 to-red-900/20",
      badge: "bg-red-500/20 text-red-300 border-red-500/30",
      iconBg: "bg-red-500/20 text-red-400",
      border: "border-red-500/30",
      shadow: "shadow-red-900/20"
    },
    medium: {
      gradient: "from-amber-500/20 to-amber-900/20",
      badge: "bg-amber-500/20 text-amber-300 border-amber-500/30",
      iconBg: "bg-amber-500/20 text-amber-400",
      border: "border-amber-500/30",
      shadow: "shadow-amber-900/20"
    },
    low: {
      gradient: "from-emerald-500/20 to-emerald-900/20",
      badge: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
      iconBg: "bg-emerald-500/20 text-emerald-400",
      border: "border-emerald-500/30",
      shadow: "shadow-emerald-900/20"
    },
  };

  const style = severityMap[data.severity?.toLowerCase()] || severityMap.low;

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
        bg-slate-900/60 backdrop-blur-xl
        border ${style.border}
        shadow-xl ${style.shadow}
        hover:bg-slate-800/80 hover:shadow-2xl hover:border-white/20
        focus:outline-none focus:ring-4 focus:ring-blue-500/50
        transition-all duration-300
        cursor-pointer
      `}
    >
      <div className={`absolute inset-0 rounded-[2rem] bg-gradient-to-br ${style.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

      {/* Severity Badge */}
      <span
        className={`
          relative z-10
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
          relative z-10
          mb-6 p-6 rounded-full 
          text-5xl shadow-lg
          ${style.iconBg}
          group-hover:scale-110 transition-transform duration-300
        `}
      >
        {data.icon}
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col justify-between w-full">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2 font-display tracking-tight">
            {data.title}
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed px-2">
            Click to see immediate safety steps and instructions.
          </p>
        </div>

        {/* Emergency Number */}
        <div className="mt-6 pt-6 border-t border-white/5 w-full">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Emergency No.</p>
          <p className="text-xl font-bold text-white">{data.emergencyNumber ?? "N/A"}</p>
        </div>
      </div>
    </motion.div>
  );
}
