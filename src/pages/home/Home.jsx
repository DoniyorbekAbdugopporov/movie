import React, { memo, useEffect, useState } from "react";
import Movies from "../../components/movies/Movies";
import { request } from "../../api";
import { Carousel } from "../../components/carousel/Carousel";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Genre from "../../components/genre/Genre";
import Pagination from "@mui/material/Pagination";

const Home = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState([]);

  // Sahifa raqamini yangilash
  const handleChange = (event, value) => setPage(value);

  // Janrlarni olish
  useEffect(() => {
    request("/genre/movie/list")
      .then((res) => setGenres(res.data.genres))
      .catch((err) => console.error("Error fetching genres:", err));
  }, []);

  // Filmlarni olish
  useEffect(() => {
    request("/discover/movie", {
      params: {
        page,
        with_genres: selectedGenre.join(","),
      },
    })
      .then((res) => setData(res.data))
      .catch((err) => console.error("Error fetching movies:", err));
  }, [page, selectedGenre]);

  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      <Header />
      <Carousel data={data} />
      <Genre
        data={genres}
        setSelectedGenre={setSelectedGenre}
        selectedGenre={selectedGenre}
      />
      <Movies data={data} />
      <div className="flex justify-center py-6">
        <Pagination
          page={page}
          onChange={handleChange}
          count={Math.min(data?.total_pages || 1, 500)} // Max 500 sahifa
          sx={{
            "& .MuiPaginationItem-root": {
              color: "#fff",
              backgroundColor: "#1a1a1a",
              border: "1px solid #ff4040",
              "&:hover": {
                backgroundColor: "#ff4040",
                color: "#fff",
              },
            },
            "& .Mui-selected": {
              backgroundColor: "#ff4040",
              color: "#fff",
              border: "1px solid #ff7373",
              "&:hover": {
                backgroundColor: "#ff7373",
              },
            },
            "& .MuiPaginationItem-ellipsis": {
              color: "#ff7373",
            },
          }}
        />
      </div>
      <Footer />
    </div>
  );
};

export default memo(Home);
