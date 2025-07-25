import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import { UploadDialog } from "./_components/upload-dialog";


async function Images() {
 const mockUrls = [
   "https://i.pinimg.com/736x/dc/d9/eb/dcd9ebdfc9f1d7171a2045a81a229d2b.jpg", 
   "https://static1.srcdn.com/wordpress/wp-content/uploads/2024/07/sung-jinwoo-solo-leveling-chapter-148.jpeg",
   "https://dqg02atp76.ufs.sh/f/rVl4jPCfn6ZFO4z123DgeJ6kfSN0Go9C7PIMmHjuLzhUZ5Wn",
   "https://dqg02atp76.ufs.sh/f/rVl4jPCfn6ZFC93nvkjwEOtSfT4GZm6djWeuKVYpzR3P1F5L",
   "https://dqg02atp76.ufs.sh/f/rVl4jPCfn6ZFU3Sns3oZlCSfxyIQY5O0XD3qi7Acd1gWNz8r"];

 const images = mockUrls.map((url, index) => ({
  id: index + 1,
  url: url 
}));

return ( 
  <div>
    <div className="flex justify-end p-4">
      <UploadDialog />
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {images.map((image) => (
        <div key={image.id} className="relative overflow-hidden rounded-lg border border-gray-300 shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl">
          <img 
            src={image.url} 
            alt={`Image ${image.id}`} 
            className="h-full max-w-full object-cover object-center transition-transform duration-300 hover:brightness-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-blue-800 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
            <h3 className="text-lg font-bold text-white">{`Image ${image.id}`}</h3>
            <p className="text-sm text-gray-200">{`This is my image ${image.id}.`}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

}

export default function HomePage() {
  return (
    <main className="">
      <SignedOut>
       <div  className="h-full w-full text-center text-2xl"> 
        Please Sign In Above to Continue!</div>
      </SignedOut>
      <SignedIn>
        <div className="h-full w-full text-center text-2xl">
          Welcome Back!
        </div>
        <Images />
      </SignedIn>
    </main>
  );
}
