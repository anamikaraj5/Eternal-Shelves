import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Nav from "../components/Nav"
import bg from '../assets/images/l2.jpeg'
import DeleteBook from "./DeleteBook.jsx"
import useProfile from "../hooks/Userprofile.js"

const Viewbooks = () => {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const { profile } = useProfile()

  const fetchBooks = async () => {
    setLoading(true)
    setError("")

    try {
      const response = await fetch("/api/viewallbook", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.message || "Failed to fetch books")
        console.log(data.message)
        setBooks([])
      } 
      else {
        setBooks(data)
      }
    } 
    
    catch (error) {
      console.error("Error fetching books:", error)
      setError("Failed to fetch books")
    } 
    finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBooks()
  }, [])

  return (
    <>
    
    
    <Nav/>

    <div class="bg-fixed bg-cover min-h-screen flex justify-center " style={{ backgroundImage: `url(${bg})` }}>
    <div className=" flex flex-col items-center">

      {loading && <p className="text-lg text-gray-600 mt-5">Loading books...</p>}
      {error && <div className="text-red-500 mt-5 text-2xl w-fit h-fit bg-white rounded-md">{error}</div>}

      {!loading && !error && books.length === 0 && (
        <p className="text-gray-600 mt-5">No books available.</p>
      )}

      {!loading && !error && books.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {books.map((book) => (
            <div key={book._id} className="bg-white p-6 shadow-md rounded-lg w-[300px] flex flex-col items-center border">
              <p className="text-xl font-bold text-amber-950">{book.bookname}</p>
              <img src={book.image} className="w-[200px] h-[250px] mt-4" alt={book.bookname} />

              <div className="flex gap-3 mt-4">
                <Link to={`/viewbook/${book.bookid}`} className="bg-amber-600 text-white px-4 py-2 rounded hover:bg-amber-400">View</Link>
                
                {profile && profile.UserRole === 'admin' && (
                  <>
                <Link to={`/updatebook?bookid=${book.bookid}&bookname=${book.bookname}&genre=${book.genre}&author=${book.author}&date=${book.dates}&description=${book.description}`} className="bg-amber-700 text-white px-4 py-2 rounded hover:bg-yellow-700">Update</Link>
                <DeleteBook bookid={book.bookid}/>
                </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>

    </div>

    </>
  )
}

export default Viewbooks


