"use client";

import { useState } from "react";

const ReviewForm = () => {
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);

    const handleReview = async (e: React.FormEvent) => {
        e.preventDefault(); // Prevent form reload

        if (!text.trim()) return;

        setLoading(true);

        try {
            const response = await fetch('/api/review', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ review: text }),
            });

            const data = await response.json();
            console.log("Server response:", data);
            setText(""); // clear the input after sending
        } catch (error) {
            console.error("Error submitting review:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
    };

    return (
        <div className="flex flex-col items-center mb-20">
            <h1 className="text-center text-3xl font-bold">
                Sviđa ti se iskustvo ili imaš prigovor? <br />Ostavi recenziju.
            </h1>
            <div className="flex flex-row items-center text-white px-3 justify-center">
                <form
                    onSubmit={handleReview}
                    className="max-w-200 mt-20 p-10 bg-[#2a263d] rounded-3xl flex flex-row flex-wrap justify-center items-center gap-6"
                >
                    <div className="max-w-80 flex flex-col align-center">
                        <h1 className='text-center text-3xl font-semibold'>Ostavi recenziju</h1>

                        <textarea
                            name="review"
                            value={text}
                            onChange={handleTextChange}
                            className="px-4 py-3 rounded-lg bg-[#3a3652] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-60 w-70 my-8"
                            required
                            placeholder="Napiši svoju recenziju ovde..."
                        ></textarea>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white font-semibold rounded-lg transition-all"
                        >
                            {loading ? "Šalje se..." : "Pošalji recenziju"}
                        </button>
                    </div>

                    <p className="w-80 text-center">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit...
                    </p>
                </form>
            </div>
        </div>
    );
};

export default ReviewForm;
    // <div className="flex flex-col items-center">
            //     <h1 className="text-center text-3xl font-bold pb-5">Sviđa ti se iskustvo ili imaš prigovor? <br />Ostavi recenziju.</h1>
            //     <div className="flex flex-row items-center text-white">
            //         <form
            //             // onSubmit={handlePrijava}
            //             className="max-w-200 mt-20 p-10 pt-0 bg-[#2a263d] rounded-3xl flex flex-row flex-wrap gap-6 justify-center items-center">
            //             <div className="max-w-80 pt-10 flex flex-col items-center">
            //                 <h1 className='text-center text-3xl font-semibold pb-5'>Ostavi recenziju</h1>
            //                 <input
            //                     type="email"
            //                     name="Email"
            //                     // value={formPrijava.Email}
            //                     // onChange={handleChangePrijava}
            //                     placeholder="example@gmail.com"
            //                     className="w-full p-4 py-3 rounded-lg bg-[#3a3652] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            //                     required
            //                 />
            //                 <input
            //                     type="password"
            //                     name="Password"
            //                     // value={formPrijava.Password}
            //                     // onChange={handleChangePrijava}
            //                     placeholder="Enter your password"
            //                     className="w-full px-4 py-3 my-5 rounded-lg bg-[#3a3652] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            //                     required
            //                 />
            //                 <textarea
            //                     // value={formPrijava.Password}
            //                     // onChange={handleChangePrijava}
            //                     placeholder="Vaše mišljenje ..."
            //                     className="w-full px-4 py-3 rounded-lg bg-[#3a3652] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            //                     required name="" id=""></textarea>
            //                 <button
            //                     type="submit"
            //                     className="w-full mt-5 py-3 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white font-semibold rounded-lg transition-all"
            //                 >
            //                     Prijavi se
            //                 </button>
            //             </div>

            //             <p className="w-80 text-center mt-10">Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci consequatur nihil totam beatae amet doloribus assumenda neque vero aperiam necessitatibus, consectetur non, saepe dolorum aliquam provident dicta hic ullam inventore? Labore nihil perspiciatis illo incidunt aut nemo obcaecati cum dolores. Cum omnis repudiandae quod adipisci ratione quae eius minus neque laborum iure! Modi vero quibusdam culpa dolorem aliquam. Accusantium, facilis. At quo ipsum et temporibus eius rerum tenetur perspiciatis saepe delectus, quibusdam consequatur unde sapiente ratione ipsa aut eveniet magni, vitae, veritatis cum debitis. Cumque id consequuntur nam deleniti quam?.</p>
            //         </form>
            //     </div>
            // </div>