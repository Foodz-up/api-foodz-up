export interface IUser {
  id: number;
  email: string;
  cityCode: number;
  firstName: string;
  lastName: string;
  picture: string;
  refreshToken: string;
  refreshTokenExpires: string;
  role: number;
  sponsorCode: string;
  address: string;
}

export interface IToken {
  accessToken: string;
  refreshToken: string;
}
