import { ChessTable } from "@/components/ChesstableTest";
import { createClient } from "@/utils/supabase/server";
import { getUser } from "@/services/getUser";
import { ChessTimer } from "@/components/ChessTimer";
export default async function PersonsList({ params: { id } }) {
    const supabase = createClient();
    const {data,error}= await supabase
    .from("game")
    .select()
    .eq("id",id);
    const user=await getUser();
    let playerColor;
    if(data[0].player1===(user ? user.id:0))
    {
      playerColor="white";
    }
    else if(data[0].player2===(user ? user.id:0))
    {
      playerColor="black";
    }
    else{
      playerColor="white";
    }
    //console.log(user);
  return (<div className="flex flex-row"><ChessTable playerColor={playerColor} id={id} /><div><ChessTimer id={id} color={playerColor==="white" ? "black":"white"} bottom={false}/><ChessTimer id={id} color={playerColor} bottom={true}/></div></div>

  )}
  