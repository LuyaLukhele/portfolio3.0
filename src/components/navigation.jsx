
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
        id:0,link: 'home', place: <Home/>
    },
    {
        id:1, link:'about', place: <About/>
    },
    {
        id:2, link:'education', place: <Education/>
    },
    {
        id:3, link:'skills', place: <Skills/>
    },
    {
        id:4, link:'projects', place: <Projects/>
    },
    {
        id:5, link:'contact', place: <Contact/>
    }
]


function Nav() {
    const [open, setOpen] = useState(0)
  

    const Rightside = () => 
    <div>
        <ul>
        {links.map(({id, link}) => (
            <li key={id}>
                <a onClick={() =>
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
