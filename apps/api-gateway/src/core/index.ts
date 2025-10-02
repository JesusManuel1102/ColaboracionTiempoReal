import initApp from './app.ts'

async function startServer() {
  const Application = await initApp;
  const port = process.env.PORT ? Number(process.env.PORT) : 3000;

  try {
    Application.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
      // ⚠️ Nota: La inicialización de Socket.IO debe ocurrir dentro del bootstrap
      // para que use la instancia correcta del servidor HTTP.
      // console.log(`📡 Socket.IO server ready for connections`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1);
  }
  
}

startServer();
