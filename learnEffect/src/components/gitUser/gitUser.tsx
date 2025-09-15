import { useGithub } from "../../hooks/useGithub";

const GitUser = () => {
  const { user, loading, error } = useGithub("akjmalamin7");

  if (loading) return <p>Loading…</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!user) return <p>No user found</p>;

  return (
    <div>
      <h1>{user.login}</h1>
      <p>{user.bio}</p>
      <img src={user.avatar_url} alt={user.login} width={120} />
      <p>
        <a href={user.html_url} target="_blank" rel="noreferrer">
          View Profile
        </a>
      </p>
    </div>
  );
};
export default GitUser;