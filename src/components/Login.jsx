import  { useState } from 'react';
import Papa from 'papaparse';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleLogin = async () => {
        const response = await fetch('./users.csv');
        const csvText = await response.text();

        Papa.parse(csvText, {
            header: true,
            complete: (results) => {
                const users = results.data;

                const user = users.find(
                    (user) => user.Username === username && user.Password === password
                );

                if(user){
                    setIsAuthenticated(true);
                    alert('login successfully.');
                }else {
                    alert('invalid credentials')
                }
            },
            error: (err) => {
        console.error('Error reading CSV file:', err);
        alert('Failed to validate credentials');
      },
        })
    }
   return (
     <div>
      <h1>{isAuthenticated ? 'Welcome!' : 'Login'}</h1>
      {!isAuthenticated && (
        <div>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
        </div>
      )}
    </div>
  )
}

export default Login
