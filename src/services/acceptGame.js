"use server";

//import { createClient } from "@/utils/supabase/server";
import { createClient } from '@supabase/supabase-js'
import { revalidatePath } from "next/cache";
import { getUser } from "@/services/getUser";
import { ChessTable } from '@/components/Chesstable';
export const acceptGame = async (id) => {
  //const supabase = createClient();
  const supabase = createClient("https://tuhjrjpmjlelzyiqvckc.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR1aGpyanBtamxlbHp5aXF2Y2tjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyMTY5MTg4MiwiZXhwIjoyMDM3MjY3ODgyfQ.8hyNUQwQLTekqZPfuJSTew3c3HnC-RuYBfzYc3cHaLA");
  console.log(supabase);
  const user=await getUser();
  const { data, error } = await supabase
    .from("game_proposition")
    .update({status:"accepted"})
    .eq("id",id)
    .select();
    if(data.color==="black")
    {
      supabase
      .from("game")
      .insert([{player1:data.player,player2:user.id,status:"accepted",time,time1,time2,chesstable}])
    }

  console.log(data);
  console.log(error);
  revalidatePath("/");

  if (data.length > 0) {
    return data[0];
  }

  return null;
};
