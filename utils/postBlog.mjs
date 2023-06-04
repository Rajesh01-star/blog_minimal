import { marked } from "marked";
import fs from "fs";

import { connectDB } from "../database/connectDB.mjs";
import { Blog } from "../database/model.mjs";

connectDB();
marked.use({
  langPrefix: '',
  mangle: false,
  headerIds: false
});

// upload image
const uploadImage = (imgPath) => {
  const imageFilePath = imgPath;
  // Read the image file as a binary buffer
  const imageBuffer = fs.readFileSync(imageFilePath);
  // Convert the buffer to a base64 encoded string
  const base64Image = imageBuffer.toString('base64');
  // Construct the image data object
  const imageData = {
    contentType: 'image/*', // Set the appropriate content type
    data: Buffer.from(base64Image, 'base64'),
  };
  return imageData;
};


// main function
async function postBlog(title,imgPath,mdPath) {
try{
 const markdownContent = fs.readFileSync(mdPath, 'utf-8');
 const htmlContent = marked(markdownContent);
// Process the HTML to replace image tags
const processedHtml = htmlContent.replace(/<img.*?src="(.*?)".*?>/g, (match, imageUrl) => {
  return `<center><img src="${imageUrl}" alt="Image"></center>`;
});
const imgStr = uploadImage(imgPath);

//  console.log(title,processedHtml,markdownContent,imgStr);
// Create a new blog post object
const newBlog = new Blog({markdownContent: markdownContent,htmlContent: processedHtml,heading:title,image:imgStr });
// Save the blog post to the database
await newBlog.save();
console.log('Blog post saved to MongoDB');
return 200;
}catch(error){
  console.error('Error saving blog post:', error);
    throw error;
}

}

export {postBlog}




