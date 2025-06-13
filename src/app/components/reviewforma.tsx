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
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores iste, voluptatum sequi pariatur, vel laudantium laboriosam aperiam facilis numquam voluptatem at illum rerum, recusandae aut. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Delectus repellendus vel voluptatum fugiat perspiciatis perferendis inventore aliquid, ut eius ducimus modi labore accusantium voluptate. Sequi.
                    </p>
                </form>
            </div>
        </div>
    );
};

export default ReviewForm;