"use client";
import {useRouter} from "next/navigation";


const noPage = () => {
    const router = useRouter();
    return(
        <div className="flex h-175 w-full items-center justify-center">
            <a className="text-center" onClick={() => router.push("/")}><h1>Nema stranice vrati se na početnu.</h1></a>
        </div>
    )
}
export default noPage;