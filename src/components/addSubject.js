import { useEffect, useState } from "react";
import axios from "axios";

const AddSubject = ({ addSubject }) => {
  const [id, setId] = useState(0);
  const [name, setName] = useState("");
  const [classroomId, setClassroomId] = useState(0);
  const [classrooms, setClassrooms] = useState([]);

  useEffect(() => {
    const fetchClassrooms = async () => {
      try {
        const response = await axios.get("http://localhost:3001/classrooms");
        setClassrooms(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchClassrooms();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    addSubject(id, name, classroomId);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Id</label>
      <input type="number" value={id} onChange={(e) => setId(e.target.value)} />
      <label>Nombre de la materia: </label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label>Clase a la que sera asignada: </label>
      <select
        value={classroomId}
        onChange={(e) => setClassroomId(e.target.value)}
      >
        <option value="0">Seleccione una clase</option>
        {classrooms.map((classroom) => (
          <option value={classroom.Id}>{classroom.name}</option>
        ))}
      </select>
      <button type="submit">Add Subject</button>
    </form>
  );
};

export default AddSubject;
