import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function GET() {
  const { data, error } = await supabase.from("courses").select("*");

  if (error) {
    console.error("GET Error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

// 📌 POST — Add a new course
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      title,
      instructor,
      image,
      instructorimage,
      price,
      originalprice,
      category,
      duration,
    } = body;

    if (!title || !instructor || !price || !category) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("courses")
      .insert([
        {
          title,
          instructor,
          image,
          instructorimage,
          price: Number(price),
          originalprice: Number(originalprice),
          category,
          duration,
          created_at: new Date(),
        },
      ])
      .select();

    if (error) {
      console.error("POST Error:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(
      { message: "Course added successfully", course: data[0] },
      { status: 201 }
    );
  } catch (err) {
    console.error("POST Exception:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// 📌 DELETE — Delete a course by ID
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Course ID is required" },
        { status: 400 }
      );
    }

    const { error } = await supabase.from("courses").delete().eq("id", id);

    if (error) {
      console.error("DELETE Error:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: "Course deleted successfully" });
  } catch (err) {
    console.error("DELETE Exception:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
