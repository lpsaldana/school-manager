import { useState } from "react";

const AddStudent = ({ addStudent }) => {
  const [id, setId] = useState(0);
  const [classroom, setClassroom] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addStudent(id, classroom, name, email, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Id</label>
      <input type="number" value={id} onChange={(e) => setId(e.target.value)} />
      <label>Classroom</label>
      <input
        type="number"
        value={classroom}
        onChange={(e) => setClassroom(e.target.value)}
      />
      <label>Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label>Email</label>
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label>Password</label>
      <input
        type="text"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input type="submit" value="Add Student" />
    </form>
  );
};

export default AddStudent;
