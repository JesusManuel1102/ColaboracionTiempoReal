import { useMutation, useQuery } from "@tanstack/react-query";
import votingRoomServices from "../service/votingRoom.service";

export const useGetVotingRoomById = (id: string) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["voting-room", id],
    queryFn: () => votingRoomServices.getVotingRoom(id),
  });

  console.log("Informacion de la sala de votacion:", data);

  return {
    data,
    isLoading,
    isError,
    error,
  };
};

export const useCreateVotingRoom = () => {
  const {
    mutateAsync: createVotingRoom,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationKey: ["voting-room"],
    mutationFn: (data: {
      name: string;
      description: string;
      createdBy: string;
      creatorName: string;
    }) => {
      console.log("Datos de la sala que se va a crear: ", data);
      return votingRoomServices.createVotingRoom(data);
    },
    // onSuccess: (data) => {
    //   // console.log("Sala de votacion creada:", data);
    // },
  });

  return {
    createVotingRoom,
    isPending,
    isError,
    error,
  };
};
