import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { AuthContext } from '../../provider/AuthProvider';

const Login = () => {
    const { signIn } = useContext(AuthContext)
   const navigate = useNavigate()
    const [errorMsg, setErrorMsg] = useState('')
    const handleLogin = (event) => {
        event.preventDefault()
        const email = event.target.email.value
        const password = event.target.password.value
        // console.log(email,password);
        function navigateAfterlogin() {
             navigate('/')
          }
        signIn(email,password)
        .then(()=>{
            setErrorMsg('')
             toast.success("you logged in successfully.");
             setTimeout(navigateAfterlogin, 800);
            
        })
        .catch(()=>setErrorMsg("Invalid credentials"))
    }
    return (
        <div>
            <Box bgcolor={'#EEF2FE'} paddingY={4} display={'flex'} justifyContent={'center'} height={"90vh"}>
                <Box height={400} paddingY={10} paddingX={2} bgcolor={'white'} sx={{ width: { xs: "80%", sm: 420 } }}>
                    <Typography variant='h5' component={'h5'} textAlign={'center'} fontWeight={'bold'} mb={2}>Login now</Typography>
                    <form onSubmit={handleLogin}>
                        <Stack direction={"column"} spacing={3} mb={2}>

                            <TextField
                                label="Enter your email"
                                name='email'
                                defaultValue=""
                                size="small"
                                color="secondary"
                                fullWidth
                                type='email'
                                required
                            />
                            <Box>
                                <TextField
                                    label="Type your password"
                                    name='password'
                                    defaultValue=""
                                    size="small"
                                    color="secondary"
                                    fullWidth
                                    type='password'
                                    required
                                />
                            </Box>

                        </Stack>

                        <Button mt={2} type='submit' variant="contained" color="secondary" fullWidth >
                            Login
                        </Button>

                    </form>
                    <Stack direction={'column'} mt={1} spacing={2} alignItems={'center'}>
                        <Typography variant='subtitle2' fontWeight={'bold'} color={"red"}>{errorMsg}</Typography>
                        <Typography variant='subtitle2' fontWeight={'bold'} >Dont have an account? <Link to={'/signup'} style={{ textDecoration: 'underline' }}>Sign Up</Link></Typography>
    
                    </Stack>
                </Box>

            </Box>
            <Toaster />
        </div>
    );
};

export default Login;