"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { getUser } from "@/services/getUser";
export const createGame = async (gameData) => {
  const supabase = createClient();
  //const supabase = createClient("https://tuhjrjpmjlelzyiqvckc.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR1aGpyanBtamxlbHp5aXF2Y2tjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyMTY5MTg4MiwiZXhwIjoyMDM3MjY3ODgyfQ.8hyNUQwQLTekqZPfuJSTew3c3HnC-RuYBfzYc3cHaLA");
  console.log(supabase);
  const { data, error } = await supabase
    .from("game_proposition")
    .insert([personData])
    .select();

  revalidatePath("/");

  if (data.length > 0) {
    return data[0];
  }

  return null;
};
