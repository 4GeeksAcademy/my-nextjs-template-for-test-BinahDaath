import { Lato } from "next/font/google";
import "./globals.css";
import { getUser } from "@/services/getUser";
import { MyLink } from "@/components/MyLink";
import { Signout } from "@/components/Signout";
import { createClient } from "@/utils/supabase/server";
const inter = Lato({ subsets: ["latin"], weight: "400" });

export default async function RootLayout({ children }) {
  const user = await getUser();
  const supabase=createClient();
  let {data,error}=await supabase.from("profiles").select().eq("id",(user ? user.id:0));
  let profile;
  if(user)
  {
    console.log("aaaaaaaaaaaaaaaaaaaaaaaaaa");
    profile=data[0];
  }
  //console.log(data);

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="w-10/12 mx-auto flex flex-col">
          <div className="py-4 flex flex-row justify-between items-center">
            <div>funChess</div>
            <div>
              {user ? (
                <Signout user={user} profile={profile}/>
              ) : (
                <MyLink href="/login">Login</MyLink>
              )}
            </div>
          </div>
          <div>{children}</div>
        </div>
      </body>
    </html>
  );
}
