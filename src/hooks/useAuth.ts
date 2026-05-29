import { useNavigate } from 'react-router-dom';
import { authService } from '../features/auth/services/auth.service';
import { useAuthStore } from '../stores/auth.store';

interface LoginPayload {
  email: string;
  password: string;
}

export const useAuth = () => {
  const { user, isAuthenticated, setAuth, clearAuth } = useAuthStore();
  const navigate = useNavigate();

  const login = async (credentials: LoginPayload, tenantId: string) => {
    try {
      const response = await authService.login(credentials, tenantId);
      setAuth(response.accessToken, response.refreshToken, response.user, tenantId);
      navigate('/dashboard');
      return response;
    } catch (error) {
      if (error instanceof Error) {
        return Promise.reject(error.message);
      }
      return Promise.reject('Login failed');
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } finally {
      clearAuth();
      navigate('/login');
    }
  };

  return { user, isAuthenticated, login, logout };
};