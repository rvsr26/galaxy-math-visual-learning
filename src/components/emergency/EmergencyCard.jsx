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
      whileHover={reduceMotion ? {} : { y: -5, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
      className={`
        group relative h-full
        flex flex-col items-center text-center
        p-6 rounded-[1.5rem]
        bg-white border border-slate-200
        shadow-md shadow-slate-200/50
        hover:shadow-lg hover:border-blue-200
        focus:outline-none focus:ring-4 focus:ring-blue-100
        transition-all duration-300
        cursor-pointer overflow-hidden
      `}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${style.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-500`} />

      {/* Severity Badge */}
      <span
        className={`
          relative z-10
          mb-4 px-2.5 py-0.5 rounded-full
          text-[10px] font-black tracking-widest uppercase border
          ${style.badge.replace('/20', '/10').replace('text-red-300', 'text-red-600').replace('text-amber-300', 'text-amber-600').replace('text-emerald-300', 'text-emerald-600')}
        `}
      >
        {data.severity} Risk
      </span>

      {/* Icon Circle - Smaller and more refined */}
      <div
        className={`
          relative z-10
          mb-4 p-4 rounded-2xl 
          text-4xl
          ${style.iconBg.replace('/20', '/10').replace('text-red-400', 'text-red-500').replace('text-amber-400', 'text-amber-500').replace('text-emerald-400', 'text-emerald-500')}
          group-hover:scale-110 transition-transform duration-500
        `}
      >
        {data.icon}
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col justify-between w-full">
        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-1 font-display tracking-tight leading-none group-hover:text-blue-600 transition-colors">
            {data.title}
          </h2>
          <p className="text-slate-500 text-[13px] leading-relaxed px-1">
            Simple steps for {data.title.toLowerCase()}.
          </p>
        </div>

        {/* Emergency Number - Cleaner */}
        <div className="mt-4 pt-4 border-t border-slate-100 w-full">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Contact No.</p>
          <p className="text-lg font-black text-slate-900">{data.emergencyNumber ?? "N/A"}</p>
        </div>
      </div>
    </motion.div>
  );
}
