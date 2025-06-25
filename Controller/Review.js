const Review = require('../Models/reviewModel');

exports.createFeedback = async (req, res) => {
  try {
    const { name, feedback } = req.body;

    if (!feedback || feedback.trim() === "") {
      return res.status(400).json({ warning: "Feedback is required" });
    }

    const review = new Review({
      name: name || "Anonymous",
      feedback: feedback.trim()
    });

    await review.save();

    return res.status(201).json({ message: "Feedback received", review });
  } catch (error) {
    console.error("Error saving feedback:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getAllFeedback = async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.status(200).json(reviews);
  } catch (error) {
    console.error("Error fetching feedback:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete all
// await User.deleteMany({});
// return res.status(200).json({ message: 'All users deleted successfully' });
