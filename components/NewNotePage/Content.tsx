"use client";

import { useFormContext } from "react-hook-form";
import { QuillEditor } from "@/components/QuillEditor";

const regex = /(<([^>]+)>)/gi;

export function Content() {
  const { setValue, watch } = useFormContext();

  function onEditorStateChange(editorState: string) {
    const isEditorEmpty = editorState.replace(regex, "").trim() === "";

    if (isEditorEmpty) {
      editorState = "";
    }

    setValue("content", editorState, { shouldValidate: true });
  }

  const editorContent = watch("content");

  return (
    <div className="py-12">
      <h2 className="text-white">Note content</h2>
      <QuillEditor value={editorContent} onChange={onEditorStateChange} />
    </div>
  );
}
