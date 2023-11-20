'use client'
import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation'

export default function WrapperHeader() {
  const pathname = usePathname()
  return (
    <div className='m-auto  w-[80%] py-4 font-semibold'>
       <div className='flex gap-4'>
       <Link href={'/'} className={`px-4 py-2 ${pathname === '/' ? 'bg-[#e9e9e9] rounded-lg px-4' : ''}`}>post</Link>
      <Link href={'/draft'} className={`px-4 py-2 ${pathname === '/draft' ? 'bg-[#e9e9e9] rounded-lg px-4' : ''}`}>draft</Link>

       </div>
    </div>
  )
}
