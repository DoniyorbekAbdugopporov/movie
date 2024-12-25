import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import {ReactTyped} from "react-typed";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { request } from "@/api";
import Movies from "@/components/movies/Movies";
import { useSearchParams } from "react-router-dom";

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState(searchParams.get("q") || "");
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["movie", searchValue],
    queryFn: () =>
      request
        .get("/search/movie", {
          params: { query: searchValue },
        })
        .then((res) => res.data),
    enabled: !!searchValue, // Fetch only if searchValue is not empty
  });

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchValue.trim()) {
      setSearchParams({ q: searchValue });
      queryClient.invalidateQueries({ queryKey: ["movie"] });
    }
  };

  const handleClear = () => {
    setSearchValue("");
    setSearchParams({});
    queryClient.invalidateQueries({ queryKey: ["movie"] });
  };

  useEffect(() => {
    if (!searchValue) {
      queryClient.invalidateQueries({ queryKey: ["movie"] });
    }
  }, [searchValue, queryClient]);

  return (
    <div className="bg-black">
      <div className="container mx-auto py-8 px-4 min-h-[500px]">
        <form
          onSubmit={handleSearch}
          className="flex items-center max-w-3xl mx-auto bg-gray-800 rounded-full overflow-hidden shadow-md"
        >
          <ReactTyped
            strings={["Avengers", "Venom", "Avatar", "Spiderman"]}
            typeSpeed={40}
            backSpeed={50}
            attr="placeholder"
            loop
            className="flex-grow"
          >
            <input
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="flex-grow px-4 py-2 w-full bg-transparent text-white placeholder-gray-400 outline-none"
              type="text"
            />
          </ReactTyped>
          {searchValue && (
            <button
              type="button"
              onClick={handleClear}
              className="px-4 py-2 text-white hover:bg-gray-700 transition-colors"
              title="Clear Search"
            >
              X
            </button>
          )}
          <button
            type="submit"
            className="px-4 py-2 text-white bg-red-600 hover:bg-red-700 transition-colors"
            title="Search"
          >
            <CiSearch size={24} />
          </button>
        </form>

        <div className="mt-6">
          {isLoading && (
            <p className="text-center text-white text-lg">Loading movies...</p>
          )}
          {isError && (
            <p className="text-center text-red-500 text-lg">
              Something went wrong. Please try again.
            </p>
          )}
          {!isLoading && !isError && data?.total_results === 0 && (
            <p className="text-center text-white text-lg">No movies found.</p>
          )}
        </div>

        {data && <Movies data={data} />}
      </div>
    </div>
  );
};

export default Search;
