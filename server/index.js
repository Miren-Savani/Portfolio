import express from 'express';
import cors from 'cors';
import { MongoClient } from 'mongodb';

const app = express();
const PORT = process.env.PORT || 5000;
const uri = 'mongodb+srv://miren:admin@mydbcluster.rcwsox0.mongodb.net/?retryWrites=true&w=majority&appName=MYDBCLUSTER';
const client = new MongoClient(uri);
const dbName = 'portfolio';

app.use(cors());
app.use(express.json());

async function main() {
  try {
    await client.connect();
    const db = client.db(dbName);

    // GET projects
    app.get('/api/projects', async (req, res) => {
      try {
        const projects = await db.collection('projects').find({}).toArray();
        res.json(projects);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch projects' });
      }
    });

    // POST contact
    app.post('/api/contact', async (req, res) => {
      const { name, email, message } = req.body;
      try {
        const result = await db.collection('contacts').insertOne({
          name,
          email,
          message,
          date: new Date()
        });
        res.status(201).json({ message: 'Contact saved successfully', id: result.insertedId });
      } catch (error) {
        console.error('Error saving contact:', error);
        res.status(500).json({ error: 'Failed to save contact' });
      }
    });

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });

  } catch (err) {
    console.error('MongoDB Connection Error:', err);
    process.exit(1);
  }
}

main();
