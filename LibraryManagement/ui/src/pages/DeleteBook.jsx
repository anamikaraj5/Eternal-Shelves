import React from "react"

const DeleteBook = ({ bookid }) => {
  
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this book?")) return

    try {
      const response = await fetch(`/api/deletebook?bid=${bookid}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      })

      if (!response.ok) {
        alert("Failed to delete book")
        return
      }

      alert("Book deleted successfully!")
      window.location.reload()
    } 
    
    catch (error) {
      console.error("Error:", error)
      alert("Error deleting book")
    }
  }

  return (
    <button 
      onClick={handleDelete} 
      className="bg-amber-900 text-white px-4 py-2 rounded hover:bg-red-700"
    >
      Remove
    </button>
  )
}

export default DeleteBook
