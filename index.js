import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

// Import the routes and other utility functions here

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Set the views directory and view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Define your routes and other middleware here

// Regular route handling
app.get('/', (req, res) => {
  res.render('base', { titleSite: 'home' });
});

app.get('/about', (req, res) => {
  res.render('base', { titleSite: 'about' });
});

app.get('/blog', async (req, res) => {
  try {
    const resultBlogs = await fetchBlogs();
    res.render('base', { titleSite: 'blog', previewBlogs: resultBlogs });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({ error: 'An error occurred while fetching blogs' });
  }
});

app.get('/contact', (req, res) => {
  res.render('base', { titleSite: 'contact' });
});

app.get('/blogs/:slug', async (req, res) => {
  const { slug } = req.params;
  console.log(slug);
  try {
    const individualBlog = await fetchIndiBlog(slug);
    res.render('base', { titleSite: 'individual', individualBlog: individualBlog });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({ error: 'An error occurred while fetching blogs' });
  }
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
