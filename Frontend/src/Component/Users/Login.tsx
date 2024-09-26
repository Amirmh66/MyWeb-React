import { useContext } from "react";
import "./Login.css";
import { LoginContext } from "../Context/LoginContext";
function Login() {
  const  { setUserName , setShowProfile }:any = useContext(LoginContext);
  return (
    <>
      <div>
        <input
          onChange={(e) => setUserName(e.target.value)}
          type="text"
          placeholder="Username"
        />
        <input type="text" placeholder="Password" />
        <button onClick={() => {setShowProfile(true)}}>Login</button>
      </div>
    </>
  );
}

export default Login;
