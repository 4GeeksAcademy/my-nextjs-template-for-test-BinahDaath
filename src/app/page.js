import { MyLink } from "@/components/MyLink";
import { getUser } from "@/services/getUser";
export default async function Home() {
  const user = await getUser();
  if(!user)
  {
    return(<div></div>)
  }
  return (
    <div className="flex flex-col">
      <div className="mx-auto"><MyLink href="/choosegame">Choose Game</MyLink></div>
      <div className="mx-auto"><MyLink href="/creategame">Create Game</MyLink></div>
      <div className="mx-auto"><MyLink href="/mycreatedgame">My Created Game</MyLink></div>
      <div className="mx-auto"><MyLink href="/myplayinggame">My Playing Game</MyLink></div>
    </div>
  );
}
