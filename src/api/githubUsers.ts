import type { GitHubUser } from "../types/github";

const GITHUB_API = "https://api.github.com/users";

export async function fetchUser(username: string): Promise<GitHubUser> {
  if (!username) {
    throw new Error("Username is required");
  }

  const res = await fetch(`${GITHUB_API}/${encodeURIComponent(username)}`, {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
    },
  });

  if (!res.ok) {
    throw new Error("İstifadəçi tapılmadı");
  }
  const data = await res.json();
  return data as GitHubUser;
}
