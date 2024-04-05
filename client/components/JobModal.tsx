import { Job } from "@/atoms/atom"

export const Jobmodal = ({job, onClick}: {job:Job, onClick:any} ) => {

    return <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-30">
        <div className="bg-white p-4 rounded-lg w-3/4 relative">
            <div
                onClick={onClick}
                className='absolute right-4 rounded-full shadow-2xl w-6 bg-gray-200 text-center'
            >
                x
            </div>
            <div className='flex items-center mb-6'>
                <img src={job.logo} alt="" className='h-12 rounded-full bg-gray-200 p-1 mr-4' />
                <div>
                    <h2 className="text-lg font-semibold">{job.title} <span className='text-sm'>({job.location})</span></h2>
                    <p className='text-gray-500'>{job.org}</p>
                </div>
            </div>
            <div className='flex flex-col justify-between h-[80%]'>
                <div>
                    <p className='text-lg'>Description</p>
                    <p className="text-gray-600 my-4 text-sm">{job.description}</p>
                </div>
                <div className='h-[20%'>
                    <p className="text-gray-600 mb-3">Job lister: {job.admin.name} - {job.admin.role}</p>
                    <div className='w-fit mx-auto bg-orange-500 text-white font-bold rounded-full px-5 py-1 '>Apply Now</div>
                </div>
            </div>
        </div>
    </div>
}
