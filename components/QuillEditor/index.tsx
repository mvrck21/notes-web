"use client";

import { useMemo, useState, useRef, use } from "react";

import rangy from "rangy";

// import { Tooltip } from "react-tooltip";

import { ToolTip } from "../Tooltip";

// import { adjustLinkNode } from "./utils";
// let Delta: any;

import { createNoteLink } from "./handlers";

import { CreateLinkModal } from "../someOtherComponetsGroup/CreateLinkModal";

import "react-quill/dist/quill.snow.css";

import { TooltipContent } from "../TooltipContent";

import { ReactQuillEditor } from "./ReactQuillEditor";

export type NewWebNodeData = {
  id: string;
  // url: string;
  // text: string;
  range: {
    index: number;
    length: number;
  };
  term: string;
  onHoverHandler: (id: string) => void;
};

type Props = {
  value: string;
  onChange: (value: string) => void;
};

// const embedValue = {
//     id,
//     url: "/can-i-kick-it",
//     text: selectedText,
//     onHoverHandler: (id: string) => setHoveredNodeId(id),
//   };

//   quill.deleteText(range.index, range.length); // Remove the selected plain text
//   quill.insertEmbed(range.index, "web-node", embedValue); // Apply "web-node" embed

export function QuillEditor(this: any, props: Props) {
  const [newWebNodeData, setNewWebNodeData] = useState<NewWebNodeData | null>(null);

  // const [selectedTerm, setSelectedTerm] = useState<string | undefined>(undefined);

  const [hoveredNodeId, setHoveredNodeId] = useState("");

  console.log(`hoveredNodeId: ${hoveredNodeId}`);

  const quillRef = useRef<any>(null); // Ref for accessing the Quill instance

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          ["bold", "italic", "underline"], // toggled buttons
          ["blockquote", "code-block"],
          // ["link", "image", "video", "formula"],
          ["link", "image", "video"],

          [{ header: 1 }, { header: 2 }], // custom button values
          [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
          [{ script: "sub" }, { script: "super" }], // superscript/subscript
          [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
          [{ direction: "rtl" }], // text direction

          // [{ size: ["small", false, "large", "huge"] }], // custom dropdown
          // [{ header: [1, 2, 3, 4, 5, 6, false] }],

          [{ color: [] }, { background: [] }], // dropdown with defaults from theme
          // [{ font: [] }],
          [{ align: [] }],

          ["clean"], // remove formatting button

          ["noteLink"],
        ],
        handlers: {
          // image: imageHandler,
          //
          noteLink: function (value: string) {
            // const { quill } = this as any;

            // value приходит как true - почему?

            // createNoteLink(value, quill, setSelectedTerm, setNewWebNodeData);

            const quill = quillRef.current?.getEditor(); // Access the Quill instance

            console.log(`quill`, quill);

            if (quill) {
              createNoteLink(
                value,
                quill,
                // setSelectedTerm,
                setNewWebNodeData,
                setHoveredNodeId
              );
            }
          },
        },
      },
      clipboard: {
        matchVisual: true,
      },
    };
  }, []);

  // console.log("Quill instance:", quillRef.current?.getEditor());

  // console.log("Methods available:", Object.keys(quillRef.current || {}));

  // const myButton = new QuillToolbarButton({
  //   icon: `<svg viewBox="0 0 18 18"> <path class="ql-stroke" d="M5,3V9a4.012,4.012,0,0,0,4,4H9a4.012,4.012,0,0,0,4-4V3"></path></svg>`,
  // });

  // myButton.onClick = function (quill) {
  //   const { index, length } = quill.selection.savedRange;
  //   const selectedText = quill.getText(index, length);
  //   const newText = selectedText.toUpperCase();
  //   quill.deleteText(index, length);
  //   quill.insertText(index, newText);
  //   quill.setSelection(index, newText.length);
  // };
  // myButton.attach(quill);

  // icons["bold"] = '<i class="fa fa-underline" aria-hidden="true"></i>';

  // console.log(`hovered node id: ${newWebNodeData?.id}`);

  // console.log("quillRef.current?.getEditor()", quillRef.current?.getEditor());

  function handleDoubleClick(e: any) {
    // const sel = getSelection();

    const sel = rangy.getSelection();

    console.log(`selection: ${JSON.stringify(sel?.toString(), null, 2)}`);
  }

  const [tooltipClosed, setTooltipCloset] = useState(false);

  return (
    <>
      <div onDoubleClick={handleDoubleClick}>
        <ReactQuillEditor
          theme="snow"
          value={props.value}
          onChange={props.onChange}
          // formats={formats}
          modules={modules}
          forwardedRef={quillRef}
        />

        <ToolTip anchorSelector={`#${hoveredNodeId}`}></ToolTip>

        {/* <Tooltip
          id={hoveredNodeId}
          anchorSelect={`#${hoveredNodeId}`}
          // variant="light"
          border="1px solid rgb(125, 211, 252)"
          clickable
          openOnClick
          className=""
          // content="Hello world!"
          // setIsOpen={(value: boolean) => {
          //   if (tooltipClosed === true) {
          //     return true;
          //   }
          // }}
          // closeEvents={{ click: true }}
          // delayHide={1500}
          events={["click"]}
        >
          <TooltipContent nodeId={hoveredNodeId} onLinkClick={setTooltipCloset} />
        </Tooltip> */}
      </div>

      {newWebNodeData ? (
        <CreateLinkModal
          // term={selectedTerm}
          quill={quillRef.current?.getEditor()} // Pass the same Quill instance as a prop
          newWebNodeData={newWebNodeData}
          setNewWebNodeData={setNewWebNodeData}
        />
      ) : null}
    </>
  );
}
