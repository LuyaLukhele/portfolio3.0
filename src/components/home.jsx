import Me from "../assets/LuyandaShirtPP.avif"

const home = () => {
  return (
    <div className="bg-gray-50 m-2 p-8 flex flex-col justify-center items-center border-solid border-2 rounded-sm border-stone-300">
      <div className="w-5/6 text-center sm:text-4xl text-5xl">
        <h1>Luyanda Lukhele</h1>
        <h2>
          <span className='text-orange-500 relative inline-block after:content-[""] after:absolute after:left-0 after:right-0 after:-bottom-1 after:h-2 after:bg-orange-200 after:-z-10'>
            Software Engineer
          </span>
        </h2>
      </div>

      <div className="relative mt-10">
        <div className="absolute -bottom-4 -right-4 h-64 w-full bg-orange-500 rounded-lg -z-10"></div>
        <img
          alt="me"
          className="hover:animate-pulse h-64 rounded-lg"
          src={Me}
        />
      </div>
    </div>
  )
}
export default home
