import { BOOK_GENRE } from "../utilities/Data";

const PostSearchBar = ({
  searchTitle,
  setSearchTitle,
  searchAuthor,
  setSearchAuthor,
  searchGenre,
  setSearchGenre,
  onSearch,
}) => {
  return (
    <div className="flex space-x-2 p-1 mr-auto ml-auto">
      <input
        className="p-3 rounded-lg"
        type="text"
        placeholder="Title"
        value={searchTitle}
        onChange={(e) => setSearchTitle(e.target.value)}
      />
      <input
        className="p-3 rounded-lg"
        type="text"
        placeholder="Author"
        value={searchAuthor}
        onChange={(e) => setSearchAuthor(e.target.value)}
      />
      <select
        className="p-3 rounded-lg"
        onChange={(e) => setSearchGenre(e.target.value)}
        value={searchGenre}
      >
        <option value="">Select a genre</option>
        {BOOK_GENRE.map((genre, key) => (
          <option key={key} value={genre}>
            {genre}
          </option>
        ))}
      </select>
      <button
        onClick={onSearch}
        className="bg-blue-500 text-white px-2 rounded"
      >
        Search
      </button>
    </div>
  );
};
export default PostSearchBar;
