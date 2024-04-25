import { Link, useNavigate } from "react-router-dom";
import TIMDLogo from "../assets/TIMD.png";
import { useEffect, useState } from "react";
import { db } from "../firebase/firebaseConfig";
import { get, ref } from "firebase/database";
import phflag from "../assets/ph-flag.webp";
import thaiFlag from "../assets/thai.webp";
import koreanFlag from "../assets/kr-flag.jpg";
import jpFlag from "../assets/japan.png";
import unknownFlag from "../assets/no-flag.png";

export type GameDataType = {
  player1Country: string;
  player2Country: string;
  matchDetails: string;
  matchNumber: number;
  player1Name: string;
  player2Name: string;
  player1Points: number;
  player2Points: number;
  gameId: string;
};

const AllGames = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const getData = async () => {
      const dbRef = ref(db, "game");
      const snapshot = await get(dbRef);
      if (snapshot.exists()) {
        setData(Object.values(snapshot.val()));
      } else {
        console.log("Error!");
      }
    };
    getData();
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <main className='bg-slate-950 h-screen'>
      <div className='absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]' />
      <div className='flex flex-col items-center justify-center gap-6 h-full relative z-50'>
        <Link to='/'>
          <img
            className='size-40'
            src={TIMDLogo}
            alt=''
          />
        </Link>
        <div className='flex flex-col gap-2'>
          <h6 className='text-white text-xl'>On-going Matches</h6>
          <Link
            to='/game-select'
            className='border border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-slate-950 px-4 py-1 font-semibold text-sm rounded-sm'
          >
            Return to game select
          </Link>
        </div>
        <div className='flex flex-col gap-4'>
          {data.map((item: GameDataType, index) => (
            <div
              onClick={() => navigate(`/game/${item.gameId}`)}
              className='bg-slate-400 hover:bg-white cursor-pointer px-8 py-2 flex justify-between gap-5 font-semibold rounded-sm text-lg text-slate-950 hover:text-blue-900'
              key={index}
            >
              <div className='flex gap-2'>
                <div className='flex gap-2'>
                  <img
                    className='w-9 h-7 rounded-full object-cover'
                    src={
                      item.player1Country.toLowerCase() === "philippines"
                        ? phflag
                        : item.player1Country.toLowerCase() === "thailand"
                        ? thaiFlag
                        : item.player1Country.toLowerCase() === "korea"
                        ? koreanFlag
                        : item.player1Country.toLowerCase() === "japan"
                        ? jpFlag
                        : unknownFlag
                    }
                    alt=''
                  />
                  {item.player1Name}
                </div>
                vs{" "}
                <div className='flex gap-2'>
                  <img
                    className='w-9 h-7 rounded-full object-cover'
                    src={
                      item.player2Country.toLowerCase() === "philippines"
                        ? phflag
                        : item.player2Country.toLowerCase() === "thailand"
                        ? thaiFlag
                        : item.player2Country.toLowerCase() === "korea"
                        ? koreanFlag
                        : item.player2Country.toLowerCase() === "japan"
                        ? jpFlag
                        : unknownFlag
                    }
                    alt=''
                  />
                  {item.player2Name}
                </div>
              </div>
              <div>|</div>
              <div>{item.matchDetails}</div>
              <div>|</div>
              <div>Match {item.matchNumber}</div>
              <div>|</div>
              <div>
                {item.player1Points} / {item.player2Points}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default AllGames;
