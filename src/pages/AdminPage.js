import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AdminPage = ({ user }) => {
  const [loading, setLoading] = useState(true);
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const [subjects, setsubjects] = useState([]);
  const [classrooms, setClassrooms] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await axios.get("http://localhost:3001/teachers");
        setTeachers(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    const fetchStudents = async () => {
      try {
        const response = await axios.get("http://localhost:3001/students");
        setStudents(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    const fetchsubjects = async () => {
      try {
        const response = await axios.get("http://localhost:3001/subjects");
        setsubjects(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    const fetchClassrooms = async () => {
      try {
        const response = await axios.get("http://localhost:3001/classrooms");
        setClassrooms(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    fetchTeachers();
    fetchStudents();
    fetchsubjects();
    fetchClassrooms();
  }, []);

  return (
    <div>
      <h1>Bienvenido {user.name}</h1>
      <p>Este es el panel de administración</p>
      <ul>
        <h1>Profesores</h1>
        <Link to="/add-teacher">Agregar Profesor</Link>
        {loading ? (
          <p>Loading...</p>
        ) : (
          teachers.map((teacher) => (
            <li key={teacher.id}>
              Nombre: {teacher.name} - Correo: {teacher.email}
            </li>
          ))
        )}
        <h1>Estudiantes</h1>
        <Link to="/add-student">Agregar Estudiante</Link>
        {loading ? (
          <p>Loading...</p>
        ) : (
          students.map((student) => (
            <li key={student.id}>
              {student.name} - {student.email}
            </li>
          ))
        )}
        <h1>Materias</h1>
        <Link to="/add-subject">Agregar Materia</Link>
        {loading ? (
          <p>Loading...</p>
        ) : (
          subjects.map((subject) => (
            <li key={subject.id}>
              {subject.name}
            </li>
          ))
        )}

        <h1>Salones</h1>
        <Link to="/add-classroom">Agregar Salón</Link>
        {loading ? (
          <p>Loading...</p>
        ) : (
          classrooms.map((classroom) => (
            <li key={classroom.id}>
              {classroom.name}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default AdminPage;
