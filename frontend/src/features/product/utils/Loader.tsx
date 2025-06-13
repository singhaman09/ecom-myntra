
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Loader = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80vh', 
      }}
    >
      <CircularProgress sx={{color:'#db2777'}} />
    </Box>
  );
};

export default Loader;
