import './style.css'
import signupImg from '../../assets/signup.jpg'
import { Link } from 'react-router-dom';
const Home = () => {
    return (
        <div>
            <div className='relative'>
                <img className=" h-[650px] w-full" src={signupImg} alt="" />
                <div className='overlay absolute flex justify-center items-center'>
                    <Link to={'/signup'}><button className=' text-4xl font-semibold bg-[#7515A4] rounded-lg px-10 py-5 text-white'>Sign up now</button></Link>
                </div>
            </div>
        </div>
    );
};

export default Home;