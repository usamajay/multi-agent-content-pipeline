"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { useEffect } from "react";

interface RichEditorProps {
  content: string;
  onChange: (value: string) => void;
}

export default function RichEditor({ content, onChange }: RichEditorProps) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: content || "",
    immediatelyRender: false, // Prevent SSR hydration issues
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  // Update editor when content arrives from loadArticle()
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  if (!editor) return <div>Loading editor...</div>;

  return (
    <div className="border p-3 rounded-lg min-h-[200px]">
      <EditorContent editor={editor} />
    </div>
  );
}
