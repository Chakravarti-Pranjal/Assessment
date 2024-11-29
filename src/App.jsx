import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Login from './components/Login';
import Home from './components/Home';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login setIsAuthenticated={setIsAuthenticated} />} />

                <Route
                    path="/home"
                    element={
                        <PrivateRoute isAuthenticated={isAuthenticated}>
                            <Home />
                        </PrivateRoute>
                    }
                />
            </Routes>
        </Router>
    );
};

export default App;
