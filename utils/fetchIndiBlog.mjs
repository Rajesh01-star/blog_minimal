import { connectDB } from "../database/connectDB.mjs";
import { Blog } from "../database/model.mjs";
// Connect to MongoDB
connectDB();

const fetchIndiBlog = async function(id){
    try {
        const indiBlog = Blog.findById(id);
        return indiBlog;
        
      } catch (error) {
        return error;
      }
}

export {fetchIndiBlog}