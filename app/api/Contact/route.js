import { NextResponse } from "next/server";
import connectToDatabase from "@/app/lib/mongodb";
import Contact from "@/app/model/Contact";

export async function POST(request) {
  try {
    const data = await request.json();
    const { name, email, phone, inquiry } = data;

    if (!name || !email || !phone || !inquiry) {
      return NextResponse.json(
        { success: false, message: "All fields are required." },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const newContact = await Contact.create({ name, email, phone, inquiry });

    return NextResponse.json({
      success: true,
      message: "Form submitted successfully.",
      contact: newContact,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Something went wrong." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectToDatabase();
    const contacts = await Contact.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, contacts });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Something went wrong." },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, message: "ID is required for deletion." },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const deletedContact = await Contact.findByIdAndDelete(id);
    if (!deletedContact) {
      return NextResponse.json(
        { success: false, message: "Contact not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Contact deleted successfully.",
      contact: deletedContact,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Something went wrong." },
      { status: 500 }
    );
  }
}
