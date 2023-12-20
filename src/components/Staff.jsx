import Particle from "./Particle";
import Header from "./Header";
import axios from "axios";
import { useEffect, useState } from "react";

const Staff = () => {

    const [staff, setStaff] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get("http://localhost:3000/staff");
                setStaff(data);
            } catch (err) {
                console.log(err);
            }
        }
        fetchData();
    }, []);

    return (
        <div className="overflow-y-auto">
            <Header />
            <div id="caption" className="flex relative justify-center mt-10">
                <span id="text" className="border-4 border-green-600 py-2 px-8 text-white rounded-md bg-orange-500">اطلاعات کتب</span>
            </div>
            <table className="relative mt-7 mb-20 text-center bg-red-600 text-white w-full md:w-11/12 min-[1300px]:w-10/12">
                <tbody>
                    <tr>
                        <th>شماره</th>
                        <th>نام</th>
                        <th>نام خانوادگی</th>
                        <th>سن</th>
                        <th>شماره تماس</th>
                        <th>سمت در کتابخانه</th>
                        <th>کدملی</th>
                    </tr>
                    {
                        staff.map((s, index) => (
                            <tr key={s.NationalCode}>
                                <td>{index + 1}</td>
                                <td>{s.FirstName}</td>
                                <td>{s.LastName}</td>
                                <td>{s.age}</td>
                                <td>{s.PhoneNumber}</td>
                                <td>{s.Job}</td>
                                <td>{s.NationalCode}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <Particle />
        </div>
    );
}

export default Staff;