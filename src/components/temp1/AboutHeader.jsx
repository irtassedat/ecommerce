export default function AboutHeader() {

    return (
        <div className="w-screen">
            <div className="max-w-[1050px] my-0 mx-auto flex justify-between items-center">
                <div className="flex flex-col gap-9 max-w-[370px]">
                    <h4 className="font-bold leading-6 text-[#252B42]">ABOUT COMPANY</h4>
                    <h1 className="font-bold text-[58px] leading-[80px] text-[#252B42]">ABOUT US</h1>
                    <p className="text-[#737373] text-xl leading-[30px]">We know how large objects will act, but things on a small scale</p>
                    <div>
                        <button className="bg-[#23A6F0] text-[#FFFFFF] text-sm leading-5 rounded px-10 py-[14px] ">Get Quote Now</button>
                    </div>
                </div>
                <div>
                    <img src="./img/about-us-hero.svg" className="min-w-[632px] min-h-[612px] mr-[-128px]" />
                </div>
            </div>
        </div>
    )
}