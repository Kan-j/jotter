import React, { useState } from 'react'

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle
  } from "@/components/ui/dialog"
import { useCoverImage } from '@/hooks/use-cover-image';
import { useEdgeStore } from '@/lib/edgestore';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useParams } from 'next/navigation';
import { Id } from '@/convex/_generated/dataModel';
import { SingleImageDropzone } from '../single-image-dropzone';



const CoverImageModal = () => {
    const params = useParams()
    const update = useMutation(api.documents.update);
    const { edgestore } = useEdgeStore();
    const coverImage = useCoverImage();
    

    const [file, setFile] = React.useState<File>();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onClose = ()=>{
        setFile(undefined);
        setIsSubmitting(false);
        coverImage.onClose();
    }

    const onChange = async(file?: File) => {
        if(file){
            setIsSubmitting(true);
            setFile(file);

            
            const res = await edgestore.publicFiles.upload({
                    file,
                    options: {
                        replaceTargetUrl: coverImage.url
                    }
                });

            await update({
                id: params.documentId as Id<"documents">,
                coverImage: res.url
            })

            onClose();
        }
    }
    


  return (
    <Dialog open={coverImage.isOpen} onOpenChange={coverImage.onClose}>
        <DialogContent>
            <DialogHeader className='border-b pb-3'>
                <DialogTitle>
                    <h3 className="text-center text-lg font-semibold">
                        Cover Image
                    </h3>
                </DialogTitle>
            </DialogHeader>
            <SingleImageDropzone
            className='w-full outline-none'
            disabled={isSubmitting}
            value={file}
            onChange={onChange}
            />
        </DialogContent>
    </Dialog>
  )
}

export default CoverImageModal