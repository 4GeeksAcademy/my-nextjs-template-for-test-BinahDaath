"use client";
import { Input } from "./Input";
import React, { useState } from "react";
import { createGame } from "@/services/createGame";
//import { getUser } from "@/services/getUser";
export function CreateGame() {
    const [time,setTime]=useState(null);
    const [color,setColor]=useState(null);
    //console.log(id);
  const handleColorChange=(el)=>{
    setColor(el.target.value);
  }
  const handleTimechange=(el)=>{
    setTime(el.target.value);

  }
  const handleClick=()=>{
    if(((color==="white")||(color==="black"))&&(time>0))
    {
      const d={status:"created",color:color,time:time};
      createGame(d);
    }
  }

    return (
        <form>
          <div className="flex flex-col gap-3 w-6/12 mx-auto p-4 shadow mt-5 rounded">
            <div className="flex flex-col">
              <label htmlFor="color">color</label>
              <Input
                type="text"
                id="color"
                onChange={handleColorChange}/>
              <div className="text-xs text-red-600">
              </div>
            </div>
    
            <div className="flex flex-col">
              <label htmlFor="time">time</label>
              <Input
                type="number"
                id="time"
              onChange={handleTimechange}/>
              </div>
              </div>
              <div onClick={handleClick}><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">creategame</button></div>
        </form>
      );
  };
