import { useMutation, useQuery } from "@tanstack/react-query";
import votingRoomServices from "../service/votingRoom.service";
import { QueryClientConfig } from "@/core/config/tanstackQuery/queryClientConfig";
import { useState } from "react";

export const useGetVotingRoomById = () => {
  const [uuid, setId] = useState("")

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["voting-room", uuid],
    queryFn: () => votingRoomServices.getVotingRoom(uuid),
    enabled: !!uuid,
  });

  const setUuid = (id: string) => {
    setId(id)
  }

  return {
    data,
    isLoading,
    isError,
    error,
    setUuid,
  };
};

export const useGetAllVotingRoomById = () => {
  const { data, isLoading, isError, error, isSuccess } = useQuery({
    queryKey: ["getAll/voting-room"],
    queryFn: () => votingRoomServices.getAllVotingRoomsByUserId(),
  });

  return {
    data,
    isLoading,
    isError,
    error,
    isSuccess,
  };
};

export const useCreateVotingRoom = () => {
  const {
    mutateAsync: createVotingRoom,
    isPending,
    isError,
    error,
    isSuccess,
  } = useMutation({
    mutationKey: ["create/voting-room"],
    mutationFn: (data: {
      name: string;
      description: string;
      createdBy: string;
      creatorName: string;
    }) => {
      return votingRoomServices.createVotingRoom(data);
    },
    onSuccess: () => {
      QueryClientConfig.invalidateQueries({ queryKey: ["getAll/voting-room"] });
    },
  });

  return {
    createVotingRoom,
    isPending,
    isError,
    error,
    isSuccess,
  };
};
