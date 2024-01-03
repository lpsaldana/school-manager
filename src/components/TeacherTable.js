import { useState, useEffect } from "react";

const TeacherTable = ({ classroom, subjects, students, updateGrade, addGrade }) => {
  const [gradeValue, setGradeValue] = useState(0);
  const [studentId, setStudentId] = useState(0);
  const [subjectId, setSubjectId] = useState(0);
  const [edit, setEdit] = useState(false);

  const handleGradeClick = (e) => {
    e.preventDefault();
    setEdit(false);

    if (gradeValue >= 0 && gradeValue <= 10) {
      if (studentId !== 0 && subjectId !== 0) {
        students.forEach((student) => {
          if (student.id === studentId) {
            let subject = student.grades.find((grade) => grade.subject_id === subjectId);
            if (subject) {
              updateGrade(studentId, subjectId, gradeValue);
              console.log(studentId, subjectId, gradeValue)
            } else {
              addGrade(studentId, subjectId, gradeValue);
            }
          }
        });
      } else
        console.log("Debe seleccionar un estudiante y una materia");
    } else 
      console.log("La nota debe estar entre 0 y 10");
  };

  useEffect(() => {
    const getAvrg = (grades) => {
      let sum = 0;
      grades.forEach((grade) => {
        sum += Number(grade.value);
      });
      return sum / grades.length;
    };
    
    students.forEach((student) => {
      student.average = getAvrg(student.grades);
    });
  }, []);

  return (
    <div>
      <h1>{classroom}</h1>
      <table>
        <thead>
          <tr>
            <th>Estudiante</th>
            {subjects.map((subject) => (
              <th key={subject.Id}>{subject.name}</th>
            ))}
            <th>Promedio</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.name}</td>
              {subjects.map((subject) => {
                const grade = student.grades.find((grade) => grade.subject_id === subject.Id);
                return (
                  <td key={subject.Id}>
                    {grade ? grade.grade : "-"}
                  </td>
                );
              })}
              <td>{student.average}</td>
              <td>
                {student.average >= 7 ? (
                  <p>Aprobado</p>
                ) : (
                  <p>Reprobado</p>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {edit ? (
        <div>
          <input
            type="number"
            onChange={(e) => setGradeValue(e.target.value)}
            placeholder="Nota"
          />
          <button onClick={handleGradeClick}>Guardar</button>
          <button onClick={() => setEdit(false)}>Cancelar</button>
        </div>
      ) : (
        <div>
          <select onChange={(e) => setStudentId(e.target.value)}>
            <option value="0">Estudiante</option>
            {students.map((student) => (
              <option key={student.id} value={student.id}>{student.name}</option>
            ))}
          </select>
          <select onChange={(e) => setSubjectId(e.target.value)}>
            <option value="0">Materia</option>
            {subjects.map((subject) => (
              <option key={subject.Id} value={subject.Id}>{subject.name}</option>
            ))}
          </select>
          <button onClick={() => setEdit(true)}>Editar</button>
        </div>
      )}
    </div>
  );
};

export default TeacherTable;
                