import { User as DomainUser } from '@repo/domain/auth-domain'

export interface IUserClient extends DomainUser {
  token: string
}
