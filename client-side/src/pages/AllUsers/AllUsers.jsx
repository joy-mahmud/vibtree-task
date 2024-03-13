import signupPlaceholder from '../../assets/userPlaceholder.png'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import EditProfile from '../../components/Modal';
const AllUsers = () => {
     const { data, isPending, refetch } = useQuery({
        queryKey: ['userdata'],
        queryFn: async () => {
            const res = await axios.get("http://localhost:5000/users")
            return res.data
        }
    })
    if (isPending) {
        return
    }

const handleDelete = async(email)=>{
    const res = await axios.delete(`http://localhost:5000/deleteUser?email=${email}`)
    if(res.data){
        refetch()
    }
}
    return (
        <>
            <h2 className='text-3xl font-semibold text-center mt-5'>All users</h2>
            <div className='container mx-auto grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4 mt-10'>

                {
                    data.map((user) => <Card key={user._id} sx={{ maxWidth: 345 }}>
                        <CardMedia
                            component="img"
                            alt="green iguana"
                            sx={{ height: 240 }}
                            image={signupPlaceholder}
                        />
                        {/* <img src={signupPlaceholder} height={100} alt="" /> */}
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                             {user.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                               Phone: {user.phone}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Email: {user.email}
                            </Typography> <Typography variant="body2" color="text.secondary">
                               Date of birth: {user.dob}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <EditProfile user={user} refetch={refetch}></EditProfile>
                            <Button onClick={()=>handleDelete(user.email)} color="secondary"  variant='outlined' size="small">Delete profile</Button>
                        </CardActions>
                    </Card>)
                }

            </div>
        </>
    );
};

export default AllUsers;