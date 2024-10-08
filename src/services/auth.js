"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function login({ email, password }) {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  console.log(data);
  if (!error) {
    revalidatePath("/");
    redirect("/");
  }
}

export async function signup({ email, password }) {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options:{
      data:{
        first_name: email
        }
    }
  });
  if (!error) {
    revalidatePath("/");
    redirect("/");
  }
  else{
    console.log(error);
  }
}
