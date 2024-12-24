import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMovie } from "../../redux/slices/saved-slice";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Saved = () => {
  const saved = useSelector((state) => state.saved.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="bg-black">
      {saved.length === 0 ? (
        <div className="container h-[70vh] flex text-center justify-center items-center">
          <h2 className="text-white text-3xl">No saved movies!!!</h2>
        </div>
      ) : (
        <div className="container grid grid-cols-4 gap-4 pb-16 pt-11">
          {saved.map((item) => (
            <div key={item.id} className="rounded-lg bg-[#111111] relative">
              <img
                onClick={() => navigate(`/movie/${item.id}`)}
                src={`${import.meta.env.VITE_IMAGE_URL}${item.poster_path}`}
                className="rounded-lg"
                alt={item.title}
              />
              <h2 className="text-white my-2">{item.title}</h2>
              <button
                onClick={() => dispatch(addMovie(item))}
                className="absolute top-3 right-3 text-3xl text-[#C61F1F]"
              >
                {saved.some((movie) => movie.id === item.id) ? (
                  <FaBookmark />
                ) : (
                  <FaRegBookmark />
                )}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Saved;
