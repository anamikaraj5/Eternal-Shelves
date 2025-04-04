import { useState, useEffect } from "react"
import { useSearchParams, useNavigate, Link } from "react-router-dom"
import bg from '../assets/images/l2.jpeg'
import Nav from "../components/Nav"


const EditBook = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const [bookName, setBookName] = useState(searchParams.get("bookname") || "")
  const [bookId, setBookId] = useState(searchParams.get("bookid") || "") 
  const [genre, setGenre] = useState(searchParams.get("genre") || "")
  const [author, setAuthor] = useState(searchParams.get("author") || "")
  const [date, setDate] = useState(searchParams.get("date") || "")
  const [description, setDescription] = useState(searchParams.get("description") || "")
  const [error, setError] = useState("")

  const handleUpdate = async (e) => {
    e.preventDefault()
    setError("")

    try {
      const response = await fetch("/api/updatebook", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          BookName: bookName,
          BookId: bookId,
          Genre: genre,
          Author: author,
          Date: date,
          Description: description,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.message || "Failed to update book")
      } else {
        alert("Book updated successfully!")
        navigate("/viewallbooks")
      }
    } catch (err) {
      console.error("Error:", err)
      setError("Something went wrong")
    }
  }

  return (

    <div>
      <Nav/>
    
    <div class="bg-fixed bg-cover min-h-screen flex justify-center " style={{ backgroundImage: `url(${bg})` }}>
      <button
                onClick={() => navigate(-1)}
                className="bg-white text-amber-950 px-6 py-2 rounded-full hover:bg-amber-700 w-fit h-fit mt-4"
              >
                Back
              </button>
        <form onSubmit={handleUpdate} class="bg-white w-[500px] h-[800px] rounded-lg border-2 border-amber-800 shadow-lg shadow-amber-800 mt-[50px]">
            <p class="text-3xl  pt-[30px] text-center text-amber-950 font-bold">Update Book</p>
            <div class="flex flex-col gap-3">
                <div class="pt-8 pl-7">
                    <p class="text-1xl font-bold">Book Name:</p>
                    <input type="text" value={bookName} onChange={(e)=>setBookName(e.target.value)} class="hover:ring-2 hover:ring-red-400 rounded-sm border-solid border-2 border-amber-600 w-[430px] h-[40px]" required/>
                </div>

            
                <div class="pt-5 pl-7">
                    <p class="text-1xl font-bold">Book ID:</p>
                    <input type="text" value={bookId} onChange={(e)=>setBookId(e.target.value)} readOnly class="hover:ring-2 hover:ring-red-400 rounded-sm border-solid border-2 border-amber-600 w-[430px] h-[40px] cursor-not-allowed" required/>
                </div>

                <div class="pt-5 pl-7">
                    <p class="text-1xl font-bold">Genre:</p>
                    <input type="text" value={genre} onChange={(e)=>setGenre(e.target.value)}  class="hover:ring-2 hover:ring-red-400 rounded-sm border-solid border-2 border-amber-600 w-[430px] h-[40px]" required/>
                </div>

                <div class="pt-8 pl-7">
                    <p class="text-1xl font-bold">Author:</p>
                    <input type="text" value={author} onChange={(e)=>setAuthor(e.target.value)} class="hover:ring-2 hover:ring-red-400 rounded-sm border-solid border-2 border-amber-600 w-[430px] h-[40px]" required/>
                </div>

                <div class="pt-5 pl-7">
                    <p class="text-1xl font-bold">Publication Date:</p>
                    <input type="date" value={date} onChange={(e)=>setDate(e.target.value)} class="hover:ring-2 hover:ring-red-400 rounded-sm border-solid border-2 border-amber-600 w-[430px] h-[40px]" required/>
                </div>

                <div class="pt-5 pl-7">
                    <p class="text-1xl font-bold">Description:</p>
                    <input type="text" value={description} onChange={(e)=>setDescription(e.target.value)} class="hover:ring-2 hover:ring-red-400 rounded-sm border-solid border-2 border-amber-600 w-[430px] h-[80px]" required/>
                </div> 
    
                <div class="pt-7 pl-7 pr-10 flex justify-between">
                            
                    <button type="submit" class=" bg-amber-950 h-[40px] w-[150px] text-center pt-2 text-white rounded-md">Update Book</button>
                </div>
    
            </div>
        </form>
    </div>
    </div>
  )
}

export default EditBook

