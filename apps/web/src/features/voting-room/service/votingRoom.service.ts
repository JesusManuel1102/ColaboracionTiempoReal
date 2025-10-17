import { ApiIntance } from "../../../infraestructure/api/config";

class VotingRoomServices {
  getVotingRoom = async (id: string) => {
    try {
      const response = await ApiIntance.get(`/voting-room/${id}`);
      return response.data;
    } catch (error) {
      return error;
    }
  };

  createVotingRoom = async (data: {
    name: string;
    description: string;
    createdBy: string;
    creatorName: string;
  }) => {
    try {
      const response = await ApiIntance.post("/voting-room", data);
      return response.data;
    } catch (error) {
      return error;
    }
  };

  getAllVotingRoomsByUserId = async () => { 
    try {
      const response = await ApiIntance.get(`/voting-room`);
      return response.data;
    } catch (error) {
      console.error("error", error)
      return error;
    }
  }
}

export default new VotingRoomServices();
