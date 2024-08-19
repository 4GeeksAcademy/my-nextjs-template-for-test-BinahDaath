import { ChessTable } from "@/components/ChesstableTest";
import { createClient } from "@/utils/supabase/server";
//import { getUser } from "@/services/getUser";
export default async function PersonsList() {
    const supabase = createClient();
    const {data,error}= await supabase
    .from("game")
    .select()
    //const user=await getUser();
    //console.log(user);
  return (<div>{data.map((el)=>{return <div>{el.id}</div>})}</div>

  )}
  