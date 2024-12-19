"use client";

import { useEffect, useState } from "react";

import { useForm, SubmitHandler, FormProvider } from "react-hook-form";

import Link from "next/link";

import { Title } from "@/components/NewNotePage/Title";
import { BriefDescription } from "@/components/NewNotePage/BriefDescription";
import { Content } from "@/components/NewNotePage/Content";
import { Tags } from "@/components/NewNotePage/Tags";

type Inputs = {
  title: string;
  briefDescription: string;
  content: string;
  newTagName: string;
  tags: string[];
};

function onSubmit(data: Inputs) {
  console.log(JSON.stringify(data, null, 2));
}

export default function Note() {
  const methods = useForm<Inputs>({
    defaultValues: {
      title: "",
      briefDescription: "",
      content: "",
      newTagName: "",
      tags: [],
    },
    mode: "onChange",
  });

  const { register, handleSubmit, formState, getValues } = methods;

  const { errors, isValid } = formState;

  const [isFormValid, setIsFormValid] = useState(isValid);

  useEffect(() => {
    // register("content", { required: true, minLength: 11 });
    register("content", {
      required: true,
    });
    register("tags", {
      required: true,
    });
  }, [register]);

  useEffect(() => {
    // console.log(JSON.stringify(formState.errors, null, 2));
    // console.log(`is valid: ${isValid}`);
    console.log(formState.isValid);
    setIsFormValid(formState.isValid);
  }, [formState.isValid]);

  return (
    <FormProvider {...methods}>
      <div className="min-h-full px-12 py-12 bg-neutral-800 w-224">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Title />
          <BriefDescription />
          <Content />
          <Tags />

          {/* <div className="text-red-500">
            {JSON.stringify(errors, null, 2)}
            {Object.keys(errors).length ? "this form has errors" : ""}
          </div> */}

          <div className="flex justify-center ">
            <button
              type="submit"
              disabled={!isValid}
              className="text-white border bordertext-white disabled:text-gray-400 border rounded border-white disabled:border-gray-400 px-2 py-0.5"
            >
              Create a note
            </button>
          </div>
        </form>

        {/* <h1 className="text-white">form values:</h1>
        <div className="text-white border border-gray-100">
          {JSON.stringify(getValues(), null, 2)}
        </div> */}
      </div>

      {/* <Link href="/">i am a a link</Link> */}
    </FormProvider>
  );
}
