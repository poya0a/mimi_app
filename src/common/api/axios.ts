import axios, { AxiosError, AxiosInstance, AxiosResponse, AxiosRequestConfig } from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store/store';
import { actIsLoading } from '../../store/slices/loadingSlice';
import storage from '../utils/storage';
import device from '../utils/device';
import { ErrorResponse } from '../../store/types/response.interface';
import requests from './requests';

// const ax: AxiosInstance = axios.create({});

const ax = axios.create({
  baseURL: process.env.REACT_APP_API_ROOT
});

const AxiosInterceptor = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isSet, setIsSet] = useState<boolean>(false);
  let isAlreadyFetchingAccessToken = false;
  let subscribers: Function[] = [];

  useEffect(() => {
    const pending = (config: AxiosRequestConfig): any => {
      dispatch(actIsLoading(true));
      // Token 및 DeviceId 설정
      config.headers = config.headers ?? {};
      const accessToken = storage.getAccessToken();
      if (accessToken) {
        config.headers['user-token'] = accessToken;
      } else {
        delete config.headers['user-token'];
      }
      if (config.url === requests.REFRESH_TOKEN) {
        const refreshToken = storage.getRefreshToken();
        if (refreshToken) {
          config.headers['refresh-token'] = refreshToken;
        } else {
          delete config.headers['refresh-token'];
        }
      }
      config.params = {
        ...config.params,
        deviceId: device.getDeviceUUID()
      };
      return config;
    };

    const fulfilled = (response: AxiosResponse): AxiosResponse => {
      dispatch(actIsLoading(false));
      return response;
    };

    const rejected = async (error: AxiosError): Promise<AxiosError> => {
      dispatch(actIsLoading(false));
      if (error?.response?.status) {
        if (error.response.status === 400) {
          await handleError(error);
          return new Promise(() => {});
        }
      }
      if (error?.response?.status?.toString().startsWith('5', 0)) {
        navigate('/access-error');
      }
      return Promise.reject(error);
    };

    const reqInterceptor = ax.interceptors.request.use(pending);
    const resInterceptor = ax.interceptors.response.use(fulfilled, rejected);
    setIsSet(true);

    const handleError = async (error: AxiosError) => {
      if (error.response) {
        const errorResponse = error.response.data as ErrorResponse;
        console.log('handleError', errorResponse);
        const { code } = errorResponse;
        switch (code) {
          case 'ERR-1006': // empty token
            navigate('/login');
            break;
          case 'ERR-1007': // invalid token
            await resetTokenAndReattemptRequest(error.response);
            break;
          case 'ERR-1008': // empty deviceId
            navigate('/login');
            break;
          default:
            break;
        }
      }
    };

    const resetTokenAndReattemptRequest = async (response: AxiosResponse) => {
      const retryOriginalRequest = new Promise((resolve, reject) => {
        addSubscriber(async () => {
          try {
            const { config } = response;
            // refresh token 호출 뒤 resolve
            resolve(ax(config));
          } catch (err) {
            reject(err);
          }
        });
      });

      if (!isAlreadyFetchingAccessToken) {
        isAlreadyFetchingAccessToken = true;
        const res = await ax.post(requests.REFRESH_TOKEN);
        const { resultCode, data } = res.data;
        if (resultCode) {
          const { accessToken, refreshToken } = data;
          storage.setAccessToken(accessToken);
          if (refreshToken) {
            storage.setRefreshToken(refreshToken);
          }
        } else {
          storage.removeToken();
        }
        isAlreadyFetchingAccessToken = false;
        onAccessTokenFetched();
      }
      return retryOriginalRequest;
    };

    const addSubscriber = (callback: Function) => {
      subscribers.push(callback);
    };

    const onAccessTokenFetched = () => {
      subscribers.forEach((callback) => callback());
      subscribers = [];
    };

    return () => {
      ax.interceptors.request.eject(reqInterceptor);
      ax.interceptors.response.eject(resInterceptor);
    };
  }, []);

  // children이 jsx 요소라면 children을 아니라면 null 을 리턴한다.
  return isSet && React.isValidElement(children) ? children : null;
};

export default ax;
export { AxiosInterceptor };
