import { motion } from 'framer-motion';
import { Container, Typography, Box, Button, Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        background: 'linear-gradient(45deg, #1a237e 30%, #0d47a1 90%)',
        color: 'white',
      }}
    >
      <Container maxWidth="md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Box sx={{ mb: 4 }}>
            <Avatar
              src="/profile_pic.jpg"
              alt="Miren Savani"
              sx={{
                width: 200,
                height: 200,
                mx: 'auto',
                mb: 3,
                border: '4px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 0 20px rgba(0, 0, 0, 0.2)',
              }}
            />
          </Box>
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 'bold',
              mb: 4,
            }}
          >
            Hi, I'm Miren Savani
          </Typography>
          <Typography
            variant="h5"
            component="h2"
            gutterBottom
            sx={{ mb: 4 }}
          >
            Full Stack Developer | Problem Solver
          </Typography>
          <Typography
            variant="body1"
            sx={{ mb: 6, maxWidth: '600px', mx: 'auto' }}
          >
            I create beautiful, responsive, and user-friendly web applications
            using modern technologies. Let's build something amazing together!
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => navigate('/projects')}
            >
              View My Projects
            </Button>
            <Button
              variant="outlined"
              color="inherit"
              size="large"
              onClick={() => navigate('/contact')}
            >
              Contact Me
            </Button>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Home; 