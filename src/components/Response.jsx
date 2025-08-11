'use client'
import React from 'react'

const Response = ({ title, chatResponse }) => {
  return (
    <div className='w-full flex flex-col items-center justify-center mt-8'>
      <h1 className='text-[24px] font-bold mb-4'>Recommended Movie</h1>
      <div className='w-[325px] min-h-[176px] p-4 bg-[#3B4877] rounded-[10px] text-white'>
        <h1 className='text-[24px] font-bold mb-4'>{title}</h1>
        <p className='text-[16px] leading-relaxed whitespace-pre-wrap text-justify'>{chatResponse}</p>
      </div>
    </div>
  )
}

export default Response

