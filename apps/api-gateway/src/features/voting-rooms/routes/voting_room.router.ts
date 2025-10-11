import { IDependencyInjection } from "@/core/dependencyInjection/dependencyInjection.js";
import { Router } from "express";
import { VotingRoomController } from "../controllers/voting_room.controller.js";

export default (container: IDependencyInjection): Router => {
  const votingRoomRouter = Router();

  const votingRoomController = new VotingRoomController(container.votingRoomService);

  votingRoomRouter.post(
    "/",
    votingRoomController.createVotingRoom.bind(votingRoomController)
  );
  votingRoomRouter.get(
    "/:votingRoomId",
    votingRoomController.findById.bind(votingRoomController)
  );

  return votingRoomRouter;
};
