import { createClient } from "@/utils/supabase/server";
import { getUser } from "@/services/getUser";
import { GameProposition } from "@/components/GameProposition";
export default async function GameList() {
  const supabase = createClient();
  const user=await getUser();
  //console.log(user);
  //console.log(supabase);
  const { data, error } = await supabase.from("game_proposition").select().neq("player",user.id).eq("status","created");
    //console.log(data);
  if (error) {
    return <div>Error querying data</div>;
  }
  if(data.length===0)
  {
    return <div>no game available</div> 
  }
  return (
    <div>
      {data.map((el)=>{return (<div key={el.id} id={el.id}><GameProposition data={el}/></div>)})}
    </div>
  );
}
