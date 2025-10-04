import { ApiIntance } from "../../../../infraestructure/api/config";
import type { LoginRequestData, RegisterRequestData } from "../types";

class AuthenticationServices {
  login = async (data: LoginRequestData) => {
    try {
      const response = await ApiIntance.post("/auth/login", data);
      return response.data;
    } catch (error) {
      return error;
    }
  };

  register = async (data: RegisterRequestData) => {
    try {
      const response = await ApiIntance.post("/auth/register", data);
      return response.data;
    } catch (error) {
      return error;
    }
  };
}

export default new AuthenticationServices();
