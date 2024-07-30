interface AboutUsCardProps {
    title: string;
    content: string;
    variant: number;
}

const AboutUsCard = ({ title, content, variant }: AboutUsCardProps) => {
    return (
        <div  className={`rounded-3xl card-gradient max-w-md w-full p-8 sm:p-12 transform transition duration-300 hover:scale-[103%] ${variant == 0 ? "card-gradient" : variant == 1 ? "card-gradient2" : variant == 2 ? "card-gradient3" : variant == 3 ? "card-gradient4" : "card-gradient5"}`}>
            <h3 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">{title}</h3>
            <p className="text-md sm:text-lg text-zinc-200 leading-relaxed">{content}</p>
        </div>
    );
}

export default AboutUsCard;