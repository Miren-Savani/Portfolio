import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Box,
  Paper,
  Snackbar,
  Alert,
} from '@mui/material';
import { useInView } from 'react-intersection-observer';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    // Send email via Formspree
    const emailResponse = await fetch('https://formspree.io/f/manoganz', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(formData),
    });

    // Try saving to MongoDB, but ignore if it fails
    let dbSaved = false;
    try {
      const dbResponse = await fetch('https://portfolio-4-43wl.onrender.com/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      dbSaved = dbResponse.ok;
    } catch (dbError) {
      console.warn('Could not save to DB:', dbError);
    }

    if (emailResponse.ok) {
      setSnackbar({
        open: true,
        message: dbSaved
          ? 'Message sent and saved successfully!'
          : 'Message sent! (Saved to DB failed)',
        severity: 'success',
      });
      setFormData({ name: '', email: '', message: '' });
    } else {
      setSnackbar({
        open: true,
        message: 'Failed to send message via email. Please try again later.',
        severity: 'error',
      });
    }
  } catch (error) {
    console.error('Submission error:', error);
    setSnackbar({
      open: true,
      message: 'An error occurred. Please try again later.',
      severity: 'error',
    });
  }
};

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const socialLinks = [
    { icon: <GitHubIcon />, url: 'https://github.com/Miren3865', label: 'GitHub' },
    { icon: <LinkedInIcon />, url: 'https://www.linkedin.com/in/miren-savani-05934128a/', label: 'LinkedIn' },
    { icon: <EmailIcon />, url: 'mailto:savanimiren7@gmail.com', label: 'Email' },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <Typography variant="h3" component="h1" gutterBottom align="center">
          Get in Touch
        </Typography>
        <Typography variant="body1" paragraph align="center" sx={{ mb: 6 }}>
          Have a question or want to work together? Feel free to contact me!
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 4 }}>
              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  margin="normal"
                  required
                />
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  margin="normal"
                  required
                />
                <TextField
                  fullWidth
                  label="Message"
                  name="message"
                  multiline
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  margin="normal"
                  required
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  fullWidth
                  sx={{ mt: 2 }}
                >
                  Send Message
                </Button>
              </form>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 4, height: '100%' }}>
              <Typography variant="h5" gutterBottom>
                Connect with Me
              </Typography>
              <Typography variant="body1" paragraph>
                Feel free to reach out through any of these platforms. I'm always
                open to discussing new projects, creative ideas, or opportunities
                to be part of your vision.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mt: 4 }}>
                {socialLinks.map((link) => (
                  <Button
                    key={link.label}
                    variant="outlined"
                    startIcon={link.icon}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.label}
                  </Button>
                ))}
              </Box>
            </Paper>
          </Grid>
        </Grid>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbar.severity}
            sx={{ width: '100%' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </motion.div>
    </Container>
  );
};

export default Contact;
