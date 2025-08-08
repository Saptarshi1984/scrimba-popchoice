'use client'
import React from 'react'

const Response = ({message }) => {
  return (
    <div className='w-full flex flex-col items-center justify-center mt-8'>
      <h1 className='text-[24px] font-bold mb-4'>Recommended Movie</h1>
      <div className='w-[325px] min-h-[176px] p-4 bg-[#3B4877] rounded-[10px] text-white'>
        <h1 className='text-[24px] font-bold mb-4'>Title</h1>
        <p className='text-[16px] leading-relaxed whitespace-pre-wrap'>{message}</p>
      </div>
    </div>
  )
}

export default Response

