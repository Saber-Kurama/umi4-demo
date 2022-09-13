import { createForm } from "@formily/core";
import { Field } from "@formily/react";
import { Form, FormItem, Input } from "@formily/antd";
// import { Input } from "antd";
import { UserOutlined } from "@ant-design/icons";

export default function BasicPage() {
  const normalForm = createForm({
    validateFirst: true,
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
