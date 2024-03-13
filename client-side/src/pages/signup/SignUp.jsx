import { Box, Button, Input, Stack, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Swal from 'sweetalert2';
const ariaLabel = { 'aria-label': 'description' };
const SignUp = () => {
    const navigate = useNavigate()
    //    const {loading,setLoading}=useContext(AuthContext)
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [dob, setDob] = useState('');
    const [DobError,setDobError] =useState('')
    const [passError,setPassEror] =useState('')
    const [errorMsg,setErrorMsg] =useState('')
    const [btnDisable,setBtnDisable] = useState(true)

   useEffect(()=>{
    if(name&&email&&password&&dob&&!DobError&&!passError){
        setBtnDisable(false)
    }
   },[name,email,password,passError,dob,DobError])
    const handleName = (event) => {
        setName(event.target.value);
    };
    const handleEmail = (event) => {
        setEmail(event.target.value);
    };
    const handlePassword = (event) => {
        const pass = event.target.value
        if(pass.length<6){
            setPassEror("password must be greater than 6 characters")
        }else{
            setPassword(pass);
            setPassEror('')
        }
        
    };
    const handleDob = (event) => {
        const currentDate = new Date();
        const providedDate = event.target.value
        const userDate = new Date(providedDate)
        console.log(userDate)
        if(currentDate<userDate){
            setDobError('Please provide a valid date')
            console.log('error')
        }else{
            setDob(providedDate)
            setDobError('')
        }
        // setDob(event.target.value)
        setDob(event.target.value)

    }

    //login with google
    // const loginwithgoogle = () => {
    //     window.open("http://localhost:5000/auth/google/callback", "_self")
    // }
    //sign up
    const handleSignup = (e) => {
        e.preventDefault()
        const userInfo = {
            email,
            password,
            name: name,
            dob: dob

        }
        console.log(userInfo)
        if(DobError||passError||dob==''){
            setErrorMsg('please fill out the fields properly')
        }else{
            setErrorMsg('')
        }
        // axios.post('http://localhost:5000/users', userInfo)
        //     .then(res => {
        //         if (res.data) {
        //             console.log(res.data.token)
        //             if (res.data) {
        //                 localStorage.setItem('access-token', res.data.token)
        //                 // setLoading(false)
        //             }
        //             // setUserdata(userInfo)

        //             Swal.fire({
        //                 position: "top-end",
        //                 icon: "success",
        //                 title: "You registered successfully",
        //                 showConfirmButton: false,
        //                 timer: 1500
        //             });
        //             navigate('/')
        //         }
        //     })
    }
    return (
        <div>
            <Box bgcolor={'#EEF2FE'} paddingY={4} display={'flex'} justifyContent={'center'}>
                <Box paddingY={3} paddingX={2} bgcolor={'white'} sx={{width:{xs:"80%",sm:420}}}>
                    <Typography variant='h5' component={'h5'} textAlign={'center'} fontWeight={'bold'} mb={2}>Sign up</Typography>
                    <form onSubmit={handleSignup}>
                        <Stack direction={"column"} spacing={2} mb={2}>
                            <TextField
                                label="Enter your name"
                                id="name"
                                defaultValue=""
                                size="small"
                                color="secondary"
                                onChange={handleName}
                                fullWidth
                                type='text'
                                required
                            />
                            <TextField
                                label="Enter your email"
                                id="email"
                                defaultValue=""
                                size="small"
                                color="secondary"
                                onChange={handleEmail}
                                fullWidth
                                type='email'
                                required
                            />
                            <Box>
                            <TextField
                                label="Type your password"
                                id="password"
                                defaultValue=""
                                size="small"
                                color="secondary"
                                onChange={handlePassword}
                                fullWidth
                                type='password'
                                required
                            />
                             <Typography variant='subtitle2' fontWeight={'bold'} color={"red"}>{passError}</Typography>
                            </Box>
                           
                            <Box mb={2}>
                                <Typography variant='subtitle2' fontWeight={'bold'} color={"#000"}>Date of birth:</Typography>
                                <TextField
                                    label=""
                                    id="dob"
                                    defaultValue=""
                                    size="small"
                                    color="secondary"
                                    onChangeCapture={handleDob}
                                    fullWidth
                                    type='date'
                                    
                                />
                                <Typography variant='subtitle2' fontWeight={'bold'} color={"red"}>{DobError}</Typography>
                            </Box>

                        </Stack>

                        <Button disabled={btnDisable} mt={2} type='submit' variant="contained" color="secondary" fullWidth >
                            Sign up
                        </Button>

                    </form>
                    <Stack direction={'column'} mt={1} spacing={2} alignItems={'center'}>
                    <Typography variant='subtitle2' fontWeight={'bold'} color={"red"}>{errorMsg}</Typography>
                        <Typography variant='subtitle2' fontWeight={'bold'}>Already have an account? <Link to={'/signin'}>SignIn</Link></Typography>
                        <Typography variant='subtitle2' fontWeight={'bold'}>Or</Typography>
                        <Button variant='contained' color='secondary'>signIn with google</Button>
                    </Stack>
                </Box>

            </Box>
        </div>
    );
};

export default SignUp;