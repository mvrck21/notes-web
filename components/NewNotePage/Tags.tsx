import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

export function Tags() {
  const { register, getValues, setValue, watch } = useFormContext();

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const tagsList: string[] = watch("tags");

  const newTagInputValue: string = watch("newTagName");

  useEffect(() => {
    if (newTagInputValue === "") {
      setIsButtonDisabled(true);
      return;
    }

    setIsButtonDisabled(false);
  }, [newTagInputValue]);

  function addNewTag() {
    const newTag = getValues("newTagName");

    if (!newTag) {
      return;
    }

    const tagsList = getValues("tags");

    if (tagsList.includes(newTag)) {
      alert("такой тэг уже существует");
      return;
    }

    setValue("tags", [...tagsList, newTag], { shouldValidate: true });

    setValue("newTagName", "");
  }

  function removeTag(tagName: string) {
    const newTagsList = [...tagsList];

    const index = newTagsList.indexOf(tagName);

    if (index !== -1) {
      newTagsList.splice(index, 1);
      setValue("tags", newTagsList, { shouldValidate: true });
    }
  }

  return (
    <div className="py-12">
      <h3 className="text-white">Tags</h3>

      <div className="flex">
        {tagsList.map((tag) => (
          <div
            key={tag}
            className="mx-2 px-2 py-0.5 rounded-md"
            onClick={() => removeTag(tag)}
          >
            {tag}
          </div>
        ))}
      </div>

      <input {...register("newTagName")} autoComplete="off" />
      <button
        type="button"
        disabled={isButtonDisabled}
        onClick={addNewTag}
        className="text-white disabled:text-gray-400 border rounded border-white disabled:border-gray-400"
      >
        add tag
      </button>
    </div>
  );
}

//
