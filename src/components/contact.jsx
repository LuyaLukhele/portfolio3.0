
import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import myImage from "../assets/Luyanda Lukhele-min.png"
import Swal from "sweetalert2";

const Contact = () => {
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_mkz60u5', 'template_yrotd7p', form.current, 'bcq4sNURuQCJym2xM')
        .then((result) => {
            console.log(result.text);
            Swal.fire({
                icon: "success",
                title: "Message Sent Successfully"
              })
        }, (error) => {
            console.log(error.text);
            Swal.fire({
                icon: "error",
                title: "Ooops, something went wrong",
                text: error.text,
              })
        });
        e.target.reset();
    };
    
    return (
        <div className=" overflow-auto bg-gray-50 m-2 p-8 flex flex-col justify-center items-center border-solid border-2 rounded-sm border-stone-300"> 
            <div className="max-w-screen-lg p-4 mx-auto flex flex-col justify-center w-full h-96">
                
    
            <div className="grid sm:grid-cols-1 md:grid-cols-2 sm:px-0">
                
                <form ref={form} onSubmit={sendEmail} 
                className="max-w-xs m-20 rounded-sm">
                <label>Name</label>
                <input type="text" name="user_name" placeholder="Your Name"
                    required className="mt-1
                        block
                        rounded-md
                        bg-orange-100
                        focus:border-gray-500 focus:bg-white focus:ring-0 text-black"/>
                    <br/>
                <label>Email</label>
                <input type="email" name="user_email" placeholder="Email@something.com"
                    className="mt-1
                        block
                        rounded-md
                        bg-orange-100
                        border-transparent
                        focus:border-gray-500 focus:bg-white focus:ring-0 text-black"/>
                    <br/>
                <label>Message</label>
                <textarea name="message" placeholder="Reach out to me" 
                    className=" mt-1
                        block
                        rounded-md
                        bg-orange-100
                        border-transparent
                        focus:border-gray-500 focus:bg-white focus:ring-0 text-black"/>
                <button type="submit" className="bg-transparent hover:bg-orange-500 text-orange-500 font-semibold hover:text-white
                mt-5 py-2 px-4 border border-orange-500 hover:border-transparent rounded">Submit</button>
                </form>


                <div>
                <div className="w-60 mt-20 mx-auto bg-[#20354b] rounded-2xl px-8 py-6 shadow-lg">
                <div className="mt-6 w-fit mx-auto">
                    <img src={myImage} class="rounded-full w-28 " alt="Luyanda lukhele"/>
                </div>

                <div className="mt-8 ">
                    <a href='https://www.linkedin.com/in/luyalukhele/' className="text-white font-bold text-2xl tracking-wide">Luyanda <br/> Lukhele</a>
                </div>
                <p className="text-orange-500 font-semibold mt-2.5" >
                    LinkedIn
                </p>
                </div>
                </div>
                            

            </div>
            </div>
        </div>
    )
}
export default Contact