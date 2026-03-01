"use client"

const VideoCardNew = ({ logo, title, videoUrl }) => {
 



 

  return (
    <div className="flex flex-col gap-3 group cursor-pointer">
      {/* MEDIA */}
      <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-gray-200">
        
      
          <iframe
            src={videoUrl}
            title={title}
            className="w-full h-full border-none"
            allowFullScreen
          />
     

    

   

        {/* Logo */}
        {logo && (
          <div className="absolute top-3 left-3">
            <img
              src={logo}
              alt="logo"
              className="h-6 object-contain"
            />
          </div>
        )}
      </div>

      {/* CONTENT */}
      <h3 className="text-[#1a1a1a] font-medium text-sm md:text-base">
        {title}
      </h3>

      {/* DATE */}
    
    </div>
  );
};

export default VideoCardNew;