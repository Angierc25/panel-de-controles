import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Panel from '../../image/panel.webp';
import LoginForm from '../../components/forms/loginForm';
import useAuth from '../../hooks/useAuth';

const Login: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/panelcontrol');
    }
  }, [user, navigate]);

  return (
    <div className="flex flex-col md:flex-row w-full min-h-screen h-screen bg-white ">
      <div className="flex items-center justify-center w-full md:w-1/2 text-white bg-slate-900 p-8">
        <div className='mb-auto mt-auto'>
          <h1 className="text-4xl mb-4">¡Bienvenido!</h1>
          <p className="text-xl mb-8">Todo al alcance de tus manos</p>
          <LoginForm />
        </div>
      </div>
      <div className="w-full md:w-1/2 bg-no-repeat bg-cover bg-center" style={{ backgroundImage: `url(${Panel})` }}></div>
    </div>
  );
};

export default Login;
