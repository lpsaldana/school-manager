import AdminPage from "./AdminPage";

const Home = ({ user, onLogout }) => {
  return (
    <div>
      <h1>Home</h1>
      {user.is_admin ? (
        <AdminPage />
      ) : (
        <p>Bienvenido {user.name}</p>
      )}
      <button onClick={onLogout}>Logout</button>
    </div>
  );
};

export default Home;
