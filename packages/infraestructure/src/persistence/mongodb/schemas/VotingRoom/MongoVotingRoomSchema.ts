import { VotingRoomProps } from "@repo/domain/voting-room-domain";
import { Document, model, Schema } from "mongoose";

export interface VotingRoomDocument
  extends Omit<VotingRoomProps, "uuid">,
    Document {
  uuid: string;
}

const VotingRoomSchema = new Schema<VotingRoomDocument>(
  {
    uuid: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    statusRoom: {
      type: String,
      default: "open",
      enum: ["open", "closed"],
      required: true,
    },
    votingRoomStatus: {
      type: String,
      default: "inactive",
      enum: ["active", "inactive"],
      required: true,
    },
    createdBy: { type: String, required: true },
    creatorName: { type: String, required: true },
    participants: [
      {
        type: {
          uuid: String,
          name: String,
          avatar: String,
          role: { type: String, enum: ["admin", "voter", "observer"] },
          isOnline: Boolean,
        }
      }
    ],
    votingActive: { type: Boolean, default: false },
    codeInvitation: { type: String, required: true },
    currentVoteSession: {
      type: {
        id: String,
        topic: String,
        options: [
          {
            id: String,
            label: String,
            value: String,
          },
        ],
        isAnonymous: Boolean,
        resultsVisible: Boolean,
        timeLimit: Number,
        createdAt: Date,
      },
    },
    chatRoom: [
      {
        type: {
          userId: String,
          userName: String,
          message: String,
          timestamp: Date,
          type: { type: String, enum: ["message", "system", "vote"] },
        },
      },
    ],
    votingHistory: [
      {
        type: {
          sessionId: String,
          topic: String,
          options: [
            {
              id: String,
              label: String,
              value: String,
              votes: Number,
            },
          ],
          isAnonymous: Boolean,
          resultsVisible: Boolean,
          timeLimit: Number,
          createdAt: Date,
        },
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const VotingRoomModel = model<VotingRoomDocument>(
  "VotingRooms",
  VotingRoomSchema
);
