import { useEffect } from "react";
import { useSocketClient } from "..";

const useSocket = () => {
  const socketClient = useSocketClient();

  useEffect(() => {
    socketClient.connect();

    socketClient.on("connect", () => {
      console.log(
        "socketClient connected",
        socketClient.active,
        "Identificador del cliente socket conectado:",
        socketClient.id
      );
    });

    socketClient.on("disconnect", () => {
      console.log(
        "socketClient disconnected",
        socketClient.active,
        "Identificador del cliente socket desconectado:",
        socketClient.id
      );
    });

    return () => {
      socketClient.disconnect();
      console.log("socketClient disconnected", socketClient.active);
    };
  }, []);

  return socketClient;
};

export default useSocket;
