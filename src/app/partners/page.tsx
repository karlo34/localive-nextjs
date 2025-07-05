import path from "path";
import fs from "fs";
import Image from "next/image";

import Navbar from "../components/navbar";

export default async function PartnersPage() {
    const dir = path.join(process.cwd(), "public", "partners");

    const files = fs
        .readdirSync(dir)
        .filter((f) => /\.(png|jpe?g|gif|svg|webp)$/i.test(f));

    const imagePaths = files.map((f) => `/partners/${f}`);

    return (
        <main className="bg-gray-900 min-h-[100vh]">
            <Navbar />
            <h1 className="text-3xl font-semibold mt-10 mb-15 text-center">Our Partners</h1>

            <div className="p-8 grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] gap-20 ">
                {imagePaths.map((src) => (
                    <Image
                        key={src}
                        src={src}
                        alt={src.split("/").pop() ?? "Partner logo"}
                        width={125}
                        height={125}
                        className="grayscale hover:grayscale-0 transition duration-300
             ring-2 ring-brand-500 ring-offset-2 ring-offset-white transform hover:scale-120
             rounded-lg"
                    />
                ))}
            </div>
        </main>
    );
}