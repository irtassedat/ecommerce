import { memberDataBig } from "../mock/memberData";
import TeamMemberCard from "../components/TeamPage/TeamMemberCard";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram, faFacebook, faTwitter, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';


export default function Team() {

    return (
        <>
            <section className="w-screen flex flex-col items-center py-[50px] gap-4">
                <p className="font-bold leading-6 text-[#737373]">WHAT WE DO</p>
                <h2 className="font-bold leading-[80px] text-[58px] text-[#252B42]">Innovation tailored for you</h2>
                <div className="flex items-center gap-4">
                    <p className="text-sm text-[#252B42]">Home</p>
                    <p className="text-[#737373] font-thin text-4xl">{">"}</p>
                    <p className="text-sm text-[#737373]">Team</p>
                </div>
            </section>

            <section className="w-screen">
                <div className="mx-auto flex justify-between max-w-[1440px]">
                    <img src="./img/team-3.svg" className="w-[700px] h-[530px]" />
                    <div className="flex flex-wrap justify-end gap-2.5">
                        <img src="./img/team-1.svg" className="w-[361px] h-[260px]" />
                        <img src="./img/team-2.svg" className="w-[361px] h-[260px]" />
                        <img src="./img/team-4.svg" className="w-[361px] h-[260px]" />
                        <img src="./img/team-5.svg" className="w-[361px] h-[260px]" />
                    </div>
                </div>
            </section>

            <section className="w-screen">
                <div className="max-w-[1050px] mx-auto flex flex-col pb-[112px]">
                    <div className="py-[112px] text-center">
                        <h2 className="font-bold text-[40px] leading-[50px]">Meet Our Team</h2>
                    </div>
                    <div className="flex flex-wrap gap-x-[30px] gap-y-[112px]">
                        {memberDataBig.map((item, index) => {
                            return <TeamMemberCard key={index} data={item} />
                        })}
                    </div>
                </div>
            </section>

            <section className="w-screen py-[80px]">
                <div className="max-w-[1050px] mx-auto flex flex-col gap-[30px] items-center">
                    <h4 className="text-[#252B42] text-[40px] leading-[50px]">Start your 14 days free trial</h4>
                    <p className="text-[#737373] text-sm leading-5 text-center w-[406px]">Met minim Mollie non desert Alamo est sit cliquey dolor
                        do met sent. RELIT official consequent.</p>
                    <div>
                        <button className="px-10 py-4 bg-[#23A6F0] rounded text-white">Try it free now</button>

                    </div>
                    <div className="p-2.5 flex gap-[34px]">
                        <FontAwesomeIcon className="text-[30px] text-black" icon={faTwitter} />
                        <FontAwesomeIcon className="text-[30px] text-black" icon={faFacebook} />
                        <FontAwesomeIcon className="text-[30px] text-black" icon={faInstagram} />
                        <FontAwesomeIcon className="text-[30px] text-black" icon={faLinkedinIn} />
                    </div>
                </div>
            </section>
        </>
    )
}