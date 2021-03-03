import jwtDecode from "jwt-decode";

export const CLIENTE_ID = 'dscatalog';
export const CLIENTE_SECRET = 'dscatalog123';

type LoginResponse = {
  access_token: string,
  token_type: string,
  expires_in: number,
  scope: string,
  FirstName: string,
  userId: number
}

export type Role = "ROLE_OPERATOR" | "ROLE_ADMIN";

type AcessToken = {
  exp: number;
  user_name: string;
  authorities: Role[];
}

export const saveSessionData =(loginResponse: LoginResponse) => {
  localStorage.setItem('authData', JSON.stringify(loginResponse));
}

export const getSessionData = () => {
  const sessionData = localStorage.getItem('authData') ?? '{}';
  const parsedSessionData = JSON.parse(sessionData);
  return parsedSessionData as LoginResponse;
}

export const getAcessTokenDecoded = () => {
  const sessionData = getSessionData(); 

  try {
    const tokenDecode = jwtDecode(sessionData.access_token);
    return tokenDecode as AcessToken;
  } catch (error) {
    return {} as AcessToken
  }
}

export const isTokenValid = () => {
  const { exp } = getAcessTokenDecoded();

  if(Date.now() <= exp * 1000) {
    return true;
  }
  return false;
}

export const isAuthenticated = () => {
  const sessionData = getSessionData();
  
  return sessionData.access_token && isTokenValid();
}

export const isAllowedByRole = (routeRoles: Role[]= [] ) => {
  if(routeRoles.length === 0 ) {
    return true
  }

  const userToken = getAcessTokenDecoded();
  const user = userToken.authorities;
  return routeRoles.some(role => user?.includes(role));
}