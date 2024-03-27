import { AuthProvider } from './AuthProvider';
import { getCurrentUser } from '../storage/Storage';

const ProtectedRoutes = () => {
  const { user } = AuthProvider();
  const isUserLoggedIn = getCurrentUser();
  if (!isUserLoggedIn) {
    return null;
  }
  return user;
};

export default ProtectedRoutes;
