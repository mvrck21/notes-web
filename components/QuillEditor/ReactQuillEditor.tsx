/* eslint-disable react/display-name */
import React from "react";

import type { MouseEvent, LegacyRef, ComponentPropsWithRef } from "react";

import type ReactQuill from "react-quill";

import type { ComponentProps } from "react";

import dynamic from "next/dynamic";

import { TOOLBAR_ICONS } from "./constants";

export const ReactQuillEditor = dynamic(
  async () => {
    const { default: ReactQuill } = await import("react-quill");

    // const Inline = RQ.Quill.import("blots/inline");
    const Embed = ReactQuill.Quill.import("blots/embed");

    class KoreanHightlighted extends Embed {
      static blotName = "web-node";
      static className = "text-cyan-500";
      static tagName = "span";

      static create(value: any) {
        let node = super.create(value);

        // console.log(`nodeType:`, node.tagName);

        console.log("value:", value);

        // node.classList.add(this.className);

        node.setAttribute("url", value.url);
        // node.setAttribute("link", value.url);

        node.innerText = value.term;

        node.setAttribute("id", value.id);

        node.addEventListener("mouseover", (e: MouseEvent<HTMLSpanElement>) => {
          console.log("mouse over strikes!");

          console.log(`value object:`, value);

          value.onHoverHandler();
        });

        node.classList.add("web-node");

        // const adjustedNode = adjustLinkNode(node);

        return node;

        // return <Tippy content="Hello">{node}</Tippy>;
      }

      // let value be hash containing both href and text
      static value(node: any) {
        return {
          url: node.getAttribute("url"),
          text: node.innerText,
          id: node.getAttribute("id"),
        };
      }

      static formats(node: any) {
        return node.getAttribute("url");
      }
    }

    ReactQuill.Quill.register(KoreanHightlighted);

    // const QuillJS = React.forwardRef<ReactQuill, ComponentProps<typeof RQ>>((props, ref) => {
    //   const icons = RQ.Quill.import("ui/icons");

    //   icons.noteLink = TOOLBAR_ICONS.NOTE_LINK_ICON;

    //   return <RQ {...props} ref={ref} />;
    // });

    const icons = ReactQuill.Quill.import("ui/icons");

    icons.noteLink = TOOLBAR_ICONS.NOTE_LINK_ICON;

    // return ReactQuill;

    const component = ({
      forwardedRef,
      ...props
    }: ComponentProps<typeof ReactQuill> & { forwardedRef?: LegacyRef<ReactQuill> }) => (
      <ReactQuill ref={forwardedRef} {...props} />
    );

    return component;
  },
  {
    ssr: false,
    loading: () => <p>Loading the editor...</p>,
  }
);

ReactQuillEditor.displayName = "ReactQuillEditor";

// type RQProps = ComponentProps<typeof DynamicReactQuill>;

// type ReactQuillProps = ComponentPropsWithRef<typeof DynamicReactQuill>;

// export const ReactQuillEditor = React.forwardRef<ReactQuill, ReactQuillProps>((props, ref) => {
//   return <DynamicReactQuill {...props} ref={ref as any} />;
// });

// ReactQuillEditor.displayName = "ReactQuillEditor"; // Add a display name for debugging
