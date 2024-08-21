"use client";
import { Input } from "./Input";
import React, { useState } from "react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
//import { getUser } from "@/services/getUser";
export function MyPlayingGame({data}) {
    const [time,setTime]=useState(data.time);
    const [player1,setPlayer1]=useState(null);
    const [player2,setPlayer2]=useState(null);
    const [supabase,setSupabase]=useState(createClient());
    supabase.from("profiles").select().eq("id",data.player1).then((p)=>{
        setPlayer1(p.data[0].first_name);
    })
    supabase.from("profiles").select().eq("id",data.player2).then((p)=>{
      setPlayer2(p.data[0].first_name);})
    //console.log(id);
    //console.log(data);
   return (
        <Link href={`/game/${data.id}`}><div className="flex flex-row gap-4">
            <div>{player1}</div><div>{player2}</div><div>{time}</div>
        </div>
        </Link>
      );
    //return (<div></div>);
  };
