import { ApiIntance } from "../../../../infraestructure/api/config";
import type { LoginRequestData, RegisterRequestData } from "../types";

class AuthenticationServices {
  login = async (data: LoginRequestData) => {
    const response = await ApiIntance.post("/auth/login", data);
    return response.data;
  };

  register = async (data: RegisterRequestData) => {
    const response = await ApiIntance.post("/auth/register", data);
    return response.data;
  };
}

export default new AuthenticationServices();
