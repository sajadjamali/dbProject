import Particle from "./Particle";
import error from "/error.gif";

const Error = () => {
    return (
        <div className="flex flex-col h-screen justify-center items-center">
            <img src={error} className="w-4/12 rounded-full" alt="not found" />
            <h1 className="text-white text-5xl mt-3">Error...</h1>
            <Particle />
        </div>
    );
}

export default Error;