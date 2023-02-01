
import React, { useState} from 'react';
import MiniScreenLayout from "./miniLayout";
import MoviePP from '../assets/movie.png';
import Portfolio1PP from '../assets/portfolio1.png';
import Github from '../assets/Git.png';
import PriceChecker from '../assets/not-found.png';


const links =[
    {
        id:0,link: 'Now Movies', place: Movies()
    },
    {
        id:1, link:'Price comparison', place: Price()
    },
    {
        id:2, link:'Portfolio 1.0', place: Port()
    },
    {
        id:3, link:'WhatUplayin', place: WhatUPlayin()
    },
    {
        id:4, link:'GIT', place: Git()
    },
]


function Projects() {
    const [open, setOpen] = useState(0)
  

    const Top = () => 
    <div className='flex justify-center items-center text-center'>
        <ul className='flex items-baseline space-x-4'>
        
        {links.map(({id, link}) => (
            
            <li className={'p-2 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-orange-100 hover: duration-300 ... border-solid border-2 rounded-sm border-orange-300 py-1 my-2'  + (open ===id ? ' bg-[#20354b] text-orange-500 hover:bg-white duration-300' : '')} key={id}>
                <button className="text-xl cursor-pointer " onClick={() =>
                setOpen(id)
                }>{link}</button>
            </li>
            ))}
        </ul>
    </div>


    var ss = links.find((l) => l.id === open)

    const Bottom = () => ss.place;
    return (
        <MiniScreenLayout>
            <Top/>
            <Bottom/>
        </MiniScreenLayout>
    );
  }


export default Projects

function Movies(){
    return (

        <div class="mt-2 flex justify-center items-center">
        <div class="md:space-y-0">
            <div class="p-10 flex flex-row max-w-2xl bg-white px-6 pb-2 rounded-xl shadow-lg">
            
                <div class="pr-10 relative w-10/12">
                    <h3 class="mb-3 text-xl font-bold text-orange-500 font-semibold">Now Movies</h3>
                    <img class="w-full rounded-xl" src={MoviePP} alt="Colors" />
                </div>

                <div class="my-4">   
                <h1 class="mt-4 text-gray-800 text-xl font-bold cursor-pointer">Discover current movies and their ratings</h1>            
                    <div class="flex space-x-5 items-center">
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-orange-500 mb-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                    </span>
                    <p>JavaScript</p>
                    </div>
                    <div class="flex space-x-5 items-center">
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-orange-500 mb-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                    </span>
                    <p>JQuery</p>
                    </div>
                    <div class="flex space-x-5 items-center">
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-orange-500 mb-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                    </span>
                    <p>MoviesDB API</p>
                    </div>
                </div>
            </div>
            <div className='flex flex-row p-8 text-center'>
                <a href='https://github.com/LuyaLukhele/movie-app' target='_blank' rel="noreferrer" class=" transform hover:scale-105 transition duration-500 mr-5 text-xl w-full text-orange-500 font-semibold bg-[#20354b] py-2 rounded-xl shadow-lg">View Code</a>
                <a href='https://movie-luyapp.netlify.app' target='_blank' rel="noreferrer" class=" transform hover:scale-105 transition duration-500 text-xl w-full text-orange-500 font-semibold bg-[#20354b] py-2 rounded-xl shadow-lg">Live View</a>
            </div>
        </div>
        </div>
    ); 
}

function Price(){
    return (

        <div class="mt-2 flex justify-center items-center">
        <div class="md:space-y-0">
            <div class="p-10 flex flex-row max-w-2xl bg-white px-6 pb-2 rounded-xl shadow-lg">
            
                <div class="pr-10 relative w-10/12">
                    <h3 class="mb-3 text-xl font-bold text-orange-500">Price Comparison</h3>
                    <img class="w-full rounded-xl" src={PriceChecker} alt="Colors" />
                </div>

                <div class="my-4">   
                <h1 class="mt-4 text-gray-800 text-xl font-bold">This is an API which automatically search grocery stores for a specific item, and returns a response for a client to use.</h1>            
                    <div class="flex space-x-5 items-center">
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-orange-500 mb-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                    </span>
                    <p>Java</p>
                    </div>
                    <div class="flex space-x-5 items-center">
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-orange-500 mb-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                    </span>
                    <p>Selenium</p>
                    </div>
                    <div class="flex space-x-5 items-center">
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-orange-500 mb-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                    </span>
                    <p>Docker</p>
                    </div>
                </div>
            </div>
            <div className='flex p-8 text-center'>
            <a href='https://github.com/sibo-t/real-time-price-comparison' target='_blank' rel="noreferrer" class=" transform hover:scale-105 transition duration-500 mr-5 text-xl w-full text-orange-500 bg-[#20354b] py-2 rounded-xl shadow-lg">View Code</a>
            </div>
        </div>
        </div>
    ); 
}

