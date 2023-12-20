import { NavLink } from "react-router-dom";

const Header = () => {
    return (
        <div id="header" className="text-white z-50 flex justify-center flex-wrap gap-2 items-center  py-4 bg-black">
            <NavLink className="border-yellow-500 bg-red-800 border-2 font-bold py-1 px-2 rounded-md hover:scale-105" to="/books">کتاب ها</NavLink>
            <NavLink className="border-yellow-500 bg-red-800 border-2 font-bold py-1 px-2 rounded-md hover:scale-105" to="/members">اعضا</NavLink>
            <NavLink className="border-yellow-500 bg-red-800 border-2 font-bold py-1 px-2 rounded-md hover:scale-105" to="/authors">نویسندگان</NavLink>
            <NavLink className="border-yellow-500 bg-red-800 border-2 font-bold py-1 px-2 rounded-md hover:scale-105" to="/staff">کارکنان</NavLink>
            <NavLink className="border-yellow-500 bg-red-800 border-2 font-bold py-1 px-2 rounded-md hover:scale-105" to="/listOfLoans">امانت ها</NavLink>
            <NavLink className="border-yellow-500 bg-red-800 border-2 font-bold py-1 px-2 rounded-md hover:scale-105" to="/">خانه</NavLink>
            <NavLink className="border-yellow-500 bg-red-800 border-2 font-bold py-1 px-2 rounded-md hover:scale-105" to="/signUp">ثبت نام</NavLink>
        </div>
    );
}

export default Header;