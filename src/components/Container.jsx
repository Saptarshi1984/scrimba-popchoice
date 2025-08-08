'use client'

import { useState } from 'react'
import Image from 'next/image'
import UserForm from "@/components/UserForm";


const Container = () => {
      
      const [show, setShow] = useState(true);

  return (
    <div 
    className='w-[393px] h-[852px] bg-[#000C36]
    flex flex-col  items-center justify-evenly'>    
    <div className='w-[235px] h-[174px] !top-[50px] flex flex-col items-center justify-between text-[45px] font-bold !italic'>
        <Image src={'/popcorn.png'} width={99} height={108} alt='logo' />
        <h1>PopChoice</h1>       
    </div>
    {show && <UserForm  show={show} setShow={setShow} />}        
    </div>
  )
}

export default Container
