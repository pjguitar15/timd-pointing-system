import { LuView } from "react-icons/lu";
import { TbScoreboard } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

const GameActionModal = ({
  open,
  selectedId,
  toggleModal,
  openJuryModal,
}: {
  open: boolean;
  selectedId: string;
  toggleModal: () => void;
  openJuryModal: () => void;
}) => {
  const navigate = useNavigate();
  return (
    open && (
      <div className='fixed h-screen w-screen inset-0 flex items-center justify-center z-50'>
        <div
          className='bg-black opacity-80 w-full fixed inset-0'
          onClick={toggleModal}
        ></div>
        <div className='bg-white text-black z-50 w-3/4 sm:w-8/12 lg:w-6/12 xl:w-4/12 px-12 py-6 flex flex-col items-center justify-center gap-2 rounded'>
          <h6 className='font-medium'>Select an action</h6>
          <div className='flex flex-col sm:flex-row w-full gap-2'>
            <button
              onClick={() => {
                toggleModal();
                navigate(`/game/${selectedId}`);
              }}
              className='text-md font-medium bg-yellow-500 px-4 py-2 rounded w-full flex gap-2 items-center justify-center'
            >
              <LuView className='text-lg' />I am a viewer
            </button>
            <button
              onClick={() => {
                toggleModal();
                openJuryModal();
              }}
              className='text-md font-medium bg-yellow-500 px-4 py-2 rounded w-full flex items-center gap-2 justify-center'
            >
              <TbScoreboard className='text-xl' />I am a jury
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default GameActionModal;
