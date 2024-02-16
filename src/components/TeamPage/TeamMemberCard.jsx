import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram, faFacebook, faTwitter} from '@fortawesome/free-brands-svg-icons';


export default function TeamMemberCard({ data }) {

    return (
        <div className="w-[316px] flex flex-col items-center">
            <div className="w-full">
                <img src={data.img} />
            </div>
            <div className="flex flex-col gap-2.5 py-[30px] text-center">
                <p className="text-[#252B42] font-bold leading-6 ">{data.username}</p>
                <p className="text-sm text-[#252B42 leading-6]">{data.profession}</p>
                <div className="flex gap-5 text-[#23A6F0] text-[24px]">
                    <FontAwesomeIcon icon={faFacebook} />
                    <FontAwesomeIcon icon={faInstagram} />
                    <FontAwesomeIcon icon={faTwitter} />
                </div>
            </div>
        </div>
    )
}