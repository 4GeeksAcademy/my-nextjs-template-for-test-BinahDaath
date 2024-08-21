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
      <MyLink href="/choosegame">Choose Game</MyLink>
      <MyLink href="/creategame">Create Game</MyLink>
      <MyLink href="/mycreatedgame">My Created Game</MyLink>
      <MyLink href="/myplayinggame">My Playing Game</MyLink>
    </div>
  );
}
