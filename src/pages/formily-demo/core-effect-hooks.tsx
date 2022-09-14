import {
  createForm,
  onFormInit,
  onFormInitialValuesChange,
  onFormInputChange,
  onFormMount,
  onFormReact,
  onFormSubmit,
  onFormSubmitEnd,
  onFormSubmitFailed,
  onFormSubmitStart,
  onFormSubmitSuccess,
  onFormSubmitValidateEnd,
  onFormSubmitValidateFailed,
  onFormSubmitValidateStart,
  onFormUnmount,
  onFormValidateEnd,
  onFormValidateFailed,
  onFormValidateStart,
  onFormValidateSuccess,
  onFormValuesChange,
} from "@formily/core";
import { ActionResponse } from "@/components/ActionResponse";
import { useMemo, useState } from "react";

export default function CoreEffectHookPage() {
  const [response, setResponse] = useState("");
  const form = useMemo(
    () =>
      createForm({
        initialValues: {
          input: "saber",
        },
        effects() {
          // 20个
          onFormInit(() => {
            setResponse("表单已经初始化");
          });
          onFormMount(() => {
            setResponse("表单已挂载");
          });
          onFormUnmount(() => {
            setResponse("表单已卸载");
          });
          onFormReact((form) => {
            // 核心原理就是表单初始化的时候会执行回调函数，同时自动追踪依赖，依赖数据发生变化时回调函数会重复执行
            // console.log("onFormReact", form.values.input);
            console.log("onFormReact");
            // if (form.values.input == "Hello") {
            //   setResponse("响应Hello");
            // } else if (form.values.input == "World") {
            //   setResponse("响应World");
            // }
          });
          onFormValuesChange((form) => {
            // 用于监听表单值变化的副作用钩子
            console.log("onFormValuesChange");
            setResponse("表单值变化: " + form.values.input);
          });
          onFormInitialValuesChange((form) => {
            // 用于监听表单默认值变化的副作用钩子
            setResponse("表单默认值变化: " + form.values.input);
          });
          onFormInputChange((form) => {
            // 用于监听字段输入的副作用钩子
            setResponse("字符输入变化: " + form.values.input);
          });
          onFormSubmitStart(() => {
            console.log("表单提交开始");
            setResponse("表单提交开始");
          });
          onFormSubmit(() => {
            console.log("表单已提交");
            setResponse("表单已提交");
          });
          onFormSubmitEnd(() => {
            console.log("表单提交结束");
            setResponse("表单提交结束");
          });
          onFormSubmitFailed(() => {
            setResponse("表单提交失败");
            setResponse("表单校验失败");
          });
          onFormSubmitSuccess(() => {
            setResponse("表单提交成功");
          });
          onFormSubmitValidateStart(() => {
            setResponse("表单提交校验开始");
          });
          onFormSubmitValidateEnd(() => {
            setResponse("表单提交校验结束");
          });
          onFormSubmitValidateFailed(() => {
            setResponse("表单提交校验失败");
          });
          onFormSubmitValidateFailed(() => {
            setResponse("表单提交校验失败");
          });
          onFormValidateStart(() => {
            setResponse("表单校验开始");
          });
          onFormValidateEnd(() => {
            setResponse("表单校验结束");
          });
          onFormValidateFailed(() => {
            setResponse("表单校验失败");
          });
          onFormValidateSuccess(() => {
            setResponse("表单校验成功");
          });
        },
      }),
    []
  );
  return (
    <div>
      <ActionResponse response={response}>
        <button
          onClick={() => {
            form.onMount();
          }}
        >
          挂载表单
        </button>
        <button
          onClick={() => {
            form.onUnmount();
          }}
        >
          卸载表单
        </button>
        <button
          onClick={() => {
            form.setValuesIn("input", "Hello");
          }}
        >
          Hello
        </button>
        <button
          onClick={() => {
            form.setValuesIn("input", "World");
          }}
        >
          World
        </button>
        <button
          onClick={() => {
            form.setInitialValuesIn("input", "Hello World");
          }}
        >
          默认值Hello World
        </button>
        <button
          onClick={() => {
            form
              .createField({
                name: "input",
              })
              .onInput("Hello World");
          }}
        >
          输入Hello World
        </button>
        <button
          onClick={() => {
            form.submit(() => {
              console.log("???>>>");
            });
          }}
        >
          Submit
        </button>
        <button
          onClick={() => {
            form.submit(() => {
              return Promise.reject("Runtime Error");
            });
          }}
        >
          Submit Runtime Error
        </button>
        <button
          onClick={() => {
            form.createField({
              name: "input",
              required: true,
            });
            form.validate();
          }}
        >
          校验
        </button>
      </ActionResponse>
    </div>
  );
}
