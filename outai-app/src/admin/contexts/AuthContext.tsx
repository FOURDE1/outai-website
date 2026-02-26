import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import type { AdminUser, AuthState, LoginCredentials } from '@/types/admin';
import { MOCK_USERS } from '@/admin/data/mockData';

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const STORAGE_KEY = 'outai_admin_auth';

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  // Restore session from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const user = JSON.parse(stored) as AdminUser;
        setState({ user, isAuthenticated: true, isLoading: false });
      } catch {
        localStorage.removeItem(STORAGE_KEY);
        setState((s) => ({ ...s, isLoading: false }));
      }
    } else {
      setState((s) => ({ ...s, isLoading: false }));
    }
  }, []);

  const login = useCallback(async (credentials: LoginCredentials) => {
    // Simulate network delay
    await new Promise((r) => setTimeout(r, 800));

    const found = MOCK_USERS.find(
      (u) => u.email === credentials.email && u.password === credentials.password
    );

    if (!found) {
      return { success: false, error: 'Invalid email or password' };
    }

    const user: AdminUser = {
      id: found.id,
      email: found.email,
      fullName: found.fullName,
      role: found.role,
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    setState({ user, isAuthenticated: true, isLoading: false });
    return { success: true };
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setState({ user: null, isAuthenticated: false, isLoading: false });
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within AdminAuthProvider');
  }
  return context;
}
