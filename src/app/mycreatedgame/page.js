import { createClient } from "@/utils/supabase/server";
import { getUser } from "@/services/getUser";
import { MyCreatedGame } from "@/components/MyCreatedGame";
export default async function CreatedGameList() {
  const supabase = createClient();
  const user=await getUser();
  //console.log(user)
  //console.log(supabase)
  const { data, error } = await supabase.from("game_proposition").select().eq("player",user.id).eq("status","created");
    //console.log(data);
  if (error) {
    return <div>Error querying data</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      {data.map((el)=>{return (<div key={el.id} id={el.id}><MyCreatedGame data={el}/></div>)})}
    </div>
  );
  //return(<div>test</div>)
}
