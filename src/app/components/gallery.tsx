"use client";
import '../css/animations.css';
// import '../css/gallery.css';
import { useEffect, useState } from "react";

interface Pictures {
  url: string;
}

export default function Home() {
  const [pics, setPics] = useState<Pictures[] | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState<number | null>(null);
  const [animating, setAnimating] = useState(false);
  const [animationDir, setAnimationDir] = useState<'left' | 'right' | null>(null);
  const [imagesPerPage, setImagesPerPage] = useState(3); // default for desktop
  const [loading, setLoading] = useState(true);

  // Responsive breakpoints
  const updateImagesPerPage = () => {
    const width = window.innerWidth;
    if (width < 768) {
      setImagesPerPage(1);
    } else if (width < 1024) {
      setImagesPerPage(2);
    } else if (width < 1300) {
      setImagesPerPage(3);
    }
    else {
      setImagesPerPage(4);
    }
  };

  useEffect(() => {
    updateImagesPerPage();
    window.addEventListener("resize", updateImagesPerPage);
    return () => window.removeEventListener("resize", updateImagesPerPage);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/galery');
        const data = await response.json();
        setPics(data.pictures);
      } catch (error) {
        console.error("Failed to fetch gallery:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getPicsSlice = (index: number) => {
    // Ensure pics is not null and has a valid length
    if (!pics || pics.length === 0) return [];

    const end = index + imagesPerPage;
    if (end <= pics.length) {
      return pics.slice(index, end);
    } else {
      return [...pics.slice(index), ...pics.slice(0, end - pics.length)];
    }
  };

  const handleSlide = (dir: 'left' | 'right') => {
    if (pics !== null) {
      if (animating || pics.length <= imagesPerPage) return;
    }
    let newIndex = 0;
    if (pics !== null) {
      newIndex =
        dir === 'left'
          ? (currentIndex + imagesPerPage) % pics.length
          : (currentIndex - imagesPerPage + pics.length) % pics.length;

    }

    setAnimationDir(dir);
    setNextIndex(newIndex);
    setAnimating(true);

    setTimeout(() => {
      setCurrentIndex(newIndex);
      setNextIndex(null);
      setAnimating(false);
      setAnimationDir(null);
    }, 600);
  };

  const displayedPics = getPicsSlice(currentIndex) ?? [];
  const upcomingPics = nextIndex !== null ? getPicsSlice(nextIndex) ?? [] : null;

  return (
    <div>
      {loading ? (
        <p className="text-center text-gray-500 mt-10">Učitavanje slika...</p>
      ) : !pics || pics.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">Nema dostupnih slika.</p>
      ) : (
        <div className="flex flex-col justify-center items-center gap-4 mt-10">
          <div className="relative w-full h-60 overflow-hidden">
            {!upcomingPics && (
              <ul
                className={`flex gap-10 justify-center absolute inset-0 transition-all 
          ${animationDir === 'left' ? 'slide-out-left' : ''}
          ${animationDir === 'right' ? 'slide-out-right' : ''}`}
              >
                {displayedPics.map((pic, index) => (
                  <li key={index} className="flex items-center justify-center h-50">
                    <img
                      className="h-full object-contain transform hover:scale-110 transition duration-500"
                      src={pic.url}
                      alt="Slika"
                    />
                  </li>
                ))}
              </ul>
            )}

            {upcomingPics && (
              <ul className="flex gap-10 justify-center absolute inset-0 fade-in">
                {upcomingPics.map((pic, index) => (
                  <li key={index} className="flex items-center justify-center h-50">
                    <img className="h-full object-contain" src={pic.url} alt="Slika" />
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="flex justify-center items-center gap-4">
            <button
              onClick={() => handleSlide('right')}
              className="bg-blue-500 text-white px-4 py-2 rounded"
              disabled={animating}
            >
              Previous
            </button>
            <button
              onClick={() => handleSlide('left')}
              className="bg-blue-500 text-white px-4 py-2 rounded"
              disabled={animating}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
