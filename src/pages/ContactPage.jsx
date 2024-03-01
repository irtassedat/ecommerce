import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ContactCard from '../components/contactpage/ContactCard'
import { contactCardData } from '../mock/contactCardData'
import { faInstagram, faTwitter, faLinkedin, faFacebook } from '@fortawesome/free-brands-svg-icons';

export default function ContactPage() {

    return (
        <>
            <section className="w-screen">
                <div className="max-w-[1050px] mx-auto flex justify-between items-center">
                    <div className="flex flex-col gap-[35px] max-w-[400px]">
                        <h4 className="font-bold leading-6 text-[#252B42]">CONTACT US</h4>
                        <h1 className="font-bold text-[58px] leading-[80px] text-[#252B42]">Get in touch
                            today!</h1>
                        <p className="text-[#737373] text-xl leading-[30px] max-w-[376px]">We know how large objects will act, but things on a small scale</p>
                        <div className="text-[#252B42] font-bold text-2xl leading-8 flex flex-col gap-[20px]">
                            <p>Phone: +451 215 215 </p>
                            <p>Fax: +451 215 215</p>
                        </div>
                        <div className='flex gap-[34px] text-[30px] text-[#252B42]'>
                            <FontAwesomeIcon icon={faTwitter} />
                            <FontAwesomeIcon icon={faFacebook} />
                            <FontAwesomeIcon icon={faInstagram} />
                            <FontAwesomeIcon icon={faLinkedin} />
                        </div>
                    </div>
                    <div>
                        <img src="./img/contact-hero.svg" className="min-w-[632px] min-h-[612px] mr-[-128px]" />
                    </div>
                </div>
            </section>


            <section className='w-screen'>
                <div className='max-w-[1050px] mx-auto flex flex-col items-center py-[112px] gap-20'>
                    <div className='text-[#252B42] text-center flex flex-col gap-2.5 '>
                        <h3 className='text-sm leading-5'>VISIT OUR OFFICE</h3>
                        <h2 className='font-bold text-[40px] leading-[50px] max-w-[555px]'>We help small businesses
                            with big ideas</h2>
                    </div>
                    <div className='flex'>
                        {contactCardData.map((item, index) => {
                            return <ContactCard key={index} data={item} />
                        })}
                    </div>
                </div>
            </section>

            <section className='w-screen'>
                <div className='max-w-[1050px] mx-auto flex flex-col items-center font-bold text-[#252B42] py-20 relative gap-4'>
                    <img className='absolute left-[45%] top-[-15px]' src="./img/contact-arrow.svg" />
                    <h3 className='leading-6'>WE Can&apos;t WAIT TO MEET YOU</h3>
                    <h2 className='text-[58px] leading-[80px]'>Let’s Talk</h2>
                    <div>
                        <button className='text-[#FFFFFF] text-sm leading-[22px] bg-[#23A6F0] rounded px-10 py-4'>Try it free now</button>
                    </div>
                </div>

            </section>
        </>
    )
}