"use server";
import { createClient } from '@supabase/supabase-js'
import { revalidatePath } from "next/cache";
import { getUser } from "@/services/getUser";
import { cookies } from 'next/headers';
export const makeMove = async (id,clicked,newclick) => {
  //const supabase = createClient();
  const supabase = createClient("https://tuhjrjpmjlelzyiqvckc.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR1aGpyanBtamxlbHp5aXF2Y2tjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyMTY5MTg4MiwiZXhwIjoyMDM3MjY3ODgyfQ.8hyNUQwQLTekqZPfuJSTew3c3HnC-RuYBfzYc3cHaLA");
  //console.log(supabase);
  const user=await getUser();
  const d={player:user.id,status:"created",color:"white",time:600};
  let { data, error } = await supabase
    .from("game")
    .select()
    .eq("id",id)
    //console.log(data);
    //console.log(error)
    data=data[0];
    //console.log(data);
  let whiteLittleRock=data.whiteLittleRock;
  let blackLittleRock=data.blackLittleRock;
  let whiteBigRock=data.whiteBigRock;
  let blackBigRock=data.blackBigRock;
  let turn=data.turn;
  let playercolor;
  let chessTable=JSON.parse(data.chesstable);
  if(data.player1===user.id)
  {
    playercolor="white";
  }
  else if(data.player2===user.id)
  {
    playercolor="black";
  }
  //console.log({player1:data.player1,user:user.id})
  //console.log(data);
  //console.log(playercolor);
  const getColor=(chessTable,x,y)=>
    {
      let color="empty";
      if((chessTable[y][x].match("^w")!==null))
      {
        color="white"
      }
      else if((chessTable[y][x].match("^b")!==null))
      {
        color="black"
      }
      if(color!==turn)
      {
        
      }
      return color;
    }
    
    
    const blackPawn=(chessTable,clickedx,clickedy)=>
      {
        let position=[];
        let turn=getColor(chessTable,clickedx,clickedy);
        if(chessTable[clickedy+1][clickedx]==="")
        {
          position.push({y:clickedy+1,x:clickedx});
          if((chessTable[clickedy+2][clickedx]==="")&&(clickedy===1))
          {
            position.push({y:clickedy+2,x:clickedx})
          }
        }
        if(clickedx<7)
        {
          if((getColor(chessTable,clickedx+1,clickedy+1)!==turn)&&(getColor(chessTable,clickedx+1,clickedy+1)!=="empty"))
          {
            position.push({y:clickedy+1,x:clickedx+1});
          }
        }
        if(clickedx>0)
        {
          if((getColor(chessTable,clickedx-1,clickedy+1)!==turn)&&(getColor(chessTable,clickedx-1,clickedy+1)!=="empty"))
          {
            position.push({y:clickedy+1,x:clickedx-1});
          }
        }
        return position;
      }
      const whitePawn=(chessTable,clickedx,clickedy)=>
      {
        let position=[];
        let turn=getColor(chessTable,clickedx,clickedy);
        if(chessTable[clickedy-1][clickedx]==="")
        {
          position.push({y:clickedy-1,x:clickedx});
          if((chessTable[clickedy-2][clickedx]==="")&&(clickedy===6))
          {
            position.push({y:clickedy-2,x:clickedx})
          }
        }
        if((clickedx)<7)
        {
          if((getColor(chessTable,clickedx+1,clickedy-1)!==turn)&&(getColor(chessTable,clickedx+1,clickedy-1)!=="empty"))
          {
            position.push({y:clickedy-1,x:clickedx+1});
          }
        }
        if((clickedx)>0)
        {
          if((getColor(chessTable,clickedx-1,clickedy-1)!==turn)&&(getColor(chessTable,clickedx-1,clickedy-1)!=="empty"))
          {
            position.push({y:clickedy-1,x:clickedx-1});
          }
        }
        return position;
      }
      const bishop=(chessTable,clickedx,clickedy)=>
      {
        let position=[];
        let turn=getColor(chessTable,clickedx,clickedy);
        for(let i=1;((clickedx+i)<8)&&((clickedy+i)<8);i=i+1)
        {
          if(chessTable[clickedy+i][clickedx+i]==="")
          {
            position.push({y:clickedy+i,x:clickedx+i});
          }
          else if(getColor(chessTable,clickedx+i,clickedy+i)!==turn)
          {
            position.push({y:clickedy+i,x:clickedx+i});
            break;
          }
          else
          {
            break;
          }
        }
        for(let i=1;((clickedx+i)<8)&&((clickedy-i)>=0);i=i+1)
        {
          if(chessTable[clickedy-i][clickedx+i]==="")
          {
            position.push({y:clickedy-i,x:clickedx+i});
          }
          else if(getColor(chessTable,clickedx+i,clickedy-i)!==turn)
          {
            position.push({y:clickedy-i,x:clickedx+i});
            break;
          }
          else
          {
            break;
          }
        }
        for(let i=1;((clickedx-i)>=0)&&((clickedy-i)>=0);i=i+1)
        {
          if(chessTable[clickedy-i][clickedx-i]==="")
          {
            position.push({y:clickedy-i,x:clickedx-i});
          }
          else if(getColor(chessTable,clickedx-i,clickedy-i)!==turn)
          {
            position.push({y:clickedy-i,x:clickedx-i});
            break;
          }
          else
          {
            break;
          }
        }
        for(let i=1;((clickedx-i)>=0)&&((clickedy+i)<8);i=i+1)
        {
          if(chessTable[clickedy+i][clickedx-i]==="")
          {
            position.push({y:clickedy+i,x:clickedx-i});
          }
          else if(getColor(chessTable,clickedx-i,clickedy+i)!==turn)
          {
            position.push({y:clickedy+i,x:clickedx-i});
            break;
          }
          else
          {
            break;
          }
        }
        return position;
      }
      const rook=(chessTable,clickedx,clickedy)=>
      {
        let position=[];
        //console.log("rook")
        //console.log(chessTable);
        //console.log(clickedx+","+clickedy);
        //console.log(getColor(chessTable,clickedx,clickedy))
        let turn=getColor(chessTable,clickedx,clickedy)
        for(let i=1;(clickedx-i)>-1;i=i+1)
        {
          if(chessTable[clickedy][clickedx-i]==="")
          {
            position.push({y:clickedy,x:clickedx-i});
          }
          else if(getColor(chessTable,clickedx-i,clickedy)!==turn)
          {
            position.push({y:clickedy,x:clickedx-i});
            break;
          }
          else
          {
            break;
          }
        }
        for(let i=1;(clickedx+i)<8;i=i+1)
        {
          //console.log("inside")
          //console.log(chessTable);
          //console.log(clickedy+","+(t))
          //console.log(chessTable[clickedy][clickedx+i])
          //console.log(getColor(chessTable,clickedx+i,clickedy))
          if(chessTable[clickedy][clickedx+i]==="")
          {
            position.push({y:clickedy,x:clickedx+i});
          }
          else if(getColor(chessTable,clickedx+i,clickedy)!==turn)
          {
            position.push({y:clickedy,x:clickedx+i});
            break;
          }
          else
          {
            break;
          }
        }
        for(let i=1;(clickedy+i)<8;i=i+1)
        {
          if(chessTable[clickedy+i][clickedx]==="")
          {
            position.push({y:clickedy+i,x:clickedx});
          }
          else if(getColor(chessTable,clickedx,clickedy+i)!==turn)
          {
            position.push({y:clickedy+i,x:clickedx});
            break;
          }
          else
          {
            break;
          }
        }
        for(let i=1;(clickedy-i)>-1;i=i+1)
        {
          if(chessTable[clickedy-i][clickedx]==="")
          {
            position.push({y:clickedy-i,x:clickedx});
          }
          else if(getColor(chessTable,clickedx,clickedy-i)!==turn)
          {
            position.push({y:clickedy-i,x:clickedx});
            break;
          }
          else
          {
            break;
          }
        }
        return position;
      }
      const knigth=(chessTable,clickedx,clickedy)=>
      {
        let position=[];
        let turn=getColor(chessTable,clickedx,clickedy);
        if(clickedx<6&&clickedy<7)
        {
          if((chessTable[clickedy+1][clickedx+2]==="")||(getColor(chessTable,clickedx+2,clickedy+1)!==turn))
          {
            position.push({y:clickedy+1,x:clickedx+2});
          }
        }
        if(clickedx<6&&clickedy>0)
        {
          if((chessTable[clickedy-1][clickedx+2]==="")||(getColor(chessTable,clickedx+2,clickedy-1)!==turn))
          {
            position.push({y:clickedy-1,x:clickedx+2});
          }
        }
        if(clickedx>1&&clickedy>0)
        {
          if((chessTable[clickedy-1][clickedx-2]==="")||(getColor(chessTable,clickedx-2,clickedy-1)!==turn))
          {
            position.push({y:clickedy-1,x:clickedx-2});
          }
        }
        if(clickedx>1&&clickedy<7)
        {
          if((chessTable[clickedy+1][clickedx-2]==="")||(getColor(chessTable,clickedx-2,clickedy+1)!==turn))
          {
            position.push({y:clickedy+1,x:clickedx-2});
          }
        }
        if(clickedx<7&&clickedy<6)
        {
          if((chessTable[clickedy+2][clickedx+1]==="")||(getColor(chessTable,clickedx+1,clickedy+2)!==turn))
          {
            position.push({y:clickedy+2,x:clickedx+1});
          }
        }
        if(clickedx>0&&clickedy<6)
        {
          if((chessTable[clickedy+2][clickedx-1]==="")||(getColor(chessTable,clickedx-1,clickedy+2)!==turn))
          {
            position.push({y:clickedy+2,x:clickedx-1});
          }
        }
        if(clickedx>0&&clickedy>1)
        {
          if((chessTable[clickedy-2][clickedx-1]==="")||(getColor(chessTable,clickedx-1,clickedy-2)!==turn))
          {
            position.push({y:clickedy-2,x:clickedx-1});
          }
        }
        if(clickedx<7&&clickedy>1)
        {
          if((chessTable[clickedy-2][clickedx+1]==="")||(getColor(chessTable,clickedx+1,clickedy-2)!==turn))
          {
            position.push({y:clickedy-2,x:clickedx+1});
          }
        }
        return position;
      }
      
      const queen=(chessTable,clickedx,clickedy)=>
      {
        let position1=rook(chessTable,clickedx,clickedy);
        let position2=bishop(chessTable,clickedx,clickedy);
        return position1.concat(position2);
      }
    
      const king=(chessTable,clickedx,clickedy)=>
        {
          let position=[];
          let turn=getColor(chessTable,clickedx,clickedy);
        
        
          if(clickedx>0)
          {
            if((chessTable[clickedy][clickedx-1]==="")||(getColor(chessTable,clickedx-1,clickedy)!==turn))
            {
              position.push({y:clickedy,x:clickedx-1})
            }
            if(clickedy>0)
            {
              if((chessTable[clickedy-1][clickedx-1]==="")||(getColor(chessTable,clickedx-1,clickedy-1)!==turn))
              {
                position.push({y:clickedy-1,x:clickedx-1})
              }
            }
            if(clickedy<7)
            {
              if((chessTable[clickedy+1][clickedx-1]==="")||(getColor(chessTable,clickedx-1,clickedy+1)!==turn))
              {
                position.push({y:clickedy+1,x:clickedx-1})
              }
            }
          }
          if(clickedx<7)
          {
            if((chessTable[clickedy][clickedx+1]==="")||(getColor(chessTable,clickedx+1,clickedy)!==turn))
            {
              position.push({y:clickedy,x:clickedx+1})
            }
            if(clickedy>0)
            {
              if((chessTable[clickedy-1][clickedx+1]==="")||(getColor(chessTable,clickedx+1,clickedy-1)!==turn))
              {
                position.push({y:clickedy-1,x:clickedx+1})
              }
            }
            if(clickedy<7)
            {
              if((chessTable[clickedy+1][clickedx+1]==="")||(getColor(chessTable,clickedx+1,clickedy+1)!==turn))
              {
                position.push({y:clickedy+1,x:clickedx+1})
              }
            }
          }
          if(clickedy>0)
          {
            if((chessTable[clickedy-1][clickedx]==="")||(getColor(chessTable,clickedx,clickedy-1)!==turn))
            {
              position.push({y:clickedy-1,x:clickedx})
            }
          }
          if(clickedy<7)
          {
            if((chessTable[clickedy+1][clickedx]==="")||(getColor(chessTable,clickedx,clickedy+1)!==turn))
            {
              position.push({y:clickedy+1,x:clickedx})
            }
          }
          if(((clickedx===4)&&(clickedy===0))&&(chessTable[0][5]==="")&&(chessTable[0][6]==="")&&(turn==="black")&&(chessTable[0][7]==="brk")&&blackLittleRock)
          {
            position.push({y:0,x:6});
          }
          if(((clickedx===4)&&(clickedy===0))&&(chessTable[0][3]==="")&&(chessTable[0][2]==="")&&(chessTable[0][1]==="")&&(turn==="black")&&(chessTable[0][0]==="brq")&&blackBigRock)
          {
            position.push({y:0,x:2});
          }
          if(((clickedx===4)&&(clickedy===7))&&(chessTable[7][5]==="")&&(chessTable[7][6]==="")&&(turn==="white")&&(chessTable[7][7]==="wrk")&&whiteLittleRock)
          {
            position.push({y:7,x:6});
          }
          if(((clickedx===4)&&(clickedy===7))&&(chessTable[7][3]==="")&&(chessTable[7][2]==="")&&(chessTable[7][1]==="")&&(turn==="white")&&(chessTable[7][0]==="wrq")&&whiteBigRock)
          {
            position.push({y:7,x:2});
          }
          return position;
        }
    
        const whereCanItMove=
        {
        wp:whitePawn,
        bp:blackPawn,
        wkn:knigth,
        bkn:knigth,
        wb:bishop,
        bb:bishop,
        wr:rook,
        wrq:rook,
        wrk:rook,
        br:rook,
        brq:rook,
        brk:rook,
        wq:queen,
        bq:queen,
        wk:king,
        bk:king,
        }
    
    
    const kingInCheck=(chessTable,color)=>
      {
        let king=(color==="white" ? "w":"b")+"k"
        let kingPosition
        let enemyPieceColor=(color==="white" ? "b":"w")
        let enemyPiece=[]
        let checkPosition=[]
        for(let i=0; i<chessTable.length;i=i+1)
        {
          for(let j=0; j<chessTable[i].length;j=j+1)
          {
            if(chessTable[i][j]===king)
            {
              kingPosition={y:i,x:j}
            }
            if(chessTable[i][j].match("^"+enemyPieceColor)!==null)
            {
              enemyPiece.push({y:i,x:j});
            }
          }
        }
        //console.log("kingPosition:("+kingPosition.x+","+kingPosition.y+")")
        //console.log("enemyPiece:"+enemyPiece);
        for(let i in enemyPiece)
        {
          //console.log(chessTable[enemyPiece[i].y][enemyPiece[i].x])
          //console.log(whereCanItMove[chessTable[enemyPiece[i].y][enemyPiece[i].x]](chessTable,enemyPiece[i].x,enemyPiece[i].y))
          checkPosition=checkPosition.concat(whereCanItMove[chessTable[enemyPiece[i].y][enemyPiece[i].x]](chessTable,enemyPiece[i].x,enemyPiece[i].y))
        }
        for(let i in checkPosition)
        {
          //console.log("("+kingPosition.x+","+kingPosition.y+")")
          //console.log("("+checkPosition[i].x+","+checkPosition[i].y+")")
          if((kingPosition.x===checkPosition[i].x)&&(kingPosition.y===checkPosition[i].y))
          {
            return true;
          }
        }
        return false;
      }
      let position=whereCanItMove[chessTable[clicked.y][clicked.x]](chessTable,clicked.x,clicked.y);
      let canmove=false;
      let color=getColor(chessTable,clicked.x,clicked.y);
      for(let i in position)
        {
          if((position[i].x===newclick.x)&&(position[i].y===newclick.y))
          {
            canmove=true;
            break
          }
        }
        if(canmove)
          {
            console.log("maybe");
            let ct=JSON.parse(JSON.stringify(chessTable))
            ct[newclick.y][newclick.x]=chessTable[clicked.y][clicked.x];
            ct[clicked.y][clicked.x]="";
            console.log(playercolor+turn);
            if(!kingInCheck(ct,turn)&&(playercolor===turn))
            {
              if(chessTable[clicked.y][clicked.x]==="bk")
                {
                  if(((clicked.x===4)&&(clicked.y===0))&&((newclick.x===6)&&(newclick.y===0)))
                  {
                    ct[0][7]="";
                    ct[0][5]="brk";
                    blackBigRock=false;
                    blackLittleRock=false;
                  }
                  if(((clicked.x===4)&&(clicked.y===0))&&((newclick.x===2)&&(newclick.y===0)))
                  {
                    ct[0][0]="";
                    ct[0][3]="brq";
                    blackBigRock=false;
                    blackLittleRock=false;
                  }
                }
                if(chessTable[clicked.y][clicked.x]==="wk")
                {
                  if(((clicked.x===4)&&(clicked.y===7))&&((newclick.x===6)&&(newclick.y===7)))
                  {
                    ct[7][7]="";
                    ct[7][5]="wrk";
                    whiteBigRock=false;
                    whiteLittleRock=false;
                  }
                  if(((clicked.x===4)&&(clicked.y===7))&&((newclick.x===2)&&(newclick.y===7)))
                  {
                    ct[7][0]="";
                    ct[7][3]="wrq";
                    whiteBigRock=false;
                    whiteLittleRock=false;
                  }
                } 
              ct=JSON.stringify(ct);
              turn=(turn === "white" ? "black":"white");
              let time=Math.floor(((new Date()).getTime())/1000);
              let playertime=data.time;
              if(data.lastplay!==null)
              {
              playertime=data["time"+(playercolor==="white" ? "1":"2")]-(time-data.lastplay)
              };
              playertime=(playertime<0 ? 0:playertime)
              console.log("playertime:"+playertime);
              if(playertime>0)
              {
              if(playercolor==="white")
              { console.log("should be moved");
                await supabase
              .from("game")
              .update({chesstable:ct,turn:turn,status:"started",lastplay:time,time1:playertime})
              .eq("id",id)}
              else
              {
                await supabase
              .from("game")
              .update({chesstable:ct,turn:turn,status:"started",lastplay:time,time2:playertime})
              .eq("id",id)
              }
            }
              console.log("succes");
            }
            //console.log(kingInCheck(ct,turn));
          }
      revalidatePath("/");



  return null;
};
