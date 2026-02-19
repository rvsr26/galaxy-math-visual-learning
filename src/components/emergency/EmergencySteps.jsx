import { motion, useReducedMotion } from "framer-motion";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { emergencyData } from "../../data/emergencyData";

/* ---------- Speech Utility ---------- */
function speak(text) {
  window.speechSynthesis.cancel();
  const msg = new SpeechSynthesisUtterance(text);
  msg.rate = 0.9;   // slightly faster, more natural
  msg.pitch = 1;
  window.speechSynthesis.speak(msg);
}

export default function EmergencySteps() {
  const { id } = useParams();
  const navigate = useNavigate();
  const reduceMotion = useReducedMotion();
  const [stepIndex, setStepIndex] = useState(0);

  const emergency = emergencyData.find((e) => e.id.toString() === id);

  if (!emergency) {
    return (
      <div className="text-center py-20 text-white">
        <h2 className="text-2xl font-bold mb-4">Emergency not found</h2>
        <button
          onClick={() => navigate("/emergency")}
          className="text-blue-400 hover:text-blue-300 underline"
        >
          Return Home
        </button>
      </div>
    );
  }

  /* ---------- Auto Voice Intro ---------- */
  useEffect(() => {
    if (emergency.voiceIntro) {
      speak(emergency.voiceIntro);
    }
  }, [emergency]);

  /* ---------- Step Navigation ---------- */
  const nextStep = () => {
    if (stepIndex < emergency.steps.length - 1) {
      setStepIndex(stepIndex + 1);
      speak(emergency.steps[stepIndex + 1]);
    }
  };

  const prevStep = () => {
    if (stepIndex > 0) {
      setStepIndex(stepIndex - 1);
      speak(emergency.steps[stepIndex - 1]);
    }
  };

  /* ---------- Read Do's ---------- */
  const speakDos = () => {
    if (!emergency.do?.length) return;

    window.speechSynthesis.cancel();
    speak("Things you should do.");

    emergency.do.forEach((item, i) => {
      setTimeout(() => speak(item), 1500 * (i + 1));
    });
  };

  /* ---------- Read Don'ts ---------- */
  const speakDonts = () => {
    if (!emergency.dont?.length) return;

    window.speechSynthesis.cancel();
    speak("Things you should not do.");

    emergency.dont.forEach((item, i) => {
      setTimeout(() => speak(item), 1500 * (i + 1));
    });
  };

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, scale: 0.95 }}
      animate={reduceMotion ? false : { opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto"
    >
      <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 sm:p-12 relative overflow-hidden shadow-2xl">

        {/* Back Button */}
        <button
          onClick={() => navigate("/emergency")}
          className="
            absolute top-8 left-8
            px-4 py-2 rounded-xl bg-slate-800/50 hover:bg-slate-700
            text-slate-300 hover:text-white font-bold 
            transition-all border border-white/5 flex items-center gap-2
          "
        >
          <span className="text-xl">←</span> Back
        </button>

        {/* Title Area */}
        <div className="text-center mt-12 mb-10">
          <div className="text-7xl mb-6 filter drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">{emergency.icon}</div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-6">
            {emergency.title}
          </h2>

          {/* Emergency Number */}
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-red-500/10 text-red-400 border border-red-500/20 font-bold shadow-lg shadow-red-900/10">
            <span>📞 Emergency ID:</span>
            <span className="text-2xl text-red-300">{emergency.emergencyNumber}</span>
          </div>
        </div>

        {/* Calm Tip */}
        {emergency.calmTip && (
          <div className="mb-10 p-5 rounded-2xl bg-blue-500/10 border border-blue-400/20 text-blue-200 text-center font-medium text-lg shadow-inner">
            💙 {emergency.calmTip}
          </div>
        )}

        {/* Focus Step Card */}
        <div className="relative z-10 bg-slate-800/50 backdrop-blur-md border border-white/10 rounded-3xl p-8 sm:p-12 shadow-xl mb-12 text-center">
          <div className="text-sm font-bold tracking-widest text-slate-500 uppercase mb-6">
            Step {stepIndex + 1} of {emergency.steps.length}
          </div>

          <p className="text-2xl sm:text-4xl font-bold text-white mb-10 leading-snug">
            {emergency.steps[stepIndex]}
          </p>

          <div className="flex justify-center items-center gap-4 flex-wrap">
            <button
              onClick={prevStep}
              disabled={stepIndex === 0}
              className="
                px-6 py-4 rounded-xl font-bold transition-all
                disabled:opacity-30 disabled:cursor-not-allowed
                bg-slate-700 hover:bg-slate-600 text-slate-200 border border-white/5
              "
            >
              Previous
            </button>

            <button
              onClick={() => speak(emergency.steps[stepIndex])}
              className="
                px-8 py-4 rounded-xl font-bold text-white shadow-lg hover:shadow-cyan-500/20 hover:-translate-y-1 transition-all
                bg-gradient-to-r from-cyan-500 to-blue-600 border border-white/20 flex items-center gap-2
              "
            >
              <span className="text-xl">🔊</span> Read Aloud
            </button>

            <button
              onClick={nextStep}
              disabled={stepIndex === emergency.steps.length - 1}
              className="
                px-6 py-4 rounded-xl font-bold transition-all
                disabled:opacity-30 disabled:cursor-not-allowed
                bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg border border-white/10
              "
            >
              Next Step
            </button>
          </div>
        </div>

        {/* Do & Don’t Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* DO */}
          <div className="bg-emerald-500/5 border border-emerald-500/10 p-8 rounded-3xl hover:bg-emerald-500/10 transition-colors">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-xl text-emerald-400 flex items-center gap-3">
                <span className="text-2xl">✅</span>  Do This
              </h3>
              <button
                onClick={speakDos}
                className="p-3 rounded-full bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 transition shadow-sm"
                aria-label="Read Do's"
              >
                🔊
              </button>
            </div>
            <ul className="space-y-4">
              {emergency.do?.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-300 text-lg">
                  <span className="mt-2 w-2 h-2 rounded-full bg-emerald-400 shrink-0 shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* DON’T */}
          <div className="bg-red-500/5 border border-red-500/10 p-8 rounded-3xl hover:bg-red-500/10 transition-colors">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-xl text-red-400 flex items-center gap-3">
                <span className="text-2xl">❌</span> Avoid This
              </h3>
              <button
                onClick={speakDonts}
                className="p-3 rounded-full bg-red-500/20 text-red-400 hover:bg-red-500/30 transition shadow-sm"
                aria-label="Read Don'ts"
              >
                🔊
              </button>
            </div>
            <ul className="space-y-4">
              {emergency.dont?.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-300 text-lg">
                  <span className="mt-2 w-2 h-2 rounded-full bg-red-400 shrink-0 shadow-[0_0_8px_rgba(248,113,113,0.6)]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Call Action */}
        {/* Actions Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Call Button */}
          <button
            onClick={() => {
              window.location.href = `tel:${emergency.emergencyNumber}`;
            }}
            className="
              w-full py-6 rounded-2xl
              bg-gradient-to-r from-red-600 to-red-700 text-white text-xl sm:text-2xl font-black tracking-wide
              shadow-lg shadow-red-900/30 border border-white/10
              hover:from-red-500 hover:to-red-600 hover:shadow-2xl hover:shadow-red-900/50 hover:-translate-y-1
              transition-all duration-300
              flex items-center justify-center gap-3
            "
          >
            <span className="text-3xl animate-pulse">📞</span>
            <span>Call Emergency</span>
          </button>

          {/* Complaint/Report Button */}
          <button
            onClick={() => navigate("/emergency/report")}
            className="
              w-full py-6 rounded-2xl
              bg-gradient-to-r from-slate-700 to-slate-800 text-white text-xl sm:text-2xl font-black tracking-wide
              shadow-lg shadow-slate-900/30 border border-white/10
              hover:from-slate-600 hover:to-slate-700 hover:shadow-2xl hover:-translate-y-1
              transition-all duration-300
              flex items-center justify-center gap-3
            "
          >
            <span className="text-3xl">📝</span>
            <span>Submit Complaint</span>
          </button>

        </div>

      </div>
    </motion.div>
  );
}
