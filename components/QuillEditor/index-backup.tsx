"use client";

import React, { useMemo, useReducer, MouseEvent, useState } from "react";

import rangy from "rangy";

// import tippy from "tippy.js";
// import Tippy from "@tippyjs/react";

import { Tooltip } from "react-tooltip";

import { adjustLinkNode } from "./utils";
// let Delta: any;

import "react-quill/dist/quill.snow.css";

import type ReactQuill from "react-quill";

import dynamic from "next/dynamic";

import { TOOLBAR_ICONS } from "./constants";

function Cont() {
  return (
    <div>
      <button type="button">click maybe?</button>
    </div>
  );
}

function ToolbarContent(props: { text: string }) {
  return <div>{props.text}</div>;
}

const ReactQuillEditor = dynamic(
  async () => {
    const { default: RQ } = await import("react-quill");

    // const Inline = RQ.Quill.import("blots/inline");
    const Embed = RQ.Quill.import("blots/embed");

    // class KoreanHightlighted extends Inline {
    //   static blotName = "web-node";
    //   static className = "text-orange-500";
    //   static tagName = "span";

    //   static formats(): boolean {
    //     return true;
    //   }
    // }

    // class KoreanHightlighted extends Inline {
    //   static blotName = "web-node";
    //   static className = "text-orange-500";
    //   static tagName = "span";

    //   static create(initialValue: any) {
    //     console.log(`initialValue: ${initialValue}`);

    //     // Allow the parent create function to give us a DOM Node
    //     // The DOM Node will be based on the provided tagName and className.
    //     // E.G. the Node is currently <code class="ClickableSpan">{initialValue}</code>
    //     const node = super.create();

    //     const adjustedNode = adjustLinkNode(node);

    //     // Set an attribute on the DOM Node.

    //     // Add an additional class
    //     // node.classList.add("otherClass");

    //     // Returning <code class="ClickableSpan otherClass">{initialValue}</code>
    //     return adjustedNode;
    //   }

    //   static formats(): boolean {
    //     return true;
    //   }
    // }

    class KoreanHightlighted extends Embed {
      static blotName = "web-node";
      static className = "text-orange-500";
      static tagName = "span";

      static create(value: any) {
        let node = super.create();

        node.setAttribute("href", value.url);
        // node.setAttribute("target", "_blank");
        node.innerText = value.text;

        node.setAttribute("id", value.id);

        node.addEventListener("mouseover", (e: MouseEvent<HTMLSpanElement>) => {
          // const { id } = e.target as Element;
          value.onHoverHandler(value.id);
        });

        // const adjustedNode = adjustLinkNode(node);

        return node;

        // return <Tippy content="Hello">{node}</Tippy>;
      }

      // let value be hash containing both href and text
      static value(node: any) {
        return {
          url: node.getAttribute("href"),
          text: node.innerText,
          id: node.getAttribute("id"),
        };
      }

      static formats(node: any) {
        return node.getAttribute("href");
      }
    }

    // class AddingNodeId extends Inline {
    //   static blotName = "web-node";
    //   static className = "text-orange-500";
    //   static tagName = "span";

    //   static create(initialValue: any) {
    //     console.log(`initialValue: ${initialValue}`);

    //     // Allow the parent create function to give us a DOM Node
    //     // The DOM Node will be based on the provided tagName and className.
    //     // E.G. the Node is currently <code class="ClickableSpan">{initialValue}</code>
    //     const node = super.create();

    //     const adjustedNode = adjustLinkNode(node);

    //     // Set an attribute on the DOM Node.

    //     // Add an additional class
    //     // node.classList.add("otherClass");

    //     // Returning <code class="ClickableSpan otherClass">{initialValue}</code>
    //     return adjustedNode;
    //   }

    //   static formats(): boolean {
    //     return true;
    //   }
    // }

    RQ.Quill.register(KoreanHightlighted);
    // RQ.Quill.register(AddingNodeId);

    function QuillJS({ ...props }: React.ComponentProps<typeof ReactQuill>) {
      const icons = RQ.Quill.import("ui/icons");

      // Delta = RQ.Quill.import("delta");

      // icons.bold = TOOLBAR_ICONS.BOLD_ICON;
      // icons.italic = TOOLBAR_ICONS.ITALIC_ICON;
      // icons.underline = TOOLBAR_ICONS.UNDERLINE_ICON;
      // icons.link = TOOLBAR_ICONS.LINK_ICON;
      // icons.list = {
      //   bullet: TOOLBAR_ICONS.LIST_BULLETS_ICON,
      //   ordered: TOOLBAR_ICONS.LIST_ORDERED_ICON,
      // };
      icons.noteLink = TOOLBAR_ICONS.NOTE_LINK_ICON;

      return <RQ {...props} />;
    }

    return QuillJS;
  },
  {
    ssr: false,
  }
);

