
import Me from '../assets/Luyanda Lukhele-min.png'
import Typed from 'react-typed';


const home = () => {
    
    return (
        <div className="bg-gray-50 m-2 p-8 flex flex-col justify-center items-center border-solid border-2 rounded-sm border-stone-300"> 
            <div className="w-5/6 text-center text-4xl">
                <h1>Luyanda Lukhele</h1>
                <h2>Full Stack <span className='text-orange-500'>
                <Typed strings={['Developer', 'Engineer']}
                    typeSpeed={100}
                    backSpeed={100}
                    loop
                    />
                </span>
                </h2>
                
            </div>

            <div className="mt-10">
                <img className='hover:animate-pulse h-64 rounded-lg' src={Me}/>
            </div>
        
        </div>
    )
}
export default home

