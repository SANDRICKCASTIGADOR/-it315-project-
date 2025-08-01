"use client";

import { Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { toast } from "sonner";
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
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { useUploadThing } from "~/utils/uploadthing";

export function UploadDialog() {
  const [open, setOpen] = useState(false);

  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedImageName, setSelectedImageName] = useState<string | null>(null);
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedImageName(file.name);
      setSelectedImageUrl(URL.createObjectURL(file));
    } else {
      setSelectedImageName(null);
      setSelectedImageUrl(null);
      toast.error("Please select a valid image file.");
    }
  };

  const { startUpload, isUploading } = useUploadThing("imageUploader", {
    onUploadBegin:() => {
     toast ( 
      <div className="flex items-center">
          <span className="text-lg">Uploading...</ span>
      </div>,
      {
        duration: 10000, // Keepthe tost open for a long term
        id: "upload-begin",
      }
     );
    },
     onUploadError: () => {
      toast.dismiss("upload-begin");
      toast.error(<span className="text-lg">Upload Error</span>);
    },
     onClientUploadComplete: () => {
      toast.dismiss("upload-begin");
      toast.success(<span className="text-lg">Upload Complete!</span>);
      router.refresh();
    },
  });
  const onSubmit= async () => {
    if (!inputRef.current?.files?.length) {
     toast.warning(<span className="text-lg">No File Selected!</span>);
     return;
    }

    const selectedImage = Array.from(inputRef.current.files);
    await startUpload(selectedImage);
    setSelectedImageName(null);
    setSelectedImageUrl(null);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Upload Image</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Upload Image</DialogTitle>
          <DialogDescription>
            Upload an image. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div>
          {selectedImageUrl !== null && (
            <div>
              <img
                src={selectedImageUrl}
                alt={selectedImageName || "Selected Image"}
                className="w-full rounded-md object-cover"
              />
            </div>
          )}
          <div className="flex items-center gap-2 mt-4">
            <Button variant="outline" onClick={() => inputRef.current?.click()}>
              <Upload />
             <input 
             type="file"
             ref={inputRef}
             className="sr-only"
             accept="image/"
             onChange={handleImageSelect}
             />
            </Button>
            <input
              type="file"
              ref={inputRef}
              className="sr-only"
              accept="image/*"
              onChange={handleImageSelect}
            />
            {setSelectedImageName !== null && (
              <div> Selected Image: {selectedImageName} </div>
            )}
          </div>
        </div>
      
        <DialogFooter>
          <Button type="submit" disabled={isUploading} onClick={onSubmit}>
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
