import { createClient } from "@/utils/supabase/server";
import { Td } from "@/components/Td";
import { MyLink } from "@/components/MyLink";
import { createGame } from "@/services/createGame";
import { getUser } from "@/services/getUser";
export default async function PersonsList() {
  const supabase = createClient();
  const test = await supabase.from("profiles").select("*");
  const { data, error } = await supabase.from("todos").select("*");
  const user=await getUser();
  console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
  console.log(user)
  const d={player:user.id,status:"created",color:"white",time:600};
  createGame(d);
  //console.log(data);
  //console.log(test);
    
  if (error) {
    return <div>Error querying data</div>;
  }

  return (
    <div>
      <h1>Person list</h1>
      <MyLink href="/persons/add">Add Person</MyLink>
      {data?.map((person, index) => (
              <div key="{index}">{person.id} {person.task}</div>
          ))}
    </div>
  );
}