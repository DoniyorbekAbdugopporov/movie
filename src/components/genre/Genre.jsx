import React from "react";

const Genre = ({ data, setSelectedGenre, selectedGenre }) => {
  const handleChange = (id) => {
    if (selectedGenre.includes(id)) {
      setSelectedGenre((prev) =>
        prev.filter((selectedId) => selectedId !== id)
      );
    } else {
      setSelectedGenre((prev) => [...prev, id]);
    }
  };

  return (
    <div className="container mx-auto flex gap-3 overflow-auto p-2 mb-8">
      {data?.map((item) => (
        <div
          key={item.id}
          onClick={() => handleChange(item.id)}
          className={`whitespace-nowrap px-4 py-2 border border-red-600 text-white rounded-md cursor-pointer transition-all duration-200 select-none ${
            selectedGenre.includes(item.id)
              ? "bg-red-600 text-white"
              : "hover:bg-red-600 hover:text-white"
          }`}
        >
          {item.name}
        </div>
      ))}
    </div>
  );
};

export default Genre;
