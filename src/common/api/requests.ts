// export const baseUrl: string | undefined = process.env.REACT_APP_API_ROOT;

type Requests = {
    [key: string]: string;
};
  
const requests: Requests = {
    PUBLIC_KEY: '/api/user/auth/issuedKey',
    REFRESH_TOKEN: '/api/user/auth/refreshToken',
    LOGIN: '/api/user/auth/login'
};
  
export default requests;
  