import dynamic from "next/dynamic";

const BlockNoteEditor = dynamic(() => import("@/app/components/BlockNote"), {
  ssr: false,
});

const Editor = () => {
  return (
    <div>
      <BlockNoteEditor />
    </div>
  );
};

export default Editor;
