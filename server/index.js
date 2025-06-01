import cors from 'cors';
import express from 'express';
import { MongoClient } from 'mongodb';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json()); // Needed to parse JSON body

const uri = 'mongodb+srv://miren:admin@mydbcluster.rcwsox0.mongodb.net/?retryWrites=true&w=majority&appName=MYDBCLUSTER';
const client = new MongoClient(uri);
const dbName = 'portfolio';

// Endpoint to fetch projects
app.get('/api/projects', async (req, res) => {
  try {
    await client.connect();
    const db = client.db(dbName);
    const projects = await db.collection('projects').find({}).toArray();
    res.json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch projects' });
  } finally {
    await client.close();
  }
});

// ✅ Endpoint to save contact form submission
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    await client.connect();
    const db = client.db(dbName);
    const result = await db.collection('contacts').insertOne({
      name,
      email,
      message,
      createdAt: new Date(),
    });
    res.status(200).json({ message: 'Message saved successfully', id: result.insertedId });
  } catch (error) {
    console.error('Error saving message:', error);
    res.status(500).json({ error: 'Failed to save message' });
  } finally {
    await client.close();
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
