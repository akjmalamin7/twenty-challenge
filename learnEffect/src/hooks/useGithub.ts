import { useEffect, useState } from "react";

// 1️⃣ Define a minimal type for the GitHub user response
// Add only the fields you care about, or use `any` if you need everything.
interface GithubUser {
  login: string;
  avatar_url: string;
  html_url: string;
  name?: string;
  bio?: string;
  [key: string]: unknown; // optional: allow extra fields
}

// 2️⃣ Define what the hook will return
interface UseGithubResult {
  user: GithubUser | null;
  loading: boolean;
  error: Error | null;
}

export function useGithub(username: string): UseGithubResult {
  const [user, setUser] = useState<GithubUser | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!username) return; // skip if username is empty

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`https://api.github.com/users/${username}`);

        if (!res.ok) {
          throw new Error(`Request failed with status ${res.status}`);
        }

        const data: GithubUser = await res.json();
        setUser(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [username]);

  return { user, loading, error };
}
