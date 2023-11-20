import React from 'react'
import moment from 'moment'
import { MdEdit, MdDelete } from "react-icons/md";
import { Button, Tag } from 'antd';
export default function ListPost(props) {
  const { title, content,onPublish, created_at, id, onDelete, draft } = props
  const onEdit = (id) => {
    props.onEdit(id)
  }

  return <div className={`border-2 border-[#e9e9e9] my-2 rounded-lg p-6 w-[80%]`}>
    <div className='flex justify-between items-center font-bold '>
      {title}
      <div className='flex gap-2 '>
        <MdEdit onClick={() => onEdit(id)} fontSize={30} color='#F0B41C' className='cursor-pointer hover:color-black' />
        <MdDelete fontSize={30} onClick={() => {
          onDelete(id)

        }} color='#C30707' className='cursor-pointer' />
        {draft &&
          <Button  type="primary" onClick={() => onPublish(id)} >Published</Button>}
      </div>
    </div>
    <div className='flex gap-4 mt-4'>
      <div className='font-light break-words w-full'>{content}</div>
    </div>
    <Tag bordered={false} color="blue" className='mt-4'>
      <div >
        {moment(created_at).format('LL , LT')}
      </div>
    </Tag>
  </div>
}
