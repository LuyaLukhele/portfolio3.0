
import React, { useState} from 'react';
import MiniScreenLayout from "./miniLayout";
import MoviePP from '../assets/movie.avif';
import Portfolio1PP from '../assets/portfolio1.avif';
import Github from '../assets/Git.avif';

const techLogos = {
    "JavaScript": "https://www.vectorlogo.zone/logos/javascript/javascript-icon.svg",
    "JQuery": "https://www.vectorlogo.zone/logos/jquery/jquery-icon.svg",
    "HTML": "https://www.vectorlogo.zone/logos/w3_html5/w3_html5-icon.svg",
    "CSS": "https://www.vectorlogo.zone/logos/w3_css/w3_css-icon.svg",
    "Git": "https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg",
}

function TechBadge({ name }) {
    const logo = techLogos[name]
    return (
        <div class="flex space-x-3 items-center">
            {logo
                ? <img src={logo} alt={name} class="h-6 w-6 mb-1.5 object-contain" />
                : (
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-orange-500 mb-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                    </span>
                )}
            <p>{name}</p>
        </div>
    )
}


const links =[
    {
        id:0,link: 'Now Movies', place: Movies()
    },
    {
        id:2, link:'Portfolio 1.0', place: Port()
    },
    {
        id:4, link:'GIT', place: Git()
    },
]


function Projects() {
    const [open, setOpen] = useState(0)
  

    const Top = () =>
    <div className='flex justify-center items-center text-center mt-4'>
        <ul className='flex flex-wrap justify-center gap-2 p-2 border-solid border-2 rounded-full border-orange-300'>

        {links.map(({id, link}) => (

            <li className={'px-4 py-1 transition ease-in-out delay-150 hover:-translate-y-0.5 hover:bg-orange-100 duration-300 rounded-full'  + (open ===id ? ' bg-[#20354b] text-orange-500 hover:bg-[#20354b] duration-300' : '')} key={id}>
                <button className="text-xl cursor-pointer " onClick={() =>
                setOpen(id)
                }>{link}</button>
            </li>
            ))}
        </ul>
    </div>


    var ss = links.find((l) => l.id === open)

    const Bottom = () => <div key={open} className="page-transition">{ss.place}</div>;
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
            <div class="p-10 flex flex-col sm:flex-row max-w-2xl bg-white px-6 pb-2 rounded-xl shadow-lg">
            
                <div class="pr-10 relative w-10/12">
                    <h3 class="mb-3 text-xl font-bold text-orange-500 font-semibold">Now Movies</h3>
                    <a href='https://movie-luyapp.netlify.app' target='_blank' rel="noreferrer">
                        <img class="w-full rounded-xl transform hover:scale-105 transition duration-500" src={MoviePP} alt="Now Movies live site" />
                    </a>
                </div>

                <div class="my-4">
                <h1 class="mt-4 text-gray-800 text-xl font-bold cursor-pointer">Discover current movies and their ratings</h1>
                    <TechBadge name="JavaScript" />
                    <TechBadge name="JQuery" />
                    <TechBadge name="MoviesDB API" />
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
            <div class="p-10 flex flex-col sm:flex-row max-w-2xl bg-white px-6 pb-2 rounded-xl shadow-lg">
            
                <div class="pr-10 relative w-10/12">
                    <h3 class="mb-3 text-xl font-bold text-orange-500">First Portfolio</h3>
                    <a href='https://luyalukhele.github.io/' target='_blank' rel="noreferrer">
                        <img class="w-full rounded-xl transform hover:scale-105 transition duration-500" src={Portfolio1PP} alt="First Portfolio live site" />
                    </a>
                </div>

                <div class="my-4">
                <h1 class="mt-4 text-gray-800 text-xl font-bold">My first portfolio application</h1>
                    <TechBadge name="JavaScript" />
                    <TechBadge name="HTML" />
                    <TechBadge name="CSS" />
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
            <div class="p-10 flex flex-col sm:flex-row max-w-2xl bg-white px-6 pb-2 rounded-xl shadow-lg">
            
                <div class="pr-10 relative w-10/12">
                    <h3 class="mb-3 text-xl font-bold text-orange-500">My Github</h3>
                    <a href='https://github.com/LuyaLukhele' target='_blank' rel="noreferrer">
                        <img class="w-full rounded-xl transform hover:scale-105 transition duration-500" src={Github} alt="Luyanda's GitHub profile" />
                    </a>
                </div>

                <div class="my-4">
                <h1 class="mt-4 text-gray-800 text-xl font-bold">This is the repository to all my personal projects.</h1>
                </div>
            </div>
        </div>
        </div>
    ); 
}