import { ApiIntance } from "../../../infraestructure/api/config";

class ProfileServices {
  getProfile = async () => {
    try {
      const response = await ApiIntance.get("/profile");
      return response.data;
    } catch (error) {
      return error;
    }
  };
}

export default new ProfileServices();
