import {useContext, useState} from "react";
import {Navigate} from "react-router-dom";
import {UserContext} from "../UserContext";

export default function LoginPage() {
  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');
  const [redirect,setRedirect] = useState(false);
  const {setUserInfo} = useContext(UserContext);
  async function login(ev) {
    ev.preventDefault();

    if (!username) {
      alert('Username cannot be empty');
      return;
    }
    if (!password) {
      alert('Password cannot be empty');
      return;
    }
    if (username.length < 3 || password.length < 6) {
      alert('Username must be at least 3 characters long and password must be at least 6 characters long');
      return;
    }


    const response = await fetch('http://localhost:4000/login', {
      method: 'POST',
      body: JSON.stringify({username, password}),
      headers: {'Content-Type':'application/json'},
      credentials: 'include',
    });
    if (response.ok) {
      response.json().then(userInfo => {
        setUserInfo(userInfo);
        setRedirect(true);
      });
    } else {
      alert('wrong credentials');
    }
  }

  if (redirect) {
    return <Navigate to={'/'} />
  }
  return (
    <div className='mainBody actionForms'>
    <form className="login" onSubmit={login}>
      <h1 className='pageTitle'>Login</h1>
      <input type="text"
             placeholder="username"
             value={username}
             onChange={ev => setUsername(ev.target.value)}/>
      <input type="password"
             placeholder="password"
             value={password}
             onChange={ev => setPassword(ev.target.value)}/>
      <button className="btn">Login</button>
    </form>
    </div>
  );
}