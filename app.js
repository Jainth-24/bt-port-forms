// Import required modules
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid"); 

const app = express();
app.use(cors()); 
app.use(bodyParser.json());

mongoose.connect(
  "mongodb+srv://bettertomorrowoffi:Better123@better0.ioq5uvm.mongodb.net/portfolio-forms",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const messageSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true, default: uuidv4 },
  collegeName: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
});

const Message = mongoose.model("Message", messageSchema);

app.post("/api/messages", async (req, res) => {
  const { collegeName, email, message } = req.body;

  try {
    const newMessage = new Message({
      id: uuidv4(),
      collegeName,
      email,
      message,
    });
    await newMessage.save();
    res.status(201).json({ success: true, data: newMessage });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

const registrationSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true, default: uuidv4 },
  name: { type: String, required: true },
  college_name: { type: String },
  company_name: { type: String },
  mail_id: { type: String, required: true },
  phone_number: { type: String, required: true },
  year_of_studies: { type: String },
  year_of_exp: { type: String },
  course_duration: { type: String, required: true },
  time_slot: { type: String, required: true },
  course_name: { type: String, required: true },
  role: { type: String, required: true },
});

const Registration = mongoose.model("Registration", registrationSchema);

app.post("/api/registrations", async (req, res) => {
  const {
    name,
    college_name,
    company_name, 
    mail_id,
    phone_number,
    year_of_studies,
    year_of_exp, 
    course_duration,
    time_slot,
    course_name,
    role,
  } = req.body;

  try {
    const newRegistration = new Registration({
      id: uuidv4(),
      name,
      college_name,
      company_name, 
      mail_id,
      phone_number,
      year_of_studies,
      year_of_exp,
      course_duration,
      time_slot,
      course_name,
      role,
    });

    await newRegistration.save();
    res.status(201).json({ success: true, data: newRegistration });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});


const subscribeSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true, default: uuidv4 },
  email: { type: String, required: true, unique: true },
});

const Subscribe = mongoose.model("Subscribe", subscribeSchema);

app.post("/api/subscribe", async (req, res) => {
  const { email } = req.body;

  try {
    const newUser = new Subscribe({ id: uuidv4(), email });
    await newUser.save();
    res.status(201).json({ success: true, data: newUser });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
