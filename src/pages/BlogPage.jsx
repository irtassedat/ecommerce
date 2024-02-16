/*import {
    faAngleRight,
    faBell,
    faChartLine,
  } from "@fortawesome/free-solid-svg-icons";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  import { BlogData } from "../mock/blogData";
  
  export default function Blog() {
    return (
      <div className=" w-full py-20  flex justify-center items-center">
        <div className="flex flex-col gap-32">
          <div className="text-center  flex flex-col gap-4">
            <p className="text-primaryColor font-semibold text-lg  ">
              Practice Advise
            </p>
            <h2 className="text-textColor  text-4xl font-extrabold">
              FEATURED POSTS
            </h2>
            <p className="text-secondText text-lg">
              Problems trying to resolve the conflict between <br />
              the two major realms of Classical physics: Newtonian mechanics
            </p>
          </div>
          <div className="flex flex-wrap gap-14 justify-center sm:flex-col sm:items-center">
            {BlogData.map((data, index) => {
              return (
                <div
                  key={index}
                  className="w-[40rem] shadow-md border flex flex-col text-center gap-4 pb-8 sm:w-[20rem]"
                >
                  <div className="w-full relative ">
                    <p className="absolute text-lightText bg-dangerRed z-10 px-3 py-1 rounded-md top-[5%] left-[5%]">
                      NEW
                    </p>
                    <img className="w-full" src={data} />
                  </div>
                  <div className="w-full pt-3 flex justify-center">
                    <div className="w-[90%]  flex flex-col gap-6">
                      <div className="flex gap-4">
                        <p className="text-blue-300">Google</p>
                        <p className="text-secondText">Trending</p>
                        <p className="text-secondText">New</p>
                      </div>
                      <p className="text-textColor text-start text-xl  font-bold">
                        Loudest à la Madison #1 <br /> (L'integral)
                      </p>
                      <p className="text-start text-secondText">
                        We focus on ergonomics and meeting you where you work.
                        It's only a keystroke away.
                      </p>
                      <div className="w-full flex justify-between">
                        <div className="flex gap-2  items-center">
                          <FontAwesomeIcon
                            className="h-5 w-5 text-primaryColor"
                            icon={faBell}
                          />
  
                          <p className="text-sm text-secondText">22 April 2023</p>
                        </div>
                        <div className="flex gap-2 items-center">
                          <FontAwesomeIcon
                            className="h-5 w-5 text-secondaryColorGreen"
                            icon={faChartLine}
                          />
  
                          <p className="text-sm text-secondText">10 comments</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <p className="text-base text-secondText">Learn More</p>
                        <FontAwesomeIcon
                          className="h-7 w-7 text-primaryColor"
                          icon={faAngleRight}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }*/