
import Me from '../assets/Luyanda Lukhele-min.png'
// import Typed from 'typed.js'


const home = () => {
    
    return (
        <div className="bg-gray-50 m-2 p-8 flex flex-col justify-center items-center border-solid border-2 rounded-sm border-stone-300"> 
            <div className="w-5/6 text-center text-4xl border-solid border-2 rounded-sm border-stone-300">
                <h1>Luyanda Lukhele</h1>
                <h2>Full Stack <span id='typing'></span></h2>
            </div>

            <div className="mt-10">
                <img className='h-64 rounded-lg' src={Me}/>
            </div>
        
        </div>
    )
}
export default home

