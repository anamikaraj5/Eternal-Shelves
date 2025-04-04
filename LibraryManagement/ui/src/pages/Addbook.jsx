import React,{useState} from 'react'
import Nav from '../components/Nav'
import bg from '../assets/images/l2.jpeg'

const Addbook = () => {

  const [bookName, setBookName] = useState("")
  const [bookId, setBookId] = useState("")
  const [genre, setGenre] = useState("")
  const [author, setAuthor] =useState("")
  const [date, setDate] = useState("")
  const [description, setDescription] = useState("")
  const [BookImage,setBookImage] = useState(null)

  const handleBook = async (e) => {
    e.preventDefault()
    try {

              const formdata = new FormData()
              formdata.append("BookName",bookName)
              formdata.append("BookId",bookId)
              formdata.append("Genre",genre)
              formdata.append("Author",author)
              formdata.append("Date",date)
              formdata.append("Description",description)
              if(BookImage)
              {
                formdata.append("BookImage",BookImage)
              }



        const response = await fetch('/api/addbook',{
            method:'POST',
            credentials: 'include',
            body: formdata
          })

      if (!response.ok) {
        throw new Error("Error adding book...")
      }

      alert("Book added successfully!!!")
     
      setBookName("")
      setBookId("")
      setAuthor("")
      setGenre("")
      setDate("")
      setDescription("")
      setBookImage(null)
    } 

    catch (err) {
      console.error(err)
      alert("Something went wrong: " + err.message)
    }
  }


  return (
    <div >

        <Nav/>
        <div class="bg-fixed bg-cover min-h-screen flex justify-center " style={{ backgroundImage: `url(${bg})` }}>
        <form class="bg-white w-[500px] h-[850px] rounded-lg border-2 border-amber-800 shadow-lg shadow-amber-800 mt-[20px]" onSubmit={handleBook}>
            <p class="text-3xl  pt-[15px] text-center text-amber-950 font-bold">Add Book</p>
            <div class="flex flex-col gap-3">
                <div class="pt-5 pl-7">
                    <label class="text-1xl font-bold">Book Name:</label>
                    <input type="text" class="hover:ring-2 hover:ring-red-400 rounded-sm border-solid border-2 border-amber-600 w-[430px] h-[40px]" value={bookName} onChange={(e)=> setBookName(e.target.value)} required/>
                </div>

            
                <div class="pt-5 pl-7">
                    <label class="text-1xl font-bold">Book ID:</label>
                    <input type="text" class="hover:ring-2 hover:ring-red-400 rounded-sm border-solid border-2 border-amber-600 w-[430px] h-[40px]" value={bookId} onChange={(e)=> setBookId(e.target.value)} required/>
                </div>

                <div class="pt-5 pl-7">
                    <label class="text-1xl font-bold">Genre:</label>
                    <input type="text" class="hover:ring-2 hover:ring-red-400 rounded-sm border-solid border-2 border-amber-600 w-[430px] h-[40px]" value={genre} onChange={(e)=> setGenre(e.target.value)} required/>
                </div>

                <div class="pt-8 pl-7">
                    <label class="text-1xl font-bold">Author:</label>
                    <input type="text" class="hover:ring-2 hover:ring-red-400 rounded-sm border-solid border-2 border-amber-600 w-[430px] h-[40px]" value={author} onChange={(e)=> setAuthor(e.target.value)} required/>
                </div>

                <div class="pt-5 pl-7">
                    <label class="text-1xl font-bold">Publication Date:</label>
                    <input type="date" class="hover:ring-2 hover:ring-red-400 rounded-sm border-solid border-2 border-amber-600 w-[430px] h-[40px]" value={date} onChange={(e)=> setDate(e.target.value)} required/>
                </div>

                <div class="pt-5 pl-7">
                    <label class="text-1xl font-bold">Description:</label>
                    <input type="text" class="hover:ring-2 hover:ring-red-400 rounded-sm border-solid border-2 border-amber-600 w-[430px] h-[80px]"  value={description} onChange={(e)=> setDescription(e.target.value)} required/>
                </div>
    
                <div className='pt-5 pl-7'>

                          <label className='block text-1xl font-bold'>
                            Book Image
                          </label>
                          <input
                              type='file'
                              accept='image/*'
                              onChange={(e)=>{
                                if(e.target.files && e.target.files[0])
                                {
                                  setBookImage(e.target.files[0])
                                }
                              }} />
                          </div>

                <div class="pt-7 pl-7 pr-10 flex justify-center">
                            
                    <button type='submit' class=" bg-amber-950 h-[40px] w-[150px] text-center pt-2 text-white rounded-md">Add Book</button>
  
                </div>
    
            </div>
        </form>
    </div>

    // </div>
  )
}

export default Addbook