declare namespace Express {
  export interface SessionCustomProperties {
    tokens?: {
      accessToken: string,
      refreshToken: string,
    }
  }
  export interface Session extends Express.Session, SessionCustomProperties {}

  export interface Request {
    session: Session
  }

  export interface Response {}
}
