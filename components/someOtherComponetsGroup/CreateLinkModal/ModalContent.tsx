import { useEffect, useRef, useState } from "react";

import { SearchResultsList } from "./SearchResultsList";

import type { MouseEvent, MouseEventHandler } from "react";

import type { NewWebNodeData } from "@/components/QuillEditor";

type Props = {
  closeModal: (e?: MouseEvent<HTMLElement>) => void;
  newWebNodeData: NewWebNodeData | null;
  quill: any;
};

// function closeModal(e: MouseEvent<HTMLElement>) {
// e.stopPropagation();

// TODO: вынести в model
export type ListItem = {
  title: string;
  url: string;
};

const mockList: ListItem[] = [
  { title: "one", url: "url-one" },
  { title: "two", url: "url-two" },
  { title: "three", url: "url-three" },
  { title: "four", url: "url-four" },
  { title: "five", url: "url-five" },
  { title: "six", url: "url-six" },
  { title: "seven", url: "url-seven" },
  { title: "eight", url: "url-eight" },
  { title: "nine", url: "url-nine" },
  { title: "ten", url: "url-ten" },
  { title: "eleven", url: "url-eleven" },
  { title: "twelve", url: "url-twelve" },
];

const lowerCaseMockList: ListItem[] = mockList.map((el) => {
  return {
    ...el,
    title: el.title.toLocaleLowerCase(),
  };
});

export function ModalContent(props: Props) {
  const { newWebNodeData, quill, closeModal } = props;

  console.log(`modal content component updated!`);

  //   const headerText = `Добавить ссылку на статью о "${term}""`;

  const [searchInputValue, setSearchInputValue] = useState<string>("");

  const [isLoading, setIsLoading] = useState(false);

  const [list, setList] = useState<ListItem[]>([]);

  const timer = useRef<NodeJS.Timeout | null>(null);

  function handleInputChange(e: any) {
    const { value } = e.target;

    if (value != null) {
      setSearchInputValue(value);
    }
  }

  useEffect(() => {
    setList([]);
    setIsLoading(true);

    if (timer.current) {
      clearTimeout(timer.current);
    }

    let listValues: ListItem[];

    // в дальнейшем < 3
    if (searchInputValue.length === 0) {
      listValues = [];
    } else {
      listValues = lowerCaseMockList.filter((item) => item.title.includes(searchInputValue.toLocaleLowerCase()));
    }

    timer.current = setTimeout(() => {
      setList(listValues);
      setIsLoading(false);
      timer.current = null;
    }, 500);
  }, [searchInputValue]);

  function handleListItemClick(event: MouseEvent<HTMLUListElement>) {
    const { value: index } = event.target as HTMLLIElement;

    console.log(index);

    const item = list[index];

    const url = item.url;

    console.log(`you selected an item with url: ${url}`);

    const { id, term, range, onHoverHandler } = newWebNodeData as NewWebNodeData;

    const embedValue = {
      id,
      url,
      term,
      onHoverHandler,
    };

    quill.deleteText(range.index, range.length); // Remove the selected plain text
    quill.insertEmbed(range.index, "web-node", embedValue); // Apply "web-node" embed

    closeModal();
  }

  const isEmptyList = list.length === 0;

  return (
    <div className="border-2 border-slate-200 bg-neutral-800 h-64 w-128 rounded-xl p-6 relative flex flex-col">
      <div className="flex justify-end absolute w-full top-0 left-0 px-4 pt-2">
        <span onClick={closeModal} className="cursor-pointer">
          X
        </span>
      </div>
      {/* className="flex h-12 items-center justify-center" */}
      <h1 className="flex justify-center text-lg pt-2">
        Добавить ссылку на статью о&nbsp;<span className="text-cyan-500">{newWebNodeData?.term || ""}</span>
      </h1>

      <div className="flex flex-col flex-1">
        <div>
          <input
            onChange={handleInputChange}
            value={searchInputValue}
            className={`w-full text-black px-2 py-1 outline-none rounded-t ${isEmptyList ? "rounded-b" : ""}`}
          />
        </div>

        <SearchResultsList results={list} isLoading={isLoading} onListItemClick={handleListItemClick} />
      </div>
    </div>
  );
}
