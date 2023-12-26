import { useState, useEffect } from "react";
import axios from "axios";

const AddClassroom = ({ addClassroom }) => {
  const [id, setId] = useState(0);
  const [name, setName] = useState("");
  const [teacherId, setTeacherId] = useState(0);
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await axios.get("http://localhost:3001/teachers");
        setTeachers(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTeachers();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    addClassroom(id, name, teacherId);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Id</label>
      <input type="number" value={id} onChange={(e) => setId(e.target.value)} />
      <label>Nombre de la clase: </label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label>Profesor a cargo: </label>
      <select value={teacherId} onChange={(e) => setTeacherId(e.target.value)}>
        <option value="0">Seleccione un profesor</option>
        {teachers.map((teacher) => (
          <option value={teacher.Id}>{teacher.name}</option>
        ))}
      </select>
      <button type="submit">Add Classroom</button>
    </form>
  );
};

export default AddClassroom;
