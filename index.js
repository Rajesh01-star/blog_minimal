import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import multer from "multer";
import path from 'path';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

import { postBlog } from "./utils/postBlog.mjs";
import { fetchBlogs } from "./utils/fetchBlogs.mjs";
import { fetchIndiBlog } from "./utils/fetchIndiBlog.mjs";


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads');
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = `${Date.now()}-${file.originalname}`;
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  
  const upload = multer({ storage: storage })


const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors());
app.use(express.json());

app.set('views', path.join(__dirname, 'views'));
// app.set('views', './views');
app.set('view engine', 'ejs');


// regular route handling
app.get("/",(req,res)=>{
    res.render('base',{titleSite:"home"})
})

app.get("/about",(req,res)=>{
    res.render('base',{titleSite:"about"})
})

app.get("/blog", async (req, res) => {
  try {
    const resultBlogs = await fetchBlogs();
    // console.log(resultBlogs);
    res.render('base',{titleSite:"blog", previewBlogs:resultBlogs})
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({ error: 'An error occurred while fetching blogs' });
  }
  });

app.post("/blog",upload.fields([{ name:"preview_img" },{ name:"markdown_file" }]),async (req,res)=>{
    const title = req.body.title;
    const imgPath = req.files['preview_img'][0].path;
    const mdPath = req.files['markdown_file'][0].path;
    try {
      await postBlog(title, imgPath, mdPath);
      res.redirect('/');
    } catch (error) {
      console.log(error);
      res.redirect('/admin');
    }
    
})
  

app.get("/contact",(req,res)=>{
    res.render('base',{titleSite:"contact"})
})

// app.get("/admin",(req,res)=>{
//   res.render('base',{titleSite:"admin"});
// })

app.get("/gallery",(req,res)=>{
  res.render('base',{titleSite:"gallery"});
})



// individual blog page
app.get("/blogs/:slug",async (req, res) => {
  const { slug } = req.params;
  // console.log(slug);
  try{
    const individualBlog = await fetchIndiBlog(slug);
    // console.log(indiBlog);
    res.render('base',{titleSite:"individual", individualBlog:individualBlog})
  }catch(error){
    console.error('Error fetching blogs:', error);
    res.status(500).json({ error: 'An error occurred while fetching blogs' });
  }
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});