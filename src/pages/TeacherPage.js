const TeacherPage = ({ user }) => {
  return (
    <div>
      <h1>{user.name}</h1>
      <h2>{user.email}</h2>
    </div>
  );
};

export default TeacherPage;
