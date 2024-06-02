import PostCard from "./PostCard"

const cardData = [
    {
        img: "/img/main-section-4-item-1.svg",
        title: "Lodest a la Madison #1 (L'integral)",
        info: "We focus on ergonomics and meeting you where you work. It's only a keystroke away.",
        date: "22 April 2021",
        commentCount: 10
    },
    {
        img: "/img/main-section-4-item-2.svg",
        title: "Lodest a la Madison #2 (L'integral)",
        info: "We focus on ergonomics and meeting you where you work. It's only a keystroke away.",
        date: "23 April 2021",
        commentCount: 11
    },
    {
        img: "/img/main-section-4-item-3.svg",
        title: "Lodest a la Madison #3 (L'integral)",
        info: "We focus on ergonomics and meeting you where you work. It's only a keystroke away.",
        date: "24 April 2021",
        commentCount: 12
    },
]

export default function FeaturedPosts() {

    return (
        <section className="w-screen ">
            <div className="flex flex-col max-w-[1050px] my-0 mx-auto items-center">
                <div className="pt-[112px] flex flex-col items-center gap-2.5">
                    <h4 className="text-[#23A6F0] text-sm font-bold leading-6">Practice Advice</h4>
                    <h2 className="font-bold text-4xl leading-[50px]">Featured Posts</h2>
                    <p className="text-center text-[#737373] text-sm leading-5">
                        Problems trying to resolve the conflict between
                        <br />
                        the two major realms of Classical physics: Newtonian mechanics
                    </p>
                </div>
                <div className="pt-20 flex gap-2.5 flex-wrap pb-[110px]">
                    {cardData.map((item, index) => {
                        return <PostCard key={index} data={item} />
                    })}
                </div>
            </div>
        </section>
    )
}
