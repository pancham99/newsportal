export function getImageUrl(url) {
  if (!url || typeof url !== "string") {
    return "";
  }

  let imageUrl = url.trim().replace(/^http:\/\//i, "https://");

  // Cloudinary image auto-optimization
  if (
    imageUrl.includes("res.cloudinary.com") &&
    imageUrl.includes("/image/upload/") &&
    !imageUrl.includes("/f_auto,q_auto/") &&
    !imageUrl.includes("/f_auto/q_auto/")
  ) {
    imageUrl = imageUrl.replace(
      "/image/upload/",
      "/image/upload/f_auto,q_auto,w_800,c_limit/"
    );
  }

  // Unsplash image optimization fallback
  if (imageUrl.includes("images.unsplash.com") && !imageUrl.includes("q=")) {
    imageUrl += (imageUrl.includes("?") ? "&" : "?") + "auto=format&fit=crop&q=75&w=800";
  }

  return imageUrl;
}