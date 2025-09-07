export const getGuideImageUrls = (guide) => {
  if (!guide || !guide.guideImage) return [];
  
  let images = [];
  
  try {
    images = typeof guide.guideImage === 'string' 
      ? JSON.parse(guide.guideImage) 
      : guide.guideImage;
  } catch (e) {
    images = [guide.guideImage];
  }
  
  return images.map(image => {
    if (image && image.startsWith('guides/')) {
      return `http://localhost:8000/storage/${image}`;
    } else if (image) {
      return `http://localhost:8000/storage/guides/${image}`;
    }
    return "/default-guide.jpg";
  });
};

export const getMainGuideImage = (guide) => {
  const urls = getGuideImageUrls(guide);
  return urls[0] || "/default-guide.jpg";
};