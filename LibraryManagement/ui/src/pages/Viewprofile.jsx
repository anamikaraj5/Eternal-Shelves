import React from 'react'
import { Link } from 'react-router-dom'
import useProfile from '../hooks/Userprofile.js' 
import Nav from '../components/Nav.jsx'
import bg from '../assets/images/l2.jpeg'


const Viewprofile = () => {
    const { profile } = useProfile() 

    return (
        <div className=" h-[100vh]">
            <Nav />

            <div class="bg-fixed bg-cover min-h-screen flex justify-center " style={{ backgroundImage: `url(${bg})` }}>

                <div className="mt-[80px] ml-[10px]">
                    <p className="md:text-7xl text-5xl text-white font-bold text-center">
                        Profile
                    </p>

                    <div className="flex flex-col md:gap-10 gap-5 text-2xl md:text-3xl text-amber-950 
                        mt-[50px]  p-6 bg-amber-100 md:border-[10px] border-[5px] border-amber-900 
                        shadow-lg shadow-amber-600 md:w-[550px] w-[380px] h-auto min-h-[200px] md:min-h-[350px] md:px-[30px] md:py-[40px]">

                        {profile ? (
                            <>
                                <div className="flex justify-between">
                                    <p className="font-semibold">Name:</p>
                                    <p>{profile.fullname}</p>
                                </div>
                                <div className="flex justify-between">
                                    <p className="font-semibold">Email:</p>
                                    <p>{profile.email}</p>
                                </div>
                                <div className="flex justify-between">
                                    <p className="font-semibold">Username:</p>
                                    <p>{profile.username}</p>
                                </div>
                            </>
                        ) : (
                            <p>Loading...</p>
                        )}
                    </div>

                    <div className="flex gap-10 justify-center mt-10">
                        <button className="h-[50px] w-[130px] rounded-lg text-center text-amber-950 bg-white text-xl  
                            border-4 border-amber-950 hover:bg-amber-200">
                            <Link to="/home">CANCEL</Link>
                        </button>
                        <button className="h-[50px] w-[130px] rounded-lg text-center text-amber-950 bg-white text-xl  
                            border-4 border-amber-950 hover:bg-amber-200">
                            <Link to="/editprofile">EDIT</Link>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Viewprofile

