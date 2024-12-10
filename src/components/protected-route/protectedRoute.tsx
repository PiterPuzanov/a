import { Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Убедитесь, что импортируете из react-redux
import { Navigate } from 'react-router';
import { Login } from '@pages';
import {
  getUser,
  isAuthCheckedSelector
} from '../../services/slices/userSlice';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};

export default function ProtectedRoute({
  children,
  onlyUnAuth = false
}: ProtectedRouteProps) {
  const isLoggedIn = useSelector((state) => location.state.user.isLoggedIn);

  const location = useLocation();
  const from = location.state?.from || '/';

  if (onlyUnAuth && isLoggedIn) {
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !isLoggedIn) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  return children;
}
