import { doc, onSnapshot } from "firebase/firestore";
import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase/firebaseConfig";
import { DocumentData } from "@firebase/firestore-types";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { IoCloseOutline } from "react-icons/io5";

const EnterPinModal = ({
  open,
  selectedId,
  toggleModal,
}: {
  open: boolean;
  selectedId: string;
  toggleModal: () => void;
}) => {
  const navigate = useNavigate();
  const [gameDetails, setGameDetails] = useState<DocumentData | undefined>(
    undefined
  );
  const [isCancel, setIsCancel] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [pin, setPin] = useState({
    pin1: "",
    pin2: "",
    pin3: "",
    pin4: "",
  });
  const [showJuryCode, setShowJuryCode] = useState(false);

  useEffect(() => {
    if (selectedId)
      onSnapshot(doc(db, "games", selectedId), (doc) => {
        console.log("Current data: ", doc.data());
        const data = doc.data();
        setGameDetails(data);
      });
  }, [selectedId]);

  const handleEnterPass = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const enteredPin = pin.pin1 + pin.pin2 + pin.pin3 + pin.pin4;
    if (isCancel) toggleModal();
    if (!enteredPin) return;

    if (enteredPin !== gameDetails?.pin) {
      setErrorMessage("Incorrect password");
      return;
    }

    // success action
    setErrorMessage("");
    toggleModal();
    navigate(`/game/edit/${selectedId}`);
  };

  return (
    open && (
      <div className='fixed h-screen w-screen inset-0 flex items-center justify-center z-50'>
        <div
          className='bg-black opacity-80 w-full fixed inset-0'
          onClick={toggleModal}
        ></div>
        <form
          onSubmit={handleEnterPass}
          className='bg-white text-black z-50 w-3/4 sm:w-8/12 lg:w-6/12 xl:w-4/12 px-12 py-6 flex flex-col items-center justify-center gap-2 rounded relative'
        >
          <IoCloseOutline
            onClick={toggleModal}
            className='absolute right-2 top-2 text-2xl cursor-pointer'
          />
          <div className='font-medium text-xl'>
            <span className='text-blue-600'>{gameDetails?.player1Name}</span> vs{" "}
            <span className='text-red-600'>{gameDetails?.player2Name}</span>
          </div>

          {/* <hr className='border-slate-300 w-3/4' /> */}

          <div className='flex gap-2 mt-4'>
            <p className='text-xs text-slate-500 font-regular'>
              Enter PIN Code
            </p>
            {pin.pin1 && (
              <>
                {showJuryCode ? (
                  <FaRegEye
                    onClick={() => setShowJuryCode(!showJuryCode)}
                    className='text-slate-500 text-xl cursor-pointer'
                  />
                ) : (
                  <FaRegEyeSlash
                    onClick={() => setShowJuryCode(!showJuryCode)}
                    className='text-slate-500 text-xl cursor-pointer'
                  />
                )}
              </>
            )}
          </div>

          <div className='flex gap-2 w-3/4 h-12 text-2xl'>
            <input
              value={pin.pin1}
              onChange={(e) => {
                const inputDigit = e.target.value.slice(-1); // Get the last entered character
                if (inputDigit === "" || /^\d$/.test(inputDigit)) {
                  // Check if the entered character is empty or a digit
                  setPin((prev) => {
                    return { ...prev, pin1: inputDigit }; // Update state with the single digit or empty string
                  });
                }
              }}
              className='py-8 rounded-sm w-full outline-none text-center border bg-slate-100'
              type={showJuryCode ? "text" : "password"}
            />
            <input
              value={pin.pin2}
              onChange={(e) => {
                const inputDigit = e.target.value.slice(-1); // Get the last entered character
                if (inputDigit === "" || /^\d$/.test(inputDigit)) {
                  // Check if the entered character is empty or a digit
                  setPin((prev) => {
                    return { ...prev, pin2: inputDigit }; // Update state with the single digit or empty string
                  });
                }
              }}
              className='py-8 rounded-sm w-full outline-none text-center border bg-slate-100'
              type={showJuryCode ? "text" : "password"}
            />
            <input
              value={pin.pin3}
              onChange={(e) => {
                const inputDigit = e.target.value.slice(-1); // Get the last entered character
                if (inputDigit === "" || /^\d$/.test(inputDigit)) {
                  // Check if the entered character is empty or a digit
                  setPin((prev) => {
                    return { ...prev, pin3: inputDigit }; // Update state with the single digit or empty string
                  });
                }
              }}
              className='py-8 rounded-sm w-full outline-none text-center border bg-slate-100'
              type={showJuryCode ? "text" : "password"}
            />
            <input
              value={pin.pin4}
              onChange={(e) => {
                const inputDigit = e.target.value.slice(-1); // Get the last entered character
                if (inputDigit === "" || /^\d$/.test(inputDigit)) {
                  // Check if the entered character is empty or a digit
                  setPin((prev) => {
                    return { ...prev, pin4: inputDigit }; // Update state with the single digit or empty string
                  });
                }
              }}
              className='py-8 rounded-sm w-full outline-none text-center border bg-slate-100'
              type={showJuryCode ? "text" : "password"}
            />
          </div>

          <button
            onSubmit={() => {
              setIsCancel(false);
            }}
            type='submit'
            className='text-sm font-medium bg-yellow-500 px-4 py-2 rounded mt-8 w-3/4'
          >
            Enter
          </button>
          {errorMessage && (
            <p className='text-red-500 text-sm'>{errorMessage}</p>
          )}
        </form>
      </div>
    )
  );
};

export default EnterPinModal;
