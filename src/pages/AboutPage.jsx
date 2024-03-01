import Clients from "../components/aboutpage/Clients";
import TeamMemberCard from "../components/teampage/TeamMemberCard";
import { memberDataSmall } from "../mock/memberData";
import AboutHeader from "../components/aboutpage/AboutHeader";



export default function AboutUs() {

    return (
        <>
            <AboutHeader />
            <section className="w-screen">
                <div className="max-w-[1050px] flex justify-between items-center mx-auto my-0 gap-[60px] py-6">
                    <div className="flex flex-col gap-6 max-w-[400px] py-6">
                        <h4 className="text-[#E74040] text-sm leading-5">Problems trying</h4>
                        <p className="text-main font-bold text-2xl leading-8">Met minim Mollie non desert <br /> Alamo est sit cliquey dolor do met sent.</p>
                    </div>
                    <div>
                        <p className="text-gray text-sm leading-5">Problems trying to resolve the conflict between the two major realms of Classical physics: Newtonian mechanics </p>
                    </div>
                </div>
            </section>

            <section className="w-screen">
                <div className="max-w-[1050px] flex justify-around mx-auto my-0 gap-[30px] py-[80px]">
                    <div className="font-bold flex flex-col items-center">
                        <p className="text-main text-6xl leading-20">15K</p>
                        <p className="text-gray leading-6">Happy Customers</p>
                    </div>
                    <div className="font-bold flex flex-col items-center">
                        <p className="text-main text-6xl leading-20">150K</p>
                        <p className="text-gray leading-6">Monthly Visitors</p>
                    </div>
                    <div className="font-bold flex flex-col items-center">
                        <p className="text-main text-6xl leading-20">15</p>
                        <p className="text-gray leading-6">Countries Worldwide</p>
                    </div>
                    <div className="font-bold flex flex-col items-center">
                        <p className="text-main text-6xl leading-20">100+</p>
                        <p className="text-gray leading-6">Top Partners</p>
                    </div>
                </div>
            </section>

            <section className="w-screen">
                <div className="mx-auto my-0 flex flex-col items-center py-[112px] gap-[112px]">
                    <div className="flex flex-col gap-2.5">
                        <h3 className="flex text-center text-[40px] text-main font-bold leading-[50px]">Meet Our Team</h3>
                        <p className="text-center text-sm text-gray leading-[20px]">
                            Problems trying to resolve the conflict between <br />
                            the two major realms of Classical physics: Newtonian mechanics
                        </p>
                    </div>
                    <div className="flex gap-[30px]">
                        {memberDataSmall.map((item, index) => {
                            return <TeamMemberCard key={index} data={item} />
                        })}
                    </div>
                </div>
            </section>
            <section className="w-screen bg-[#2A7CC7] h-[637px] flex justify-between items-center pl-[195px]">
                <div className="max-w-[1050px] mx-auto text-white flex flex-col gap-6 ">
                    <p className="font-bold leading-6">WORK WITH US</p>
                    <h3 className="font-bold leading-[50px] text-[40px]">Now Let’s grow Yours</h3>
                    <p className="text-sm leading-5 max-w-[450px]">The gradual accumulation of information about atomic and small-scale behavior during the first quarter of the 20th </p>
                    <div>
                        <button className="px-[38px] py-[14px] border border-white rounded">Button</button>
                    </div>
                </div>
                <div className="h-full">
                    <img src="./img/about-1.svg" className="h-full" />
                </div>
            </section>

            <section className="w-screen bg-light-gray-1 pb-20">
                <div className="max-w-[1050px] flex flex-col pt-20 mx-auto my-0">
                    <div className="flex flex-col gap-[30px] pb-6 text-center">
                        <h2 className="text-main font-bold text-[40px] leading-[50px]">Big Companies Are Here</h2>
                        <p className="text-gray text-sm leading-5">Problems trying to resolve the conflict between<br />
                            the two major realms of Classical physics: Newtonian mechanics </p>
                    </div>

                </div>
                <Clients />
            </section>


        </>

    )
}
