import type { GitHubRepo, GitHubUser } from "../types/github";

const GITHUB_API = "https://api.github.com/users";
const githubToken = import.meta.env.VITE_GITHUB_TOKEN as string | undefined;

function getGithubHeaders() {
  return {
    Accept: "application/vnd.github+json",
    ...(githubToken ? { Authorization: `Bearer ${githubToken}` } : {}),
    "X-GitHub-Api-Version": "2022-11-28",
  };
}

export async function fetchUser(username: string): Promise<GitHubUser> {
  if (!username) {
    throw new Error("Username is required");
  }

  const res = await fetch(`${GITHUB_API}/${encodeURIComponent(username)}`, {
    headers: getGithubHeaders(),
  });

  if (!res.ok) {
    throw new Error("İstifadəçi tapılmadı");
  }

  const data = await res.json();
  return data as GitHubUser;
}

export async function fetchUserRepos(reposUrl: string): Promise<GitHubRepo[]> {
  const res = await fetch(reposUrl, {
    headers: getGithubHeaders(),
  });

  if (!res.ok) {
    throw new Error("Repositorylər yüklənmədi");
  }

  return (await res.json()) as GitHubRepo[];
}