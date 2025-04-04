import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import useProfile from "../hooks/Userprofile.js" 
import Nav from "../components/Nav"
import bg from '../assets/images/l2.jpeg'

const Editprofile = () => {
    const { profile } = useProfile()
    const navigate = useNavigate()

    const [fullname, setFullname] = useState("")
    const [email, setEmail] = useState("")
    const [username, setUserName] = useState("")
    const [error, setError] = useState("")

    useEffect(() => {
        if (profile) {
            setFullname(profile.fullname || "")
            setEmail(profile.email || "")
            setUserName(profile.username || "")
        }
    }, [profile])

    const handleUpdate = async (e) => {
        e.preventDefault()
        setError("")

        try {
            const response = await fetch("/api/updateprofile", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ FullName:fullname,Email:email,UserName:username }),
            })

            const data = await response.text()

            if (!response.ok) {
                setError(data.message || "Failed to update profile")
            } 
            else {
                alert("Profile updated successfully!")
                navigate("/viewprofile") 
            }
        } 
        
        catch (err) {
            console.error("Error:", err)
            setError("Something went wrong")
        }
    }

    return (
        <div className=" h-[100vh]">
            <Nav />

            <div class="bg-fixed bg-cover min-h-screen flex flex-col " style={{ backgroundImage: `url(${bg})` }}>

                    <p className="md:ml-[770px] ml-[60px] text-5xl text-white font-bold md:mt-[120px]">
                        Edit Profile
                    </p>

                    <form 
                        onSubmit={handleUpdate} 
                        className="flex flex-col gap-4 md:ml-[660px] ml-[10px] mt-[50px] px-[20px] pt-[30px] bg-white
                        h-[460px] w-[380px] md:w-[500px] rounded-lg text-2xl border-4 border-amber-950 
                        shadow-lg shadow-amber-900"
                    >
                        <label>
                            Full Name:
                            <input
                                type="text"
                                value={fullname}
                                onChange={(e) => setFullname(e.target.value)}
                                className="border-amber-950 border-3 hover:ring-3 hover:ring-amber-950 p-2 w-full"
                                required
                            />
                        </label>

                        <label>
                            Email:
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                readOnly
                                className="border-amber-950 border-3 hover:ring-3 hover:ring-amber-950 p-2 w-full cursor-not-allowed"
                                required
                            />
                        </label>

                        <label>
                            User Name:
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUserName(e.target.value)}
                                className="border-amber-950 border-3 hover:ring-3 hover:ring-amber-950 p-2 w-full"
                                required
                            />
                        </label>

                        <div className="flex justify-between mt-[30px] mx-[30px]">
                            <button
                                type="button"
                                onClick={() => navigate("/viewprofile")}
                                className="h-[50px] w-[130px] rounded-lg text-center text-amber-950 text-xl border border-4 
                                border-amber-950 hover:bg-amber-500"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="h-[50px] w-[130px] rounded-lg text-center text-amber-950 text-xl border border-4 
                                border-amber-950 hover:bg-amber-500"
                            >
                                Save
                            </button>
                        </div>

                        {error && <p className="text-red-600 text-center mt-3">{error}</p>}
                    </form>
                </div>
            </div>
    )
}

export default Editprofile
