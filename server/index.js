import express from 'express';
import cors from 'cors';
import { MongoClient } from 'mongodb';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json()); // Enables JSON body parsing

const uri = 'mongodb+srv://miren:admin@mydbcluster.rcwsox0.mongodb.net/?retryWrites=true&w=majority&appName=MYDBCLUSTER';
const client = new MongoClient(uri);
const dbName = 'portfolio';

// Fetch projects
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

// Save contact message
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    await client.connect();
    const db = client.db(dbName);
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
  } finally {
    await client.close();
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
