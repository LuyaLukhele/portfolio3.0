
import React, { useState} from 'react';
import SplitScreenLayout from "./layout";
import Education from "./education"
import Contact from "./contact"
import About from './about'
import Projects from './projects'
import Skills from './skills'
import Home from './home'



const links =[
    {
        id:0,link: 'Home', place: <Home/>
    },
    {
        id:1, link:'About', place: <About/>
    },
    {
        id:2, link:'Education', place: <Education/>
    },
    {
        id:3, link:'Skills', place: <Skills/>
    },
    {
        id:4, link:'Projects', place: <Projects/>
    },
    {
        id:5, link:'Contact', place: <Contact/>
    }
]


function Nav() {
    const [open, setOpen] = useState(0)
  

    const Rightside = () => 
    <div className='text-center'>
        <ul>
        
        {links.map(({id, link}) => (
            
            <li className='transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-orange-500 duration-300 ... border-solid border-2 rounded-sm border-stone-300 py-1 my-2' key={id}>
            {/* <span>Icon</span> */}
                <a className="text-6xl" onClick={() =>
                setOpen(id)
                }>{link}</a>
            </li>
            ))}
        </ul>
    </div>


    var ss = links.find((l) => l.id === open)

    const Leftside = () => ss.place;
    return (
        <SplitScreenLayout>
            <Leftside/>
            <Rightside/>
        </SplitScreenLayout>
    );
  }


export default Nav
