import React from 'react'
import Panel from '../image/panel.webp'
import LoginForm from '../components/forms/loginForm';

function login() {
  return (
    <div className="flex flex-col md:flex-row w-full  h-screen bg-white ">
      <div className="flex items-center justify-center w-full md:w-1/2 text-white bg-slate-900 p-8">
        <div className='mb-auto mt-auto'>
          <h1 className="text-4xl mb-4">¡Bienvenido!</h1>
          <p className="text-xl mb-8">Todo al alcanze de tus manos</p>
          <LoginForm />
        </div>
      </div>
      <div className="w-full md:w-1/2 bg-no-repeat bg-cover bg-center" style={{ backgroundImage: `url(${Panel})` }}></div>
    </div>
  );
};

export default login