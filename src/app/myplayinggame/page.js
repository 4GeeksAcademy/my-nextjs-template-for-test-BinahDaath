import { createClient } from "@/utils/supabase/server";
import { getUser } from "@/services/getUser";
import { MyPlayingGame } from "@/components/MyPlayingGame";
export default async function PlayingGameList() {
  const supabase = createClient();
  const user=await getUser();
  //console.log(user)
  //console.log(supabase)
  const { data, error } = await supabase.from("game").select().eq("player1",user.id).neq("status","ended");
    //console.log(data);
  const data1=await supabase.from("game").select().eq("player2",user.id).neq("status","ended");
  if (error) {
    return <div>Error querying data</div>;
  }
  if((data.length===0)&&(data1.data.length===0))
  {
    return <div>you're not playing any game</div> 
  }
  //console.log(data)
  //console.log(data1.data);
  return (
    <div className="flex flex-col">
      {data.map((el)=>{return (<MyPlayingGame key={el.id} data={el}/>)})}
      {data1.data.map((el)=>{return (<MyPlayingGame key={el.id} data={el}/>)})}
    </div>
  );
  //return(<div>test</div>)
}
