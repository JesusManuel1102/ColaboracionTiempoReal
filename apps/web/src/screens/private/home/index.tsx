import { useProfile } from "../../../features/user/hooks/useProfile";
import useSocket from "../../../infraestructure/sockets/hook/useSocket";

const Home = () => {
  useSocket();
  const { data, isLoading, isError, error } = useProfile();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error?.message || "Unknown error"}</div>;
  }

  return (
    <div>
      <div>
        <p>Nombre de Usuario: {data?.username || "No username provided"}</p>
        <p>Correo Electronico: {data?.email || "No email provided"}</p>
        <p>Bio: {data?.bio || "No bio provided"}</p>
        <p>Avatar: {data?.avatarUrl || "No avatar provided"}</p>
      </div>
    </div>
  );
};

export default Home;
