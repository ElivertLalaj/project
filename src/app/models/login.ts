export interface TokenResponse {
  success: boolean;
  message: null | string;
  data: {
    access_token: string;
    token_type: string;
  };
}

export interface Login{

  username: string;
  password: string;
}