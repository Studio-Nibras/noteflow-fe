import { EditorContent } from "@tiptap/react";

export default function NoteEditor({ editor }) {

    if (!editor) return null;

    return (
        <EditorContent editor={editor} />
    );
}