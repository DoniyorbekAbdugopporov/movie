import React, { memo } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Movies from "../../components/movies/Movies";
import { request } from "../../api";
import { Carousel } from "../../components/carousel/Carousel";
import Genre from "../../components/genre/Genre";
import Pagination from "@mui/material/Pagination";

const Home = () => {
  const queryClient = useQueryClient();

  const [selectedGenre, setSelectedGenre] = React.useState([]);
  const [page, setPage] = React.useState(1);

  const { data: genres, isLoading: genresLoading } = useQuery({
      queryKey: ["genres"],
      queryFn: () =>
        request.get("/genre/movie/list").then((res) => res.data.genres),
    });

  const { data: movies, isLoading: moviesLoading } = useQuery({
    queryKey: ["movies", page, selectedGenre],
    queryFn: () =>
      request
        .get("/discover/movie", {
          params: {
            page,
            without_genres: "18,10749,99",
            with_genres: selectedGenre.join(","),
          },
        })
        .then((res) => res.data),
    keepPreviousData: true,
  });

  React.useEffect(() => {
    if (page < (movies?.total_pages || 500)) {
      queryClient.prefetchQuery({
        queryKey: ["movies", page + 1, selectedGenre],
        queryFn: () =>
          request
            .get("/discover/movie", {
              params: {
                page: page + 1,
                without_genres: "18,10749,99",
                with_genres: selectedGenre.join(","),
              },
            })
            .then((res) => res.data),
      });
    }
  }, [page, selectedGenre, queryClient, movies]);

  const handlePageChange = (event, value) => setPage(value);

  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      {moviesLoading ? (
        <div className="text-center text-xl text-red-500">Loading...</div>
      ) : (
        <>
          <Carousel data={movies} />
          
          <Movies data={movies || { results: [] }} />
        </>
      )}
    </div>
  );
};

export default memo(Home);
