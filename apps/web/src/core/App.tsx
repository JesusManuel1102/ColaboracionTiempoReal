import useSocket from "../infraestructure/sockets/hook/useSocket"

function App() {

  useSocket()

  return (
    <>
      <h1>Hola desde React</h1>
    </>
  )
}

export default App
