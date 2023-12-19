import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import LoginForm from "./components/loginForm";
import Home from "./pages/Home";
import AddTeacher from "./components/AddTeaher";
import AddStudent from "./components/AddStudent";

function App() {
  const [user, setUser] = useState(null);

  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  };

  const handleLogin = async (email, password) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/login",
        {
          email: email,
          password: password,
        },
        { headers: headers }
      );
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    setUser(null);
  };

  const handleAddTeacher = async (id, name, email, password) => {
    try {
      console.log(id, name, email, password);
      const response = await axios.post(
        "http://localhost:3001/teacher",
        {
          id: id,
          name: name,
          email: email,
          password: password,
        },
        { headers: headers }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  const handleAddStudent = async (id, classroom_id, name, email, password) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/student",
        {
          id: id,
          classroom_id: classroom_id,
          name: name,
          email: email,
          password: password,
        },
        { headers: headers }
      );
      console.log(response.data);
    }
    catch (error) {
      console.log(error);
    }
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              user ? (
                <Home user={user} onLogout={handleLogout} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/login"
            element = {
              user ? (
                <Navigate to="/" />
              ) : (
                <LoginForm onLogin={handleLogin} />
              )
            }
          />
          <Route 
            path="/add-teacher"
            element={
              user ? (
                <AddTeacher addTeacher={handleAddTeacher} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/add-student"
            element={
              user ? (
                <AddStudent addStudent={handleAddStudent} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
