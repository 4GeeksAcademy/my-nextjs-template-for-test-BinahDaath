import { ChessTable } from "@/components/ChesstableTest";
import { createClient } from "@/utils/supabase/server";
import { getUser } from "@/services/getUser";
export default async function PersonsList() {
    const supabase = createClient();
    const {data,error}= await supabase
    .from("game")
    .select()
    .eq("id",2);
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
  return (<ChessTable playerColor={playerColor} id="2" />

  )}
  