function Port(){
    return (

        <div class="mt-2 flex justify-center items-center">
        <div class="md:space-y-0">
            <div class="p-10 flex flex-row max-w-2xl bg-white px-6 pb-2 rounded-xl shadow-lg">
            
                <div class="pr-10 relative w-10/12">
                    <h3 class="mb-3 text-xl font-bold text-orange-500">First Portfolio</h3>
                    <img class="w-full rounded-xl" src={Portfolio1PP} alt="Colors" />
                </div>

                <div class="my-4">   
                <h1 class="mt-4 text-gray-800 text-xl font-bold">My first portfolio application</h1>            
                    <div class="flex space-x-5 items-center">
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-orange-500 mb-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                    </span>
                    <p>Javascript</p>
                    </div>
                    <div class="flex space-x-5 items-center">
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-orange-500 mb-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                    </span>
                    <p>HTML</p>
                    </div>
                    <div class="flex space-x-5 items-center">
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-orange-500 mb-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                    </span>
                    <p>CSS</p>
                    </div>
                </div>
            </div>
            <div className='flex flex-row p-8 text-center'>
            <a href='https://github.com/LuyaLukhele/LuyaLukhele.github.io' target='_blank' rel="noreferrer" class=" transform hover:scale-105 transition duration-500 mr-5 text-xl w-full bg-[#20354b] text-orange-500 py-2 rounded-xl shadow-lg">View Code</a>
                <a href='https://luyalukhele.github.io/' target='_blank' rel="noreferrer" class=" transform hover:scale-105 transition duration-500 text-xl w-full bg-[#20354b] text-orange-500 py-2 rounded-xl shadow-lg">Live View</a>
            </div>
        </div>
        </div>
    ); 
}

function WhatUPlayin(){
    return (

        <div class="mt-2 flex justify-center items-center">
        <div class="md:space-y-0">
            <div class="p-10 flex flex-row max-w-2xl bg-white px-6 pb-2 rounded-xl shadow-lg">
            
                <div class="pr-10 relative w-10/12">
                    <h3 class="mb-3 text-xl font-bold text-orange-500">WhatUPlayin</h3>
                    <img class="w-full rounded-xl" src="https://images.unsplash.com/photo-1541701494587-cb58502866ab?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80" alt="Colors" />
                </div>

                <div class="my-4">   
                <h1 class="mt-4 text-gray-800 text-xl font-bold">Currently in Development! A website which allows users to keep track of
                games their friends are playing.</h1>            
                    <div class="flex space-x-5 items-center">
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-orange-500 mb-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                    </span>
                    <p>Spring Boot</p>
                    </div>
                    <div class="flex space-x-5 items-center">
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-orange-500 mb-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                    </span>
                    <p>React</p>
                    </div>
                    <div class="flex space-x-5 items-center">
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-orange-500 mb-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                    </span>
                    <p>IGDB.com API</p>
                    </div>
                </div>
            </div>
            {/* <div className='flex flex-row p-8'>
                <button class=" transform hover:scale-105 transition duration-500 mr-5 text-xl w-full text-white bg-indigo-600 py-2 rounded-xl shadow-lg">View Code</button>
                <button class=" transform hover:scale-105 transition duration-500 text-xl w-full text-white bg-indigo-600 py-2 rounded-xl shadow-lg">Live View</button>
            </div> */}
        </div>
        </div>
    ); 
}

function Git(){
    return (

        <div class="mt-2 flex justify-center items-center">
        <div class="md:space-y-0">
            <div class="p-10 flex flex-row max-w-2xl bg-white px-6 pb-2 rounded-xl shadow-lg">
            
                <div class="pr-10 relative w-10/12">
                    <h3 class="mb-3 text-xl font-bold text-orange-500">My Github</h3>
                    <img class="w-full rounded-xl" src={Github} alt="Colors" />
                </div>

                <div class="my-4">   
                <h1 class="mt-4 text-gray-800 text-xl font-bold">This is the repository to all my personal projects.</h1>                                
                </div>
            </div>
            <div className='flex flex-row p-8 text-center'>
            <a href='https://github.com/LuyaLukhele' target='_blank' rel="noreferrer" class=" transform hover:scale-105 transition duration-500 mr-5 text-xl w-full bg-[#20354b] text-orange-500 py-2 rounded-xl shadow-lg">Open Github</a>
            </div>
        </div>
        </div>
    ); 
}