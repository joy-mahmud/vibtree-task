import { Link } from "react-router-dom";


const ErrorPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen space-y-5">
            <h2 className="text-4xl font-bold">404! page not found</h2>
            <Link to={'/'}><button className="bg-[#7515A4] px-5 py-2 rounded-lg text-white">Back</button></Link>
        </div>
    );
};

export default ErrorPage;