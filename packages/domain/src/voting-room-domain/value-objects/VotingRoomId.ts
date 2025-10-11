import crypto from "node:crypto";

// Value Object para VotingRoomId
export class VotingRoomId {
  private constructor(private readonly value: string) {}

  public static create(value?: string): VotingRoomId {
    return new VotingRoomId(value || crypto.randomUUID());
  }

  public equals(other: VotingRoomId): boolean {
    return this.value === other.value;
  }

  public toString(): string {
    return this.value;
  }
}
