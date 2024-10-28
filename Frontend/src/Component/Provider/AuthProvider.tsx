import { jwtDecode } from "jwt-decode";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
interface JwtPayload {
  role: string;
  id: string;
  userName: string;
  exp: number;
}
interface IAuthContext {
  id: string | null;
  userName: string | null;
  role: string | null;
  isTokenExpired: Boolean | null;
  login: (role: string) => void;
  logout: () => void;
}
const AuthContext = createContext<IAuthContext | undefined>(undefined);
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [role, setRole] = useState<string | null>(null);
  const [id, setUser] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [isTokenExpired, setIsTokenExpired] = useState<Boolean | null>(null);
  console.log(role);

  useEffect(() => {
    login();
  }, []);

  const login = () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode<JwtPayload>(token);
        setRole(decodedToken.role);
        setUser(decodedToken.id);
        setUserName(decodedToken.userName);
        const currentTime = Math.floor(Date.now() / 1000);
        if (decodedToken.exp < currentTime) {
          localStorage.removeItem("token");
          setIsTokenExpired(true);
        } else {
          setRole(decodedToken.role);
        }
      } catch (error) {
        console.log("Invalid token:", error);
        setIsTokenExpired(true);
      }
    }
  };

  const logout = () => {
    setRole(null);
    localStorage.removeItem("token");
    localStorage.removeItem("theme");
    alert("Logout Successfully!");
  };
  return (
    <AuthContext.Provider
      value={{ role, id, login, logout, isTokenExpired, userName }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = (): IAuthContext | undefined => {
  return useContext(AuthContext);
};
