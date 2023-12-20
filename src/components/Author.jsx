import Particle from "./Particle";
import Header from "./Header";
import axios from "axios";
import { useEffect, useState } from "react";

const Author = () => {

    const [authors, setAuthors] = useState([]);
    const [searchedAuthors, setSearchedAuthors] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get("http://localhost:3000/authors");
                setAuthors(data);
                setSearchedAuthors(data);
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
            <div className="flexbox my-8">
                <div className="search">
                    <div>
                        <input onChange={(e) => setSearchedAuthors(authors.filter(a => a.FirstName.startsWith(e.target.value) || a.LastName.startsWith(e.target.value)))} title="جستجو کن" style={{ direction: "rtl" }} type="text" placeholder="نام عضو موردنظر را وارد کنید" />
                    </div>
                </div>
            </div>
            <table className="relative mt-7 mb-20 text-center bg-red-600 text-white w-full md:w-11/12 min-[1300px]:w-10/12">
                <tbody>
                    <tr>
                        <th>شماره</th>
                        <th>نام</th>
                        <th>نام خانوادگی</th>
                        <th>تاریخ تولد</th>
                        <th>تحصیلات</th>
                    </tr>
                    {
                        searchedAuthors.map((a, index) => (
                            <tr key={a.Id}>
                                <td>{index + 1}</td>
                                <td>{a.FirstName}</td>
                                <td>{a.LastName}</td>
                                <td>{a.DateOfBirth}</td>
                                <td>{a.Education}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <Particle />
        </div>
    );
}

export default Author;