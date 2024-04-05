import { IoEarthSharp } from "react-icons/io5";

export const Footer = () => {
    return <div>
        <footer className="w-3/4 m-auto p-4 mt-8 border-2 border-gray-200 border-x-0">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                        <h2 className="font-semibold mb-2">Bookings support</h2>
                        <ul className="list-none font-extralight p-0">
                            <li className='my-2'>COVID-19</li>
                            <li className='my-2'>Help center</li>
                            <li className='my-2'>Support</li>
                            <li className='my-2'>Trust & Safety</li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="font-semibold mb-2">Community</h2>
                        <ul className="list-none p-0 font-extralight">
                            <li className='my-2'>Against Discrimination</li>
                            <li className='my-2'>Invite friends</li>
                            <li className='my-2'>Gift cards</li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="font-semibold mb-2">About</h2>
                        <ul className="list-none p-0 font-extralight">
                            <li className='my-2'>How it works</li>
                            <li className='my-2'>Careers</li>
                            <li className='my-2'>Abaout us</li>
                            <li className='my-2'>Media</li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="font-semibold mb-2">Become an employer</h2>
                        <ul className="list-none p-0 font-extralight">
                            <li className='my-2'>post your job</li>
                            <li className='my-2'>Business account</li>
                            <li className='my-2'>Resource Center</li>
                            <li className='my-2'>Community</li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
        <footer className="w-3/4 m-auto mt-3 p-4">
            <div className="flex justify-between text-sm font-semibold text-gray-500">
                <div className="flex justify-between">
                    <p className="px-5">Privacy Policy</p>
                    <p className="px-5">License</p>
                    <p className="px-5">API</p>
                    <p className="px-5">@2024 All right Reserved</p>
                </div>
                <div className="flex justify-between items-center">
                    <p>English</p>
                    <div className="text-gray-500 mx-3"><IoEarthSharp /></div>
                </div>
            </div>
        </footer>
    </div>
}
