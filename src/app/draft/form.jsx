'use client'
import React, { useEffect, useState } from 'react'
import FormItem from '../components/form'
import Form from 'antd/es/form/Form'
import { usePathname, useRouter } from 'next/navigation'
import ConfirmModal from '../components/confirmModal'
import { Button, Modal } from 'antd'


export default function DraftForm(props) {
    const { isOpenModal, onCancel, id } = props
    const [form] = Form.useForm();
    const pathname = usePathname()
    const [isConfirmModalOpen, setIsOpenConfirmModal] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [idPost, setIdPost] = useState()
    const [error, setError] = useState("")

    const router = useRouter()


    const postData = async (values) => {
        try {
            const response = !id ? await fetch('https://post-api.opensource-technology.com/api/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            }) :

                await fetch(`https://post-api.opensource-technology.com/api/posts/${id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(values),
                })
            return response
        } catch (error) {
            setError('Please try again.');

        }
    }


    const handleSaveAndclose = async () => {
        const values = await form.validateFields();
        const response = await postData(values);
        if (response?.ok) {
        setError();
            if (pathname === '/' && !id) {
                router.push('/draft')
            } else {
                onCancel(response?.ok)
                form.resetFields()
            }
        }else{
        setError('Please try again.');
        }

    }




    const handleSave = async () => {
        const values = await form.validateFields();
        const response = await postData(values);
        const data = await response.json()
        if (response?.ok) {
            setIdPost(data?.id)
            setIsSuccess(true)
            setError()
        }else{
        setError('Please try again.');

        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`https://post-api.opensource-technology.com/api/posts/${id}`);
                const data = await res.json();
                form.setFieldsValue({
                    title: data?.title,
                    content: data?.content,
                    published: data?.published,
                });

            } catch (error) {
                setError('Please try again.');
            }
        };

        id && fetchData()
    }, [id])

    const onPublish = async () => {
        const response = await fetch(`https://post-api.opensource-technology.com/api/posts/${id || idPost}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "published": true
            }),
        })
        if (response?.ok) {
            if (pathname === '/draft' && idPost) {
                router.push('/')
            }
            else {
                onCancel(response?.ok)
                form.resetFields()
            }
            setIsSuccess(false)
            setError()
        }else{
        setError(' Please try again.');

        }
    }
    const onDelete = () => {
        setIsOpenConfirmModal(true)
    }

    const onConfirm = async () => {
        try {
            const response = await fetch(`https://post-api.opensource-technology.com/api/posts/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            if (response?.ok) {
                onCancel()
                form.resetFields()
                setError()
            }else{
                setError(' Please try again.');
            }
            setIsOpenConfirmModal(false)
        } catch (error) {
            setError(' Please try again.');

        }
    }
    return (
        <Modal
            title={id ? "Edit Post" : "New Post"}
            open={isOpenModal}
            onCancel={async() => {
                setError("")
                setIsSuccess(false)
                form.resetFields()
                onCancel()
               
            }}
            footer={[
                <div className='flex gap-2 justify-end'>
                    <Button onClick={() => {
                        onCancel()
                        setError("")
                        setIsSuccess(false)
                        form.resetFields()
                    }}>
                        cancel
                    </Button>
                    {id && <Button onClick={() => onDelete(id)}>delete</Button>}
                    {!id && <Button onClick={handleSave}>save</Button>}
                    <Button onClick={handleSaveAndclose}> save & close </Button>
                </div>
            ]}
        >
            <Form
                form={form}
                layout="vertical"
                autoComplete="off"
            >
                <FormItem
                    name="title"
                    label="title"
                    required />
                <FormItem
                    name="content"
                    label="content"
                    required
                    textArea />
                <p></p>
                <FormItem
                    type="button"
                    name="published"
                    onClick={onPublish}
                    hidden={id}
                    disabled={!isSuccess}
                />
            </Form>
            {error && <div className='text-[#ef4c4c]'>{error}</div> }

            <ConfirmModal
                // onCancel={onCancelConfirm}
                onConfirm={onConfirm}
                ExclamationCircleFilled
                title="ยืนยันที่จะลบ Post นี้ ? "
                open={isConfirmModalOpen} />
        </Modal>
    )
}
