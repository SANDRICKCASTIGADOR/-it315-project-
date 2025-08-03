"use client"

import { useUser } from "@clerk/nextjs";
import { clerkClient } from "@clerk/nextjs/server";
import { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog"

interface ImageModalProps {
     image: {
        id: number;
        fileName: string | null;
        imageName: string | null;
        imageUrl: string;
        userId: string;
        createdAt: Date;
     };
     children: React.ReactNode;
}


export function ImageModal({ image, children }: ImageModalProps) {
  const [isOpen, setIsOpen] = useState(false);
 
  const [uploaderInfo, setUploaderInfo] = useState<{ fullName: string } | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser();

  useEffect(() =>{
    if (isOpen && !uploaderInfo) {
      setIsLoading(true);
      fetch(`/api/user/${image.userId}`)
         .then((res) => res.json())
         .then((data) => {
          if (data.error) {
            throw new Error(data.error);
          }
          setUploaderInfo({ fullName: data.fullName});
          setIsLoading(false);
         })
         .catch((error) => {
          console.error("Error fetching uploader info:", error);
          setUploaderInfo({ fullName: "Unknown"});
          setIsLoading(false);
         });
    }
  }, [isOpen, uploaderInfo, image.userId]);
  return (
    <div>
      <div onClick={() => setIsOpen(true)} className="cursor-pointer">
        {children}
      </div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}> 
        <DialogContent className="h-full min-w-full overflow-hidden p-0">
          <div className="flex flex-col md:flex-row">
            {/* Image Container */}
            <div className="flex flex-1 items-center justify-center bg-blue-700 p-4">
              <img
                src={image.imageUrl}
                alt={String(image.id)}
                className="max-h-full max-w-full object-contain"
              />
            </div>
            {/* Details Container */}
            <div className="flex w-full flex-col bg-white md:w-80">
              <DialogHeader>
                <DialogTitle className="boarder-b p-4">
                    {image.imageName || image.fileName || `Property ${image.id}`} 
                </DialogTitle>
              </DialogHeader>
              
              <div className="flex flex-1 flex-col space-y-4 p-4">
                <div className="text-sm font-meduim text-gray-600"></div>
                 <span className="text-sm font-meduim text-gray-600">
                  Uploaded By:          
                 </span>
                 <span>
                   {isLoading ? "Loading..." : uploaderInfo?.fullName}
                 </span>
              </div>

              <div className="flex flex-col">
                 <span className="text-sm font-meduim text-gray-100">
                   Created At:          
                 </span>
                 <span>
                    {new Date(image.createdAt).toLocaleDateString()}
                 </span>
              </div>
              
              <div className="">
                <Button>Delete</Button>
              </div>
          </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function userUser(): { user: any; } {
  throw new Error("Function not implemented.");
}
