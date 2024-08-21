"use client";
import { Input } from "./Input";
import React, { useEffect,useState } from "react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
//import { getUser } from "@/services/getUser";
export function ChessTimer({id,color}) {
    const [time,setTime]=useState(0);
    const [timer,setTimer]=useState();
    const [player,setPlayer]=useState(null);
    const [supabase,setSupabase]=useState(createClient());
    const formatTime=(t)=>{
       let day=Math.floor(t/(3600*24));
        let hour=Math.floor((t-day*3600*24)/3600);
        let minute=Math.floor((t-day*3600*24-hour*3600)/60);
        let second=(t-day*3600*24-hour*3600-minute*60);
        let ta={day:day,hour:String(hour).padStart(2,"0"),minute:String(minute).padStart(2,"0"),second:String(second).padStart(2,"0")};
        let daydiv=<div>{ta.day}</div>;
        let hourdiv=<div>{ta.hour}</div>;
        let minutediv=<div>{ta.minute}</div>;
        let seconddiv=<div>{ta.second}</div>
        //console.log(ta);
        return (<div className="flex flex-row">{day!==0 ? (ta.day+":"):""}{((day===0)&&(hour===0)) ? "":(ta.hour+":")}{(ta.minute+":")}{ta.second}</div>);
    }
    //supabase.from("game").select().eq("id",id).then((p)=>{
    //setPlayer(p.data[0].first_name);
    //})
    useEffect(()=>{
        supabase.from("game").select().eq("id",id).then((v)=>{
            console.log(v.data[0].player1);
            supabase.from("profiles").select().eq("id",v.data[0].player1).then((p)=>{
                setPlayer(p.data[0].first_name);
                //console.log(p);
            })
        })
    },[])
    useEffect(()=>{
        //console.log("time:"+time);
    setTimeout(()=>{setTime(time+1)},1000);
    supabase.from("game").select().eq("id",id).then((v)=>{
        console.log(v.data[0].turn);
        //console.log(v);
        //console.log(timer);
        //console.log(v.data[0].time1-(Math.floor(((new Date()).getTime()/1000))-v.data[0].lastplay));
    if(v.data[0].turn===color)
    {
        if(color==="white")
        {
            setTimer(v.data[0].time1-(Math.floor(((new Date()).getTime()/1000))-v.data[0].lastplay));
        }
        else{
            setTimer(v.data[0].time2-(Math.floor(((new Date()).getTime()/1000))-v.data[0].lastplay));
        }
    }
    else{
        if(color==="white")
        {
            setTimer(v.data[0].time1);
        }
        else
        {
            setTimer(v.data[0].time2);
        }
    }
    });
    },[time])
    //console.log(id);
    //console.log(data);
    const d=(Math.floor((new Date()).getTime()/1000)%(24*3600));
    //console.log(d);
   return (
    <div className="flex flex-col">{formatTime(timer)}</div>
      );
    //return (<div></div>);
  };
