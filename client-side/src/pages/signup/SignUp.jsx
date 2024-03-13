import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { AuthContext } from '../../provider/AuthProvider';
import auth from '../../firebase/firebase.config';
import { updateProfile } from 'firebase/auth';
import * as yup from 'yup';
import "yup-phone";
const phoneSchema = yup.string()
    .phone("IN", true, 'Invalid number')
    .required();

const SignUp = () => {
    const navigate = useNavigate()
    const { createUser } = useContext(AuthContext)
    //    const {loading,setLoading}=useContext(AuthContext)
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [dob, setDob] = useState('');
    const [DobError, setDobError] = useState('')
    const [passError, setPassEror] = useState('')
    const [errorMsg, setErrorMsg] = useState('')
    const [numberError, setNumberError] = useState(null)
    const [btnDisable, setBtnDisable] = useState(true)


    useEffect(() => {
        if (name && email && password && dob && !DobError && !passError) {
            setBtnDisable(false)
        } else {
            setBtnDisable(true)
        }
    }, [name, email, password, passError, dob, DobError])
    const handleName = (event) => {
        setName(event.target.value);
    };
    const handleEmail = (event) => {
        setEmail(event.target.value);
    };
    const handleNumber = (event) => {
        const num = event.target.value
        try {
            const validNUm = phoneSchema.validateSync(num);
            if (validNUm) {
                setPhone(num)
                setNumberError('')
            }
        } catch (error) {
            // console.log(error.message)
            setNumberError(error.message);
        }

    }
    const handlePassword = (event) => {
        const pass = event.target.value
        if (pass.length < 6) {
            setPassEror("password must be greater than 6 characters")
        } else {
            setPassword(pass);
            setPassEror('')
        }

    };
    const handleDob = (event) => {
        const currentDate = new Date();
        const providedDate = event.target.value
        const userDate = new Date(providedDate)
        console.log(userDate)
        if (currentDate < userDate) {
            setDobError('Please provide a valid date')
            console.log('error')
        } else {
            setDob(providedDate)
            setDobError('')
        }
        // setDob(event.target.value)
        setDob(event.target.value)

    }

    //sign up
    const handleSignup = (e) => {
        e.preventDefault()
        const userInfo = {
            name: name,
            phone: phone,
            email,
            dob: dob

        }
        console.log(userInfo)
        if (DobError || passError || dob == '') {
            setErrorMsg('please fill out the fields properly')
        } else {
            setErrorMsg('')
            createUser(email, password)
                .then(result => {

                    updateProfile(auth.currentUser, {
                        displayName: name
                    })
                        .then(() => {

                    
                            axios.post('http://localhost:5000/users', userInfo)
                            
                                .then(res => {
                                    function navigateAfterlogin() {
                                        navigate('/')
                                     }
                                    if (res.data) {
                                        toast.success("you Registered successfully.");
                                        setTimeout(navigateAfterlogin, 800);
                                    }
                                })
                        })
                    navigate('/')

                    console.log(result.user)
                }).catch(error => console.log(error.message))
        }

    }
    return (
        <div>
            <Box bgcolor={'#EEF2FE'} paddingY={4} display={'flex'} justifyContent={'center'}>
                <Box paddingY={3} paddingX={2} bgcolor={'white'} sx={{ width: { xs: "80%", sm: 420 } }}>
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

                            <Box>
                                <TextField
                                    label="Enter your Phone number"
                                    id="number"
                                    defaultValue=""
                                    size="small"
                                    color="secondary"
                                    onChange={handleNumber}
                                    fullWidth
                                    type='number'
                                    required
                                />
                                <Typography variant='subtitle2' fontWeight={'bold'} color={"red"}>{numberError}</Typography>
                            </Box>
                            <Box>
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

                        </Stack>

                        <Button disabled={btnDisable} mt={2} type='submit' variant="contained" color="secondary" fullWidth >
                            Sign up
                        </Button>

                    </form>
                    <Stack direction={'column'} mt={1} spacing={2} alignItems={'center'}>
                        <Typography variant='subtitle2' fontWeight={'bold'} color={"red"}>{errorMsg}</Typography>
                        <Typography variant='subtitle2' fontWeight={'bold'} >Already have an account? <Link to={'/signin'} style={{ textDecoration: 'underline' }}>SignIn</Link></Typography>
                    </Stack>
                </Box>

            </Box>
            <Toaster/>
        </div>
    );
};

export default SignUp;