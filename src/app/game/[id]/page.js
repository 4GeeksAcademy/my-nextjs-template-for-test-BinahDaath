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
    if(data[0].player1===user.id)
    {
      playerColor="white";
    }
    else if(data[0].player2===user.id)
    {
      playerColor="black";
    }
    //console.log(user);
  return (<div><ChessTable playerColor={playerColor} id={id} /><ChessTimer id={id} color="black"/></div>

  )}
  