import { MyLink } from "@/components/MyLink";

export default function Home() {
  return (
    <div>
      <MyLink href="/choosegame">Choose Game</MyLink>
      <MyLink href="/creategame">Create Game</MyLink>
      <MyLink href="/mycreatedgame">My Created Game</MyLink>
      <MyLink href="/myplayinggame">My Playing Game</MyLink>
    </div>
  );
}
