import {
  useCreateVotingRoom,
  useGetAllVotingRoomById,
  useGetVotingRoomById,
} from "../queries";

export const useVotingRoom = () => {
  const getRoomById = useGetVotingRoomById();
  const create = useCreateVotingRoom();
  const getAllRooms = useGetAllVotingRoomById();

  return {
    create,
    getRoomById,
    getAllRooms,
  };
};
