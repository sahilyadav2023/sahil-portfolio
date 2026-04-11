import Contact from '../models/Contact.js';

// ─── POST /api/contact ─────────────────────────────────────────────────────────
// Receives a contact form submission, validates it, and saves to MongoDB.
//
// ASYNC I/O DEMONSTRATION:
//   `await contact.save()` is a non-blocking async database write.
//   Node.js does NOT pause or block other requests while waiting for MongoDB.
//   The event loop remains free to handle other incoming requests.

export const submitContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Basic presence check before hitting the DB
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'All fields (name, email, message) are required.',
      });
    }

    // Create a new document and save — this is the async I/O operation
    const contact = new Contact({ name, email, message });
    await contact.save(); // Non-blocking: awaits MongoDB write without freezing server

    return res.status(201).json({
      success: true,
      message: "Message received! I'll get back to you soon. 🙌",
    });

  } catch (err) {
    // Mongoose validation errors (e.g., invalid email format, maxlength)
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({
        success: false,
        message: messages.join(' '),
      });
    }

    console.error('Contact form error:', err);
    return res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.',
    });
  }
};
