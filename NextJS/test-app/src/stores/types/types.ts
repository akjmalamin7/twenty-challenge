
export type UserTypes = { id: string; name: string; username?: string };
export type AuthContextType = {
  user: UserTypes | null;
  login: (user: UserTypes) => void;
  logout: () => void
}

