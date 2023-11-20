'use client'
import { useEffect, useState } from 'react'
import DraftForm from './draft/form'
import { Button, Pagination } from 'antd'
import ListPost from './components/listPost'
import SearchBar from './components/search'
import ConfirmModal from './components/confirmModal'

export default function Home() {
  const [isModalOpen, setIsOpenModal] = useState(false)
  const [data, setData] = useState()
  const [id, setId] = useState()
  const [idDelete, setIdDelete] = useState()
  const [search, setSearch] = useState()
  const [isSuccess, setIsSuccess] = useState()
  const [isConfirmModalOpen, setIsOpenConfirmModal] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`https://post-api.opensource-technology.com/api/posts?page=${data?.page}&limit=${data?.limit}${search ? `&term=${search} ` : ''}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const fetchedData = await res.json();
        setData({
          data: fetchedData?.posts,
          count: fetchedData?.count,
          page: fetchedData?.page,
          limit: fetchedData?.limit
        });
        setIsSuccess(false)
      } catch (error) {
        setError(' Please try again.');

      }
    };

    fetchData()
  }, [search, isSuccess, data?.page, data?.limit])
  const onConfirm = async () => {
    try {
      const response = await fetch(`https://post-api.opensource-technology.com/api/posts/${idDelete}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (response?.ok) {
        setIsSuccess(response?.ok)
      } else {
        setError('Please try again.');

      }
      setIsOpenConfirmModal(false)
      setId()
    } catch (error) {
      setError('Please try again.');

    }
  }

  const handleOpen = () => {
    setIsOpenModal(true)
  }

  const onCancel = (isOk) => {
    setIsSuccess(isOk)
    setIsOpenModal(false)
    setSearch("")
    setId()
  }

  const onEdit = (id) => {
    setIsOpenModal(true)
    setId(id)
  }
  const onDelete = (id) => {
    setIsOpenConfirmModal(true)
    setIdDelete(id)
  }

  const onCancelConfirm = () => {
    setIsOpenConfirmModal(false)
  }

  const onChangePagination = (page, pageSize) => {
    setData({
      ...data,
      page: page === 0 ? 1 : page,
      limit: pageSize
    })

  }

  return (
    <div className='flex flex-col items-center w-[100%]'>
      <div className='flex w-[80%] justify-between mb-2'>
        <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} />
        <Button
          onClick={handleOpen}
        >
          create draft
        </Button>
      </div>
      <div className='flex flex-col items-center w-[100%]'>
        {error && <div className='text-[#ef4c4c]'>{error}</div>}

        {
          data && data?.data?.map((item) => {
            return <ListPost {...item} key={item?.id} onEdit={onEdit} onDelete={onDelete} />
          })
        }
      </div>
      <DraftForm
        id={id}
        onCancel={onCancel}
        isOpenModal={isModalOpen} />
      <Pagination
        current={data?.page}
        onChange={onChangePagination}
        total={data?.count} />
      <ConfirmModal
        onCancel={onCancelConfirm}
        onConfirm={onConfirm}
        ExclamationCircleFilled
        title="ยืนยันที่จะลบ Post นี้ ? "
        open={isConfirmModalOpen} />
    </div>
  )
}
