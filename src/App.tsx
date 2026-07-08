import { useState } from "react";
import SearchBar from "./components/SearchBar";
import UserCard from "./components/UserCard";
import type { GitHubUser } from "./types/github";
import "./App.css";

export default function App() {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
const fetchUser = async (username: string) => {
  setLoading(true);
  setError(null);
  try {
    const res = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
      },
    });
    console.log(res); 
    if (!res.ok) {
      throw new Error("İstifadəçi tapılmadı");
    }

    const data: GitHubUser = await res.json();
    console.log(data);
    setUser(data);
    setError(null);
  } catch (err) {
    setUser(null);
    setError(err instanceof Error ? err.message : String(err));
  } finally {
    setLoading(false);
  }
};
  return (
    <div className="app">
      <SearchBar onSearch={fetchUser} />
      {loading && <p>Yüklənir...</p>}
      {error && <p className="error">{error}</p>}
      {user && <UserCard user={user} />}
    </div>
  );
}
