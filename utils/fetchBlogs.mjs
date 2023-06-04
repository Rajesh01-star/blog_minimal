import { connectDB } from "../database/connectDB.mjs";
import { Blog } from "../database/model.mjs";
// Connect to MongoDB
connectDB();

const fetchBlogs = async function(){
    try {
        const blogs = await Blog.find();
        const previewBlogs = [];
        const eachPreviewBlog = {};

        blogs.forEach((eachBlog)=>{
            eachPreviewBlog.previewText = eachBlog.markdownContent.split(/\s+/).slice(0, 10).join(" ");
            eachPreviewBlog.heading = eachBlog.heading;
            eachPreviewBlog.id = eachBlog._id;
            eachPreviewBlog.image = eachBlog.image;
            previewBlogs.push(eachPreviewBlog);
        })
        return previewBlogs;
        // return blogs;
        // previewBlogs = [];
      } catch (error) {
        return error;
      }
}

export {fetchBlogs}