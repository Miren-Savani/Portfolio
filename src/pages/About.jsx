import BuildIcon from '@mui/icons-material/Build';
import CodeIcon from '@mui/icons-material/Code';
import LaunchIcon from '@mui/icons-material/Launch';
import StorageIcon from '@mui/icons-material/Storage';
import WebIcon from '@mui/icons-material/Web';
import { Avatar, Box, Container, Divider, Grid, Paper, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const skills = [
  { category: 'Frontend', icon: <WebIcon color="primary" />, items: ['React', 'JavaScript', 'HTML5', 'CSS3'] },
  { category: 'Backend', icon: <CodeIcon color="secondary" />, items: ['Node.js', 'Express', 'Python', 'REST APIs'] },
  { category: 'Database', icon: <StorageIcon sx={{ color: '#4caf50' }} />, items: ['MongoDB', 'MySQL', 'PostgreSQL'] },
  { category: 'Tools', icon: <BuildIcon sx={{ color: '#ffb300' }} />, items: ['Git', 'Docker', 'VS Code', 'Figma'] },
];

const certificates = [
  {
    title: 'Data Structure And Algorithms Using Java',
    issuer: 'Swayam NPTEL',
    link: 'https://drive.google.com/file/d/1RQOkDp9eO4m_Uzgdt_JEh9edQ-uRBL1q/view?usp=drivesdk'
  },
  {
    title: 'Introduction To Web Designing',
    issuer: 'Great Learning',
    link: 'https://drive.google.com/file/d/1jSL_bx12xnFXDA2d2lDSlGB-K8waq77J/view?usp=drivesdk'
  },
  {
    title: 'PyQuest (Python Language Hackathon)',
    issuer: 'Department Level',
    link: 'https://drive.google.com/file/d/1cjTJCKhl1ttKcz7js8wRI2yRaV01zzQ3/view?usp=drivesdk'
  },
  {
    title: 'Master The Process State Diagram',
    issuer: 'Department Level',
    link: 'https://drive.google.com/file/d/1iyWBRVHNeIm84LqnH56gi7HKFEsXeRnd/view?usp=drivesdk'
  },
  {
    title: 'Embedded Machine Learning With Nvidia Jetson Nano',
    issuer: 'Educational Seminar',
    link: 'https://drive.google.com/file/d/1iyj2XwPEheKMPF5mEkCtS5zs8gNddlOt/view?usp=drivesdk'
  },
  {
    title: 'Jetson Nano AI Development',
    subtitle: 'Getting Started with AI on Jetson Nano',
    issuer: 'NVIDIA',
    link: 'https://learn.nvidia.com/certificates?id=nM35j7-iSpm9pqrB62Gncg'
  },
];

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <Container maxWidth="lg" sx={{ py: 10 }}>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 6 }}>
          <Avatar 
            src="/profile_pic.jpg"
            alt="Miren Savani"
            sx={{ width: 120, height: 120, bgcolor: 'primary.main', fontSize: 40, fontWeight: 700, mb: 2, border: '4px solid rgba(255,255,255,0.2)', boxShadow: '0 0 20px rgba(0,0,0,0.2)' }}
          />
          <Typography variant="h3" component="h1" align="center" sx={{ fontWeight: 'bold', fontSize: { xs: '2rem', md: '2.8rem' } }}>
            Miren Savani
          </Typography>
          <Divider sx={{ width: 60, my: 2, borderBottomWidth: 3, borderColor: 'primary.main', borderRadius: 2 }} />
          <Typography variant="h6" align="center" sx={{ color: 'secondary.main', mb: 2, fontWeight: 500 }}>
            Full Stack Developer &  Problem Solver
          </Typography>
          <Typography variant="body1" align="center" sx={{ maxWidth: 800, color: 'grey.300', mb: 2 }}>
            I am a passionate full-stack developer with a strong foundation in web development and a keen eye for creating intuitive user experiences. My journey in software development has equipped me with a diverse set of skills and a problem-solving mindset.
          </Typography>
        </Box>

        <Grid container spacing={4} justifyContent="center">
          {skills.map((skillGroup) => (
            <Grid item xs={12} sm={6} md={3} key={skillGroup.category} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Paper
                elevation={6}
                sx={{
                  p: 3,
                  width: '100%',
                  maxWidth: 270,
                  borderRadius: 4,
                  boxShadow: 6,
                  background: 'linear-gradient(135deg, #232526 0%, #1c1c1c 100%)',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-8px) scale(1.03)',
                    boxShadow: 12,
                  },
                  position: 'relative',
                  overflow: 'visible',
                }}
              >
                {/* Accent bar and icon */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Box sx={{ height: 6, width: 28, background: 'linear-gradient(90deg, #90caf9, #f48fb1)', borderRadius: 2, mr: 1 }} />
                  {skillGroup.icon}
                </Box>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, mb: 1 }}>
                  {skillGroup.category}
                </Typography>
                <Box component="ul" sx={{ pl: 2, color: 'grey.200', fontSize: '1.08rem', fontWeight: 500 }}>
                  {skillGroup.items.map((skill) => (
                    <Typography component="li" key={skill} sx={{ mb: 0.5 }}>
                      {skill}
                    </Typography>
                  ))}
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Certificates Section */}
        <Box sx={{ mt: 8 }}>
          <Typography variant="h4" align="center" sx={{ fontWeight: 'bold', mb: 1 }}>
            Certificates
          </Typography>
          <Divider sx={{ width: 60, mx: 'auto', mb: 4, borderBottomWidth: 3, borderColor: 'secondary.main', borderRadius: 2 }} />
          <Grid container spacing={4} justifyContent="center">
            {certificates.map((cert) => (
              <Grid item xs={12} sm={6} md={4} key={cert.title} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Paper
                  elevation={4}
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    width: '100%',
                    maxWidth: 350,
                    background: 'linear-gradient(135deg, #232526 0%, #1c1c1c 100%)',
                    boxShadow: 4,
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      transform: 'translateY(-6px) scale(1.02)',
                      boxShadow: 10,
                      cursor: 'pointer'
                    },
                  }}
                  onClick={() => window.open(cert.link, '_blank')}
                >
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                    {cert.title}
                  </Typography>
                  {cert.subtitle && (
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                      {cert.subtitle}
                    </Typography>
                  )}
                  <Typography variant="subtitle2" color="secondary" sx={{ fontWeight: 500, mb: 1 }}>
                    {cert.issuer}
                  </Typography>
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    color: 'primary.main',
                    mt: 1,
                    '&:hover': {
                      color: 'primary.light'
                    }
                  }}>
                    <LaunchIcon sx={{ fontSize: 16, mr: 0.5 }} />
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      View Certificate
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      </motion.div>
    </Container>
  );
};

export default About; 