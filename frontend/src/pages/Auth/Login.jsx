import React from 'react';

const Login=() => {
  return (
    <div>
      <div className="lg:w-[70%] md:h-full flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Welcome Back</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">
          Please enter your details to login to your account
        </p>
      </div>
    </div>
  );
}

export default Login;