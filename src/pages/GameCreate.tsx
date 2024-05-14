import { Link, useNavigate } from "react-router-dom";
import TIMDLogo from "../assets/TIMD.png";
import { COUNTRY_LIST } from "../helpers/CountriesList";
import { FormEvent, useRef, useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { serverTimestamp } from "firebase/database";
import { db } from "../firebase/firebaseConfig";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

type GameCreateType = {
  matchDetails: string;
  matchNumber: number;
  player1Country: string;
  player1Name: string;
  player1Points: number;
  player2Country: string;
  player2Name: string;
  player2Points: number;
  password: string;
  pin: string;
};

const GameCreate = () => {
  const [player1Name, setPlayer1Name] = useState("");
  const [player2Name, setPlayer2Name] = useState("");
  const [player1Country, setPlayer1Country] = useState(COUNTRY_LIST[0]);
  const [player2Country, setPlayer2Country] = useState(COUNTRY_LIST[0]);
  const [matchDetails, setMatchDetails] = useState("");
  const [password, setPassword] = useState("");
  const [pin, setPin] = useState({
    pin1: "",
    pin2: "",
    pin3: "",
    pin4: "",
  });
  const [showJuryCode, setShowJuryCode] = useState(false);
  const [showPassCode, setShowPassCode] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const pin1Ref = useRef<HTMLInputElement>(null);
  const pin2Ref = useRef<HTMLInputElement>(null);
  const pin3Ref = useRef<HTMLInputElement>(null);
  const pin4Ref = useRef<HTMLInputElement>(null);

  const handleCreateGame = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !player1Name ||
      !player2Name ||
      !player1Country ||
      !matchDetails ||
      !password
    ) {
      setError("Please complete the fields");
      return;
    }

    try {
      const writeUserData = async () => {
        const payload = {
          matchDetails,
          matchNumber: 1,
          player1Country,
          player1Name,
          player1Points: 0,
          player2Country,
          player2Name,
          player2Points: 0,
          password,
          pin: pin.pin1 + pin.pin2 + pin.pin3 + pin.pin4,
        };
        const uploadPayload = (
          collectionName: string,
          payload: GameCreateType
        ) => {
          return new Promise((resolve, reject) => {
            const collectionRef = collection(db, collectionName);

            addDoc(collectionRef, { ...payload, timestamp: serverTimestamp() })
              .then((docRef) => {
                console.log("Document written with ID: ", docRef.id);
                navigate("/all-games");
                resolve(docRef);
              })
              .catch((error) => {
                console.error("Error adding document: ", error);
                reject(error);
              });
          });
        };

        await uploadPayload("games", payload);
      };
      writeUserData();
    } catch (error) {
      console.log(error);
    }

    clearFields();
    setError("");
  };

  const clearFields = () => {
    setPlayer1Name("");
    setPlayer2Name("");
    setPlayer1Country(COUNTRY_LIST[0]);
    setMatchDetails("");
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    pinIndex: string,
    nextRef?: React.RefObject<HTMLInputElement>,
    prevRef?: React.RefObject<HTMLInputElement>
  ) => {
    const inputDigit = e.target.value.slice(-1); // Get the last entered character
    if (inputDigit === "" || /^\d$/.test(inputDigit)) {
      // Check if the entered character is empty or a digit
      setPin((prev) => {
        return { ...prev, [pinIndex]: inputDigit }; // Update state with the single digit or empty string
      });

      if (inputDigit && nextRef?.current) {
        nextRef.current.focus();
      } else if (!inputDigit && prevRef?.current) {
        prevRef.current.focus();
      }
    }
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
            <span className='text-white text-xs font-medium mb-1'>Country</span>
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
            <span className='text-white text-xs font-medium mb-1'>Country</span>
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
          <div className='flex flex-col items-start'>
            <span className='text-white text-xs font-medium mb-1'>
              Admin Password
            </span>

            <div className='relative w-full'>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Enter admin password'
                className='px-2 py-2 rounded-sm w-full outline-none'
                type={showPassCode ? "text" : "password"}
              />
              {password && (
                <>
                  {showPassCode ? (
                    <FaRegEye
                      onClick={() => setShowPassCode(!showPassCode)}
                      className='absolute right-3 bottom-0 text-black text-xl mb-2 cursor-pointer'
                    />
                  ) : (
                    <FaRegEyeSlash
                      onClick={() => setShowPassCode(!showPassCode)}
                      className='absolute right-3 bottom-0 text-black text-xl mb-2 cursor-pointer'
                    />
                  )}
                </>
              )}
            </div>
          </div>
          <div className='flex flex-col items-center my-3'>
            <div className='flex gap-2 items-center mb-3'>
              <span className='text-white text-xs font-medium'>
                Set Jury Pin Code
              </span>
              {pin.pin1 && (
                <>
                  {showJuryCode ? (
                    <FaRegEye
                      onClick={() => setShowJuryCode(!showJuryCode)}
                      className='text-white text-xl cursor-pointer'
                    />
                  ) : (
                    <FaRegEyeSlash
                      onClick={() => setShowJuryCode(!showJuryCode)}
                      className='text-white text-xl cursor-pointer'
                    />
                  )}
                </>
              )}
            </div>
            <div className='flex gap-2 w-3/4 h-12 text-2xl'>
              <input
                ref={pin1Ref}
                value={pin.pin1}
                onChange={(e) => handleChange(e, "pin1", pin2Ref)}
                className='py-8 rounded-sm w-full outline-none text-center'
                type={showJuryCode ? "text" : "password"}
              />
              <input
                ref={pin2Ref}
                value={pin.pin2}
                onChange={(e) => handleChange(e, "pin2", pin3Ref, pin1Ref)}
                className='py-8 rounded-sm w-full outline-none text-center'
                type={showJuryCode ? "text" : "password"}
              />
              <input
                ref={pin3Ref}
                value={pin.pin3}
                onChange={(e) => handleChange(e, "pin3", pin4Ref, pin2Ref)}
                className='py-8 rounded-sm w-full outline-none text-center'
                type={showJuryCode ? "text" : "password"}
              />
              <input
                ref={pin4Ref}
                value={pin.pin4}
                onChange={(e) => handleChange(e, "pin4", undefined, pin3Ref)}
                className='py-8 rounded-sm w-full outline-none text-center'
                type={showJuryCode ? "text" : "password"}
              />
            </div>
          </div>
          {error && (
            <p className='text-red-500 text-center py-0 my-0'>{error}</p>
          )}
          <div className='flex gap-3 justify-center py-2 mt-4'>
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
