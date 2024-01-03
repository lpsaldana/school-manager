import AdminPage from "./AdminPage";
import StudentPage from "./StudentPage";
import TeacherPage from "./TeacherPage";

const Home = ({ user, onLogout }) => {

  const currentUser = JSON.parse(localStorage.getItem("user"));

  return (
    <div>
      <h1>Home</h1>
      {currentUser.role === "admin" ? (
        <AdminPage user={currentUser} />
      ) : currentUser.role === "teacher" ? (
        <TeacherPage user={currentUser} />
      ) : (
        <StudentPage user={currentUser} />
      )}
      <button onClick={onLogout}>Logout</button>
    </div>
  );
};

export default Home;
