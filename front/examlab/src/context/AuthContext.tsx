import { createContext, useContext, useEffect, useState } from "react";

export type User = {
  nome: string;
  email: string;
  telefone?: string;
  cnpj?: string;
};

type LoginInput = { email: string; password: string; nome?: string; telefone?: string; cnpj?: string };
type LoginResult = { ok: boolean; error?: string };

type AuthContextType = {
  isAuthed: boolean;
  user: User | null;
  login: (input: LoginInput) => LoginResult;
  logout: () => void;
  updateUser: (patch: Partial<User>) => void;
};

const AuthCtx = createContext<AuthContextType | undefined>(undefined);
const KEY = "sge_user";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthed, setIsAuthed] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  // carrega do localStorage
  useEffect(() => {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      setUser(JSON.parse(raw));
      setIsAuthed(true);
    }
  }, []);

  const persist = (u: User | null) => {
    if (u) localStorage.setItem(KEY, JSON.stringify(u));
    else localStorage.removeItem(KEY);
  };

  const login = ({ email, password, nome, telefone, cnpj }: LoginInput): LoginResult => {
    if (!email || !password) return { ok: false, error: "Informe email e senha" };
    const u: User = { email, nome: nome || "Usuário", telefone, cnpj };
    setUser(u); setIsAuthed(true); persist(u);
    return { ok: true };
  };

  const logout = () => { setIsAuthed(false); setUser(null); persist(null); };

  const updateUser = (patch: Partial<User>) => {
    setUser(prev => {
      const next = { ...(prev as User), ...patch };
      persist(next);
      return next;
    });
  };

  return (
    <AuthCtx.Provider value={{ isAuthed, user, login, logout, updateUser }}>
      {children}
    </AuthCtx.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthCtx);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
