
import React, { useState} from 'react';
import MiniScreenLayout from "./miniLayout";
import Education from "./education"
import Contact from "./contact"
import About from './about'
import Skills from './skills'
import Home from './home'



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
    <div className='text-center'>
        <ul className='flex items-baseline space-x-4'>
        
        {links.map(({id, link}) => (
            
            <li className='p-1 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-orange-500 duration-300 ... border-solid border-2 rounded-sm border-stone-300 py-1 my-2' key={id}>
                <a className="text-xl" onClick={() =>
                setOpen(id)
                }>{link}</a>
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
            <div class="max-w-sm bg-white px-6 pb-2 rounded-xl shadow-lg transform hover:scale-105 transition duration-500">
            <h3 class="mb-3 text-xl font-bold text-indigo-600">Now Movies</h3>
            <div class="relative">
                <img class="w-full rounded-xl" src="https://images.unsplash.com/photo-1541701494587-cb58502866ab?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80" alt="Colors" />
            </div>
            <h1 class="mt-4 text-gray-800 text-2xl font-bold cursor-pointer">Javascript Bootcamp for Absolute Beginners</h1>
            <div class="my-4">               
                <div class="flex space-x-1 items-center">
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-indigo-600 mb-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                </span>
                <p>Vanilla JS</p>
                </div>
                <button class="mt-4 text-xl w-full text-white bg-indigo-600 py-2 rounded-xl shadow-lg">Buy Lesson</button>
            </div>
            </div>
        </div>
        </div>
    ); 
}

function Price(){
    return (

        <div class="mt-2 flex justify-center items-center">
        <div class="md:space-y-0">
            <div class="max-w-sm bg-white px-6 pb-2 rounded-xl shadow-lg transform hover:scale-105 transition duration-500">
            <h3 class="mb-3 text-xl font-bold text-indigo-600">Beginner Friendly</h3>
            <div class="relative">
                <img class="w-full rounded-xl" src="https://images.unsplash.com/photo-1541701494587-cb58502866ab?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80" alt="Colors" />
                <p class="absolute top-0 bg-yellow-300 text-gray-800 font-semibold py-1 px-3 rounded-br-lg rounded-tl-lg">FREE</p>
            </div>
            <h1 class="mt-4 text-gray-800 text-2xl font-bold cursor-pointer">Javascript Bootcamp for Absolute Beginners</h1>
            <div class="my-4">               
                <div class="flex space-x-1 items-center">
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-indigo-600 mb-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                </span>
                <p>Vanilla JS</p>
                </div>
                <button class="mt-4 text-xl w-full text-white bg-indigo-600 py-2 rounded-xl shadow-lg">Buy Lesson</button>
            </div>
            </div>
        </div>
        </div>
    ); 
}

function Port(){
    return (

        <div class="mt-2 flex justify-center items-center">
        <div class="md:space-y-0">
            <div class="max-w-sm bg-white px-6 pb-2 rounded-xl shadow-lg transform hover:scale-105 transition duration-500">
            <h3 class="mb-3 text-xl font-bold text-indigo-600">Beginner Friendly</h3>
            <div class="relative">
                <img class="w-full rounded-xl" src="https://images.unsplash.com/photo-1541701494587-cb58502866ab?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80" alt="Colors" />
                <p class="absolute top-0 bg-yellow-300 text-gray-800 font-semibold py-1 px-3 rounded-br-lg rounded-tl-lg">FREE</p>
            </div>
            <h1 class="mt-4 text-gray-800 text-2xl font-bold cursor-pointer">Javascript Bootcamp for Absolute Beginners</h1>
            <div class="my-4">               
                <div class="flex space-x-1 items-center">
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-indigo-600 mb-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                </span>
                <p>Vanilla JS</p>
                </div>
                <button class="mt-4 text-xl w-full text-white bg-indigo-600 py-2 rounded-xl shadow-lg">Buy Lesson</button>
            </div>
            </div>
        </div>
        </div>
    ); 
}

function WhatUPlayin(){
    return (

        <div class="mt-2 flex justify-center items-center">
        <div class="md:space-y-0">
            <div class="max-w-sm bg-white px-6 pb-2 rounded-xl shadow-lg transform hover:scale-105 transition duration-500">
            <h3 class="mb-3 text-xl font-bold text-indigo-600">Beginner Friendly</h3>
            <div class="relative">
                <img class="w-full rounded-xl" src="https://images.unsplash.com/photo-1541701494587-cb58502866ab?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80" alt="Colors" />
                <p class="absolute top-0 bg-yellow-300 text-gray-800 font-semibold py-1 px-3 rounded-br-lg rounded-tl-lg">FREE</p>
            </div>
            <h1 class="mt-4 text-gray-800 text-2xl font-bold cursor-pointer">Javascript Bootcamp for Absolute Beginners</h1>
            <div class="my-4">               
                <div class="flex space-x-1 items-center">
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-indigo-600 mb-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                </span>
                <p>Vanilla JS</p>
                </div>
                <button class="mt-4 text-xl w-full text-white bg-indigo-600 py-2 rounded-xl shadow-lg">Buy Lesson</button>
            </div>
            </div>
        </div>
        </div>
    ); 
}

function Git(){
    return (

        <div class="mt-2 flex justify-center items-center">
        <div class="md:space-y-0">
            <div class="max-w-sm bg-white px-6 pb-2 rounded-xl shadow-lg transform hover:scale-105 transition duration-500">
            <h3 class="mb-3 text-xl font-bold text-indigo-600">Beginner Friendly</h3>
            <div class="relative">
                <img class="w-full rounded-xl" src="https://images.unsplash.com/photo-1541701494587-cb58502866ab?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80" alt="Colors" />
                <p class="absolute top-0 bg-yellow-300 text-gray-800 font-semibold py-1 px-3 rounded-br-lg rounded-tl-lg">FREE</p>
            </div>
            <h1 class="mt-4 text-gray-800 text-2xl font-bold cursor-pointer">Javascript Bootcamp for Absolute Beginners</h1>
            <div class="my-4">               
                <div class="flex space-x-1 items-center">
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-indigo-600 mb-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                </span>
                <p>Vanilla JS</p>
                </div>
                <button class="mt-4 text-xl w-full text-white bg-indigo-600 py-2 rounded-xl shadow-lg">Buy Lesson</button>
            </div>
            </div>
        </div>
        </div>
    ); 
}