import React, {useState} from 'react'
import { useNavigate, Link } from 'react-router-dom'
import bg from '../assets/images/reading.jpg'

const Signup = () => {

    const [fullName, setFullName] = useState('')
    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate  = useNavigate()

    const handleSignup = async (e) =>{
        e.preventDefault()
        try{
            const response = await fetch('/api/signup',{
                method:'POST',
                credentials: 'include',
                headers: {
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({FullName:fullName,UserName:userName,Email:email,Password:password})
            })

            if(!response.ok) {
                const errData = await response.json()
                throw new Error(errData.msg || 'Signup failed')
            }

            navigate('/login');
        } 
        
        catch(err) {
            setError(err.message || 'Signup failed: Please try again!')
        }
    }

    

  return (
    <div>

        <div className="bg-fixed bg-cover h-screen flex " style={{ backgroundImage: `url(${bg})` }}>
                <form className="bg-white w-[500px] h-[800px] rounded-lg border-2 border-amber-800 shadow-lg shadow-amber-800 ml-[1290px] mt-[140px]" onSubmit={handleSignup}>
                    <p className="text-3xl  pt-[30px] text-center text-amber-950 font-bold">Sign Up</p>
                    <div className="flex flex-col gap-6">
                        <div className="pt-8 pl-7">
                            <p className="text-1xl font-bold">Full Name:</p>
                            <input type="text" className="hover:ring-2 hover:ring-red-400 rounded-sm border-solid border-2 border-amber-600 w-[430px] h-[40px]" value={fullName} onChange={(e)=>setFullName(e.target.value)} required/>
                        </div>

            
                        <div className="pt-5 pl-7">
                            <p className="text-1xl font-bold">Username:</p>
                            <input type="ptext" className="hover:ring-2 hover:ring-red-400 rounded-sm border-solid border-2 border-amber-600 w-[430px] h-[40px]" value={userName} onChange={(e)=>setUserName(e.target.value)} required/>
                        </div>

                        <div className="pt-8 pl-7">
                            <p className="text-1xl font-bold">Email:</p>
                            <input type="email" className="hover:ring-2 hover:ring-red-400 rounded-sm border-solid border-2 border-amber-600 w-[430px] h-[40px]"  value={email} onChange={(e)=>setEmail(e.target.value)} required/>
                        </div>

                        <div className="pt-5 pl-7">
                            <p className="text-1xl font-bold">Password:</p>
                            <input type="password" className="hover:ring-2 hover:ring-red-400 rounded-sm border-solid border-2 border-amber-600 w-[430px] h-[40px]"  value={password} onChange={(e)=>setPassword(e.target.value)} required/>
                        </div>
            
                        <div className="pt-7 pl-7 pr-10 flex justify-center">
                            
                            <button type='submit' className=" bg-amber-950 h-[40px] w-[800px] text-center pt-2 text-white rounded-md">Sign Up</button>
                        </div>
            
                        <div className="pt-5 pl-7 pr-14 flex justify-center">
                            <p>Already have an account?</p>&nbsp;
                            <Link to={'/login'} className="text-amber-700">Login</Link>
                        </div>
            
                    </div>
                </form>
            </div>


    </div>
  )
}

export default Signup