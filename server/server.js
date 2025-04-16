import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import User from "./models/User.js";

dotenv.config();
const app = express();


app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch((err) => console.error("❌ DB Connection Error:", err));

// POST: Register
app.post("/register", async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json({
      message: "User registered successfully!"
    });
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(500).json({
      message: "Server error. Please try again later."
    });
  }
});

// POST: Login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    // Check password (since it's plaintext right now — ideally you'd hash it)
    if (user.password !== password) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    // On success
    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        contactNumber: user.contactNumber,
        accountType: user.accountType,
        isActive: user.isActive,
      }
    });

  } catch (error) {
    console.error("Login error:", error);  // Keep this
    res.status(500).json({
      message: error.message || "Server error during login. Please try again later."
    });
  }  
});


//Get Api 
app.get("/getallusers", async (req, res) => {
  try {
    const allUsers = await User.find();  // 👈 added await

    if (!allUsers || allUsers.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No User Found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "All users fetched successfully",
      data: allUsers
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Can Not fetch internal server error"
    });
  }
});

// Update isActive 

// Server listening
const PORT = process.env.PORT || 4209;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
