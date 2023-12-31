import React from 'react'
import { Input, Form, Button } from 'antd'
import TextArea from 'antd/es/input/TextArea'

export default function FormItem(props) {
  const { name, textArea, label, required, type, onClick, isPublish, ...res } = props
  return (
    <Form.Item
      label={label}
      name={name}
      {...res}
      rules={[
        {
          required: required ? true : false,
          message: `Please input ${label}`
        }
      ]}
    >
      
      {
        type ?
          <Button
            {...res}
            onClick={onClick}>
            Publish now
          </Button>
          : textArea ? <TextArea
            placeholder={label}
            autoSize={{
              minRows: 3,
              maxRows: 5,
            }}
          /> : <Input placeholder={label} />
      }
    </Form.Item>
  )
}
