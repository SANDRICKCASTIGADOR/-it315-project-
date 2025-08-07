"use client";

import { useUser } from "@clerk/nextjs";
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
} from "~/components/ui/dialog";
import { DeleteButton } from "./delete-button";
import { Calendar, User, Image as ImageIcon, X } from "lucide-react";
// Import VisuallyHidden if available in your project
// import { VisuallyHidden } from "~/components/ui/visually-hidden";

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
  const [uploaderInfo, setUploaderInfo] = useState<{ fullName: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen && !uploaderInfo) {
      setIsLoading(true);
      fetch(`/api/uploadthing/user/${image.userId}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to fetch user info");
          }
          return res.json();
        })
        .then((data) => {
          if (data.error) {
            throw new Error(data.error);
          }
          setUploaderInfo({ fullName: data.fullName });
        })
        .catch((error) => {
          console.error("Error fetching uploader info:", error);
          setUploaderInfo({ fullName: "Unknown" });
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [isOpen, uploaderInfo, image.userId]);

  return (
    <>
      <div onClick={() => setIsOpen(true)} className="cursor-pointer group">
        {children}
      </div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-[95vw] w-full h-[95vh] p-0 gap-0 bg-black rounded-xl overflow-hidden shadow-2xl border-0">
          {/* Add the required DialogHeader with DialogTitle and DialogDescription */}
          {/* Option 1: Hidden but accessible to screen readers */}
          <div className="sr-only">
            <DialogHeader>
              <DialogTitle>
                Image Viewer - {image.imageName || image.fileName || `Image ${image.id}`}
              </DialogTitle>
              <DialogDescription>
                View and manage image details including uploader information and metadata.
              </DialogDescription>
            </DialogHeader>
          </div>
          
          {/* Alternative Option 2: Use VisuallyHidden if available */}
          {/* 
          <VisuallyHidden>
            <DialogHeader>
              <DialogTitle>
                Image Viewer - {image.imageName || image.fileName || `Image ${image.id}`}
              </DialogTitle>
              <DialogDescription>
                View and manage image details including uploader information and metadata.
              </DialogDescription>
            </DialogHeader>
          </VisuallyHidden>
          */}

          <div className="flex h-full">
            {/* Large Image Container */}
            <div className="flex-1 relative bg-black flex items-center justify-center p-4">
              {/* Close button overlay */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-6 right-6 z-20 p-3 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full transition-all duration-200 text-white hover:scale-110"
              >
                <X size={24} />
              </button>
              
              <div className="relative w-full h-full flex items-center justify-center">
                <img
                  src={image.imageUrl}
                  alt={image.imageName || image.fileName || `Image ${image.id}`}
                  className="max-h-full max-w-full object-contain rounded-lg shadow-2xl"
                />
                
                {/* Image overlay info - bottom left */}
                <div className="absolute bottom-6 left-6 bg-black/80 backdrop-blur-sm text-white px-4 py-3 rounded-lg max-w-sm">
                  <p className="text-base font-medium truncate">
                    {image.imageName || image.fileName || `Image ${image.id}`}
                  </p>
                  <p className="text-sm text-gray-300 mt-1">
                    {new Date(image.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Compact Sidebar Details */}
            <div className="w-72 bg-white border-l border-gray-200 flex flex-col">
              {/* Compact Header */}
              <div className="p-4 border-b border-gray-100">
                <h2 className="text-lg font-bold text-gray-900 truncate">
                  Details
                </h2>
              </div>

              {/* Compact Content */}
              <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                {/* Uploader Info */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <User size={14} className="text-gray-500" />
                    <span>Uploader</span>
                  </div>
                  {isLoading ? (
                    <div className="flex items-center gap-2 pl-4">
                      <div className="w-3 h-3 border-2 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                      <span className="text-xs text-gray-500">Loading...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 pl-4">
                      <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                        {uploaderInfo?.fullName?.charAt(0) || "?"}
                      </div>
                      <span className="text-sm text-gray-900 truncate">
                        {uploaderInfo?.fullName || "Unknown"}
                      </span>
                    </div>
                  )}
                </div>

                {/* Upload Date */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <Calendar size={14} className="text-gray-500" />
                    <span>Date</span>
                  </div>
                  <div className="pl-4">
                    <p className="text-sm text-gray-900">
                      {new Date(image.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(image.createdAt).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>

                {/* Image Info */}
                <div className="space-y-2">
                  <div className="text-sm font-medium text-gray-700">
                    Info
                  </div>
                  <div className="pl-0">
                    <div className="bg-gray-50 rounded-md p-2 space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500">ID</span>
                        <span className="text-xs font-mono text-gray-900">#{image.id}</span>
                      </div>
                      {image.fileName && (
                        <div className="text-xs text-gray-600 truncate" title={image.fileName}>
                          {image.fileName}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Compact Footer */}
              <div className="p-4 border-t border-gray-100 bg-gray-50">
                <div className="flex items-center gap-2"> 
                  <DialogClose asChild>
                    <Button variant="outline" size="sm" className="flex-1 text-xs">
                      Close
                    </Button>
                  </DialogClose>
                  <DeleteButton idAsNumber={image.id} />
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}