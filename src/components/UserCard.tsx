import { useMemo, useState } from "react";
import { fetchUserRepos } from "../api/githubUsers";
import type { GitHubRepo, GitHubUser } from "../types/github";

interface UserCardProps {
  user: GitHubUser;
}

export default function UserCard({ user }: UserCardProps) {
  const [showRepos, setShowRepos] = useState(false);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [repoLoading, setRepoLoading] = useState(false);
  const [repoError, setRepoError] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState("All");

  const joinedDate = new Date(user.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const languages = useMemo(() => {
    const uniqueLanguages = Array.from(
      new Set(repos.map((repo) => repo.language).filter((lang): lang is string => Boolean(lang)))
    ).sort();

    return uniqueLanguages;
  }, [repos]);

  const filteredRepos = useMemo(() => {
    if (selectedLanguage === "All") {
      return repos;
    }

    return repos.filter(
      (repo) => repo.language?.toLowerCase() === selectedLanguage.toLowerCase()
    );
  }, [repos, selectedLanguage]);

  const handleRepoToggle = async () => {
    if (showRepos) {
      setShowRepos(false);
      return;
    }

    if (repos.length > 0) {
      setShowRepos(true);
      return;
    }

    setRepoLoading(true);
    setRepoError(null);

    try {
      const loadedRepos = await fetchUserRepos(user.repos_url);
      setRepos(loadedRepos);
      setShowRepos(true);
    } catch (error) {
      setRepoError(error instanceof Error ? error.message : "Repositorylər yüklənmədi");
    } finally {
      setRepoLoading(false);
    }
  };

  return (
    <div className="user-card">
      <div className="user-info">
        <img src={user.avatar_url} alt={user.login} className="avatar" />
        <div className="user-header">
          <h2>{user.name ?? user.login}</h2>
          <a
            href={`https://github.com/${user.login}`}
            target="_blank"
            rel="noreferrer">
            @{user.login}
          </a>
          <p>Joined {joinedDate}</p>
        </div>
      </div>
      <div className="stats">
        <div>
          <button className="repos-button" onClick={handleRepoToggle}>
            <span>Repository</span>
            <strong>{user.public_repos}</strong>
          </button>
        </div>
        <div>
          <span>Followers</span>
          <strong>{user.followers}</strong>
        </div>
        <div>
          <span>Following</span>
          <strong>{user.following}</strong>
        </div>
      </div>

      {showRepos && (
        <div className="repos-panel">
          {repoLoading && <p className="repo-status">Yüklənir...</p>}
          {repoError && <p className="repo-status error">{repoError}</p>}

          {!repoLoading && !repoError && repos.length > 0 && (
            <>
              <div className="repo-filter-row">
                <label htmlFor="repo-language">Filter by language</label>
                <select
                  id="repo-language"
                  value={selectedLanguage}
                  onChange={(event) => setSelectedLanguage(event.target.value)}
                  className="repo-filter">
                  <option value="All">All languages</option>
                  {languages.map((language) => (
                    <option key={language} value={language}>
                      {language}
                    </option>
                  ))}
                </select>
              </div>

              {filteredRepos.length > 0 ? (
                <ul className="repo-list">
                  {filteredRepos.map((repo) => (
                    <li key={repo.id} className="repo-item">
                      <a href={repo.html_url} target="_blank" rel="noreferrer">
                        {repo.name}
                      </a>
                      {repo.description && <p>{repo.description}</p>}
                      {repo.language && <span className="repo-language">{repo.language}</span>}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="repo-status">No repositories found for this language.</p>
              )}
            </>
          )}
        </div>
      )}

      {user.location && <p>📍 {user.location}</p>}
      {user.blog && (
        <a href={user.blog ?? undefined} target="_blank" rel="noreferrer">
          🔗 {user.blog}
        </a>
      )}
    </div>
  );
}
