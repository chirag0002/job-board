import { Request, Response } from 'express'
import { Job } from '../db/db'


export const createJob = async (req: Request, res: Response) => {
    let { logo, title, org, compensation, location, description } = req.body
    const admin = req.admin

    try {
        const job = await Job.findOne({ title: title })
        if (job) return res.status(401).json({ message: "Another Job with same title already exists" })
        const newJob = new Job({
            logo: logo,
            title: title,
            org: org,
            location: location,
            compensation: compensation,
            description: description,
            admin: {
                email: admin.email,
                name: admin.name,
                role: admin.role
            }
        });

        await newJob.save()

        res.status(200).json({ message: 'Job successfully created' })
    } catch (err: any) {
        return res.status(500).json({ message: err.message })
    }
}

export const getAllJobs = async (req: Request, res: Response) => {
    const { page = '1', pageSize = '10', search, location } = req.query as { page?: string, pageSize?: string, search?: string, location?: string };
    const query: any = {};
    
    if (search) {
        query.$or = [
            { title: { $regex: search, $options: 'i' } },
            { org: { $regex: search, $options: 'i' } }
        ]
    }
    if (location) query.location = { $regex: new RegExp(location, 'i') };

    try {
        const jobs = await Job.find(query)
            .limit(Number(pageSize))
            .skip((Number(page) - 1) * Number(pageSize));

        const data = jobs.map((job: any) => {
            return {
                id: job._id,
                title: job.title,
                logo: job.logo,
                org: job.org,
                location: job.location,
                compensation: job.compensation,
                description: job.description,
                admin: {
                    name: job.admin.name,
                    role: job.admin.role
                }
            };
        })

        const count = await Job.countDocuments({})

        res.status(200).json({
            jobs: data,
            count: count
        });
    } catch (err: any) {
        return res.status(500).json({ message: err.message });
    }
}

export const getMyJobs = async (req: Request, res: Response) => {
    const admin = req.admin
    try {
        const jobs = await Job.find({ "admin.email": admin.email })
        const data = jobs.map((job: any) => {
            return {
                id: job._id,
                title: job.title,
                logo: job.logo,
                org: job.org,
                location: job.location,
                compensation: job.compensation,
                description: job.description,
                admin: {
                    name: job.admin.name,
                    role: admin.role
                }
            };
        })

        res.status(200).json({
            jobs: data
        });
    } catch (err: any) {
        console.log(err)
        return res.status(500).json({ message1: err.message })
    }
}

export const getJob = async (req: Request, res: Response) => {
    const { jobId } = req.params

    try {
        const job = await Job.findById(jobId)
        if (!job) return res.status(404).json({ message: 'Job not found' })

        const data = {
            id: job._id,
            title: job.title,
            logo: job.logo,
            org: job.org,
            location: job.location,
            compensation: job.compensation,
            description: job.description,
            admin: {
                name: job.admin.name,
                role: job.admin.role
            }
        }
        res.status(200).json({
            job: data
        });
    } catch (err: any) {
        return res.status(500).json({ message: err.message })
    }
}

export const updateJob = async (req: Request, res: Response) => {
    const { jobId } = req.params
    const { title, org, compensation, location, description } = req.body

    try {
        const job = await Job.findById(jobId)
        if (!job) return res.status(404).json({ message: 'Job not found' })

        job.title = title || job.title
        job.org = org || job.org
        job.location = location || job.location
        job.compensation = compensation || job.compensation
        job.description = description || job.description

        await job.save()

        res.status(200).json({ message: 'Job successfully updated' })
    } catch (err: any) {
        return res.status(500).json({ message: err.message })
    }
}

export const deleteJob = async (req: Request, res: Response) => {
    const { jobId } = req.params

    try {
        const job = await Job.findById(jobId)
        if (!job) return res.status(404).json({ message: 'Job not found' })

        if (job.admin.email === req.admin.email) {
            await Job.findByIdAndDelete(jobId)

            res.status(200).json({
                message: 'Job deleted'
            });
        } else {
            res.status(401).json({ message: 'Unauthorized' })
        }
    } catch (err: any) {
        return res.status(500).json({ message: err.message })
    }
}