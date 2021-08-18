import "./App.css";
import { useRef, useState } from "react";
import axios from "axios";

function App() {
  // Registeration refs
  const registerUsername = useRef("");
  const registerPassword = useRef("");

  // Login refs
  const loginUsername = useRef("");
  const loginPassword = useRef("");

  const [userData, setUserData] = useState(null);

  function register(event) {
    event.preventDefault();
    axios({
      method: "POST",
      data: {
        username: registerUsername.current.value,
        password: registerPassword.current.value,
      },
      url: "https://arcane-wave-70146.herokuapp.com/register",
      withCredentials: true,
    }).then((res) => {
      console.log(res.data);
      registerUsername.current.value = "";
      registerPassword.current.value = "";
    });
  }
  function login(event) {
    event.preventDefault();
    axios({
      method: "POST",
      data: {
        username: loginUsername.current.value,
        password: loginPassword.current.value,
      },
      url: "https://arcane-wave-70146.herokuapp.com/login",
      withCredentials: true,
    }).then((res) => {
      console.log(res.data);
      loginUsername.current.value = "";
      loginPassword.current.value = "";
    });
  }
  function getUser(event) {
    event.preventDefault();
    axios({
      method: "GET",
      url: "https://arcane-wave-70146.herokuapp.com/user",
      withCredentials: true,
    })
      .then((res) => setUserData(res.data))
      .catch((err) => console.log(err));
  }

  function hit() {
    axios({
      method: "GET",
      url: "https://arcane-wave-70146.herokuapp.com/hit",
      withCredentials: true,
    })
      .then((res) => setUserData(res.data))
      .catch((err) => console.log(err));
  }

  return (
    <div className="App">
      <form onSubmit={register}>
        <h1>Register</h1>
        <input type="text" placeholder="username" ref={registerUsername} />
        <input type="password" placeholder="password" ref={registerPassword} />
        <button type="submit">Register</button>
      </form>
      <form onSubmit={login}>
        <h1>Login</h1>
        <input type="text" placeholder="username" ref={loginUsername} />
        <input type="password" placeholder="password" ref={loginPassword} />
        <button type="submit">Login</button>
      </form>
      <form onSubmit={getUser}>
        <h1>Get User</h1>
        <button type="submit">Submit</button>
        {userData ? (
          <div>
            <h1>Hello {userData.username}!🔥</h1>
            <h2>User Hits - {userData.hits}</h2>
            <button onClick={hit}>Hit🔨</button>
          </div>
        ) : (
          <h1>Seems like you didn't Logged In!</h1>
        )}
      </form>
    </div>
  );
}

export default App;
