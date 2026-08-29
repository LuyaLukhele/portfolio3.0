
import myImage from "../assets/LuyandaShirtPP.avif"

const Contact = () => {
    return (
        <div className="bg-gray-50 m-2 p-8 flex flex-col justify-center items-center border-solid border-2 rounded-sm border-stone-300">
            <a href='https://www.linkedin.com/in/luyalukhele/' target='_blank' rel="noreferrer" className="block w-60 mx-auto bg-[#20354b] rounded-2xl px-8 py-6 shadow-lg transform hover:scale-105 transition duration-500">
                <div className="mt-6 w-fit mx-auto">
                    <img src={myImage} class="rounded-full w-28 " alt="Luyanda lukhele"/>
                </div>

                <div className="mt-8 ">
                    <span className="text-white font-bold text-2xl tracking-wide">Luyanda <br/> Lukhele</span>
                </div>
                <p className="text-orange-500 font-semibold mt-2.5" >
                    LinkedIn
                </p>
            </a>

            <a href='mailto:lukheleluyanda@gmail.com' target='_blank' rel="noreferrer" className="mt-4 flex items-center gap-3 bg-white rounded-full pl-4 pr-6 py-2 shadow-lg border border-gray-200 transform hover:scale-105 transition duration-500">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-6 h-6 shrink-0">
                    <path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z"/>
                    <path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z"/>
                    <path fill="#FBBC05" d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24s.85 6.91 2.34 9.88l7.35-5.7z"/>
                    <path fill="#EA4335" d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z"/>
                </svg>
                <span className="text-gray-700 font-semibold">lukheleluyanda@gmail.com</span>
            </a>
        </div>
    )
}
export default Contact