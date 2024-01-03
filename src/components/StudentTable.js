const StudentTable = ({ subjects, getAverage }) => {

    const average = getAverage(subjects);

  return (
    <div>
      <h1>Student Page </h1>
      <table>
        <thead>
          <tr>
            {subjects.map((subject) => (
              <th>{subject.name}</th>
            ))}
            <th>Promedio</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            {subjects.map((subject) => (
              <td>
                {subject.grades.map((grade) => (
                  <td>{grade.value}</td>
                ))}
              </td>
            ))}
            <td>{average}</td>
            <td>{average >= 7 ? "Aprobado" : "Reprobado"}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default StudentTable;
