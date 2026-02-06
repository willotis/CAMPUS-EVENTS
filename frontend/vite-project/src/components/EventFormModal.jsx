import { useState } from "react";

export default function EventFormModal({ isOpen, onClose, onSubmit, selectedDate = null }) {
    const [formData, setFormData] = useState({
        title: "",
        date: selectedDate || new Date().toISOString().split('T')[0],
        location: "",
        description: "",
        category: "Other",
        imageUrl: "",
    });
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        // Validation
        if (!formData.title.trim()) {
            setError("Title is required");
            return;
        }
        if (!formData.date) {
            setError("Date is required");
            return;
        }

        setIsSubmitting(true);
        try {
            await onSubmit(formData);
            // Reset form
            setFormData({
                title: "",
                date: new Date().toISOString().split('T')[0],
                location: "",
                description: "",
                category: "Other",
                imageUrl: "",
            });
            onClose();
        } catch (err) {
            setError(err.message || "Failed to create event");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content event-form-modal" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>×</button>
                <h3>Create New Event</h3>

                {error && <div className="error-message">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="title">Event Title *</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Enter event title"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="date">Date *</label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="category">Category</label>
                        <select
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                        >
                            <option value="Lecture">Lecture</option>
                            <option value="Cafeteria">Cafeteria</option>
                            <option value="Library">Library</option>
                            <option value="Off-Campus">Off-Campus</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="location">Location</label>
                        <input
                            type="text"
                            id="location"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            placeholder="Enter event location"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="imageUrl">Image URL</label>
                        <input
                            type="url"
                            id="imageUrl"
                            name="imageUrl"
                            value={formData.imageUrl}
                            onChange={handleChange}
                            placeholder="https://example.com/image.jpg"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Enter event description"
                            rows="4"
                        />
                    </div>

                    <div className="form-actions">
                        <button type="button" onClick={onClose} className="btn btn-secondary">
                            Cancel
                        </button>
                        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                            {isSubmitting ? "Creating..." : "Create Event"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
