import { Component } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

class EmergencyFormInternal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            location: "",
            details: "",
        };
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted:", this.state);
        // Here you would typically send data to a backend
        alert("Report submitted successfully. Stay safe!");
        this.props.navigate("/emergency");
    };

    render() {
        const { name, location, details } = this.state;
        const { navigate } = this.props;

        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="max-w-xl mx-auto p-4"
            >
                <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xl shadow-slate-200/50 relative overflow-hidden">

                    {/* Tiny decorative accent */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-1 bg-blue-100 rounded-b-full"></div>

                    <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-4 text-center tracking-tight">
                        Safety Feedback
                    </h2>
                    <p className="text-slate-500 text-center mb-8 max-w-md mx-auto text-sm font-medium leading-relaxed">
                        Notice something? Share your thoughts to help us keep everyone safe. For immediate danger, please use the emergency call button.
                    </p>

                    <form onSubmit={this.handleSubmit} className="space-y-5">
                        <div className="group">
                            <label htmlFor="name" className="block text-[10px] font-black text-slate-400 mb-1.5 uppercase tracking-widest group-focus-within:text-blue-600 transition-colors">
                                Your Name (Optional)
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={name}
                                onChange={this.handleChange}
                                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all text-sm font-medium"
                                placeholder="Helping hand"
                            />
                        </div>

                        <div className="group">
                            <label htmlFor="location" className="block text-[10px] font-black text-slate-400 mb-1.5 uppercase tracking-widest group-focus-within:text-blue-600 transition-colors">
                                Location / Context
                            </label>
                            <input
                                type="text"
                                id="location"
                                name="location"
                                value={location}
                                onChange={this.handleChange}
                                required
                                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all text-sm font-medium"
                                placeholder="e.g., Near the entrance, Park bench..."
                            />
                        </div>

                        <div className="group">
                            <label htmlFor="details" className="block text-[10px] font-black text-slate-400 mb-1.5 uppercase tracking-widest group-focus-within:text-blue-600 transition-colors">
                                What's on your mind?
                            </label>
                            <textarea
                                id="details"
                                name="details"
                                value={details}
                                onChange={this.handleChange}
                                rows="3"
                                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all text-sm font-medium resize-none leading-relaxed"
                                placeholder="Describe the situation as clearly as you can..."
                            />
                        </div>

                        <div className="flex gap-3 pt-4">
                            <button
                                type="button"
                                onClick={() => navigate("/emergency")}
                                className="flex-1 px-5 py-3.5 rounded-xl font-bold text-slate-500 bg-white hover:bg-slate-50 transition-all border border-slate-200 text-sm shadow-sm"
                            >
                                Back
                            </button>
                            <button
                                type="submit"
                                className="flex-[2] px-6 py-3.5 rounded-xl font-black text-white bg-blue-600 hover:bg-blue-500 shadow-md shadow-blue-100 hover:shadow-lg hover:-translate-y-0.5 transition-all text-sm uppercase tracking-wider"
                            >
                                Submit Report
                            </button>
                        </div>
                    </form>
                </div>
            </motion.div>
        );
    }
}

export default function EmergencyForm() {
    const navigate = useNavigate();
    return <EmergencyFormInternal navigate={navigate} />;
}
