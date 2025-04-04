import React,{useState} from 'react'
import {useNavigate, Link} from 'react-router-dom'
import bg from '../assets/images/reading.jpg'

const Login = () => {

    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const navigate = useNavigate()
    
    const handleLogin = async (e) =>{
        e.preventDefault()
        try{
            const response = await fetch('/api/login',{
                method:'POST',
                credentials: 'include',
                headers: {
                    'Content-Type':'application/json',
                },
                body: JSON.stringify({UserName:userName,Password:password}),
            });

            const Data = await response.json()

            if(!response.ok) {
                throw new Error(Data.msg || 'Login failed')
            }

            navigate('/home')


        } 
        
        catch(err) {
            setError(err.message || 'Invalid credentials: Please try again!')
        }
    }

  return (
    <div>

            <div class="bg-fixed bg-cover h-screen flex  " style={{ backgroundImage: `url(${bg})` }}>
                    <form class="bg-white w-[500px] h-[550px] rounded-lg border-2 border-amber-800 shadow-lg shadow-amber-800 ml-[1290px] mt-[170px]" onSubmit={handleLogin}>
                        <p class="text-3xl  pt-[30px] text-center text-amber-950 font-bold "> Login</p>
                            <div class="flex flex-col gap-6">
                                <div class="pt-5 pl-7">
                                    <p class="text-1xl font-bold">Username:</p>
                                    <input type="ptext" class="hover:ring-2 hover:ring-red-400 rounded-sm border-solid border-2 border-amber-600 w-[430px] h-[40px]" value={userName} onChange={(e)=> setUserName(e.target.value)} required/>
                                </div>

                                <div class="pt-5 pl-7">
                                    <p class="text-1xl font-bold">Password:</p>
                                    <input type="password" class="hover:ring-2 hover:ring-red-400 rounded-sm border-solid border-2 border-amber-600 w-[430px] h-[40px]" value={password} onChange={(e)=> setPassword(e.target.value)} required/>
                                </div>
                        
                                <div className="pt-7 pl-7 pr-10 flex justify-center">
                            
                                    <button type='submit' className=" bg-amber-950 h-[40px] w-[800px] text-center pt-2 text-white rounded-md">Login</button>
                                </div>
                        
                                <div class="pt-5 pl-7 pr-14 flex justify-between">
                                    <p>Don't have an account?</p>
                                    <Link to={'/signup'} class="text-amber-700">Sign Up</Link>
                                </div>
                        
                            </div>
                    </form>
                </div>

    </div>
  )
}

export default Login