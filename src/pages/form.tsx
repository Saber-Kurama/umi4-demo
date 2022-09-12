import { createForm, onFormInit } from "@formily/core";
import { useMemo, useState } from "react";
import { ActionResponse } from "@/components/ActionResponse";

export default function FormPage() {
  // const form = createForm({
  //   initialValues: {
  //     say: "hello",
  //   },
  // });

  const [response, setResponse] = useState("");
  const form = useMemo(
    () =>
      createForm({
        effects() {
          console.log("???>>>>>");
          onFormInit(() => {
            console.log("???");
            // setResponse("表单已初始化");
          });
          console.log("??xx");
        },
      }),
    []
  );
  form.addEffects("saber", (form) => {
    onFormInit(() => {
      console.log("???1111");
      // setResponse("表单已初始化");
    });
  });
  form.onInit();
  form.removeEffects("saber");
  form.onInit();
  return (
    <div>
      这是测试 createForm 的界面
      <ActionResponse response={response} />
    </div>
  );
}
