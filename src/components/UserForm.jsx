'use client'

import React from "react";
import { useState } from "react";
import Response from "./Response";

const UserForm = ({show, setShow}) => {

  const inputStyle = "w-[325px] h-[78px] bg-[#3B4877] text-[14px] p-4  rounded-[10px]";
  const sectionStyle = "w-full flex flex-col  items-center !text-left"; 
    
    const [input, setInput] = useState('');
    const [title, setTitle]  = useState('');
    const [chatResponse, setChatResponse] = useState('');
      
    const handleSubmit = async (e) => {
      e.preventDefault();
      
      /* sending input to the route.js for processing */
      const res = await fetch("/api/process", {
        method:"POST",
        headers: {"content-Type": "application/json"},
        body: JSON.stringify({input}),
      });
      
      /* Received result from the route.js and assigned to the data. */
      
      const data = await res.json();
      setChatResponse(data.message);
      setTitle(data.title);
    }
    
    const resetForm = () => {
      setChatResponse('');
      setInput('');
      setTitle('');
      
    }
   

   
  return (

    <div className="w-full  flex flex-col items-center justify-between  ">
      {!chatResponse && <form onSubmit={handleSubmit} id="userForm" className="flex flex-col gap-8 items-center justify-evenly">

        <section className={sectionStyle}>
          <label className="w-[326px] min-h-[26px] text-[16px] ">What’s your favorite movie and why?</label>
          <textarea 
          type="text" 
          className={inputStyle} 
          placeholder="Gadar Because Its about not giving up on you love." 
          required
          value={input}
          name="input"
          onChange={(e) => setInput(e.target.value)}
           />
        </section>

        <section  className={sectionStyle}>
          <label className="w-[326px] h-[46px]">Are you in the mood for something new or a classic?</label>
          <textarea type="text" className={`${inputStyle} text-black`} placeholder="I want to watch movies that were released after 1990" />
        </section>

        <section  className={sectionStyle}>
          <label className="w-[326px] h-[46px]">Do you wanna have fun or do you want something serious?</label>
          <textarea type="text" className={`${inputStyle} text-black`} placeholder="I want to watch something stupid and fun" />
        </section>
        <button 
        type="submit" 
        className="w-[325px] h-[71px] text-[30px] italic text-black font-bold 
        bg-[#51E08A] cursor-pointer hover:bg-green-600 hover:text-gray-200 rounded-[10px]"        
        >Lets Go!</button>
      </form>}
      {chatResponse && <Response title={title} chatResponse={chatResponse} />}
      {chatResponse && <button onClick={resetForm} type='button' className="w-[325px] mt-10 h-[71px] text-[30px] italic text-black font-bold 
        bg-[#51E08A] cursor-pointer hover:bg-green-600 hover:text-gray-200 rounded-[10px]">Go Again</button>}
    </div>
  );
};

export default UserForm;
