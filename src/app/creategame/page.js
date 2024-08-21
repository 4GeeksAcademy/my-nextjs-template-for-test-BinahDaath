import { createClient } from "@/utils/supabase/server";
import { getUser } from "@/services/getUser";
import { CreateGame } from "@/components/CreateGame";
export default async function GameList() {
  const supabase = createClient();
  const user=await getUser();
  //console.log(user);
  //console.log(supabase);
  /*const { data, error } = await supabase.from("game_proposition").select().neq("player",user.id).eq("status","created");
    console.log(data);
  if (error) {
    return <div>Error querying data</div>;
  }

  return (
    <div>
      {data.map((el)=>{return (<div key={el.id} id={el.id}><GameProposition data={data[0]}/></div>)})}
    </div>
  );*/
  return(<CreateGame/>)
}
