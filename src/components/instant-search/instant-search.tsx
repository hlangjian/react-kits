import { useEffect, useState } from "react";
import { client } from "./useInstantSearch";

export type SearchProps = {};

type Movie = {
  id: number;
  title: string;
  genres: string[];
};

const documents: Movie[] = [
  { id: 1, title: "Carol", genres: ["Romance", "Drama"] },
  { id: 2, title: "Wonder Woman", genres: ["Action", "Adventure"] },
  { id: 3, title: "Life of Pi", genres: ["Adventure", "Drama"] },
  {
    id: 4,
    title: "Mad Max: Fury Road",
    genres: ["Adventure", "Science Fiction"],
  },
  { id: 5, title: "Moana", genres: ["Fantasy", "Action"] },
  { id: 6, title: "Philadelphia", genres: ["Drama"] },
  { id: 7, title: "烈火雄心", genres: ["Action"] },
];

const initMovies = async () => {
  const index = client.index("movies");
  if (index.primaryKey === undefined) {
    const result = await index.addDocuments(documents);
    console.log(result);
  }
  console.log(index);
};

const search = async (title: string) => {
  const index = client.index("movies");
  const docs = await index.search(title);
  return docs;
};

export const Search = (props: SearchProps) => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    console.log(movies);
  });

  return (
    <div>
      <input
        type="text"
        className="border"
        placeholder="search"
        onChange={async (e) => {
          const m = await search(e.currentTarget.value);
          setMovies(m.hits as Movie[]);
        }}
      />
      {movies.map((movie) => (
        <div>{JSON.stringify(movie)}</div>
      ))}
    </div>
  );
};
