import React from 'react'
import Nav from '../components/Nav.jsx'
import bg from '../assets/images/l3.jpg'

const Home = () => {
  return (
    <div>
        
        <Nav/>

        <div class="bg-fixed bg-cover h-[888px] flex " style={{ backgroundImage: `url(${bg})` }}>

            <div class="mt-[370px] ml-[870px] bg-white h-[260px] w-[850px] rounded-lg text-center pt-[30px] shadow-lg shadow-amber-600 ">
                <p class=" text-8xl text-amber-950 font-bold">Eternal Shelves</p>
                <h3 class="pt-[20px] text-xl text-amber-800 ">"Eternal shelves hold timeless tales, where every book is a portal to infinity."</h3>
            </div>

        </div>   

    </div>
  )
}

export default Home