import { IoClose } from "react-icons/io5";
import { COUNTRY_LIST } from "../helpers/CountriesList";
import { useCourtContext } from "../Context/CourtContext";

const UpdateCountryModal = ({
  open,
  toggle,
  player,
}: {
  open: boolean;
  toggle: () => void;
  player: "1" | "2";
}) => {
  const { court1Info, updatePlayer1Country, updatePlayer2Country } =
    useCourtContext();
  return (
    <>
      {open && (
        <div className='w-screen h-screen fixed inset-0 flex items-center justify-center'>
          <div
            onClick={toggle}
            className='fixed bg-black opacity-80 inset-0 z-0'
          />
          <div className='bg-white rounded-lg pt-5 pb-8 px-7 z-10 relative w-[30rem]'>
            <IoClose
              onClick={toggle}
              className='absolute right-2 top-2 text-2xl cursor-pointer hover:text-red-500'
            />
            <h1 className='text-xl mb-4'>Update country</h1>
            <select
              value={
                player === "1"
                  ? court1Info.player1.country
                  : court1Info.player2.country
              }
              onChange={(e) => {
                player === "1"
                  ? updatePlayer1Country(e.target.value)
                  : updatePlayer2Country(e.target.value);
                toggle();
              }}
              className='text-lg px-3 py-2 w-full outline-none border border-slate-500 rounded-md'
            >
              {COUNTRY_LIST.map((item, index) => (
                <option
                  className='text-lg'
                  key={index}
                  value={item}
                >
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateCountryModal;
