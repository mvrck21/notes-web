import { memo } from "react";
import { createPortal } from "react-dom";

import { ModalContent } from "./ModalContent";

import type { MouseEvent } from "react";

import type { NewWebNodeData } from "@/components/QuillEditor";

type Props = {
  newWebNodeData: NewWebNodeData | null;
  setNewWebNodeData: Function;
  quill: any;
};

function ModalWrapper(props: Props) {
  const { newWebNodeData, setNewWebNodeData, quill } = props;

  function closeModal(e?: MouseEvent<HTMLElement>) {
    if (!e) {
      setNewWebNodeData(null);
      return;
    }

    if (e.target === e.currentTarget) {
      setNewWebNodeData(null);
    }
  }

  console.log(`quill`, quill);

  const ModalWithBackground = (
    <div className="flex fixed w-full h-screen justify-center items-center inset-0 z-50" onClick={closeModal}>
      <ModalContent quill={quill} newWebNodeData={newWebNodeData} closeModal={closeModal} />
    </div>
  );

  return <>{createPortal(ModalWithBackground, document.body)}</>;
}

export const CreateLinkModal = memo(ModalWrapper);
