import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

export function Title() {
  const { register, setValue, getValues } = useFormContext();

  useEffect(() => {
    register("title", {
      required: true,
    });
  }, [register]);

  function keyDownHandler(e: React.KeyboardEvent<HTMLSpanElement>) {
    if (e.code === "Enter") {
      e.preventDefault();
      return;
    }

    const lastCharInTitle = getValues("title").slice(-1);

    if (e.code === "Space" && lastCharInTitle === " ") {
      e.preventDefault();
      return;
    }
  }

  function updateTitle(e: React.FormEvent<HTMLSpanElement>) {
    const target = e.target as HTMLSpanElement;

    const spanText = target.textContent || "";

    // finds last occurence of <br>
    // const lastBrIndex = spanText.lastIndexOf("<br>");

    // removes last occurence of <br>
    // const adjustedText =
    //   spanText.slice(0, lastBrIndex) +
    //   spanText.slice(lastBrIndex).replace("<br>", "");

    // const lastFourCharacters = spanText.slice(-4);

    // if (lastFourCharacters === "<br>") {
    // spanText = spanText.slice(0, -4);
    // }

    setValue("title", spanText, { shouldValidate: true });

    console.log(`updateTitle`);

    // чтобы появился placeholder
    if (spanText === "") {
      target.textContent = "";
    }
  }

  return (
    <div>
      {/* <h1>Note title</h1> */}
      {/* <label htmlFor="title">Note title</label> */}
      {/* <input
        id="title"
        placeholder="Title of the note"
        defaultValue=""
        {...register("title")}
        className="placeholder:text-zinc-500 focus:outline-none bg-transparent border-b-2 border-sky-600 text-white p-1.5 text-3xl"
      /> */}
      <span
        onInput={updateTitle}
        onKeyDown={keyDownHandler}
        className="block overflow-hidden w-full focus:outline-none bg-transparent border-b-2 border-neutral-700 text-white p-1.5 text-3xl empty:before:content-['Title_of_the_note'] empty:before:text-zinc-500"
        role="textbox"
        contentEditable
      />
    </div>
  );
}

// .textarea {
//   display: block;
//   width: 100%;
//   overflow: hidden;
//   resize: both;
//   min-height: 40px;
//   line-height: 20px;
// }

// .textarea[contenteditable]:empty::before {
//   content: "Placeholder still possible";
//   color: gray;
// }
