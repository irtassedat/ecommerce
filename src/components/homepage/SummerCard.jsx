import React from 'react';
import { NavLink } from 'react-router-dom';

export default function SummerCard() {
  return (
      <section className="w-screen">
          <div className="my-0 mx-auto max-w-[1050px] flex justify-between items-center gap-20">
              <div>
                  <img src="img/main-section-3-item.png" />
              </div>
              <div className="flex flex-col gap-7 w-[396px]">
                  <h5 className="font-bold leading-6 text-[#BDBDBD]">SUMMER 2020</h5>
                  <h2 className="font-bold text-[40px] leading-[50px]">Part of the Neural Universe</h2>
                  <p className="text-xl leading-[30px]">We know how large objects will act, but things on a small scale.</p>
                  <div className="font-bold text-sm leading-[22px] flex gap-2.5">
                      <NavLink to="/shop">
                        <button className="bg-[#2DC071] text-white px-10 py-4 rounded-md border-2 border-[#2DC071] border-solid">BUY NOW</button>
                      </NavLink>
                      <NavLink to="/shop">
                        <button className="bg-white text-[#2DC071] px-10 py-4 rounded-md border-2 border-[#2DC071] border-solid">READ MORE</button>
                      </NavLink>
                  </div>
              </div>
          </div>
      </section>
  )
}