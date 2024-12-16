import { FC, SyntheticEvent, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { getError, login } from '../../services/slices/userSlice';

export const Login: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const localStorageEmail = localStorage.getItem('email') ?? '';
  const [email, setEmail] = useState(localStorageEmail);
  const [password, setPassword] = useState('');
  const error = useSelector(getError);

  const from = location.state?.from || '/';

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    localStorage.setItem('email', email);

    const result = await dispatch(
      login({
        email: email,
        password: password
      })
    );
    if (result.meta.requestStatus === 'fulfilled') {
      navigate(from);
    }
  };

  return (
    <LoginUI
      errorText={error}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
