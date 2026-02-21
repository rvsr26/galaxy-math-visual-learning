import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function SafetyProfile() {
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        fullName: "",
        bloodType: "",
        emergencyContact: "",
        contactPhone: "",
        medicalConditions: "",
        allergies: ""
    });

    useEffect(() => {
        const savedProfile = localStorage.getItem("emergency_safety_profile");
        if (savedProfile) {
            setFormData(JSON.parse(savedProfile));
        } else {
            setIsEditing(true);
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = (e) => {
        e.preventDefault();
        localStorage.setItem("emergency_safety_profile", JSON.stringify(formData));
        setIsEditing(false);
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto p-4"
        >
            <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 sm:p-12 shadow-2xl relative overflow-hidden">

                {/* Decoration */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

                <div className="flex justify-between items-center mb-10 relative z-10">
                    <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight flex items-center gap-3">
                        <span className="text-4xl">🆔</span> My Safety ID
                    </h2>
                    {!isEditing && (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-5 py-2 rounded-xl font-bold border border-white/10 transition-colors"
                        >
                            ✏️ Edit
                        </button>
                    )}
                </div>

                <AnimatePresence mode="wait">
                    {isEditing ? (
                        <motion.form
                            key="edit-form"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            onSubmit={handleSave}
                            className="space-y-6 relative z-10"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-slate-400 mb-2 uppercase tracking-wide">Full Name</label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-600 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder-slate-400 font-medium tracking-wide"
                                        placeholder="E.g. John Doe"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-400 mb-2 uppercase tracking-wide">Blood Type</label>
                                    <select
                                        name="bloodType"
                                        value={formData.bloodType}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-600 text-white focus:border-blue-500 outline-none transition-all font-medium appearance-none"
                                    >
                                        <option value="" className="text-slate-400">Select Type</option>
                                        {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(type => (
                                            <option key={type} value={type} className="text-white bg-slate-800">{type}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-slate-400 mb-2 uppercase tracking-wide">Emergency Contact</label>
                                    <input
                                        type="text"
                                        name="emergencyContact"
                                        value={formData.emergencyContact}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-600 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder-slate-400 font-medium tracking-wide"
                                        placeholder="Contact Name"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-400 mb-2 uppercase tracking-wide">Contact Phone</label>
                                    <input
                                        type="tel"
                                        name="contactPhone"
                                        value={formData.contactPhone}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-600 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder-slate-400 font-medium tracking-wide"
                                        placeholder="+1 (555) 000-0000"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-400 mb-2 uppercase tracking-wide">Medical Conditions</label>
                                <textarea
                                    name="medicalConditions"
                                    value={formData.medicalConditions}
                                    onChange={handleChange}
                                    rows="3"
                                    className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-600 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none placeholder-slate-400 resize-none font-medium tracking-wide"
                                    placeholder="List any conditions (Asthma, Diabetes, etc.)"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-400 mb-2 uppercase tracking-wide">Allergies</label>
                                <textarea
                                    name="allergies"
                                    value={formData.allergies}
                                    onChange={handleChange}
                                    rows="2"
                                    className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-600 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none placeholder-slate-400 resize-none font-medium tracking-wide"
                                    placeholder="List any allergies (Peanuts, Penicillin, etc.)"
                                />
                            </div>

                            <div className="flex gap-4 pt-4">
                                <button
                                    type="button"
                                    onClick={() => navigate('/emergency')}
                                    className="px-6 py-3 rounded-xl font-bold text-slate-400 hover:text-white transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-6 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-lg hover:shadow-blue-500/20 hover:-translate-y-0.5 transition-all"
                                >
                                    Save Safety Card
                                </button>
                            </div>
                        </motion.form>
                    ) : (
                        <motion.div
                            key="view-card"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="relative z-10"
                        >
                            {/* Digital ID Card Look */}
                            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-white/10 p-6 md:p-8 shadow-inner">
                                <div className="flex flex-col md:flex-row gap-8 items-start">
                                    <div className="w-32 h-32 rounded-2xl bg-slate-700 flex items-center justify-center text-6xl shadow-xl border border-white/5">
                                        👤
                                    </div>
                                    <div className="flex-1 space-y-6 w-full">
                                        <div>
                                            <h3 className="text-3xl font-bold text-white">{formData.fullName || "Unknown User"}</h3>
                                            <div className="inline-flex items-center gap-2 mt-2 px-3 py-1 rounded-lg bg-red-500/10 text-red-300 border border-red-500/20 text-sm font-bold">
                                                🩸 Blood Type: {formData.bloodType || "N/A"}
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="bg-slate-900/50 p-4 rounded-xl border border-white/5">
                                                <p className="text-xs font-bold text-slate-500 uppercase mb-1">Emergency Contact</p>
                                                <p className="text-lg font-bold text-blue-200">{formData.emergencyContact}</p>
                                                <a href={`tel:${formData.contactPhone}`} className="text-blue-400 text-sm font-medium hover:underline flex items-center gap-1 mt-1">
                                                    📞 {formData.contactPhone}
                                                </a>
                                            </div>
                                        </div>

                                        <div className="space-y-4 pt-4 border-t border-white/5">
                                            <div>
                                                <p className="text-xs font-bold text-slate-500 uppercase mb-2">Medical Conditions</p>
                                                <p className="text-slate-300 bg-slate-900/40 p-3 rounded-lg border border-white/5 min-h-[3rem]">
                                                    {formData.medicalConditions || "None listed"}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-slate-500 uppercase mb-2">Allergies</p>
                                                <p className="text-slate-300 bg-slate-900/40 p-3 rounded-lg border border-white/5 min-h-[3rem]">
                                                    {formData.allergies || "None listed"}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <p className="text-center text-slate-500 text-sm mt-6">
                                🔒 This information is stored locally on your device for emergency use.
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}
