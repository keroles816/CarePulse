import { StatusIcon } from '@/constants'
import clsx from 'clsx'
import React from 'react'
import Image from 'next/image'

const StatusBadge = ({status}:{status:Status}) => {
  return (
    <div className={
        clsx('status-badge', {
            "bg-green-600":status==="scheduled",
            "bg-red-600":status==="cancelled",
            "bg-blue-600":status==="pending",
         })}>

            {/* he make object of images in
             constants and chose between them according to status */}
            <Image
            //statusIcon object of Images i pass it according to status
            src={StatusIcon[status]}
            alt={status}
             width={24}
             height={24}
             className="h-fit w-3"
            />
            <p className={clsx('text-12-semibold capitalize',
              {
                'text-green-500':status==="scheduled",
                'text-blue-500':status==="pending",
                'text-red-500':status==="cancelled",
              }
            )}>{status}</p>
         </div>
  )
}

export default StatusBadge