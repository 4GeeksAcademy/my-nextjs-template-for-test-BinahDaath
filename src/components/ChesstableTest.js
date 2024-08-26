"use client";
import { makeMove } from "@/services/makeMove";
import React, { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { FaChessBishop } from "react-icons/fa";
import { FaChessKing } from "react-icons/fa";
import { FaChessKnight } from "react-icons/fa";
import { FaChessPawn } from "react-icons/fa";
import { FaChessQueen } from "react-icons/fa";
import { FaChessRook } from "react-icons/fa";
export  function ChessTable({playerColor,id}) {
  //let s={width:"800px",height:"800px"};
  let handw=Math.min(window.innerHeight-180,window.innerWidth-180);//500
  //let s={width:Math.floor((window.innerHeight/8)*8)+"px",height:Math.floor((window.innerHeight/8)*8)};
  let s={width:Math.floor(handw/8)*8+"px",height:Math.floor(handw/8)*8+"px"};
  console.log(s);
  let caseSize=Math.floor(handw/8);
  //(window.innerHeight/8)
  const [clicked,setClicked]=useState(false);
  const [clickedx,setClickedx]=useState();
  const [clickedy,setClickedy]=useState();
  const [turn,setTurn]=useState("white");
  const [chessTable, setChessTable] = useState([
    ["brq","bkn","bb","bq","bk","bb","bkn","brk"],
    ["bp","bp","bp","bp","bp","bp","bp","bp"],
    ["","","","","","","",""],
    ["","","","","","","",""],
    ["","","","","","","",""],
    ["","","","","","","",""],
    ["wp","wp","wp","wp","wp","wp","wp","wp"],
    ["wrq","wkn","wb","wq","wk","wb","wkn","wrk"]
]);
const [supabase,setSupabase] = useState(createClient());
const [time,setTime]=useState(0);
const [whiteLittleRock, setWhiteLittleRock]=useState(true);
const [blackLittleRock, setBlackLittleRock]=useState(true);
const [whiteBigRock, setWhiteBigRock]=useState(true);
const [blackBigRock, setBlackBigRock]=useState(true);
useEffect(()=>{
  //console.log("time:"+time);
  setTimeout(()=>{setTime(time+1)},1000);
  supabase.from("game").select().eq("id",id).then((v)=>{
    setChessTable(JSON.parse(v.data[0].chesstable));
    setTurn(v.data[0].turn);
    //console.log(id);
    //console.log(v);
  });
},[time])
const getChessTable=()=>{
  supabase.from("game").select().eq("id",id).then((v)=>{
    setChessTable(JSON.parse(v.data[0].chesstable));
    //console.log(v);
  });
}
//getChessTable()
//console.log(id)
//console.log("testtest")
//const { data, error } = await supabase.from("game").select().eq("id",id);
//console.log(data);
//console.log(error);
const getClickPosition=(playerColor,X,Y)=>
{
  let c=document.querySelector("div.grid");
  let bcr=c.getBoundingClientRect();
  let left=bcr["x"];
  let top=bcr["y"];
  let x=Math.floor((X-left)/caseSize);
  let y=Math.floor((Y-top)/caseSize);
  return (playerColor==="white" ? {y:y,x:x}:{y:(7-y),x:(7-x)});
}
const getPiece=(el)=>
{
  let size=7;
  if(caseSize<48)
    {
    size=4;
    }
  else if(caseSize<60)
    {
      size=5;
    }
  else if(caseSize<72)
    {
      size=6;
    }
  else if(caseSize<96)
    {
      size=7;
    }
  else if(caseSize<126)
    {
      size=8;
    }
  //console.log(caseSize);
  if(el==="")
  {
    return "";
  }
  if(el==="wp")
    {
      return <i className={`fas fa-chess-pawn text-white text-${size}xl`}><FaChessPawn/></i>
    }
    if(el==="wkn")
    {
      return <i className={`fas fa-chess-knight text-white text-${size}xl`}><FaChessKnight/></i>
    }
    if(el==="wb")
    {
      return <i className={`fas fa-chess-bishop text-white text-${size}xl`}><FaChessBishop/></i>
    }
    if(el.match("^wr"))
    {
      return <i className={`fas fa-chess-rook text-white text-${size}xl`}><FaChessRook/></i>
    }
    if(el==="wq")
    {
      return <i className={`fas fa-chess-queen text-white text-${size}xl`}><FaChessQueen/></i>
    }
    if(el==="wk")
    {
      return <i className={`fas fa-chess-king text-white text-${size}xl`}><FaChessKing/></i>
    }

  if(el==="bp")
  {
    return <i className={`fas fa-chess-pawn text-black text-${size}xl`}><FaChessPawn/></i>
  }
  if(el==="bkn")
  {
    return <i className={`fas fa-chess-knight text-black text-${size}xl`}><FaChessKnight/></i>
  }
  if(el==="bb")
  {
    return <i className={`fas fa-chess-bishop text-black text-${size}xl`}><FaChessBishop/></i>
  }
  if(el.match("^br"))
  {
    return <i className={`fas fa-chess-rook text-black text-${size}xl`}><FaChessRook/></i>
  }
  if(el==="bq")
  {
    return <i className={`fas fa-chess-queen text-black text-${size}xl`}><FaChessQueen/></i>
  }
  if(el==="bk")
  {
    return <i className={`fas fa-chess-king text-black text-${size}xl`}><FaChessKing/></i>
  }
  return el;
}
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





  const renderChessTable=(table)=>
    {
        let t=JSON.parse(JSON.stringify(table));
        if(playerColor!=="white")
        {
          t=t.reverse();
          t=[t[0].reverse(),t[1].reverse(),t[2].reverse(),t[3].reverse(),t[4].reverse(),t[5].reverse(),t[6].reverse(),t[7].reverse(),]
        }
        return t.map(renderChessRow);
    }
  const renderChessRow=(table,index)=>
    {
        return table.map(renderChessCase(index));
    }
  const renderChessCase=(index)=>
    {
        const renderChessCase1=(el,index)=>
        {
            if((index%2)===0)
            {
                return <div className="bg-white bg-opacity-25 text-black flex flex-row justify-around" style={{height:caseSize+"px"}}>{getPiece(el)}</div>
                //return "w";
            }
            //return "b";
            return <div className="bg-black text-white bg-opacity-25 flex flex-row justify-around" style={{height:caseSize+"px"}}>{getPiece(el)}</div>
        }
        const renderChessCase2=(el,index)=>
        {
            if((index%2)===0)
            {
                //return "b";
                return <div className="bg-black bg-opacity-25 text-white flex flex-row justify-around" style={{height:caseSize+"px"}}>{getPiece(el)}</div>
            }
            //return "w";
            return <div className="bg-white bg-opacity-25 text-black flex flex-row justify-around" style={{height:caseSize+"px"}}>{getPiece(el)}</div>
        }
        if((index%2)===0)
        {
            return renderChessCase1;
        }
        return renderChessCase2;
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
  const handleClick=(e)=>
  {
    //let c=document.querySelector("div.grid");
    //let bcr=c.getBoundingClientRect();
    //let left=bcr["x"];
    //let top=bcr["y"];
    //let x=Math.floor((e.clientX-left)/caseSize);
    //let y=Math.floor((e.clientY-top)/caseSize);
    let clickPosition=getClickPosition(playerColor,e.clientX,e.clientY);
    let x=clickPosition.x;
    let y=clickPosition.y;
    console.log({x:x,y:y})
    //console.log("testtesttesttesttesttesttesttesttest");
    if(clicked)
    {
      console.log("clicked");
      setClicked(false);
      //console.log(clicked);
      let color=getColor(chessTable,x,y);
      let canmove=false;
      console.log(chessTable[clickedy][clickedx]);
      let position=whereCanItMove[chessTable[clickedy][clickedx]](chessTable,clickedx,clickedy);
      for(let i in position)
      {
        if((position[i].x===x)&&(position[i].y===y))
        {
          canmove=true;
          break
        }
      }
      //move(clikedx,clickedy,x,y)
      //console.log("whereCanItMove")
      //console.log(whereCanItMove[chessTable[clickedy][clickedx]](chessTable,clickedx,clickedy))
      if(canmove)
      {
        let ct=JSON.parse(JSON.stringify(chessTable))
        ct[y][x]=chessTable[clickedy][clickedx];
        ct[clickedy][clickedx]="";
        //console.log(kingInCheck(ct,turn));
        if(!kingInCheck(ct,turn))
        {
          if(chessTable[clickedy][clickedx]==="bk")
            {
              setBlackBigRock(false);
              setBlackLittleRock(false);
              if(((clickedx===4)&&(clickedy===0))&&((x===6)&&(y===0)))
              {
                ct[0][7]="";
                ct[0][5]="brk";
              }
              if(((clickedx===4)&&(clickedy===0))&&((x===2)&&(y===0)))
              {
                ct[0][0]="";
                ct[0][3]="brq";
              }
            }
            if(chessTable[clickedy][clickedx]==="wk")
            {
              setWhiteBigRock(false);
              setWhiteLittleRock(false);
              if(((clickedx===4)&&(clickedy===7))&&((x===6)&&(y===7)))
              {
                ct[7][7]="";
                ct[7][5]="wrk";
              }
              if(((clickedx===4)&&(clickedy===7))&&((x===2)&&(y===7)))
              {
                ct[7][0]="";
                ct[7][3]="wrq";
              }
            }

          setChessTable(ct);
          turn === "white" ? setTurn("black"):setTurn("white");
          console.log("moving");
          makeMove(id,{x:clickedx,y:clickedy},{x:x,y:y})
        }
        //console.log(kingInCheck(ct,turn));
      }
      /*if(chessTable[y][x]=="")
      {
      }*/
      //turn === "white" ? setTurn("black"):setTurn("white")
      //console.log(turn);
    }
    else if(chessTable[y][x]!=="")
    {
      //console.log(turn);
      console.log(whereCanItMove[chessTable[y][x]](chessTable,x,y));
      let color=getColor(chessTable,x,y);
      if(color===turn)
      {
        setClicked(true);
        setClickedx(x);
        setClickedy(y);
        //console.log({clicked:clicked,color:color});
      }
    }
    //console.log({x:x,y:y,caseSize:caseSize,clicked:clicked,clickedx:clickedx,clickedy:clickedy,handw:handw});
  }

    //console.log(renderChessTable(chessTable))
  return (
    <div className="grid grid-cols-8 gap-0 bg-sky-500 bg-opacity-25" style={s} onClick={handleClick}>
        {renderChessTable(chessTable)}
    </div>
  );
}