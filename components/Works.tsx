import React from 'react';
import code from '../public/replit.svg';
import Linkk from 'next/link'

const Works = () => {
  return (
    <div data-name='work' id='work' className='w-full md:h-screen text-gray-300 bg-[#0a192f]'>
      <div className='max-w-[1000px] mx-auto p-4 flex flex-col justify-center w-full h-full'>
        <div className='pb-8 w-full flex justify-center items-center flex-col'>
          <p className='text-4xl font-bold inline border-b-4 text-gray-300 border-cyan-500'>
            Work
          </p>
          <p className='py-6 text-2xl'>Check out some of my most recent work</p>
        </div>
{/* Container */}
        <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-4'>
            {/* Grid Item */}
          <div
            
            className='shadow-lg shadow-[#040c16] group container rounded-md flex justify-center items-center mx-auto content-div'
          >
            {/* Hover Effects */}
            <div className='opacity-80 group-hover:opacity-100 flex justify-center items-center flex-col'>
              <span className=' text-lg font-bold text-white tracking-wider'>
                GBLK Programming Language
              </span>
              <p className='text-center'>Localized programming language written in Node.js</p>
              <div className='pt-8 text-center'>
                
                  <a className='text-center rounded-lg px-4 py-3 m-2 bg-white text-gray-700 font-bold text-lg' href="https://gblk-lang.glitch.me/">
                    Demo
                  </a>
                
                  <a className='text-center rounded-lg px-4 py-3 m-2 bg-white text-gray-700 font-bold text-lg' href="https://github.com/Fastering18/node-gblok">
                    Code
                  </a>
                
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};
export default Works;