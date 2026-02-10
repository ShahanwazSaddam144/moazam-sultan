import { NextResponse } from "next/server";
import connectToDatabase from "@/app/lib/mongodb";
import BookSession from "@/app/model/bookSession";

export async function POST(req) { 
  try {
    const body = await req.json();
    const { name, email, grade, day, time } = body;

    if (![name, email, grade, day, time].every(Boolean)) {
      return NextResponse.json({ success: false, message: "All fields are required" }, { status: 400 });
    }

    await connectToDatabase();

    const existing = await BookSession.findOne({ day, time });
    if (existing) {
      return NextResponse.json({ success: false, message: "This slot is already booked" }, { status: 409 });
    }

    const session = await BookSession.create({ name, email, grade, day, time });

    return NextResponse.json({ success: true, message: "Session booked successfully", session }, { status: 201 });

  } catch (error) {
    console.error("POST /bookSession error:", error.stack || error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectToDatabase();

    const sessions = await BookSession.find().sort({ createdAt: -1 });
    
    return NextResponse.json({ success: true, sessions }, { status: 200 });

  } catch (error) {
    console.error("GET /bookSession error:", error.stack || error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, message: "Session ID is required" }, { status: 400 });
    }

    const deleted = await BookSession.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ success: false, message: "Session not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Session deleted successfully" }, { status: 200 });

  } catch (error) {
    console.error("DELETE /bookSession error:", error.stack || error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
