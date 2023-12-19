import { useState } from "react";

const AddTeacher = ({ addTeacher }) => {
  const [id, setId] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addTeacher(id, name, email, password );
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Id</label>
      <input type="number" value={id} onChange={(e) => setId(e.target.value)} />
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
      <button>Add Teacher</button>
    </form>
  );
};

export default AddTeacher;