// enum CountActionKind {
//   INCREASE = 'INCREASE',
//   DECREASE = 'DECREASE',
// }

// // An interface for our actions
// interface CountAction {
//   type: CountActionKind;
//   payload: number;
// }

// // An interface for our state
// interface CountState {
//   count: number;
// }

// Our reducer function that uses a switch statement to handle our actions
// function counterReducer(state: CountState, action: CountAction) {

// const initialState = {};

// function reducer(state, action) {
//   switch (action.type) {
//     case "increment":
//       return { ...state, count: state.count + 1 };
//     case "decrement":
//       return { ...state, count: state.count - 1 };
//     default:
//       return "Unrecognized command";
//   }
// }

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export function QuillEditor(props: Props) {
  // const [tooltips, dispatch] = useReducer(reducer, initialState);

  const [hoveredNodeId, setHoveredNodeId] = useState<string>();

  // function handleIncrement() {
  //   dispatch({ type: "increment" });
  // }

  // function handleDecrement() {
  //   dispatch({ type: "decrement" });
  // }

  // const toolbarOptions = [
  //   ["bold", "italic", "underline", "strike"], // toggled buttons
  //   ["blockquote", "code-block"],
  //   ["link", "image", "video", "formula"],

  //   [{ header: 1 }, { header: 2 }], // custom button values
  //   [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
  //   [{ script: "sub" }, { script: "super" }], // superscript/subscript
  //   [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  //   [{ direction: "rtl" }], // text direction

  //   [{ size: ["small", false, "large", "huge"] }], // custom dropdown
  //   [{ header: [1, 2, 3, 4, 5, 6, false] }],

  //   [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  //   [{ font: [] }],
  //   [{ align: [] }],

  //   ["clean"], // remove formatting button
  // ];

  // const quill = new Quill("#editor", {
  //   modules: {
  //     toolbar: toolbarOptions,
  //   },
  //   theme: "snow",
  // });

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "color",
    "clean",
  ];

  // const imageHandler = () => {
  //   // Create an input element of type 'file'
  //   const input = document.createElement("input");
  //   input.setAttribute("type", "file");
  //   input.setAttribute("accept", "image/*");
  //   input.click();

  //   // When a file is selected
  //   input.onchange = () => {
  //     const file = input.files[0];
  //     const reader = new FileReader();

  //     // Read the selected file as a data URL
  //     reader.onload = () => {
  //       const imageUrl = reader.result;
  //       const quillEditor = quill.current.getEditor();

  //       // Get the current selection range and insert the image at that index
  //       const range = quillEditor.getSelection(true);
  //       quillEditor.insertEmbed(range.index, "image", imageUrl, "user");
  //     };

  //     reader.readAsDataURL(file);
  //   };
  // };

  // const modules = useMemo(
  //   () => ({
  //     toolbar: {
  //       container: [
  //         [{ header: [2, 3, 4, false] }],
  //         ["bold", "italic", "underline", "blockquote"],
  //         [{ color: [] }],
  //         [
  //           { list: "ordered" },
  //           { list: "bullet" },
  //           { indent: "-1" },
  //           { indent: "+1" },
  //         ],
  //         ["link", "image"],
  //         ["clean"],
  //       ],
  //       handlers: {
  //         // image: imageHandler,
  //       },
  //     },
  //     clipboard: {
  //       matchVisual: true,
  //     },
  //   }),
  //   []
  // );

  const modules = useMemo(() => {
    return {
      toolbar: {
        // container: "#toolbar",
        // container: toolbarOptions,
        container: [
          // ["bold", "italic", "underline", "strike"], // toggled buttons
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
          noteLink: function (value: string) {
            const { quill } = this as any;

            const range = quill.getSelection(true);

            if (range) {
              if (range.length == 0) {
                console.log("User cursor is at index", range.index);
              } else {
                const text = quill.getText(range.index, range.length);
                console.log(`User has highlighted: >${text}<`);

                // if (text[range.length - 1] === " ") {
                //   console.log("the last symbol of current selection is SPACE");
                //   quill.setSelection(range.index, range.length - 1);
                // }

                // quill.insertText(0, "<strong>Hello</strong>");

                // const smt = quill.clipboard.convert({
                //   html: "<h1>New content here</h1>",
                // });

                // quill.updateContents(
                //   new Delta().retain(5).insert("<p>sdfdffd</p>")
                // );

                // quill.formatText(
                //   0,
                //   5,
                //   {
                //     "web-node": true,
                //   },
                //   true
                // );

                const id = `web-node-${crypto.randomUUID()}`;

                // const range = quill.getSelection(true);
                const value = {
                  url: "/can-i-kick-it",
                  text: text,
                  id,
                  onHoverHandler: (id: string) => setHoveredNodeId(id),
                };

                quill.insertEmbed(range.index, "web-node", value);
                console.log(`value.text.length: ${value.text.length}`);
                console.log(`range.index: ${range.index}`);
                console.log(`range.index + value.text.length: ${range.index + value.text.length}`);
                // quill.setSelection(range.index + value.text.length);

                // quill.setSelection(range.index + range.length);

                quill.setSelection(range.index + 1);

                quill.deleteText(range.index + 1, range.length);

                // quill.insertEmbed(0, "id", "nnnode");

                // tippy("#nnnode", {
                //   content: "hello!",
                // });

                //                 <a
                //   data-tooltip-id="my-tooltip"
                //   data-tooltip-content="Hello world!"
                // >
                //   ◕‿‿◕
                // </a>
                // <Tooltip id="my-tooltip" />

                // const smt = quill.clipboard.dangerouslyPasteHTML(
                //   "<strong>lolka</strong>"
                // );

                // const smt = "<strong>lolka</strong>";

                // ===================
                // const value = `<h1>New content here</h1>`;
                // const delta = quill.clipboard.convert(value);

                // quill.setContents(delta, "silent");

                // quill.updateContents(
                //   new Delta()
                //     .retain(6) // Keep 'Hello '
                //     .delete(5) // 'World' is deleted
                //   // .insert(smt)
                // );

                // quill.insertText(5, smt);
              }
            } else {
              console.log("User cursor is not in editor");
            }

            // this.quill.insertText(cursorPosition, "★");
            // this.quill.setSelection(cursorPosition + 1);
            // =========
            // if (value) {
            //   let range = this.quill.getSelection();
            //   if (range == null || range.length == 0) {
            //     // FormNewTalk.prototype.formAlert("Вы не выделили текст");
            //     return;
            //   }
            //   let preview = this.quill.getText(range);
            //   if (
            //     /^\S+@\S+\.\S+$/.test(preview) &&
            //     preview.indexOf("mailto:") !== 0
            //   ) {
            //     preview = "mailto:" + preview;
            //   }
            //   let tooltip = this.quill.theme.tooltip;
            //   tooltip.edit("link", "http://");
            // } else {
            //   this.quill.format("link", false);
            // }
            // ========
          },
        },
      },
      clipboard: {
        matchVisual: true,
      },
    };
  }, []);

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

  console.log(`hovered node id: ${hoveredNodeId}`);

  function handleDoubleClick(e: any) {
    // const sel = getSelection();

    const sel = rangy.getSelection();

    console.log(`selection: ${JSON.stringify(sel?.toString(), null, 2)}`);
  }

  return (
    <div onDoubleClick={handleDoubleClick}>
      <ReactQuillEditor
        theme="snow"
        value={props.value}
        onChange={props.onChange}
        // formats={formats}
        modules={modules}
      />

      <Tooltip
        id={hoveredNodeId}
        anchorSelect={`#${hoveredNodeId}`}
        // variant="light"
        border="1px solid white"
        // clickable
        openOnClick

        // content="Hello world!"
      >
        <Cont />
      </Tooltip>
    </div>
  );
}
