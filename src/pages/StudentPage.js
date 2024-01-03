import { useEffect, useState } from "react";
import axios from "axios";
import StudentTable from "../components/StudentTable";

const StudentPage = ({ user }) => {

  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `http://localhost:3001/student/${user.Id}`
      );
      setSubjects(response.data);
    };

    fetchData();
  }, []);

  const getAvrg = (grades) => {
    let sum = 0;
    grades.forEach((grade) => {
      console.log(grade.grades[0].value);
      sum += Number(grade.grades[0].value);
    });
    return(sum / grades.length);
  };

  return (
    <div>
      <h1>Estudiante</h1>
      <p>Hola {user.name}!</p>
      <StudentTable subjects={subjects} getAverage={getAvrg} />
    </div>
  );
};

export default StudentPage;
