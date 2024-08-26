"use server";
import { createClient } from '@supabase/supabase-js'
import { revalidatePath } from "next/cache";
import { getUser } from "@/services/getUser";
export const acceptGame = async (id) => {
  //const supabase = createClient();
  const supabase = createClient("https://tuhjrjpmjlelzyiqvckc.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR1aGpyanBtamxlbHp5aXF2Y2tjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyMTY5MTg4MiwiZXhwIjoyMDM3MjY3ODgyfQ.8hyNUQwQLTekqZPfuJSTew3c3HnC-RuYBfzYc3cHaLA");
  const initial_table=[
    ["brq","bkn","bb","bq","bk","bb","bkn","brk"],
    ["bp","bp","bp","bp","bp","bp","bp","bp"],
    ["","","","","","","",""],
    ["","","","","","","",""],
    ["","","","","","","",""],
    ["","","","","","","",""],
    ["wp","wp","wp","wp","wp","wp","wp","wp"],
    ["wrq","wkn","wb","wq","wk","wb","wkn","wrk"]
];
  console.log(supabase);
  const user=await getUser();
  //const d={player:user.id,status:"created",color:"white",time:600};
  let { data, error } = await supabase
    .from("game_proposition")
    .update({status:"accepted"})
    .eq("id",id)
    .eq("status","created")
    .neq("player",user.id)
    .select();
    if(data[0].color==="white")
    {
      await supabase
      .from("game")
      .insert([{player1:data[0].player,player2:user.id,status:"accepted",time:data[0].time,time1:data[0].time,time2:data[0].time,chesstable:JSON.stringify(initial_table)}])
    }
    else if(data[0].color="black")
    {
      await supabase
      .from("game")
      .insert([{player1:user.id,player2:data[0].player,status:"accepted",time:data[0].time,time1:data[0].time,time2:data[0].time,chesstable:JSON.stringify(initial_table)}])

    }
  console.log(data);
  console.log(error);
  revalidatePath("/");
  
  //if (data.length > 0) {
    //return data[0];
  //}

  return null;
};
