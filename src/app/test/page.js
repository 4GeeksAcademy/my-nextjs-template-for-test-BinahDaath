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
    console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    console.log(user);
    let playerColor;
    if(user)
    {
      if(data[0].player1===user.id)
    {
      playerColor="white";
    }
    else if(data[0].player2===user.id)
    {
      playerColor="black";
    }
  }
  else
  {
    playerColor="white";
  }
    //console.log(user);
  return (<ChessTable playerColor={playerColor} id="2" />

  )}
  