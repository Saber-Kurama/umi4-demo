import { ActionResponse } from "@/components/ActionResponse";
import {
  createForm,
  onFieldChange,
  onFieldInit,
  onFieldInitialValueChange,
  onFieldInputValueChange,
  onFieldMount,
  onFieldReact,
  onFieldUnmount,
  onFieldValidateEnd,
  onFieldValidateFailed,
  onFieldValidateStart,
  onFieldValidateSuccess,
  onFieldValueChange,
} from "@formily/core";
import { useMemo, useState } from "react";

export default function FieldEffectHookPage() {
  const [response, setResponse] = useState("");
  const form = useMemo(
    () =>
      createForm({
        // 12 个字段的钩子
        effects() {
          onFieldInit("target", () => {
            setResponse("target已初始化");
          });
          onFieldMount("target", () => {
            setResponse("target已挂载");
          });
          onFieldUnmount("target", () => {
            setResponse("target已卸载");
          });
          onFieldReact("target", () => {
            // 核心原理就是字段初始化的时候会执行回调函数，同时自动追踪依赖，依赖数据发生变化时回调函数会重复执行
            setResponse(
              "target " + (form.values.other === 123 ? "显示" : "隐藏")
            );
          });
          onFieldChange("target", (field: any) => {
            // 用于监听某个字段的属性变化的副作用钩子
            console.log("??>>>");
            setResponse("target值变化：" + field.value);
          });
          onFieldChange("target", ["component"], () => {
            setResponse("target组件变化");
          });
          onFieldValueChange("target", (field) => {
            console.log("val---");
            setResponse("target值变化：" + field.value);
          });
          onFieldInitialValueChange("target", (field) => {
            // 用于监听某个字段默认值变化的副作用钩子
            setResponse("target默认值变化：" + field.value);
          });
          onFieldInputValueChange("target", (field) => {
            // 用于监听某个字段 onInput 触发的副作用钩子
            setResponse("target 值变化：" + field.value);
          });
          onFieldValidateStart("target", () => {
            setResponse("target校验开始");
          });
          onFieldValidateEnd("target", () => {
            setResponse("target校验结束");
          });
          onFieldValidateFailed("target", () => {
            setResponse("target校验失败");
          });
          onFieldValidateSuccess("target", () => {
            setResponse("target校验成功");
          });
        },
      }),
    []
  );
  return (
    <ActionResponse response={response}>
      <button
        onClick={() => {
          form.createField({ name: "target" });
        }}
      >
        创建字段
      </button>
      <button
        onClick={() => {
          form.createField({ name: "target" }).onMount();
        }}
      >
        创建并挂载字段
      </button>
      <button
        onClick={() => {
          form.createField({ name: "target" }).onUnmount();
        }}
      >
        卸载字段
      </button>
      <button
        onClick={() => {
          const field = form.createField({ name: "other" });
          field.setValue(123);
        }}
      >
        赋值other = 123
      </button>
      <button
        onClick={() => {
          const field = form.createField({ name: "other" });
          field.setValue(null);
        }}
      >
        赋值other = null
      </button>
      <button
        onClick={() => {
          const field = form.createField({ name: "target" });
          field.setValue(field.value ? field.value + 1 : 1);
        }}
      >
        设置值
      </button>
      <button
        onClick={() => {
          const field = form.createField({ name: "target" });
          field.setComponent("Input");
        }}
      >
        设置组件
      </button>
      <button
        onClick={() => {
          const field = form.createField({ name: "target" });
          field.setInitialValue(field.value ? field.value + 1 : 1);
        }}
      >
        设置初始值
      </button>
      <button
        onClick={() => {
          const field = form.createField({ name: "target" });
          field.onInput(field.value ? field.value + 1 : 1);
        }}
      >
        调用onInput
      </button>
      <button
        onClick={() => {
          const field = form.createField({ name: "target", required: true });
          field.onInput("");
        }}
      >
        触发校验
      </button>
      <button
        onClick={() => {
          const field = form.createField({ name: "target", required: true });
          field.onInput("");
        }}
      >
        触发失败
      </button>
      <button
        onClick={() => {
          const field = form.createField({ name: "target", required: true });
          field.onInput("123");
        }}
      >
        触发成功
      </button>
    </ActionResponse>
  );
}
