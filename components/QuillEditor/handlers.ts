import type { NewWebNodeData } from ".";

import type { Dispatch, SetStateAction } from "react";

type InsertObject = {
  "web-node": WebNode;
};

type Insert = InsertObject | string;

type NewWebNodeOperation = { attributes: Record<string | number, any>; insert: InsertObject };
type OtherOperation = { attributes: Record<string | number, any>; insert: string };

// TODO: позже взять типы из github quill
type OP = NewWebNodeOperation | OtherOperation;

type WebNode = {
  url: string;
  text: string;
  id: string;
};

function isWebNodeOperation(operation: NewWebNodeOperation | OtherOperation): operation is NewWebNodeOperation {
  const { insert } = operation;

  console.log(`insert:`, insert);

  if (typeof insert === "string") {
    return false;
  }

  const hasWebNode = Boolean(insert["web-node"]);

  return hasWebNode;
}

export function createNoteLink(
  value: string,
  quill: any,
  // setSelectedTerm: Function,
  setNewWebNodeData: (data: NewWebNodeData) => void,
  setHoveredNodeId: Dispatch<SetStateAction<string>>
) {
  // const range = quill.getSelection(true);

  //   if (range) {
  //     if (range.length == 0) {
  //       console.log("User cursor is at index", range.index);
  //     } else {
  //       const text = quill.getText(range.index, range.length);

  //       console.log(`User has highlighted: >${text}<`);

  //       // if (text[range.length - 1] === " ") {
  //       //   console.log("the last symbol of current selection is SPACE");
  //       //   quill.setSelection(range.index, range.length - 1);
  //       // }

  //       // quill.insertText(0, "<strong>Hello</strong>");

  //       // const smt = quill.clipboard.convert({
  //       //   html: "<h1>New content here</h1>",
  //       // });

  //       // quill.updateContents(
  //       //   new Delta().retain(5).insert("<p>sdfdffd</p>")
  //       // );

  //       // quill.formatText(
  //       //   0,
  //       //   5,
  //       //   {
  //       //     "web-node": true,
  //       //   },
  //       //   true
  //       // );

  //       setIsLinkModalDisplayed(true);

  //       const id = `web-note-${crypto.randomUUID()}`;

  //       // const range = quill.getSelection(true);
  //       const value = {
  //         url: "/can-i-kick-it",
  //         text: text,
  //         id,
  //         onHoverHandler: (id: string) => setHoveredNodeId(id),
  //       };

  //       quill.deleteText(range.index, range.length);

  //       quill.insertEmbed(range.index, "web-node", value);
  //       console.log(`value.text.length: ${value.text.length}`);
  //       console.log(`range.index: ${range.index}`);
  //       console.log(`range.index + value.text.length: ${range.index + value.text.length}`);
  //       // quill.setSelection(range.index + value.text.length);

  //       // quill.setSelection(range.index + range.length);

  //       quill.setSelection(range.index + 1);

  //       // quill.deleteText(range.index + 1, range.length);

  //       // quill.insertEmbed(0, "id", "nnnode");

  //       // tippy("#nnnode", {
  //       //   content: "hello!",
  //       // });

  //       //                 <a
  //       //   data-tooltip-id="my-tooltip"
  //       //   data-tooltip-content="Hello world!"
  //       // >
  //       //   ◕‿‿◕
  //       // </a>
  //       // <Tooltip id="my-tooltip" />

  //       // const smt = quill.clipboard.dangerouslyPasteHTML(
  //       //   "<strong>lolka</strong>"
  //       // );

  //       // const smt = "<strong>lolka</strong>";

  //       // ===================
  //       // const value = `<h1>New content here</h1>`;
  //       // const delta = quill.clipboard.convert(value);

  //       // quill.setContents(delta, "silent");

  //       // quill.updateContents(
  //       //   new Delta()
  //       //     .retain(6) // Keep 'Hello '
  //       //     .delete(5) // 'World' is deleted
  //       //   // .insert(smt)
  //       // );

  //       // quill.insertText(5, smt);
  //     }
  //   } else {
  //     console.log("User cursor is not in editor");
  //   }

  // ================================================================================================
  // if (range && range.length > 0) {
  //   const text = quill.getText(range.index, range.length);

  //   console.log(`User has highlighted: >${text}<`);

  //   const currentFormat = quill.getFormat();

  //   if (Object.keys(currentFormat as Record<string, any>).length > 0) {
  //     return;
  //   }

  //   const id = `web-node-${crypto.randomUUID()}`;

  //   // const range = quill.getSelection(true);
  //   const value = {
  //     url: "/can-i-kick-it",
  //     text: text,
  //     id,
  //     onHoverHandler: (id: string) => setHoveredNodeId(id),
  //   };

  //   setSelectedTerm(text);

  //   const content = quill.getContents(range.index, range.length);

  //   console.log("=================================");
  //   if (Array.isArray(content?.ops)) {
  //     for (let c of content.ops) {
  //       console.log(c);

  //       console.log("c.insert['web-node'].id:", typeof c.insert["web-node"]?.id);

  //       console.log(
  //         '-- c.insert["web-node"]?.id?.startsWith["web-node"]',
  //         c.insert["web-node"]?.id?.startsWith("web-node")
  //       );

  //       if (c.insert["web-node"]?.id?.startsWith("web-node")) {
  //         console.log("-------------- yay!");

  //         quill.format("web-node", false);
  //         return;
  //       }
  //     }
  //   }
  //   console.log("=================================");
  //   console.log(content);
  //   console.log("=================================");

  //   // const currentFormat = quill.getFormat();

  //   // console.log(`current format: ${JSON.stringify(currentFormat, null, 2)}`);
  //   // console.log(`current format: `, currentFormat);

  //   // quill.removeFormat(range.index, range.length);

  //   quill.format("web-node", false);

  //   quill.deleteText(range.index, range.length);

  //   quill.insertEmbed(range.index, "web-node", value);

  //   console.log(`value.text.length: ${value.text.length}`);
  //   console.log(`range.index: ${range.index}`);
  //   console.log(`range.index + value.text.length: ${range.index + value.text.length}`);

  //   quill.setSelection(range.index + 1);
  // } else {
  //   console.log("User cursor is not in editor");
  // }
  // ================================================================================================

  const range = quill.getSelection();

  if (!range) {
    return;
  }

  const selectedContents = quill.getContents(range.index, range.length);

  const operations = selectedContents.ops;

  // let hasWebNode = false;

  // // Check if the selection contains any "web-node" embeds
  // selectedContents.ops.forEach((op: OP) => {
  //   const isWebNode = isInsertAnObject(op.insert) && op.insert["web-node"];

  //   if (isWebNode) {
  //     hasWebNode = true;
  //     return;
  //   }
  // });

  // Check if the selection contains any "web-node" embeds
  const hasWebNode = operations.some((op: OP) => isWebNodeOperation(op));

  console.log(`has web nodes: ${hasWebNode}`);

  if (hasWebNode) {
    // Replace all "web-node" embeds in the selection with plain text
    let position = range.index;

    // ==========================================
    // operations.forEach((op: OP) => {
    //   const isWebNode = isWebNodeOperation(op);

    //   if (isWebNode) {
    //     const embedText = op.insert["web-node"].text;

    //     quill.deleteText(position, 1);
    //     quill.insertText(position, embedText);

    //     position += embedText.length;
    //   } else {
    //     position += op.insert.length;
    //   }
    // });
    // ==========================================

    operations.forEach((op: NewWebNodeOperation | OtherOperation) => {
      const isWebNode = isWebNodeOperation(op);

      const { insert } = op;

      // if (!isWebNodeOperation(op)) {
      //   position += insert.length; // Adjust position for regular text
      //   return;
      // }

      // const embedText = insert["web-node"].text; // The text inside the embed

      // quill.deleteText(position, 1); // Remove the embed
      // quill.insertText(position, embedText); // Insert the plain text

      // position += embedText.length; // Move the position forward

      if (isWebNode) {
        const embedText = op.insert["web-node"].text; // The text inside the embed

        quill.deleteText(position, 1); // Remove the embed
        quill.insertText(position, embedText); // Insert the plain text

        position += embedText.length; // Move the position forward

        return;
      }

      position += op.insert.length; // Adjust position for regular text
    });

    return;
  }
  // Apply "web-node" formatting to the entire selection
  const selectedText: string = quill.getText(range.index, range.length); // Extract the selected text

  // дополнительная проверка, хотя !range в самом начале должна пресекать возможность иметь пустое выделение
  if (selectedText.length === 0) {
    return;
  }

  // ================================================================================================
  const id = `web-node-${crypto.randomUUID()}`;

  setNewWebNodeData({
    id,
    // text: selectedText,
    range,
    term: selectedText,
    onHoverHandler: () => setHoveredNodeId(id),
  });

  // setSelectedTerm(selectedText);

  // const embedValue = {
  //   id,
  //   url: "/can-i-kick-it",
  //   text: selectedText,
  //   onHoverHandler: (id: string) => setHoveredNodeId(id),
  // };

  // quill.deleteText(range.index, range.length); // Remove the selected plain text
  // quill.insertEmbed(range.index, "web-node", embedValue); // Apply "web-node" embed

  // ================================================================================================

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
}
