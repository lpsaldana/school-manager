import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AdminPage = () => {
  const [loading, setLoading] = useState(true);
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
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

    fetchTeachers();
    fetchStudents();
  }, []);

  return (
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
    </ul>
  );
};

export default AdminPage;
