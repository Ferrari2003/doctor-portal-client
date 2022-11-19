import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider';
import useToken from '../../hooks/useToken';

const SingUp = () => {

    const {register,  formState: { errors }, handleSubmit} = useForm();
    const {createUser,  updateUser,google,} = useContext(AuthContext) ;
    const [signUpError, setSignUpError] = useState('');

    const [createUserEmail, setCreateUserEmail] = useState('');
    const [token] = useToken(createUserEmail);
    const navigate = useNavigate();

    if(token){
        navigate('/');
    }

    const handleSinUp = (data) => {
        setSignUpError('');
        console.log(data);

        createUser(data.email, data.password)
        .then(result => {
            const user = result.user;
            console.log(user);
            toast('User Create Successfully.')
            const userInfo = {
                displayName: data.name
            }
            updateUser(userInfo)
            .then(()=> {
                saveUser(data.name, data.email);
            })
            .catch(error => console.log(error))
        })
        .catch(error => {
            console.log(error)
            setSignUpError(error.message);
        });
    }
    const handleGooglePopup = () => {
        google()
        .then(result => {
            const user = result.user
            console.log(user)
        })
        .catch(error => console.log(error))
    }

    const saveUser = (name, email) => {
        const user = {name, email};
        fetch(`http://localhost:5000/user`,{
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body:JSON.stringify(user)
        })
        .then(res => res.json())
        .then(data => {
            setCreateUserEmail(email);
            
        })
    }
    
   

    return (
        <div className='h[800px] flex justify-center items-center'>
            <div className='w-96 p-7'>
                <h2 className='text-xl text-center'>Sing Up</h2>
                <form onSubmit={handleSubmit(handleSinUp)}>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"><span className="label-text">Name</span></label>
                        <input type="text" 
                          {...register('name',{ required: "Name is required"})}  className="input input-bordered w-full max-w-xs" />
                    </div>
                    {errors.name?.type === 'required' && <p className='text-red-600'>Name is required</p>}

                    <div className="form-control w-full max-w-xs">
                        <label className="label"><span className="label-text">Email</span></label>
                        <input type="email" 
                            {...register('email',{ required: "Email Address is required" })}   className="input input-bordered w-full max-w-xs" />
                    </div>
                    {errors.email?.type === 'required' && <p className='text-red-600'>Email is required</p>}
                    <div className="form-control w-full max-w-xs">
                        <label className="label"><span className="label-text">Password</span></label>
                        <input type="password"
                            {...register('password',{
                                 required: "Password is required" ,
                                 minLength: {value: 6, message: 'password must be 6 characters'},
                                //  pattern:{value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/, message:'password much be strong'}
                            })}   className="input input-bordered w-full max-w-xs" /> 
                    </div>
                    {errors.password?.type === 'required' && <p className='text-red-600'>Password is required</p>}
                    <br />
                    <input className='btn btn-accent w-full' value={'SignUp'} type="submit" />
                  {signUpError && <p className='text-red-600'>{signUpError}</p>}
                </form>
                <p>Already have an account <Link className='text-primary' to={'/login'}>Login</Link></p>
                <div className='divider'>OR</div>
                <button onClick={handleGooglePopup} className='btn btn-outline w-full'>CONTINUE WITH GOOGLE</button>
            </div>
        </div>
    );
};

export default SingUp;