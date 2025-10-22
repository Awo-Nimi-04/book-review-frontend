const UserSearchBar = ({ searchName, setSearchName, onSearch }) => {
  return (
    <div className="flex space-x-2 p-1 mr-auto ml-auto">
      <input
        className="p-3 rounded-lg"
        type="text"
        placeholder="First, last, or username"
        value={searchName}
        onChange={(e) => setSearchName(e.target.value)}
      />
      <button
        onClick={onSearch}
        className="bg-blue-500 text-white px-2 rounded"
      >
        Search
      </button>
    </div>
  );
};
export default UserSearchBar;
