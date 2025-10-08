import { createSocketClient } from "@repo/realtime/socket/client";
import { useGlobalStore } from "../../core/store/global_store";

export const useSocketClient = () => {
  const { token } = useGlobalStore();

  const socketClient = createSocketClient("http://localhost:3001", token || "");

  return socketClient;
};
