"use client";

import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote } from "@blocknote/react";

const Editor = () => {
  const editor = useCreateBlockNote();

  const onChange = async () => {
    const markdown = await editor.blocksToMarkdownLossy(editor.document);
    console.log(markdown);
  };

  return (
    <div>
      <BlockNoteView editor={editor} onChange={onChange} />
    </div>
  );
};

export default Editor;
