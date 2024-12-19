import { useFormContext } from "react-hook-form";

export function BriefDescription() {
  const { register } = useFormContext();

  return (
    <div className="flex flex-col py-12">
      <label htmlFor="description" className="text-white">
        Brief description
      </label>

      <textarea
        id="description"
        defaultValue=""
        {...register("briefDescription")}
        className="resize-none bg-transparent text-white border border-neutral-300 text-lg p-4 outline-none"
      />
    </div>
  );
}
