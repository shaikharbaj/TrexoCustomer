import { useRouter } from "next/navigation";

interface IPageHeader {
    title: string;
}

const PageHead: React.FC<IPageHeader> = ({ title }) => {
    const router = useRouter();

    return (
        <section className="pt-24 px-20 pb-6 shadow-lg">
            <div>
                <a
                    onClick={() => router.back()} 
                    className="flex justify-start items-center text-xl gap-4 font-bold cursor-pointer"
                >
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        strokeWidth="1.5" 
                        stroke="currentColor" 
                        className="w-6 h-6"
                    >
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            d="M15.75 19.5L8.25 12l7.5-7.5" 
                        />
                    </svg>
                    <h1>{title}</h1>
                </a>
            </div>
        </section>
    );
};

export default PageHead;
