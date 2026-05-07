import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import React, { useState } from 'react'

const PostJob = () => {

    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        experienceLevel: "",
        location: "",
        jobType: "",
        position: 0,
        companyId: ""
    });

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    return (
        <div className='w-full max-w-4xl mx-auto my-12 px-6'>

            {/* Header */}
            <div className='mb-8'>
                <h1 className='text-2xl font-semibold text-gray-900'>Post a New Job</h1>
                <p className='text-sm text-gray-500 mt-1'>Fill in the details below to create a job listing.</p>
            </div>

            {/* Form Card */}
            <div className='bg-white border border-gray-200 rounded-2xl shadow-sm p-8'>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>

                    {/* Title */}
                    <div className='flex flex-col gap-1.5'>
                        <Label className='text-sm font-medium text-gray-700'>Job Title</Label>
                        <Input
                            type='text'
                            placeholder="e.g. Frontend Developer"
                            name='title'
                            value={input.title}
                            onChange={changeEventHandler}
                            className='h-10 rounded-lg border-gray-300 focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-0 focus-visible:border-transparent text-sm'
                        />
                    </div>

                    {/* Location */}
                    <div className='flex flex-col gap-1.5'>
                        <Label className='text-sm font-medium text-gray-700'>Location</Label>
                        <Input
                            type='text'
                            placeholder="e.g. Remote, New York"
                            name='location'
                            value={input.location}
                            onChange={changeEventHandler}
                            className='h-10 rounded-lg border-gray-300 focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-0 focus-visible:border-transparent text-sm'
                        />
                    </div>

                    {/* Description — full width */}
                    <div className='flex flex-col gap-1.5 md:col-span-2'>
                        <Label className='text-sm font-medium text-gray-700'>Description</Label>
                        <Input
                            type='text'
                            placeholder="Brief overview of the role"
                            name='description'
                            value={input.description}
                            onChange={changeEventHandler}
                            className='h-10 rounded-lg border-gray-300 focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-0 focus-visible:border-transparent text-sm'
                        />
                    </div>

                    {/* Requirements — full width */}
                    <div className='flex flex-col gap-1.5 md:col-span-2'>
                        <Label className='text-sm font-medium text-gray-700'>Requirements</Label>
                        <Input
                            type='text'
                            placeholder="e.g. React, Node.js, 3+ years experience"
                            name='requirements'
                            value={input.requirements}
                            onChange={changeEventHandler}
                            className='h-10 rounded-lg border-gray-300 focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-0 focus-visible:border-transparent text-sm'
                        />
                    </div>

                    {/* Salary */}
                    <div className='flex flex-col gap-1.5'>
                        <Label className='text-sm font-medium text-gray-700'>Salary</Label>
                        <div className='relative'>
                            <span className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm'>₹</span>
                            <Input
                                type='text'
                                placeholder="e.g. 8,00,000"
                                name='salary'
                                value={input.salary}
                                onChange={changeEventHandler}
                                className='h-10 pl-7 rounded-lg border-gray-300 focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-0 focus-visible:border-transparent text-sm'
                            />
                        </div>
                    </div>

                    {/* Experience Level */}
                    <div className='flex flex-col gap-1.5'>
                        <Label className='text-sm font-medium text-gray-700'>Experience Level</Label>
                        <Input
                            type='text'
                            placeholder="e.g. Mid-level, Senior"
                            name='experienceLevel'
                            value={input.experienceLevel}
                            onChange={changeEventHandler}
                            className='h-10 rounded-lg border-gray-300 focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-0 focus-visible:border-transparent text-sm'
                        />
                    </div>

                    {/* Job Type */}
                    <div className='flex flex-col gap-1.5'>
                        <Label className='text-sm font-medium text-gray-700'>Job Type</Label>
                        <Input
                            type='text'
                            placeholder="e.g. Full-time, Contract"
                            name='jobType'
                            value={input.jobType}
                            onChange={changeEventHandler}
                            className='h-10 rounded-lg border-gray-300 focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-0 focus-visible:border-transparent text-sm'
                        />
                    </div>

                    {/* Position */}
                    <div className='flex flex-col gap-1.5'>
                        <Label className='text-sm font-medium text-gray-700'>No. of Positions</Label>
                        <Input
                            type='text'
                            placeholder="1"
                            name='position'
                            value={input.position}
                            onChange={changeEventHandler}
                            className='h-10 rounded-lg border-gray-300 focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-0 focus-visible:border-transparent text-sm'
                        />
                    </div>

                </div>

                {/* Divider + Submit */}
                <div className='mt-8 pt-6 border-t border-gray-100 flex justify-end gap-3'>
                    <Button variant='outline' className='rounded-lg px-6 text-sm h-10 border-gray-300 text-gray-600 hover:bg-gray-50'>
                        Cancel
                    </Button>
                    <Button className='rounded-lg px-6 text-sm h-10 bg-orange-500 hover:bg-orange-600 text-white font-medium'>
                        Post Job
                    </Button>
                </div>

            </div>
        </div>
    )
}

export default PostJob