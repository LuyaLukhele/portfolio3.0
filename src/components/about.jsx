

const about = () => {
    return (
        <div className="overflow-auto h-1/3 bg-gray-50 m-2 p-8 flex flex-col justify-center items-center border-solid border-2 rounded-sm border-stone-300">
            <div className=" mt-96 bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:text-center">
                <h2 className="text-lg font-semibold leading-8 tracking-tight text-orange-500">Real apps made with passion</h2>
                <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-2xl">I am a full-stack developer with experience in both front-end and back-end development.</p>
                </div>
                <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
                <dl className="grid max-w-xl grid-cols-1 gap-y-10 gap-x-8 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
                    <div className="relative pl-16">
                    <dt className="text-base font-semibold leading-7 text-gray-900">
                        <div className="absolute top-0 left-0 flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500">
                        {/* <!-- Heroicon name: outline/cloud-arrow-up --> */}
                        <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                        </svg>
                        </div>
                        Back-End
                    </dt>
                    <dd className="mt-2 text-base leading-7 text-gray-600">In my experience, I have worked on various back-end services, to develop scalable, secure, and efficient server-side solutions.  I can work with databases, APIs, and other technologies to deliver robust and high-performance backends. </dd>
                    </div>

                    <div className="relative pl-16">
                    <dt className="text-base font-semibold leading-7 text-gray-900">
                        <div className="absolute top-0 left-0 flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500">
                        <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
                        </svg>

                        </div>
                        Front-End
                    </dt>
                    <dd className="mt-2 text-base leading-7 text-gray-600">I am well-versed in JavaScript and React, which I use to build dynamic and interactive user interfaces. I am passionate about creating clean, intuitive, and visually appealing web applications that provide a seamless user experience.</dd>
                    </div>

                    <div className="relative pl-16">
                    <dt className="text-base font-semibold leading-7 text-gray-900">
                        <div className="absolute top-0 left-0 flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500">
                        {/* <!-- Heroicon name: outline/arrow-path --> */}
                        <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                        </svg>
                        </div>
                        Passion for Learning
                    </dt>
                    <dd className="mt-2 text-base leading-7 text-gray-600">I am always looking to expand my skillset and stay up-to-date with the latest developments in web technologies. I am dedicated to continuously learning and improving my development skills to provide the best possible solutions.</dd>
                    </div>

                    <div className="relative pl-16">
                    <dt className="text-base font-semibold leading-7 text-gray-900">
                        <div className="absolute top-0 left-0 flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6 text-white">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                        </svg>

                        </div>
                        Let's Connect
                    </dt>
                    <dd className="mt-2 text-base leading-7 text-gray-600">If you are looking for a developer with experience in back-end and front-end development, feel free to reach out to me. I would be thrilled to discuss any available developer opportunities with your organization.</dd>
                    </div>
                </dl>
                </div>
            </div>
            </div>

        </div>
    )
}
export default about