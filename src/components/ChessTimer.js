"use client";
import { Input } from "./Input";
import React, { useState } from "react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
//import { getUser } from "@/services/getUser";
export function ChessTimer({id,color}) {
    const [time,setTime]=useState();
    const [timer,setTimer]=useState();
    const [player,setPlayer]=useState(null);
    const [supabase,setSupabase]=useState(createClient());
    const formatTime=(t)=>{
        let day=Math.floor(t/(3600*24));
        let hour=Math.floor((t-day*3600*24)/3600);
        let minute=Math.floor((t-day*3600*24-hour*3600)/60);
        let second=(t-day*3600*24-hour*3600-minute*60);
        return {day:day,hour:String(hour).padStart(2,"0"),minute:String(minute).padStart(2,"0"),second:String(second).padStart(2,"0")};
    }
    //supabase.from("game").select().eq("id",id).then((p)=>{
      //  setPlayer1(p.data[0].first_name);
    //})
    useEffect(()=>{console.log("time:"+time);
    setTimeout(()=>{setTime(time+1)},1000);
    supabase.from("game").select().eq("id",id).then((v)=>{
    if(v.data.turn===color)
    {
        if(color==="white")
        {
            setTimer(v.data.time1-(Math.floor(((new Date()).getTime()/1000))-v.data.lastplay));
        }
        else{
            setTimer(v.data.time2-(Math.floor(((new Date()).getTime()/1000))-v.data.lastplay));
        }
    }
    else{
        if(color==="white")
        {
            setTimer(v.data.time1);
        }
        else
        {
            setTimer(v.data.time2);
        }
    }
    });
    },[time])
    //console.log(id);
    //console.log(data);
   return (
    <div className="flex flex-col"></div>
      );
    //return (<div></div>);
  };
