import { create } from "zustand";
import { persist } from "zustand/middleware";
import { VotingRoom } from "@repo/domain/voting-room-domain";

interface VotingRoomsState {
  votingRooms: VotingRoom[];
}

export const useGlobalStore = create<VotingRoomsState>()(
  persist(
    (set) => ({
      votingRooms: [],
      setVotingRooms: (votingRooms: VotingRoom[]) => set({ votingRooms }),
    }),
    {
      name: "voting-rooms-store",
      storage: {
        getItem: (name) => {
          const value = sessionStorage.getItem(name);
          return value ? JSON.parse(value) : null;
        },
        setItem: (name, value) =>
          sessionStorage.setItem(name, JSON.stringify(value)),
        removeItem: (name) => sessionStorage.removeItem(name),
      },
    }
  )
); 
