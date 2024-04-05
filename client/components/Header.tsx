import { SearchBar } from "./SearchBar";

export const Header = () => {

    return <div className='w-3/4 m-auto mt-8'>
        <div className="flex items-center justify-center relative overflow-hidden h-96 rounded-2xl bg-gradient-to-l from-orange-600 via-yellow-400 to-green-300">
            <svg className=" absolute w-full m-auto z-0" viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'>
                <filter id='noiseFilter'>
                    <feTurbulence
                        type='fractalNoise'
                        baseFrequency='10'
                        numOctaves='3'
                        stitchTiles='stitch' />
                </filter>
                <rect width='100%' height='100%' filter='url(#noiseFilter)' />
            </svg>

            <div className="z-20 flex justify-center items-center flex-col text-center text-white">
                <h1 className="text-6xl font-bold mb-4">Search for your next job</h1>
                <p className="text-lg">
                    When you are searching for a job, there are a few things you can do to get the most out of your search.
                </p>
            </div>
        </div>
        <div className="-mt-9">
            <SearchBar />
        </div>
    </div>
};
