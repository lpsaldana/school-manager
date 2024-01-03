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
import AddSubject from "./components/addSubject";
import AddClassroom from "./components/AddClassroom";

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
      localStorage.setItem("user", JSON.stringify(response.data));
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    window.location.reload();
  };

  const handleAddTeacher = async (id, name, email, password) => {
    try {
      await axios.post(
        "http://localhost:3001/teacher",
        {
          id: id,
          name: name,
          email: email,
          password: password,
        },
        { headers: headers }
      );
    } catch (error) {
      console.log(error);
    }
  }

  const handleAddStudent = async (id, classroom_id, name, email, password) => {
    try {
      await axios.post(
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
    }
    catch (error) {
      console.log(error);
    }
  };

  const handleAddSubject = async (id, name, classroom_id) => {
    try {
      await axios.post(
        "http://localhost:3001/subject",
        {
          id: id,
          name: name,
          classroom_id: classroom_id,
        },
        { headers: headers }
      );
    }
    catch (error) {
      console.log(error);
    }
  };

  const handleAddClassroom = async (id, name, teacher_id) => {
    try {
      await axios.post(
        "http://localhost:3001/classroom",
        {
          id: id,
          name: name,
          teacher_id: teacher_id,
        },
        { headers: headers }
      );
    }
    catch (error) {
      console.log(error);
    }
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              localStorage.getItem("user") ? (
                <Home user={user} onLogout={handleLogout} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/login"
            element = {
              localStorage.getItem("user") ? (
                <Navigate to="/" />
              ) : (
                <LoginForm onLogin={handleLogin} />
              )
            }
          />
          <Route 
            path="/add-teacher"
            element={
              localStorage.getItem("user") ? (
                <AddTeacher addTeacher={handleAddTeacher} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/add-student"
            element={
              localStorage.getItem("user") ? (
                <AddStudent addStudent={handleAddStudent} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/add-subject"
            element={
              localStorage.getItem("user") ? (
                <AddSubject addSubject={handleAddSubject} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/add-classroom"
            element={
              localStorage.getItem("user") ? (
                <AddClassroom addClassroom={handleAddClassroom} />
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
