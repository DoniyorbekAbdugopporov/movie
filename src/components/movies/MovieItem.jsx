import React, { memo } from "react";
import { useNavigate } from "react-router-dom";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addMovie } from "../../redux/slices/saved-slice";

const MovieItem = ({ title, poster_path, vote_average, id }) => {
  const saved = useSelector((state) => state.saved.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isSaved = saved?.some((item) => item.id === id);

  const handleNavigate = () => navigate(`/movie/${id}`);
  const handleSave = () =>
    dispatch(addMovie({ id, title, poster_path, vote_average }));

  return (
    <div className="w-[280px] h-[450px] flex flex-col rounded-xl bg-black shadow-md relative overflow-hidden">
      <img
        onClick={handleNavigate}
        src={`${import.meta.env.VITE_IMAGE_URL}${poster_path}`}
        alt={title}
        className="w-full h-[380px] object-cover rounded-t-xl cursor-pointer transition-transform hover:scale-105"
      />
      <div className="p-2 flex-1 flex flex-col justify-between">
        <h3 className="text-white text-sm font-semibold truncate" title={title}>
          {title}
        </h3>
        <p className="text-gray-400 text-sm mt-1">Rating: {vote_average}</p>
      </div>
      <button
        onClick={handleSave}
        className="absolute top-3 right-3 text-2xl text-[#C61F1F] hover:scale-110 transition-transform"
        aria-label={isSaved ? "Remove from saved" : "Add to saved"}
      >
        {isSaved ? <FaBookmark /> : <FaRegBookmark />}
      </button>
    </div>
  );
};

export default memo(MovieItem);
