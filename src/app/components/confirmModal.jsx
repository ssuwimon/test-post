import { Modal } from 'antd'
import React, { useEffect } from 'react'

const {confirm} = Modal
export default function ConfirmModal(props) {
    const {title,open,onConfirm,onCancel} = props
    useEffect(() => {
        if (open) {
          confirm({
            content: title,
            onOk() {
                onConfirm()
            },
            onCancel() {
              onCancel()
            },
          });
        } else {
        }
      }, [open]);
      return null
}
