import { createClient } from "@/utils/supabase/server";
import { Td } from "@/components/Td";
import { MyLink } from "@/components/MyLink";
import { createGame } from "@/services/creategame";
import { getUser } from "@/services/getUser";
import { acceptGame } from "@/services/acceptGame";
import { GameProposition } from "@/components/GameProposition";
import { MyCreatedGame } from "@/components/MyCreatedGame";
import { ChessTimer } from "@/components/ChessTimer";
import { ChessTable } from "@/components/Chesstable";
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
    <ChessTable playerColor="white"/>
  );
  //return(<div>test</div>)
}
