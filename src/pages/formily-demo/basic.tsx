import { createForm, onFormInit, onFormMount } from "@formily/core";
import { Field } from "@formily/react";
import { Form, FormItem, Input } from "@formily/antd";
// import { Input } from "antd";
import { UserOutlined } from "@ant-design/icons";

export default function BasicPage() {
  const normalForm = createForm({
    initialValues: {
      username: "saber",
    },
    validateFirst: true,
    effects(form) {
      console.log("form-----", form);
      onFormInit(() => {
        console.log("onFormInit ---- 初始化完成");
      });
      onFormMount(() => {
        console.log("onFormMount ---- 表单挂载完成");
      });
    },
  });
  return (
    <div>
      <Form
        form={normalForm}
        layout="vertical"
        size="large"
        onAutoSubmit={console.log}
      >
        <Field
          pattern="readPretty"
          name="username"
          title="用户名"
          required
          decorator={[FormItem]}
          component={[
            Input,
            {
              prefix: <UserOutlined />,
            },
          ]}
        ></Field>
      </Form>
    </div>
  );
}
