"use client";
import { Input } from "./Input";
import React, { useState } from "react";
import { createGame } from "@/services/createGame";
import { cancelGame } from "@/services/cancelGame";
//import { getUser } from "@/services/getUser";
export function MyCreatedGame({data}) {
    //const [time,setTime]=useState(null);
    //const [color,setColor]=useState(null);
    //console.log(id);
    const [state,setState]=useState("ok")
    //console.log(data);
    const cancel=()=>{
        setState("canceled");
        cancelGame(data.id);
    }
    return (
        <div className="flex flex-row">
        <div>{data.color}</div><div>{data.time}</div><div>{state}</div>{state==="ok" ? <div onClick={cancel}>cancel</div>:<div></div>}
        </div>
      );
  };
