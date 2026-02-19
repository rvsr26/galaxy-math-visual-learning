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
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-2xl mx-auto p-4"
            >
                <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-3xl p-8 sm:p-12 shadow-2xl">
                    <h2 className="text-3xl font-bold text-white mb-6 text-center">
                        Complaint Form
                    </h2>
                    <p className="text-slate-400 text-center mb-10 max-w-lg mx-auto">
                        We value your feedback. Please use this form to submit a complaint or report an issue. For medical emergencies, call emergency services.
                    </p>

                    <form onSubmit={this.handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-bold text-slate-300 mb-2 uppercase tracking-wide">
                                Your Name (Optional)
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={name}
                                onChange={this.handleChange}
                                className="w-full px-5 py-4 rounded-xl bg-slate-800/50 border border-slate-700 text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all shadow-inner"
                                placeholder="Enter your name"
                            />
                        </div>

                        <div>
                            <label htmlFor="location" className="block text-sm font-bold text-slate-300 mb-2 uppercase tracking-wide">
                                Current Location
                            </label>
                            <input
                                type="text"
                                id="location"
                                name="location"
                                value={location}
                                onChange={this.handleChange}
                                required
                                className="w-full px-5 py-4 rounded-xl bg-slate-800/50 border border-slate-700 text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all shadow-inner"
                                placeholder="e.g., Central Park, Main St."
                            />
                        </div>

                        <div>
                            <label htmlFor="details" className="block text-sm font-bold text-slate-300 mb-2 uppercase tracking-wide">
                                Incident Details
                            </label>
                            <textarea
                                id="details"
                                name="details"
                                value={details}
                                onChange={this.handleChange}
                                rows="4"
                                className="w-full px-5 py-4 rounded-xl bg-slate-800/50 border border-slate-700 text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all shadow-inner resize-none"
                                placeholder="Describe what happened..."
                            />
                        </div>

                        <div className="flex gap-4 pt-6">
                            <button
                                type="button"
                                onClick={() => navigate("/emergency")}
                                className="flex-1 px-6 py-4 rounded-xl font-bold text-slate-400 bg-slate-800 hover:bg-slate-700 hover:text-white transition-colors border border-white/5"
                            >
                                Skip
                            </button>
                            <button
                                type="submit"
                                className="flex-1 px-6 py-4 rounded-xl font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-lg hover:shadow-blue-500/20 hover:-translate-y-0.5 transition-all text-lg"
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
