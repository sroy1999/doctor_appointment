import React, { useCallback, useState } from 'react';

const Login = () => {
  const [state, setState] = useState('Sign up');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(0);

  const handleNameChange = useCallback((eve) => {
    setName(eve);
  }, [setName]);

  const handleEmailChange = useCallback((eve) => {
    setEmail(eve);
  }, [setEmail]);

  const handlePasswordChange = useCallback((eve) => {
    setPassword(eve);
  }, [setPassword]);

  const handleMobileChange = useCallback((eve) =>  {
    setMobile(eve);
  }, [setMobile]);

  const handleOtpChange = useCallback((eve) => {
    setOtp(eve);
  }, [setOtp]);

  const handleStateChange = useCallback((eve) => {
    setState(eve);
  }, [setState]);

  const handleOnSubit = useCallback(async(event) => {
    event.preventDefault();
  }, []);

  const handleVerifyOtp = () => {
    alert();
    setStep(0);
    setState('Sign in');
  }
  return (
    <form className='min-h-[40vh] flex items-center' onSubmit={() => handleOnSubit(e)}>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg'>
        {
          (step === 0 || step === 1) ? (
            <>
              <p className='text-2xl font-semibold'>
              {
                state === 'Sign up' && step === 0 ? 'Sign up' : 'Sign in'
              }
              </p>
              <p>Please { state === 'Sign up' ? 'sign up' : 'sign in'} to book your appointment</p>
            </>
          ) : (
            <p className='text-2xl font-semibold'>
              Verify your mobile
            </p>
          )
        }
        {
          state === 'Sign up' && (
            <div className='w-full'>
              <p>Full name</p>
              <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="text" name='name' value={name} onChange={(e) => handleNameChange(e.target.name)} />
            </div>
          )
        }
        {
          step === 1 && (
            <div className='w-full'>
              <p>Mobile number</p>
              <input
              className="border border-zinc-300 rounded w-full p-2 mt-1"
              type="tel"
              name="mobile"
              value={mobile}
              onChange={(e) => handleMobileChange(e.target.value)}
            />
            <button
              type="button"
              className="bg-primary text-white w-full py-2 rounded-md text-base mt-4"
              onClick={() => setStep(2)}
            >
              Submit
            </button>
            </div>
          )
        }
        {
          step === 2 && (
            <div className='w-full'>
              <p>Enter OTP</p>
              <input
                className="border border-zinc-300 rounded w-full p-2 mt-1"
                type="text"
                name="otp"
                value={otp}
                onChange={(e) => handleOtpChange(e.target.value)}
              />
              <p className='text-gray-400 mt-2 mb-2 text-center'>OTP expires in</p>
              <button
                type="button"
                className="bg-primary text-white w-full py-2 rounded-md text-base mt-2"
                onClick={handleVerifyOtp}
              >
                Verify
              </button>
            </div>
          )
        }
        {
          step === 0 && (
            <>
               <div className='w-full'>
                <p>Email</p>
                <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="email" name='email' value={email} onChange={(e) => handleEmailChange(e.target.email)} />
              </div>
              <div className='w-full'>
                <p>Password</p>
                <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="password" name='password' value={password} onChange={(e) => handlePasswordChange(e.target.password)} />
              </div>
              <button className='bg-primary text-white w-full py-2 rounded-md text-base'>{ state === 'Sign up' ? 'Sign up' : 'Sign in'}</button>
              {
                state === 'Sign up' ? (
                  <p>Already have an account? <span onClick={() => handleStateChange('Sign in')} className='text-primary underline cursor-pointer'>Sign in</span></p>
                  ) : (<p>Don't have an account? <span onClick={() => handleStateChange('Sign up')} className='text-primary underline cursor-pointer'>Sign up</span></p>)
              }
              {
                state === 'Sign in' && (
                  <div className="flex items-center justify-center w-full my-1">
                    <div className="flex-grow border-t border-gray-300" />
                    <p className="font-semibold text-gray-500 flex-shrink-0 mx-2">OR</p>
                    <div className="flex-grow border-t border-gray-300" />
                  </div>
                )
              }
              {
                state === "Sign in" && (
                  <button
                    type="button"
                    className="bg-primary text-white w-full py-2 rounded-md text-base"
                    onClick={() => setStep(1)}
                  >
                    Sign in using mobile number
                  </button>
                )
              }
            </>
          )
        }
      </div>
    </form>
  )
}

export default Login;