import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function POST(req: Request) {
  try {
    const { id, title, content } = await req.json();

    // Convert text → HTML so TipTap can render it
    const htmlContent = `<p>${content.replace(/\n/g, "<br/>")}</p>`;

    const { error } = await supabase
      .from("articles")
      .update({
        title,
        content: htmlContent,
      })
      .eq("id", id);

    if (error) {
      console.error("Update error:", error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Server update error:", err);
    return NextResponse.json(
      { error: "Server error while updating" },
      { status: 500 }
    );
  }
}
