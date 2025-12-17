import { useContext, useState } from "react";
import { Navigate } from "react-router";
import { AuthContext } from "../contexts/authContext";

const SignUpPage = () => {
  const context = useContext(AuthContext);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [registered, setRegistered] = useState(false);

  const register = async () => {
    let passwordRegEx = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    const validPassword = passwordRegEx.test(password);

    console.log("SIGNUP click:", { userName, password, passwordAgain, validPassword });

    if (!validPassword) {
        alert("Bad password. Need 8+ chars and one of @$!%*#?& (no _)");
        return;
    }
    if (password !== passwordAgain) {
        alert("Passwords do not match");
        return;
    }

    try {
        let result = await context.register(userName, password);
        console.log("REGISTER RESULT:", result);
        if (!result) alert("Register failed (username exists?)");
        setRegistered(result);
    } catch (e) {
        console.log("REGISTER ERROR:", e);
        alert("Register error - check console/network");
    }
    };



  if (registered === true) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <h2>SignUp page</h2>
      <p>
        You must register a username and password to log in. Passwords must contain a minimum of 8
        characters (with at least one letter, one number and one symbol).
      </p>

      <input value={userName} placeholder="user name" onChange={(e) => setUserName(e.target.value)} />
      <br />
      <input value={password} type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
      <br />
      <input value={passwordAgain} type="password" placeholder="password again" onChange={(e) => setPasswordAgain(e.target.value)} />
      <br />

      <button onClick={register}>Register</button>
    </>
  );
};

export default SignUpPage;
