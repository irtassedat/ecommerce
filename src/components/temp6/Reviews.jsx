import { imageBasePath } from "../../../public/imgBasePath";

export default function Reviews() {

    return (
        <>
            <div className="flex gap-10">

                <div className="max-w-[316px] max-h-[372px] flex-[2] rounded shadow-[15px_15px_rgba(196,196,196,0.2)]">
                    <img src={imageBasePath + "description-1.svg"} className="w-full h-full" />
                </div>
                <div className="flex-1 flex flex-col gap-[30px]">
                    <h4 className="text-main font-bold leading-8 text-2xl">burası Reviews</h4>
                    <div className="flex flex-col gap-5">
                        <p className="text-sm text-gray leading-5">Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door ENIM RELIT Mollie. Excitation venial consequent sent nostrum met.</p>
                        <p className="text-sm text-gray leading-5">Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door ENIM RELIT Mollie. Excitation venial consequent sent nostrum met.</p>
                        <p className="text-sm text-gray leading-5">Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door ENIM RELIT Mollie. Excitation venial consequent sent nostrum met.</p>
                    </div>
                </div>
                <div className="flex-1 flex flex-col gap-6">
                    <div className="flex flex-col gap-[30px]">
                        <h4 className="text-main font-bold leading-8 text-2xl">the quick fox jumps over</h4>
                        <ul className="flex flex-col gap-2.5">
                            <li className="text-sm text-gray leading-6 font-bold"><span>{">"}</span>the quick fox jumps over the lazy dog</li>
                            <li className="text-sm text-gray leading-6 font-bold"><span>{">"}</span>the quick fox jumps over the lazy dog</li>
                            <li className="text-sm text-gray leading-6 font-bold"><span>{">"}</span>the quick fox jumps over the lazy dog</li>
                            <li className="text-sm text-gray leading-6 font-bold"><span>{">"}</span>the quick fox jumps over the lazy dog</li>
                        </ul>
                    </div>
                    <div className="flex flex-col gap-[30px]">
                        <h4 className="text-main font-bold leading-8 text-2xl">the quick fox jumps over</h4>
                        <ul className="flex flex-col gap-2.5">
                            <li className="text-sm text-gray leading-6 font-bold"><span>{">"}</span>the quick fox jumps over the lazy dog</li>
                            <li className="text-sm text-gray leading-6 font-bold"><span>{">"}</span>the quick fox jumps over the lazy dog</li>
                            <li className="text-sm text-gray leading-6 font-bold"><span>{">"}</span>the quick fox jumps over the lazy dog</li>
                        </ul>
                    </div>
                </div>
            </div>

        </>
    )
}