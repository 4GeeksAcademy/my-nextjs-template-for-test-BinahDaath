import { createClient } from "@/utils/supabase/server";
import { Td } from "@/components/Td";
import { MyLink } from "@/components/MyLink";
import { createGame } from "@/services/createGame";
import { getUser } from "@/services/getUser";
import { acceptGame } from "@/services/acceptGame";
import { GameProposition } from "@/components/GameProposition";
import { MyCreatedGame } from "@/components/MyCreatedGame";
import { ChessTimer } from "@/components/ChessTimer";
export default async function GameList() {
  //const supabase = createClient();
  //const user=await getUser();
  //console.log(supabase)
  //const { data, error } = await supabase.from("game_proposition").select().eq("player",user.id).eq("status","created");
    //console.log(data);
  //if (error) {
    //return <div>Error querying data</div>;
  //}

  return (
    <ChessTimer id="2" color="black"/>
  );
  //return(<div>test</div>)
}
