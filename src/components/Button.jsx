import { useSnapshot } from "valtio";
import state from "../store";




const Button = () => {
    const snap = useSnapshot(state);
    
    return (
        <div className={`flex fixed bottom-9 w-full justify-center ease-in-out duration-300 gap-x-5 ${state.currentPage == 'home' ? '':"opacity-0"}`}>
            <button 
                className="px-6 py-3 cursor-pointer flex justify-center items-center rounded-[30px] text-white bg-orange-400 hover:bg-orange-600 ease-in-out duration-300"
                onClick={() => state.currentPage = "store"}
            >
                <p className="text-sm font-bold">ENTER</p>
            </button>

            <a href="https://traveler-vr.vercel.app" target="_blank" rel="noopener noreferrer">
                <button className="px-6 py-3 cursor-pointer flex justify-center gap-1 items-center rounded-[30px] text-white bg-orange-400 hover:bg-orange-600 ease-in-out duration-300">
                    <p className="text-sm font-bold">VISIT OUR WEB PAGE</p> 
                    <span>
                        <img width={15} height={15} src="/icons/link.svg" alt="link" />
                    </span>
                </button>
            </a>
        </div>
    );
}


export default Button;
