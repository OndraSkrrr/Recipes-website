import {useState} from "react";
import {Navigate} from "react-router-dom";

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistrationSuccessful, setIsRegistrationSuccessful] = useState(false);

  async function register(ev) {
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

    
    const response = await fetch('http://localhost:4000/register', {
      method: 'POST',
      body: JSON.stringify({username,password}),
      headers: {'Content-Type':'application/json'},
    });
    if (response.status === 200) {
      setIsRegistrationSuccessful(true);
      alert("Registration successful");
    } else if (response.status === 409) {
      alert("Username already exists");
    } else {
      alert("Registration failed");
    }
  }

  if (isRegistrationSuccessful) {
    return <Navigate to={"/"} />;
  }
  return (
    <div className='mainBody actionForms'>
    <form className="register" onSubmit={register}>
      <h1 className='pageTitle'>Register</h1>
      <input type="text"
             placeholder="username"
             value={username}
             onChange={ev => setUsername(ev.target.value)}/>
      <input type="password"
             placeholder="password"
             value={password}
             onChange={ev => setPassword(ev.target.value)}/>
      <button className="btn">Register</button>
    </form>
    </div>
  );
}