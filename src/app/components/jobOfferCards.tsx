import { FaUser } from "react-icons/fa";
import { useEffect } from "react";

interface JobOfferCardsProps {
  jobType: string;
}

const jobOfferCards = ({jobType }: JobOfferCardsProps) => {
    useEffect(()=>{
        console.log(jobType);
    },[jobType])
    return (
        <div className="w-full rounded-lg mt-5 p-8 overflow-auto min-h-[100vh] text-black">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {[
                    { organizacija: "Jedna mladost", lokacija: "Velebitska 23, Split", tip: "Djeca, Edukacija", datum: "14.6.2025.", naslov: "InterSTEM" },
                    { organizacija: "Split Tech City", lokacija: "Poljička 19, Split", tip: "Druženje", datum: "03.7.2025.", naslov: "Locals & nomads" },
                    { organizacija: "Dump", lokacija: "Ulica kralja Zvonimira 45", tip: "Edukacija", datum: "28.03.2025.", naslov: "Php" },
                    { organizacija: "Digitalna Dalmacija", lokacija: "Put Firula 12", tip: "Neznan više", datum: "07.08.2025.", naslov: "Razvoj umjetne inteligencije" },
                    { organizacija: "Open Coffe", lokacija: "Velebitska ulica 88", tip: "Neznan više", datum: "14.09.2025.", naslov: "Živi lokalno radi globalno jaba diba di" },
                    { organizacija: "Open Coffe", lokacija: "Poljička cesta 23", tip: "Neznan više", datum: "31.12.2025.", naslov: "InterSTEM" },
                    { organizacija: "Open Coffe", lokacija: "Domovinskog rata 102", tip: "Neznan više", datum: "7.01.2026.", naslov: "InterSTEM" },
                    { organizacija: "Open Coffe", lokacija: "Matice hrvatske 17", tip: "Neznan više", datum: "19.2.2026.", naslov: "InterSTEM" },
                    { organizacija: "Open Coffe", lokacija: "Put Trstenika 39", tip: "Neznan više", datum: "23.12.2026.", naslov: "InterSTEM" },
                ].map((data, i) => (
                    <div
                        key={i}
                        data-type={``}
                        className="bg-white border rounded-lg shadow p-4 gap-y-1 gap-x-4 items-start events min-h-[300px] flex flex-col transform hover:scale-105 transition duration-300"
                    >
                        <div className="w-full flex justify-between">
                            <span className="font-medium text-gray-500">#{i + 1}</span>
                            <span className="text-right">3<FaUser className="inline"/></span>
                        </div>
                        
                        <span><strong>{data.organizacija}</strong></span>
                        <span>{data.naslov}</span>
                        <span>{data.lokacija}</span>
                        <span>{data.tip}</span>
                        <span>{data.datum}</span>
                        <div className="md:col-span-6 flex justify-start items-center align-middle md:justify-end">
                            <button className="text-green-600 font-semibold text-lg bg-transparent hover:bg-transparent hover:underline odjavi">
                                Prijavi se
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default jobOfferCards;

//gap-8