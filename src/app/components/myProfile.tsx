import { FaUser, FaEnvelope, FaPhone, FaHome, FaPencilAlt, FaStopwatch, FaBuilding, FaPager, FaVenus, FaIdCard, FaHospital, FaRulerVertical, FaWeight, FaCheckCircle, FaClock, FaBan, FaSearch, FaPlus, FaCar, FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import { FaCakeCandles } from 'react-icons/fa6';
import { useEffect, useState } from "react";
import Leaderboard from "./leaderboard";
import JobApplications from "./jobApplications";

interface Review {
    id: number;
    content: string;
    created_at: string;
}

interface Stats {
    eventViews: number;
    jobViews: number;
}

interface UserData {
    id: number;
    name: string;
    email: string;
    role: string;
    status: string;
    created_at: string;

    city: string | null;
    country: string | null;
    gender: string | null;
    birthday: string | null;  // or Date if you parse it
    points: number | null;
}

interface UserWrapper {
    user: UserData;
    attendedEvents: any[];         // Replace with specific type if available
    jobApplications: any[];
    volunteerApplications: any[];
    reviews: Review[];
    gamification: any | null;      // Define interface if you know the structure
    stats: Stats;
}
const myProfile = () => {
    const [isAddressEditable, setAddressEditable] = useState(false);
    const [isEmailEditable, setEmailEditable] = useState(false);
    const [isGenderEditable, setGenderEditable] = useState(false);
    const [isBirthdayEditable, setBirthdayEditable] = useState(false);

    const [userWrapper, setUserWrapper] = useState<UserWrapper | null>(null);
    const [error, setError] = useState<string | null>(null);

    const [applied, setApplied] = useState<string>("events");

    const handleDoubleClick = (e: React.MouseEvent<HTMLInputElement>, field: string) => {
        console.log("Double-clicked on", field); // Check if it's working
        if (field === 'address') {
            setAddressEditable(prevState => !prevState);  // Toggle the disabled state
        } else if (field === 'email') {
            setEmailEditable(prevState => !prevState);  // Toggle the disabled state
        } else if (field === 'gender') {
            setGenderEditable(prevState => !prevState);  // Toggle the disabled state
        } else if (field === 'birthday') {
            setBirthdayEditable(prevState => !prevState);  // Toggle the disabled state
        }
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('/api/profile');
                const data = await res.json();     // parse only after status check
                console.log(data);
                setUserWrapper(data);                     // put result in state
            } catch (err) {
                console.error(err);
                console.log('Greška pri dohvaćanju podataka');
            }
        };
        fetchData();
    }, []);
    useEffect(() => {
        if (userWrapper) {
            console.log(userWrapper.user.email);
        }
    }, [userWrapper]);
    // if(!user) return null;
    return (
        <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row items-center lg:items-start rounded-2xl overflow-hidden shadow-lg rounded-t-none px-4">
            {
                userWrapper ? (
                    <>
                        {/* Main Content */}
                        <main className="w-full bg-gradient-to-r rounded-b-none from-purple-600 to-purple-500 text-black p-6 pt-0" >
                            <div className="flex flex-wrap gap-4 mt-5 justify-center">
                                {/* Profile Card */}
                                <div className=" w-80 bg-[#2a263d] text-white p-6 rounded-lg">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-16 h-16 rounded-full overflow-hidden">
                                            {/* <img src="/placeholder.jpg" alt="Jenny Wilson" className="w-full h-full object-cover" /> */}
                                        </div>
                                        <div>
                                            <div className="flex flex-row items min-w-50 -ml-5 items-center">
                                                <FaUser className="text-fuchsia-700 text-3xl" />
                                                <h3 className="font-bold pl-1 text-2xl">{userWrapper.user.name.charAt(0).toUpperCase() + userWrapper.user.name.slice(1)}</h3>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col mt-4 space-y-2 text-sm">
                                        <div className="flex">
                                            <FaMapMarkerAlt className="inline mr-2" />
                                            <input
                                                type="text"
                                                onDoubleClick={(e) => handleDoubleClick(e, 'address')}
                                                disabled={!isAddressEditable} // Disabled state based on the state
                                                value="Split, Hrvatska"
                                                onFocus={(e) => e.target.select()} // Ensure that focus selects text when editable
                                            />
                                        </div>
                                        <div className="flex">
                                            <FaEnvelope className="inline mr-2" />
                                            <input
                                                type="email"
                                                onDoubleClick={(e) => handleDoubleClick(e, 'email')}
                                                disabled={!isEmailEditable}
                                                value={userWrapper?.user.email ?? 'no email'}
                                            />
                                        </div>
                                        <div className="flex">
                                            <FaVenus className="inline mr-2" />
                                            <input
                                                type="text"
                                                onDoubleClick={(e) => handleDoubleClick(e, 'gender')}
                                                disabled={!isGenderEditable}
                                                value="Muško"
                                                className="inline"
                                            />
                                        </div>
                                        <div className="flex">
                                            <FaCakeCandles className="inline mr-2" />
                                            <input
                                                type="text"
                                                onDoubleClick={(e) => handleDoubleClick(e, 'birthday')}
                                                disabled={!isBirthdayEditable}
                                                value="20.02.2006."
                                                className="inline"
                                            />
                                        </div>
                                        <button className="self-start pt-3">
                                            Promijeni podatke
                                            <FaPencilAlt className="inline ml-2" />
                                        </button>
                                    </div>
                                </div>

                                {/* Stats container - take remaining space */}
                                <Leaderboard email={userWrapper.user.email} />

                            </div>
                            <div className="w-full bg-white rounded-lg mt-5 p-5 overflow-auto max-h-[250px]">
                                <h1>Upiši kod događaja:</h1>
                                <input className="border-black border rounded-md mt-4 h-10 w-[75vw] sm:w-[80vw] pl-3" type="text" name="" id="" />
                                <button className="mt-3 xl:mt-0 ml-0 xl:ml-3 py-2 px-5 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white font-semibold rounded-lg transition-all">Unesi</button>
                            </div>
                            <div className="w-full bg-white rounded-lg mt-5 p-5 overflow-auto max-h-[500px]">
                                <div className="flex w-full items-center justify-center gap-5">
                                    <button onClick={() => setApplied("events")}>A</button>
                                    <button onClick={() => setApplied("jobs")}>B</button>
                                </div>
                                {applied === "events" ? (
                                    <div>
                                        <h1 className="mb-5 text-xl font-semibold">Prijavljeni događaji</h1>
                                        <ul className="space-y-4">
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
                                                <li
                                                    key={i}
                                                    className="border rounded-lg shadow p-4 grid gap-y-1 gap-x-4 md:grid-cols-6 grid-cols-1 items-start events"
                                                >
                                                    <span className="font-medium text-gray-500">#{i + 1}</span>
                                                    <span><strong>{data.organizacija}</strong></span>
                                                    <span>{data.naslov}</span>
                                                    <span>{data.lokacija}</span>
                                                    <span>{data.tip}</span>
                                                    <span>{data.datum}</span>
                                                    <div className="md:col-span-6 flex justify-start items-center align-middle md:justify-end">
                                                        <button className="text-red-600 font-semibold bg-transparent hover:bg-transparent hover:underline odjavi">
                                                            Odjavi se
                                                        </button>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ) : (
                                    <div>
                                        <h1 className="mb-5 text-xl font-semibold">Prijavljene poslove</h1>
                                        <JobApplications jobApplications={userWrapper.jobApplications} />
                                    </div>
                                )}

                            </div>
                        </main >

                    </>
                ) : (

                    <div>
                        <h1>Loading</h1>
                    </div>
                )
            }
        </div>


    )
}


export default myProfile;