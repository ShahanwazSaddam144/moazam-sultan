import connectToDatabase from "@/app/lib/mongodb";
import BookSession from "@/app/model/bookSession";

export async function POST(req) { 
  try {
    const body = await req.json();
    const { name, email, grade, day, time } = body;

    if (!name || !email || !grade || !day || !time) {
      return new Response(
        JSON.stringify({ success: false, message: "All fields are required" }),
        { status: 400 }
      );
    }

    await connectToDatabase();

    const existing = await BookSession.findOne({ day, time });
    if (existing) {
      return new Response(
        JSON.stringify({ success: false, message: "This slot is already booked" }),
        { status: 409 }
      );
    }

    const session = await BookSession.create({ name, email, grade, day, time });

    return new Response(
      JSON.stringify({ success: true, message: "Session booked successfully", session }),
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ success: false, message: "Server error" }),
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectToDatabase();

    const sessions = await BookSession.find().sort({ createdAt: -1 });
    
    return new Response(
      JSON.stringify({ success: true, sessions }),
      { status: 200 }
    );
  } catch (error) {
    console.error("GET /bookSession error:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Server error" }),
      { status: 500 }
    );
  }
}