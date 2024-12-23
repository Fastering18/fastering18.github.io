import React from 'react';
import Image from "next/image";
import { HiArrowNarrowRight } from 'react-icons/hi';
import me from '../public/me2.png';
import { Link } from "react-scroll"; 

const Home = () => {
  return (
    <div
      data-name="home"
      id="home"
    className="h-screen w-full bg-[#0a192f]"
  >
    <div className="max-w-screen-lg mx-auto flex flex-col items-center justify-center h-full px-4 md:flex-row">
      <div className="flex flex-col justify-center h-full">
        <h2 className="text-4xl sm:text-7xl font-bold text-white">
          I&apos;m a HS student & Back-End Developer
        </h2>
        <p className="text-gray-500 py-4 max-w-md">
           I have 3 years of experience in Roblox game and web development.
          Currently, I love to work on web application using technologies like
          Next.js, Express, Flask, Postgres and Mongodb.
        </p>
        <div>
          <Link
            to="about"
            smooth
            duration={500}
            className="group text-white w-fit px-6 py-3 my-2 flex items-center rounded-md bg-gradient-to-r from-cyan-500 to-blue-500 cursor-pointer"
          >
            About Me
            <span className="group-hover:rotate-90 duration-300">
              <HiArrowNarrowRight size={25} className="ml-3" />
            </span>
          </Link>
        </div>
      </div>
      <div>
        <Image 
          src={me}  
          alt="my profile"
          className="mx-auto w-2/3 md:w-full p-1 "
        />
      </div>
    </div>
  </div>
  );
};
export default Home;