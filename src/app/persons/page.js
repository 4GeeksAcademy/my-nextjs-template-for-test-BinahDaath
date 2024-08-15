import { createClient } from "@/utils/supabase/server";
import { Td } from "@/components/Td";
import { MyLink } from "@/components/MyLink";

export default async function PersonsList() {
  const supabase = createClient();
  const { data, error } = await supabase.from("todos").select("*");

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
