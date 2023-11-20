'use client'
import React, { useEffect, useState } from 'react'
import ListPost from '../components/listPost';
// import Button from '../components/button';
import DraftForm from './form';
import ConfirmModal from '../components/confirmModal';
import WrapperHeader from '../components/header';
import SearchBar from '../components/search';
import { Button } from 'antd';

export default function DraftPage() {
  const [data, setData] = useState()
  const [isModalOpen, setIsOpenModal] = useState(false)
  const [isConfirmModalOpen, setIsOpenConfirmModal] = useState(false)
  const [id, setId] = useState()
  const [isSuccess, setIsSuccess] = useState()
  const [search, setSearch] = useState()

  const handleOpen = () => {
    setIsOpenModal(true)
  }

  const onCancel = (isOk) => {
    setIsSuccess(isOk)
    setId()
    setIsOpenModal(false)
  }

  const onCancelConfirm = () => {
    setIsOpenConfirmModal(false)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('https://post-api.opensource-technology.com/api/posts/draft');
        const fetchedData = await res.json();
          setData(fetchedData?.posts);
        setIsSuccess(false)
        
      } catch (error) {
      }
    };
    fetchData()
  }, [isSuccess])

  const onEdit = (id) => {
    setIsOpenModal(true)
    setId(id)
  }

  const onDelete = (id) => {
    setIsOpenConfirmModal(true)
    setId(id)
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
        setIsSuccess(response?.ok)
      }
      setIsOpenConfirmModal(false)
    } catch (error) {

    }
  }

  const onPublish = async (id) => {
    const req = {
      published: true
    }
    try {
      const res = await fetch(`https://post-api.opensource-technology.com/api/posts/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(req),
      })

      if(res?.ok){
        onCancel()
      }
      
    } catch (error) {

    }
  }
  return (
    <div className='flex flex-col items-center w-[100%]'>
    <div className='flex justify-end  w-[80%]  mb-2'>
      <Button onClick={handleOpen}>
          create draft
        </Button>
        </div>
     <div className='flex flex-col items-center w-[100%]'>

      {
        data && data?.map((item) => {
          return <ListPost {...item}
           draft 
           onEdit={onEdit}
            onDelete={onDelete} 
            onPublish={onPublish}
            />
        })
      }
    </div>

      <DraftForm
        id={id}
        onCancel={onCancel}
        isOpenModal={isModalOpen} />

      <ConfirmModal
        onCancel={onCancelConfirm}
        onConfirm={onConfirm}
        ExclamationCircleFilled
        title="ยืนยันที่จะลบ Draft นี้ ? "
        open={isConfirmModalOpen} />
    </div>

  )
}
