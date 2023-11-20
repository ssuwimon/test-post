import { Input } from 'antd'
import React from 'react'
import { IoSearchOutline } from "react-icons/io5";
export default function SearchBar(props) {
    const {onChange,value} = props
  return (
    <div>
      <Input 
      value={value}
      onChange={onChange}
      placeholder='search'
      prefix={<IoSearchOutline/>}
      />
    </div>
  )
}
