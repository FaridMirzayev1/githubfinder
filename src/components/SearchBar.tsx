import { useState } from "react";

interface SearchBarProps {
  onSearch: (username: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [username, setUsername] = useState("");

  const handleSearch = () => {
    onSearch(username.trim());
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search GitHub username.."
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={handleSearch}>SEARCH</button>
    </div>
  );
}
