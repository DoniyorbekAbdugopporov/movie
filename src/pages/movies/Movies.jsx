import React, { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { request } from "@/api";
import Genre from "@/components/genre/Genre";
import MoviesList from "@/components/movies/Movies";
import Pagination from "@mui/material/Pagination";

const MoviesPage = () => {
  const [selectedGenre, setSelectedGenre] = useState([]);
  const [page, setPage] = useState(1);

  const queryClient = useQueryClient();

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

  // Prefetch next page
  useEffect(() => {
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

  // Handle page change
  const handlePageChange = (event, value) => setPage(value);

  return (
    <div>
      <Genre
        data={genres || []}
        setSelectedGenre={setSelectedGenre}
        selectedGenre={selectedGenre}
        isLoading={genresLoading}
      />
      <MoviesList data={movies || { results: [] }} />
      <div className="flex justify-center py-10 bg-black">
        <Pagination
          page={page}
          onChange={handlePageChange}
          count={Math.min(movies?.total_pages || 1, 500)}
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
    </div>
  );
};

export default MoviesPage;
