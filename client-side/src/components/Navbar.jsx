import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";

const Navbar = () => {
    const {user,loading,logOut} = useContext(AuthContext)
    const handleLogout =()=>{
        logOut()
    }
    return (
        <div className="bg-[#7515A4] py-5 px-5 flex justify-between">
            <h2 className=" text-4xl text-white font-bold">Vibtree</h2>
            <ul className="flex gap-5 text-2xl text-white font-semibold">
                <Link to={'/'}><li>Home</li></Link>
               <Link to={'allusers'}><li>All users</li></Link>
            </ul>
            <div>
                {
                user?(<div className="flex gap-3 items-center"> <p className="text-white">{user.displayName}</p><button onClick={handleLogout} className="text-xl font-semibold text-white px-2 py-1 rounded-md border border-white">logout</button></div>):<Link to={'/signup'}><button className="text-xl font-semibold text-white px-2 py-1 rounded-md border border-white">Sign In</button></Link>
                
                }
            </div>
        </div>
    );
};

export default Navbar;