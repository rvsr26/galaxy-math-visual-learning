import { motion, useReducedMotion } from "framer-motion";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { emergencyData } from "../../data/emergencyData";
import SafetyDemoOverlay from "./SafetyDemoOverlay";

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
  const [showDemo, setShowDemo] = useState(false);

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
      initial={reduceMotion ? false : { opacity: 0, y: 10 }}
      animate={reduceMotion ? false : { opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-3xl mx-auto px-4"
    >
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-lg">

        {/* Back Button */}
        <button
          onClick={() => navigate("/emergency")}
          className="
            absolute top-5 left-5
            px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100
            text-slate-500 hover:text-slate-900 font-bold text-[11px] uppercase tracking-wider
            transition-all border border-slate-200 flex items-center gap-1.5
          "
        >
          <span>←</span> Back
        </button>

        {/* Title Area */}
        <div className="text-center mt-10 mb-6">
          <div className="text-5xl mb-3 grayscale-[0.2]">{emergency.icon}</div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-3">
            {emergency.title}
          </h2>

          {/* Emergency Number */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-red-50 text-red-600 border border-red-100 font-black text-xs">
            <span>📞 HELP ID:</span>
            <span className="text-base">{emergency.emergencyNumber}</span>
          </div>
        </div>

        {/* Calm Tip */}
        {emergency.calmTip && (
          <div className="mb-6 mx-auto max-w-lg p-3 rounded-xl bg-blue-50 border border-blue-100 text-blue-700 text-center font-bold text-sm">
            💙 {emergency.calmTip}
          </div>
        )}

        {/* Focus Step Card - Ultra Clean */}
        <div className="relative z-10 bg-slate-50 border border-slate-200 rounded-2xl p-5 sm:p-8 shadow-sm mb-8 text-center">
          <div className="text-[10px] font-black tracking-widest text-slate-400 uppercase mb-3">
            Instruction {stepIndex + 1} of {emergency.steps.length}
          </div>

          {/* Step Visual Aid */}
          {emergency.stepImages && emergency.stepImages[stepIndex] && (
            <motion.div
              key={stepIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="mb-6 w-full aspect-video rounded-xl overflow-hidden shadow-md border-4 border-white"
            >
              <img
                src={emergency.stepImages[stepIndex]}
                alt={`Visual aid for: ${emergency.steps[stepIndex]}`}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          )}

          <p className="text-lg sm:text-2xl font-bold text-slate-900 mb-6 leading-snug">
            {emergency.steps[stepIndex]}
          </p>

          <div className="flex justify-center items-center gap-2 flex-wrap">
            <button
              onClick={prevStep}
              disabled={stepIndex === 0}
              className="
                px-4 py-2.5 rounded-lg font-bold transition-all text-xs
                disabled:opacity-20 disabled:cursor-not-allowed
                bg-white hover:bg-slate-50 text-slate-500 border border-slate-200
              "
            >
              Prev
            </button>

            <button
              onClick={() => speak(emergency.steps[stepIndex])}
              className="
                px-5 py-2.5 rounded-lg font-bold text-white shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all text-xs
                bg-blue-600 border border-blue-500 flex items-center gap-2
              "
            >
              <span>🔊</span> Listen
            </button>

            <button
              onClick={() => setShowDemo(true)}
              className="
                px-5 py-2.5 rounded-lg font-bold text-slate-700 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all text-xs
                bg-white border border-slate-200 flex items-center gap-2 group
              "
            >
              <span className="text-blue-600 group-hover:scale-125 transition-transform">▶</span> Watch Demo
            </button>

            <button
              onClick={nextStep}
              disabled={stepIndex === emergency.steps.length - 1}
              className="
                px-4 py-2.5 rounded-lg font-bold transition-all text-xs
                disabled:opacity-20 disabled:cursor-not-allowed
                bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm border border-emerald-500
              "
            >
              Next Step
            </button>
          </div>
        </div>

        {/* Do & Don’t Grid - Tiny & Clean */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* DO */}
          <div className="bg-emerald-50/50 border border-emerald-100 p-4 rounded-xl">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-black text-[10px] text-emerald-700 uppercase tracking-widest flex items-center gap-1.5">
                <span>✅</span> Good Choice
              </h3>
              <button
                onClick={speakDos}
                className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 hover:bg-emerald-200 transition flex items-center justify-center text-[10px]"
              >
                🔊
              </button>
            </div>
            <ul className="space-y-2">
              {emergency.do?.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-slate-700 text-[13px] leading-tight">
                  <div className="mt-1.5 w-1 h-1 rounded-full bg-emerald-500 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* DON’T */}
          <div className="bg-red-50/50 border border-red-100 p-4 rounded-xl">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-black text-[10px] text-red-700 uppercase tracking-widest flex items-center gap-1.5">
                <span>❌</span> Not Safe
              </h3>
              <button
                onClick={speakDonts}
                className="w-6 h-6 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition flex items-center justify-center text-[10px]"
              >
                🔊
              </button>
            </div>
            <ul className="space-y-2">
              {emergency.dont?.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-slate-700 text-[13px] leading-tight">
                  <div className="mt-1.5 w-1 h-1 rounded-full bg-red-500 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Call Action - Compact */}
        <div className="mt-6 flex flex-col sm:flex-row gap-2">
          <button
            onClick={() => {
              window.location.href = `tel:${emergency.emergencyNumber}`;
            }}
            className="
              flex-1 py-3 rounded-xl
              bg-red-600 text-white text-base font-black tracking-tight
              shadow-sm border border-red-500
              hover:bg-red-500 transition-all
              flex items-center justify-center gap-2
            "
          >
            <span>📞</span> Call Help
          </button>

          <button
            onClick={() => navigate("/emergency/report")}
            className="
              flex-1 py-3 rounded-xl
              bg-white text-slate-500 text-base font-bold
              shadow-sm border border-slate-200
              hover:bg-slate-50 transition-all
              flex items-center justify-center gap-2
            "
          >
            <span>📝</span> Send Report
          </button>
        </div>

      </div>

      {/* Advanced Visual Demo Overlay */}
      <SafetyDemoOverlay
        isOpen={showDemo}
        onClose={() => setShowDemo(false)}
        type={String(emergency.id).toLowerCase().includes('fire') ? 'fire' : (String(emergency.id).toLowerCase().includes('earthquake') ? 'earthquake' : 'fire')}
      />
    </motion.div>
  );
}
