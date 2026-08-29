import Me from "../assets/LuyandaShirtPP.avif"

const home = () => {
  return (
    <div className="bg-gray-50 m-2 p-8 flex flex-col sm:flex-row-reverse sm:items-center sm:justify-center gap-10 border-solid border-2 rounded-sm border-stone-300">
      <div className="relative mx-auto sm:mx-0 shrink-0">
        <div className="absolute -bottom-4 -right-4 h-64 w-full bg-orange-500 rounded-lg -z-10"></div>
        <img
          alt="me"
          className="hover:animate-pulse h-64 rounded-lg"
          src={Me}
        />
      </div>

      <div className="text-center sm:text-left">
        <h1 className="font-display font-semibold tracking-tight text-4xl sm:text-5xl">
          Luyanda Lukhele
        </h1>
        <h2 className="mt-2 font-mono text-lg sm:text-xl tracking-wide">
          <span className='text-orange-500 relative inline-block after:content-[""] after:absolute after:left-0 after:right-0 after:-bottom-1 after:h-2 after:bg-orange-200 after:-z-10'>
            Software Engineer
          </span>
        </h2>
        <p className="mt-4 max-w-sm mx-auto sm:mx-0 text-gray-600">
          Building web applications across the front-end, back-end, APIs, and
          databases.
        </p>
      </div>
    </div>
  )
}
export default home
