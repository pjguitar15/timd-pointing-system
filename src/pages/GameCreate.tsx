import { Link } from "react-router-dom";
import TIMDLogo from "../assets/TIMD.png";
import { COUNTRY_LIST } from "../helpers/CountriesList";
import { FormEvent, useState } from "react";
import { push, ref, set } from "firebase/database";
import { db } from "../firebase/firebaseConfig";
import firebase from "firebase/compat/app";
import { v4 as uuidv4 } from 'uuid';

const GameCreate = () => {
  const [player1Name, setPlayer1Name] = useState("");
  const [player2Name, setPlayer2Name] = useState("");
  const [player1Country, setPlayer1Country] = useState(COUNTRY_LIST[0]);
  const [player2Country, setPlayer2Country] = useState(COUNTRY_LIST[0]);
  const [matchDetails, setMatchDetails] = useState("");
  const [error, setError] = useState("");
  const handleCreateGame = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!player1Name || !player2Name || !player1Country || !matchDetails) {
      setError("Please complete the fields");
      return;
    }

    try {
      const writeUserData = () => {
        if (!firebase.apps.length) {
          const newDocRef = push(ref(db, "game"));
          set(newDocRef, {
            player1Name,
            player2Name,
            player1Country,
            player2Country,
            matchDetails,
            matchNumber: 1,
            player1Points: 0,
            player2Points: 0,
            gameId: uuidv4()
          })
            .then(() => {
              console.log("Data saved successfully");
            })
            .catch((err) => {
              console.log(err.message);
            });
        }
      };
      writeUserData();
    } catch (error) {
      console.log(error);
    }

    console.log({
      player1Name,
      player2Name,
      country: player1Country,
      matchDetails,
    });
    clearFields();
    setError("");
  };

  const clearFields = () => {
    setPlayer1Name("");
    setPlayer2Name("");
    setPlayer1Country(COUNTRY_LIST[0]);
    setMatchDetails("");
  };
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
        <div className='text-center'>
          <h2 className='text-2xl text-white'>Enter your game details</h2>
        </div>
        <form
          onSubmit={handleCreateGame}
          className='w-[400px] flex flex-col gap-3'
        >
          <div className='flex flex-col items-start'>
            <span className='text-white text-xs font-medium mb-1'>
              Player 1
            </span>
            <input
              value={player1Name}
              onChange={(e) => setPlayer1Name(e.target.value)}
              placeholder='Enter player 1'
              className='px-2 py-2 rounded-sm w-full outline-none'
              type='text'
            />
          </div>
          <div className='flex flex-col items-start'>
            <span className='text-white text-xs font-medium mb-1'>
              Player 1 Country
            </span>
            <select
              value={player1Country}
              className='px-2 py-2 rounded-sm w-full outline-none'
              onChange={(e) => setPlayer1Country(e.target.value)}
            >
              {COUNTRY_LIST.map((item, index) => (
                <option
                  key={index}
                  value={item}
                >
                  {item}
                </option>
              ))}
            </select>
          </div>
          <hr className='mt-3 mb-1' />
          <div className='flex flex-col items-start'>
            <span className='text-white text-xs font-medium mb-1'>
              Player 2
            </span>
            <input
              value={player2Name}
              onChange={(e) => setPlayer2Name(e.target.value)}
              placeholder='Enter player 2'
              className='px-2 py-2 rounded-sm w-full outline-none'
              type='text'
            />
          </div>

          <div className='flex flex-col items-start'>
            <span className='text-white text-xs font-medium mb-1'>
              Player 2 Country
            </span>
            <select
              value={player2Country}
              className='px-2 py-2 rounded-sm w-full outline-none'
              onChange={(e) => setPlayer2Country(e.target.value)}
            >
              {COUNTRY_LIST.map((item, index) => (
                <option
                  key={index}
                  value={item}
                >
                  {item}
                </option>
              ))}
            </select>
          </div>
          <hr className='mt-3 mb-1' />
          <div className='flex flex-col items-start'>
            <span className='text-white text-xs font-medium mb-1'>
              Match Details
            </span>
            <input
              value={matchDetails}
              onChange={(e) => setMatchDetails(e.target.value)}
              placeholder='Enter match details'
              className='px-2 py-2 rounded-sm w-full outline-none'
              type='text'
            />
          </div>
          {error && (
            <p className='text-red-500 text-center py-0 my-0'>{error}</p>
          )}
          <div className='flex gap-3 justify-center py-2'>
            <button
              type='submit'
              className='px-5 py-1 bg-yellow-500 text-slate-950 text-md font-semibold rounded-sm'
            >
              Create game
            </button>
            <Link
              to='/game-select'
              className='px-5 py-1 border border-yellow-500 hover:bg-yellow-500 text-yellow-500 hover:text-slate-950 text-md font-semibold rounded-sm'
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
};

export default GameCreate;