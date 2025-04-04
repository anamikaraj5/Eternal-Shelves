import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import Nav from "../components/Nav"
import bg from '../assets/images/l2.jpeg'

const Viewbook = () => {
  const { bookid } = useParams()
  const navigate = useNavigate()
  const [book, setBook] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await fetch(`/api/viewbook?bookid=${bookid}`)
        const data = await response.json()
        if (!response.ok) {
          setError(data.message || "Failed to fetch book details")
        } else {
          setBook(data)
        }
      } catch (error) {
        console.error("Error fetching book details:", error)
        setError("Failed to fetch book details")
      } finally {
        setLoading(false)
      }
    }

    fetchBookDetails()
  }, [bookid])

  return (
    <>
      <Nav />
      <div class="bg-fixed bg-cover min-h-screen flex justify-center " style={{ backgroundImage: `url(${bg})` }}>
        {loading && <p className="text-lg text-gray-600">Loading book details...</p>}
        {error && <p className="text-red-500">{error}</p>}
        <button
                onClick={() => navigate(-1)}
                className="bg-white text-amber-950 px-6 py-2 rounded-full hover:bg-amber-700 w-fit h-fit mt-4"
              >
                Back
              </button>
        {book && (
          <div className="flex gap-14 bg-white text-amber-950 p-8 rounded-lg border-8 border-amber-800 shadow-lg shadow-amber-600 h-fit mt-[70px]">
            <img
              src={book.image || "/images/default-book.jpg"}
              className="w-[400px] h-[600px] object-cover"
              alt={book.bookname}
            />
            <div className="text-2xl flex flex-col gap-6">
              <p><span className="font-bold">Book Name:</span> {book.bookname}</p>
              <p><span className="font-bold">Genre:</span> {book.genre}</p>
              <p><span className="font-bold">Author Name:</span> {book.author}</p>
              <p><span className="font-bold">Publication Date:</span> {book.dates}</p>
              <p className="max-w-lg"><span className="font-bold">Description:</span> {book.description}</p>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default Viewbook
