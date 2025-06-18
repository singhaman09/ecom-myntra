
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Loader:React.FC<{isInitial:boolean}> = ({isInitial=true}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: isInitial?'80vh':'100%', 
        overflow:'hidden',
        marginTop:!isInitial?'30px':'0px'
      }}
    >
      <CircularProgress sx={{color:'#3D857E'}} />
    </Box>
  );
};

export default Loader;
