import crypto from 'node:crypto';

/**
 * Value Object for ProfileId
 */
export class ProfileId {
  private constructor(private readonly value: string) {}

  public static create(value?: string): ProfileId {
    return new ProfileId(value || crypto.randomUUID());
  }

  public equals(other: ProfileId): boolean {
    return this.value === other.value;
  }

  public toString(): string {
    return this.value;
  }
}
