import React from 'react'
import { Button } from '@/components/ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Badge } from "@/components/ui/badge"

const job = () => {
  return (
    <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100'>

      <div className="flex items-center justify-between">
     <p>2 days ago</p>
     <Button variant='outline' className="rounded-full " size='icon'><Bookmark/></Button>
</div>

<div className="flex items-center gap-2 my-2">
 <Button  className="p-6" variant='outline' size='icon'>
        <Avatar>
        <AvatarImage src="https://imgs.search.brave.com/9ginb_ySEb5b12oGlUjrTfTJZtgHsSUz_jd5KDDV7u4/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/YWFiaGlzaGVrLmNv/bS93cC1jb250ZW50/L3VwbG9hZHMvMjAx/Ni8wNS9NZW50b3It/TG9nby1EZXNpZ24t/TWVudG9yLUxvZ28t/TWVudG9yLUdyYXBo/aWNzLUxvZ28tTWVu/dG9yaW5nLUxvZ29z/LmpwZw" alt="logo" />
        </Avatar>
     </Button>

<div>
      <h1 className='font-bold text-lg'>Comapny Name</h1>
      <p className='text-sm text-gray-600'>India</p>
     </div>
</div>


     

<div>
  <h1 className='font-bold text-xl my-2'>Title</h1>
  <p className="text-sm text-gray-600">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat excepturi in hic, adipisci veniam non voluptate perferendis nostrum assumenda cum dolorum laborum aliquid voluptatem vero! Est iste harum asperiores nesciunt..</p>
</div>

<div className='flex items-center gap-2 mt-4'>
  <Badge className='text-blue-700 font-bold' variant="ghost">
      12 Positions
    </Badge>
    <Badge className='text-[#F83002] font-bold' variant="ghost">
      Part Time
    </Badge>
    <Badge className='text-[#7209b7] font-bold' variant="ghost">
      24LPA
    </Badge>
</div>

<div className='flex items-center justify-between'>
<Button variant='outline'>Detail</Button>
<Button className='bg-[#7209b7]' >Save for later</Button>
</div>

    </div>
  )
}

export default job;
