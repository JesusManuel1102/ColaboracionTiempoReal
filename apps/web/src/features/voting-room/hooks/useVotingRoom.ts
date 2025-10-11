import { useState } from 'react';
import { useCreateVotingRoom, useGetVotingRoomById } from "../queries";

export const useVotingRoom = () => {
  const [votingRoomId, setVotingRoomId] = useState<string | undefined>(undefined);
  const votingRoom = useGetVotingRoomById(votingRoomId!);
  const create = useCreateVotingRoom(); 

  const getVotingRoom = (id: string) => {
    setVotingRoomId(id);
  }

  return {
    create,
    votingRoom,
    getVotingRoom,
  }
}