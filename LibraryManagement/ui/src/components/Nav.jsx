import React from "react"
import { Link, useNavigate } from "react-router-dom"
import useProfile from "../hooks/Userprofile.js"

const Nav = () => {
    const { profile } = useProfile()
    const navigate = useNavigate()

    // Logout function
    const handleLogout = async () => {
        try {
            const response = await fetch("/api/logout", {
                method: "GET",
                credentials: "include",
            })

            if (response.ok) {
                alert("Logged out successfully!")
                navigate("/front") 
            } 
            else {
                console.error("Logout failed")
            }
        } 
        
        catch (error) {
            console.error("Error during logout:", error)
        }
    }

    return (
      
            <div class="flex justify-between bg-amber-950 text-white  h-[90px]  pr-[50px] text-3xl">

                <div className="flex justify-end gap-1 md:gap-3 pt-[20px]">
                     <p className="text-white md:mt-[10px] mt-[5px] font-bold ">
                         <p>Welcome, {profile ? profile.fullname : "Guest"}!</p>
                     </p>
                 </div>
                    
                    

                    <div class="flex gap-6">
                        <Link to={'/home'} class="hover:text-5xl hover:bg-amber-400 pt-[30px]">Home</Link>
    
                        {profile && profile.UserRole === 'admin' && (
                            <Link to={'/addbook'} className="hover:text-5xl hover:bg-amber-400 pt-[30px]">Add Book</Link>
                            )}
                        <Link to={'/viewallbooks'} class="hover:text-5xl hover:bg-amber-400 pt-[30px]">View Book</Link>
                        <Link to={'/viewprofile'} class="hover:text-5xl hover:bg-amber-400 pt-[30px]">Dashboard</Link>
                        <button onClick={handleLogout} class="hover:text-5xl hover:bg-amber-400">Logout</button>
                    </div>    
        </div>
     


    )
}

export default Nav
