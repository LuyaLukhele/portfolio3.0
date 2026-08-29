
import React, { useState} from 'react';
import SplitScreenLayout from "./layout";
import Contact from "./contact"
import About from './about'
import Projects from './projects'
import Skills from './skills'
import Home from './home'



const links =[
    {
        id:0,link: 'Home', place: () => <Home/>, icon: homeIcon()
    },
    {
        id:1, link:'About', place: (navigate) => <About onContactClick={() => navigate(5)}/>, icon: aboutIcon()
    },
    {
        id:2, link:'Skills', place: () => <Skills/>, icon: skillIcon()
    },
    {
        id:3, link:'Projects', place: () => <Projects/>, icon: projectIcon()
    },
    {
        id:4, link:'Contact', place: () => <Contact/>, icon: cotactIcon()
    }
]


function Nav() {
    const [open, setOpen] = useState(0)
    
  

    const Rightside = () =>
    <div className='text-center sticky top-0 z-10 bg-white lg:top-20 lg:bg-transparent'>
        <ul className='flex flex-row justify-center py-1 lg:py-0 lg:flex-col'>

        {links.map(({id, link, icon}) => (

            <li className={'m-1 overflow-hidden w-10 lg:w-auto flex flex-row justify-center transition ease-in-out delay-150 hover:-translate-y-1 hover:bg-orange-500 hover:animate-pulse duration-300 ... border-solid border-2 rounded-full border-stone-300 py-1 my-2 lg:px-4'  + (open ===id ? ' animate-bounce-slow border-orange-200 hover:bg-orange-400 duration-300' : '')} style={open === id ? {backgroundColor: '#fed7aa'} : undefined} key={id}>

                <button className={"lg:text-6xl flex flex-row justify-center cursor-pointer self-center w-full " + (open === id ? 'text-black' : 'lg:text-black')} onClick={() =>
                ClickHandler(id)
                }><span className='self-center lg:hidden' >{icon}</span><span className='hidden lg:inline'>{link}</span></button>
            </li>

            ))}
        </ul>
    </div>


    function ClickHandler(id){
        setOpen(id);
    }


    var ss = links.find((l) => l.id === open)

    const Leftside = () => <div key={open} className="page-transition">{ss.place(ClickHandler)}</div>;
    return (
        <SplitScreenLayout>
            <Leftside/>
            <Rightside/>
        </SplitScreenLayout>
    );
  }


export default Nav


function homeIcon(){
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
        </svg>


    )
}

function aboutIcon(){
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>


    )
}

function skillIcon(){
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
        </svg>
      

    )
}

function projectIcon(){
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7m0 0a3 3 0 01-3 3m0 3h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008zm-3 6h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008z" />
        </svg>


    )
}

function cotactIcon(){
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25" />
        </svg>
      

    )
}