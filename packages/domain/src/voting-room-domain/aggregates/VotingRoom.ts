import { AccessCodeVotingRoom, VotingRoomId } from "../value-objects/index.js";

export interface VotingRoomProps {
  uuid: string;
  name: string;
  description?: string;
  statusRoom?: "open" | "closed";
  votingRoomStatus?: "active" | "inactive";
  createdBy: string;
  creatorName: string;
  participants?: Participant[];
  votingActive?: boolean;
  codeInvitation?: string;
  chatRoom?: ChatMessage[];
  currentVoteSession?: VoteSession;
  votingHistory?: VoteResult[];
  settings?: RoomSettings;
  createdAt?: Date;
  updatedAt?: Date;
}

export class VotingRoom {
  private constructor(private props: VotingRoomProps) {}

  static create(props: VotingRoomProps) {
    const now = new Date();
    return new VotingRoom({
      ...props,
      uuid: VotingRoomId.create().toString(),
      createdBy: props.createdBy,
      creatorName: props.creatorName,
      codeInvitation: AccessCodeVotingRoom.create().toString(),
      participants: [],
      votingActive: false,
      chatRoom: [],
      currentVoteSession: undefined,
      votingHistory: [],
      settings: {
        maxParticipants: props.settings?.maxParticipants || 5,
        allowAnonymousVoting: props.settings?.allowAnonymousVoting || false,
        requireApprovalToJoin: props.settings?.requireApprovalToJoin || false,
        canParticipantsCreatePolls: props.settings?.canParticipantsCreatePolls || false,
        autoCloseRoom: props.settings?.autoCloseRoom || false,
      },
      createdAt: now,
      updatedAt: now,
    });
  }

  public static fromPersistence(props: VotingRoomProps): VotingRoom {
    return new VotingRoom(props);
  }

  public getProps(): VotingRoomProps {
    return { ...this.props };
  }

  public get uuid(): VotingRoomId {
    return VotingRoomId.create(this.props.uuid);
  }

  public get name(): string {
    return this.props.name;
  }

  public get description(): string {
    return this.props.description ?? "";
  }

  public get statusRoom(): "open" | "closed" {
    return this.props.statusRoom ?? "open";
  }

  public get votingRoomStatus(): "active" | "inactive" {
    return this.props.votingRoomStatus ?? "inactive";
  }

  public get participants(): Participant[] {
    return this.props.participants ?? [];
  }

  public get votingActive(): boolean {
    return this.props.votingActive ?? false;    
  }

  public get chatRoom(): ChatMessage[] {
    return this.props.chatRoom ?? [];
  }

  public get currentVoteSession(): VoteSession | undefined {
    return this.props.currentVoteSession;
  }

  public get votingHistory(): VoteResult[] {
    return this.props.votingHistory ?? [];
  }

  public get settings(): RoomSettings {
    return this.props.settings ?? {
      maxParticipants: 5,
      allowAnonymousVoting: false,
      requireApprovalToJoin: false,
      canParticipantsCreatePolls: false,
      autoCloseRoom: false,
    };
  }

  public get codeInvitation(): string {
    return this.props.codeInvitation ?? ""; 
  }
}

export interface Participant {
  uuid: string;
  name: string;
  avatar?: string;
  role: "admin" | "voter" | "observer";
  isOnline: boolean;
}

export interface ChatMessage {
  userId: string;
  userName: string;
  message: string;
  timestamp: Date;
  type: "message" | "system" | "vote";
}

export interface VoteSession {
  id: string;
  topic: string;
  options: VoteOption[];
  isAnonymous: boolean;
  resultsVisible: boolean;
  timeLimit?: number; // en minutos
  createdAt: Date;
}

export interface VoteOption {
  id: string;
  label: string;
  value: string | number;
}

export interface VoteResult {
  sessionId: string;
  topic: string;
  votes: Record<string, string | number>; // userId -> optionId
  results: Record<string, number>; // optionId -> count
  timestamp: Date;
}

export interface RoomSettings {
  maxParticipants: number;
  allowAnonymousVoting: boolean;
  requireApprovalToJoin: boolean;
  canParticipantsCreatePolls: boolean;
  autoCloseRoom: boolean;
}
