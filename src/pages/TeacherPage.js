import { useState, useEffect } from "react";
import axios from "axios";
import TeacherTable from "../components/TeacherTable";

const TeacherPage = ({ user }) => {
  const [students, setStudents] = useState([]); // students is an array of strings
  const [classrooms, setClassrooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `http://localhost:3001/classrooms/teacher/${user.Id}`
      );
      setClassrooms(response.data.map((data) => data.name));
      setSubjects(
        response.data.map((data) => data.subjects.map((data) => data))
      );
      setStudents(
        response.data.map((data) => data.students.map((data) => data))
      );
    };

    fetchData();
    setLoading(false);
  }, []);

  const updateGrade = async (studentId, subjectId, gradeValue) => {
    try {
      const response = await axios.put(
        `http://localhost:3001/grade/${subjectId}/${studentId}`,
        {
          value: gradeValue,
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  const handleAddGrade = async (studentId, subjectId, gradeValue) => {
    try {
      const response = await axios.post(
        `http://localhost:3001/grade/${subjectId}/${studentId}`,
        {
          value: gradeValue,
          teacher_id: user.Id,
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Teacher Page </h1>
      <p>Hi {user.name}!</p>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {classrooms.map((classroom, index) => (
            <TeacherTable
              classroom={classroom}
              subjects={subjects[index]}
              students={students[index]}
              updateGrade={updateGrade}
              addGrade={handleAddGrade}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TeacherPage;
