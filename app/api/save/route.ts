import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function POST(req: Request) {
  try {
    const { title, content } = await req.json();

    // Convert plain text → HTML for TipTap
    const htmlContent = `<p>${content.replace(/\n/g, "<br/>")}</p>`;

    const { error } = await supabase
      .from("articles")
      .insert([{ title, content: htmlContent }]);

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Save error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
