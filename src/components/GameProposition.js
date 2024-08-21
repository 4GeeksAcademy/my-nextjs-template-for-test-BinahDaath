"use client";
import { acceptGame } from "@/services/acceptGame";
export const GameProposition = ({data})=> {
  const handleClick=()=>{
    acceptGame(data.id);
  }
  return (
    <div className="flex flex-row justify-between" onClick={handleClick}>
        <div>{data.color==="white" ? "black":data.color}</div><div>{data.time}</div>
    </div>
  );
};
