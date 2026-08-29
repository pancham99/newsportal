export function getImageUrl(url) {
  if (!url || typeof url !== "string") {
    return "";
  }

  let imageUrl = url.replace(/^http:\/\//i, "https://");

  if (
    imageUrl.includes("res.cloudinary.com") &&
    imageUrl.includes("/image/upload/")
  ) {
    imageUrl = imageUrl.replace(
      "/image/upload/",
      "/image/upload/f_auto/q_auto/"
    );

    // Remove forced .webp extension
    imageUrl = imageUrl.replace(
      /\.(webp|avif|jpg|jpeg|png)$/i,
      ""
    );
  }

  return imageUrl;
}