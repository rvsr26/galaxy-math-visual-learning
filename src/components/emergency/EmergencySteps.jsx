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
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-gray-800">Emergency not found</h2>
        <button
          onClick={() => navigate("/emergency")}
          className="mt-4 text-blue-600 hover:text-blue-800 underline"
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
      className="max-w-3xl mx-auto"
    >
      <div className="glass rounded-[2.5rem] p-8 sm:p-12 relative overflow-hidden">

        {/* Back Button */}
        <button
          onClick={() => navigate("/emergency")}
          className="
            absolute top-8 left-8
            text-blue-600 font-semibold hover:text-blue-800 
            transition-colors flex items-center gap-2
          "
        >
          <span className="text-xl">←</span> Back
        </button>

        {/* Title Area */}
        <div className="text-center mt-8 mb-8">
          <div className="text-6xl mb-4 filter drop-shadow-md">{emergency.icon}</div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 font-display">
            {emergency.title}
          </h2>

          {/* Emergency Number */}
          <div className="inline-flex items-center gap-2 mt-4 px-5 py-2 rounded-full bg-red-50 text-red-600 border border-red-100 font-bold shadow-sm">
            <span>📞 Emergency ID:</span>
            <span className="text-xl">{emergency.emergencyNumber}</span>
          </div>
        </div>

        {/* Calm Tip */}
        {emergency.calmTip && (
          <div className="mb-8 p-4 rounded-2xl bg-blue-50/80 border border-blue-100 text-blue-800 text-center font-medium">
            💙 {emergency.calmTip}
          </div>
        )}

        {/* Focus Step Card */}
        <div className="relative z-10 bg-white/60 backdrop-blur-xl border border-white/60 rounded-3xl p-8 sm:p-10 shadow-lg mb-10 text-center">
          <div className="text-sm font-bold tracking-widest text-gray-400 uppercase mb-4">
            Step {stepIndex + 1} of {emergency.steps.length}
          </div>

          <p className="text-2xl sm:text-3xl font-bold text-gray-800 mb-8 leading-tight">
            {emergency.steps[stepIndex]}
          </p>

          <div className="flex justify-center items-center gap-4 flex-wrap">
            <button
              onClick={prevStep}
              disabled={stepIndex === 0}
              className="
                px-6 py-3 rounded-xl font-semibold transition-all
                disabled:opacity-30 disabled:cursor-not-allowed
                bg-gray-100 hover:bg-gray-200 text-gray-600
              "
            >
              Previous
            </button>

            <button
              onClick={() => speak(emergency.steps[stepIndex])}
              className="
                px-8 py-4 rounded-xl font-bold text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all
                bg-gradient-to-r from-blue-500 to-indigo-600
              "
            >
              🔊 Read Aloud
            </button>

            <button
              onClick={nextStep}
              disabled={stepIndex === emergency.steps.length - 1}
              className="
                px-6 py-3 rounded-xl font-semibold transition-all
                disabled:opacity-30 disabled:cursor-not-allowed
                bg-emerald-500 hover:bg-emerald-600 text-white shadow-md hover:shadow-lg
              "
            >
              Next Step
            </button>
          </div>
        </div>

        {/* Do & Don’t Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* DO */}
          <div className="bg-emerald-50/50 border border-emerald-100 p-6 rounded-3xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg text-emerald-800 flex items-center gap-2">
                <span className="text-xl">✅</span>  Do This
              </h3>
              <button
                onClick={speakDos}
                className="p-2 rounded-full bg-emerald-100 text-emerald-700 hover:bg-emerald-200 transition"
                aria-label="Read Do's"
              >
                🔊
              </button>
            </div>
            <ul className="space-y-3">
              {emergency.do?.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-emerald-900/80">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* DON’T */}
          <div className="bg-red-50/50 border border-red-100 p-6 rounded-3xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg text-red-800 flex items-center gap-2">
                <span className="text-xl">❌</span> Avoid This
              </h3>
              <button
                onClick={speakDonts}
                className="p-2 rounded-full bg-red-100 text-red-700 hover:bg-red-200 transition"
                aria-label="Read Don'ts"
              >
                🔊
              </button>
            </div>
            <ul className="space-y-3">
              {emergency.dont?.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-red-900/80">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Call Action */}
        <div className="mt-10">
          <button
            onClick={() => {
              window.location.href = `tel:${emergency.emergencyNumber}`;
              navigate("/report");
            }}
            className="
              w-full py-5 rounded-2xl
              bg-red-600 text-white text-xl font-bold tracking-wide
              shadow-lg shadow-red-500/30
              hover:bg-red-700 hover:shadow-xl hover:-translate-y-1
              transition-all duration-300
              flex items-center justify-center gap-3
            "
          >
            <span className="text-2xl animate-pulse">📞</span>
            Call Emergency Now
          </button>
        </div>

      </div>
    </motion.div>
  );
}
