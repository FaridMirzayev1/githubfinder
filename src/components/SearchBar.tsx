import { useEffect, useState } from "react";

interface SearchBarProps {
  onSearch: (username: string) => void;
}

const STORAGE_KEY = "github-search-history";

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [username, setUsername] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem(STORAGE_KEY);

    if (data) {
      setHistory(JSON.parse(data));
    }
  }, []);

  const handleSearch = () => {
    if (username.trim() === "") return;

    onSearch(username);
    console.log(username);

    const newHistory = [
      username,
      ...history.filter((item) => item !== username),
    ];
    setHistory(newHistory);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));

    setShowHistory(false);
  };

  const filteredHistory = history.filter((item) =>
    item.toLowerCase().includes(username.toLowerCase()),
  );

  return (
    <div className="search-bar">
      <div className="search-input-wrapper">
        <input
          onFocus={() => setShowHistory(true)}
          type="text"
          placeholder="Search GitHub user"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            setShowHistory(true);
          }}
        />

        {showHistory && filteredHistory.length > 0 && (
          <ul className="suggestions">
            {filteredHistory.map((item) => (
              <li
                key={item}
                onClick={() => {
                  setUsername(item);
                  setShowHistory(false);
                }}>
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>

      <button onClick={handleSearch}>SEARCH</button>
    </div>
  );
}
