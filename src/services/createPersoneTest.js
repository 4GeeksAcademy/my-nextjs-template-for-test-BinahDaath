"use server";

//import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { createClient } from '@supabase/supabase-js'

export const createPerson = async (personData) => {
  const supabase = createClient("https://tuhjrjpmjlelzyiqvckc.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR1aGpyanBtamxlbHp5aXF2Y2tjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyMTY5MTg4MiwiZXhwIjoyMDM3MjY3ODgyfQ.8hyNUQwQLTekqZPfuJSTew3c3HnC-RuYBfzYc3cHaLA");
  console.log(supabase);
  const { data, error } = await supabase
    .from("todos")
    .insert([personData])
    .select();

  revalidatePath("/");

  if (data.length > 0) {
    return data[0];
  }

  return null;
};
