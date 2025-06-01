import cors from 'cors';
import express from 'express';
import nodemailer from 'nodemailer';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);
const dbName = 'portfolio';

const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;
const fallbackPath = path.join(__dirname, 'fallback_messages.json');

const saveToFallback = (data) => {
  let fallbackData = [];
  if (fs.existsSync(fallbackPath)) {
    fallbackData = JSON.parse(fs.readFileSync(fallbackPath));
  }
  fallbackData.push(data);
  fs.writeFileSync(fallbackPath, JSON.stringify(fallbackData, null, 2));
};

const retryFallback = async () => {
  if (!fs.existsSync(fallbackPath)) return;
  const data = JSON.parse(fs.readFileSync(fallbackPath));
  if (!data.length) return;

  try {
    await client.connect();
    const db = client.db(dbName);
    const contactCollection = db.collection('contacts');
    await contactCollection.insertMany(data);
    fs.writeFileSync(fallbackPath, '[]'); // Clear fallback
    console.log('✅ Fallback messages saved to DB');
  } catch (err) {
    console.error('❌ Retry failed:', err.message);
  } finally {
    await client.close();
  }
};

retryFallback();

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS
    }
  });

  const mailOptions = {
    from: email,
    to: EMAIL_USER,
    subject: 'New Contact Message',
    text: `From: ${name} <${email}>\n\n${message}`
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('📧 Email sent');

    await client.connect();
    const db = client.db(dbName);
    const contactCollection = db.collection('contacts');
    await contactCollection.insertOne({ name, email, message, timestamp: new Date() });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('❌ Error:', error.message);
    saveToFallback({ name, email, message, timestamp: new Date() });
    res.status(202).json({ warning: 'Saved locally. Will retry later.' });
  } finally {
    await client.close();
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
