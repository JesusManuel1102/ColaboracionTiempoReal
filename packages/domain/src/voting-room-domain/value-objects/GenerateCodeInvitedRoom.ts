import crypto from "node:crypto";

// Value Object para AccessCode
export class AccessCodeVotingRoom {
  private constructor(private readonly value: string) {}

  private static generate(): string {
    // Genera un código de 6 caracteres alfanuméricos
    return crypto.randomBytes(3).toString('hex').toUpperCase().slice(0, 6);
  }

  public static create(value?: string): AccessCodeVotingRoom {
    return new AccessCodeVotingRoom(value || AccessCodeVotingRoom.generate());
  }

  public static isValid(code: string): boolean {
    // Verifica que tenga exactamente 6 caracteres alfanuméricos
    return /^[A-Z0-9]{6}$/.test(code);
  }

  public equals(other: AccessCodeVotingRoom): boolean {
    return this.value === other.value;
  }

  public toString(): string {
    return this.value;
  }
}
