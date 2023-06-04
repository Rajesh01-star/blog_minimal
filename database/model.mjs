import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  markdownContent: {
    type: String,
    required: true
  },
  htmlContent: {
    type: String,
    required: true
  },
  heading :{
    type: String,
    required: true
  },
  image: {
    data: {
      type: Buffer, // Store image data as Buffer type
      required: true
    },
    contentType: {
      type: String, // Store the content type of the image
      required: true
    }
  }
});

// Create a Mongoose model based on the schema
const Blog = mongoose.model('Blog', blogSchema);

export { Blog };
