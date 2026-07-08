import type { GitHubUser } from "../types/github";

interface UserCardProps {
  user: GitHubUser;
}

export default function UserCard({ user }: UserCardProps) {
  const joinedDate = new Date(user.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

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
          <span>Repos</span>
          <strong>{user.public_repos}</strong>
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

      {user.location && <p>📍 {user.location}</p>}
      {user.blog && (
        <a href={user.blog ?? undefined} target="_blank" rel="noreferrer">
          🔗 {user.blog}
        </a>
      )}
    </div>
  );
}
