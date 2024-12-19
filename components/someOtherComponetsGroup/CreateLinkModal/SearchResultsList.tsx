import type { MouseEventHandler } from "react";

import type { ListItem } from "./ModalContent";

type Props = {
  results: ListItem[];
  isLoading: boolean;
  onListItemClick: MouseEventHandler<HTMLUListElement>;
};

// TODO: вынести эту функцию в папку utils и расшарить
function createListItemsFromArray(array: ListItem[]): JSX.Element[] {
  const listItems = array.map((el, index) => {
    return (
      <li key={index} value={index} className="">
        {el.title}
      </li>
    );
  });

  return listItems;
}

export function SearchResultsList(props: Props) {
  const { results, isLoading, onListItemClick } = props;

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center flex-1">Loading a list of recommendations</div>
      ) : (
        <ul onClick={onListItemClick} className="bg-red-300 rounded-b flex-1 overflow-auto max-h-36">
          {createListItemsFromArray(results)}
        </ul>
      )}
    </>
  );
}
