import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};

export default function ProtectedRoute({
  children,
  onlyUnAuth = false
}: ProtectedRouteProps) {
  const isLoggedIn = useSelector((state: any) => state.user.isLoggedIn);

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
