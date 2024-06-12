import React from 'react';
import { Link } from 'react-router-dom';

export default function EditorsPick() {
  return (
      <section className="w-screen bg-[#FAFAFA]">
          <div className="my-0 mx-auto max-w-[1050px] flex flex-col items-center">
              <h3 className="text-2xl leading-8 font-bold pt-20">EDITOR&apos;S PICK</h3>
              <p className="pt-2.5 pb-12">Problems trying to resolve the conflict between</p>
              <div className="flex flex-wrap gap-7 pb-20">
                  <Link to="/shop?category=2" className="w-[510px] h-[500px] flex items-end bg-[url('/img/main-section-1-man.png')] bg-cover">
                      <p className="m-7 py-3 px-[65px] text-black bg-white">MEN</p>
                  </Link>
                  <Link to="/shop?category=4" className="w-[240px] h-[500px] flex items-end bg-[url('/img/main-section-1-women.png')] bg-cover">
                      <p className="m-7 py-3 px-3 text-black bg-white">WOMEN</p>
                  </Link>
                  <div className="w-[240px] flex flex-col justify-between">
                      <Link to="/shop?category=3" className="w-full h-[240px] flex items-end bg-[url('/img/main-section-1-accessories.png')] bg-cover">
                          <p className="m-7 py-3 px-3 text-black bg-white">ACCESSORIES</p>
                      </Link>
                      <Link to="/shop?filter=atatürk" className="w-full h-[240px] flex items-end bg-[url('/img/main-section-1-kids.png')] bg-cover">
                          <p className="m-7 py-3 px-3 text-black bg-white">KIDS</p>
                      </Link>
                  </div>
              </div>
          </div>
      </section>
  )
}
