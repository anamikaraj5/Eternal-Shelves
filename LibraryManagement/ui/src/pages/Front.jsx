import React from 'react'
import { Link } from 'react-router-dom'
import bg from '../assets/images/book1.png'

const Front = () => {

  return (
    <div>

            <div class="bg-fixed bg-cover h-[968px] text-center" style={{ backgroundImage: `url(${bg})` }}>
                  
                  <p class="pt-[100px] text-9xl text-white font-bold">Eternal Shelves</p>
          
                  <div class="flex  mt-[660px] ml-[700px] gap-20">
                      <Link to={'/login'} class="bg-white rounded-full mr-5 px-[50px] py-2 font-bold text-amber-950 shadow-lg shadow-amber-600 flex hover:bg-amber-600  "> Login</Link>
                      <Link to={'/signup'} class="bg-white rounded-full mr-5 px-[50px] py-2 font-bold text-amber-950 shadow-lg shadow-amber-600 flex hover:bg-amber-600"> Sign Up</Link>
                  </div>
          
              </div>

    </div>
  )
}

export default Front