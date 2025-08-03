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

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form"



const formSchema = z.object({
  imageName: z
    .string()
    .min(5, {message:"Image Name must be at least 5 characters long"})
    .max(50),
});

export function UploadDialog() {
  const [open, setOpen] = useState(false);
   const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
     imageName: "",
    },
});


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
  const handleImageUpload = async () => {
    if (!inputRef.current?.files?.length) {
     toast.warning(<span className="text-lg">No File Selected!</span>);
     return;
    }

   const selectedImage = Array.from(inputRef.current.files);
      await startUpload(selectedImage, {
        imageName: form.getValues("imageName"),
      });
      setSelectedImageName(null);
      setSelectedImageUrl(null);
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
     console.log(values)
     setOpen(false);
     await handleImageUpload();
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="imageName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image Name</FormLabel>
              <FormControl>
                <Input placeholder="Image Name" {...field} />
              </FormControl>
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
       <DialogFooter>
          <Button type="submit" disabled={isUploading}>
            Submit
          </Button>
        </DialogFooter>
      </form>
    </Form> 
      </DialogContent>
    </Dialog>
  );
}
