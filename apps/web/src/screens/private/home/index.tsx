import useSocket from "../../../infraestructure/sockets/hook/useSocket";

const Home = () => {
  useSocket();

  return (
    <div>Home</div>
  )
}

export default Home