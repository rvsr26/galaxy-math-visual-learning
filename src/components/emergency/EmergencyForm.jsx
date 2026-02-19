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
                className="max-w-2xl mx-auto p-6"
            >
                <div className="glass rounded-3xl p-8 sm:p-10 shadow-xl border border-white/50">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                        Incident Report
                    </h2>
                    <p className="text-gray-600 text-center mb-8">
                        You have dialed emergency services. If safe to do so, please provide additional details to help us assist you better.
                    </p>

                    <form onSubmit={this.handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                Your Name (Optional)
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={name}
                                onChange={this.handleChange}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white/50 backdrop-blur-sm"
                                placeholder="Enter your name"
                            />
                        </div>

                        <div>
                            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                                Current Location
                            </label>
                            <input
                                type="text"
                                id="location"
                                name="location"
                                value={location}
                                onChange={this.handleChange}
                                required
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white/50 backdrop-blur-sm"
                                placeholder="e.g., Central Park, Main St."
                            />
                        </div>

                        <div>
                            <label htmlFor="details" className="block text-sm font-medium text-gray-700 mb-2">
                                Incident Details
                            </label>
                            <textarea
                                id="details"
                                name="details"
                                value={details}
                                onChange={this.handleChange}
                                rows="4"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white/50 backdrop-blur-sm resize-none"
                                placeholder="Describe what happened..."
                            />
                        </div>

                        <div className="flex gap-4 pt-4">
                            <button
                                type="button"
                                onClick={() => navigate("/emergency")}
                                className="flex-1 px-6 py-3 rounded-xl font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
                            >
                                Skip
                            </button>
                            <button
                                type="submit"
                                className="flex-1 px-6 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-lg hover:-translate-y-0.5 transition-all"
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
