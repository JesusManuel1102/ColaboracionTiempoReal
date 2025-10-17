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
    description: { type: String, required: false }, // Changed to not required
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
        uuid: String,
        name: String,
        avatar: String,
        role: { type: String, enum: ["admin", "voter", "observer"] },
        isOnline: Boolean,
      }
    ],
    votingActive: { type: Boolean, default: false },
    codeInvitation: { type: String, required: true },
    currentVoteSession: {
      type: {
        id: { type: String, required: true },
        topic: { type: String, required: true },
        options: [
          {
            id: { type: String, required: true },
            label: { type: String, required: true },
            value: { type: Schema.Types.Mixed, required: true },
          },
        ],
        isAnonymous: { type: Boolean, required: true },
        resultsVisible: { type: Boolean, required: true },
        timeLimit: { type: Number },
        createdAt: { type: Date, required: true },
      },
    },
    chatRoom: [
      {
        userId: String,
        userName: String,
        message: String,
        timestamp: Date,
        type: { type: String, enum: ["message", "system", "vote"] },
      },
    ],
    votingHistory: [
      {
        sessionId: { type: String, required: true },
        topic: { type: String, required: true },
        votes: { type: Map, of: Schema.Types.Mixed, required: true }, // userId -> optionId
        results: { type: Map, of: Number, required: true }, // optionId -> count
        timestamp: { type: Date, required: true },
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
