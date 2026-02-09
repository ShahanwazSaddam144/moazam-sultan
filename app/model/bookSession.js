import mongoose from "mongoose";

const bookSessionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  grade: { type: String, required: true },
  day: { type: String, required: true },
  time: { type: String, required: true },
}, 
{ timestamps: true });

const BookSession = mongoose.models.BookSession || mongoose.model("BookSession", bookSessionSchema);

export default BookSession;
