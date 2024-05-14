import { doc, onSnapshot } from "firebase/firestore";
import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase/firebaseConfig";
import { DocumentData } from "@firebase/firestore-types";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { IoCloseOutline } from "react-icons/io5";

const EnterPassModal = ({
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
  const [showPass, setShowPass] = useState(false);
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (selectedId)
      onSnapshot(doc(db, "games", selectedId), (doc) => {
        const data = doc.data();
        setGameDetails(data);
      });
  }, [selectedId]);

  const handleEnterPass = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isCancel) toggleModal();
    if (!password) return;

    if (password !== gameDetails?.password) {
      setErrorMessage("Incorrect password");
      return;
    }

    // success action
    setErrorMessage("");
    toggleModal();
    navigate(`/game/admin/${selectedId}`);
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
              Enter Admin Password
            </p>
          </div>

          <div className='w-3/4 relative'>
            <div className='absolute right-3 top-3'>
              {password && (
                <>
                  {showPass ? (
                    <FaRegEye
                      onClick={() => setShowPass(!showPass)}
                      className='text-slate-500 text-xl cursor-pointer'
                    />
                  ) : (
                    <FaRegEyeSlash
                      onClick={() => setShowPass(!showPass)}
                      className='text-slate-500 text-xl cursor-pointer'
                    />
                  )}
                </>
              )}
            </div>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='py-2 px-4 rounded-sm w-full outline-none border bg-slate-100'
              placeholder='Enter password'
              type={showPass ? "text" : "password"}
            />
          </div>
          <button
            onSubmit={() => {
              setIsCancel(false);
            }}
            type='submit'
            className='text-sm font-medium bg-yellow-500 px-4 py-2 rounded w-3/4'
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

export default EnterPassModal;
