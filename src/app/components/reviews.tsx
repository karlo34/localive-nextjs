"use client";
import { useState, useEffect } from "react";

// import '@/app/css/reviews.css';

type Review = {
    review_id: number;
    user_id: number;
    name: string;
    email: string;
    content: string;
    created_at: string;
};

const Reviews = () => {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await fetch('/api/getReviews');
                const data = await response.json();
                if (response.ok) {
                    setReviews(data.reviews);
                    console.log(data.reviews);
                }
            } catch (error) {
                console.error('Error submitting form:', error);
                setMessage('Nešto je pošlo po zlu.');
            } finally {
                setLoading(false);
            }
        }

        fetchReviews();

    }, [])

    return (
        <div className="mb-20">
            {loading ? (
                <h1 className="text-center">Učitavanje recenzija...</h1>
            ) : reviews.length === 0 ? (
                <h1 className="text-center">Nema recenzija</h1>
            ) : (
                <div className="flex flex-col justify-center items-center align-middle">
                    <h1 className="text-center pb-10 text-4xl font-bold">Recenzije</h1>
                    <ul className="flex flex-row flex-wrap justify-around w-full max-w-300">
                        {reviews.map((review) => (
                            <div key={review.review_id} className="flex flex-col w-1/4 min-w-40 bg-[#3a3652] rounded-2xl mx-2 mb-10">
                                <div className="flex flex-row pt-3">
                                    <div className="w-9 h-9 rounded-full bg-[#2a263d] flex items-center justify-center text-white text-xl font-bold">
                                        {review.name[0].toUpperCase()}
                                    </div>
                                    <p className="pt-1 pl-5 text-xl font-bold">{review.name}</p>
                                </div>
                                <div className="flex items-center justify-center align-middle">
                                    <p className="text-center mt-2 pb-5">{review.content}</p>
                                </div>
                            </div>

                        ))}
                        {
                            
                        }
                    </ul>
                </div>
            )}
        </div>
    )
}
export default Reviews;