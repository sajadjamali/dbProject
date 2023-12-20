import Particle from "./Particle";
import axios from "axios";
import Header from "./Header";
import { useEffect, useState } from "react";

const Loans = () => {

    const [loans, setLoans] = useState([]);
    const [searchedLoans, setSearchedLoans] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get("http://localhost:3000/listOfLoans");
                setLoans(data);
                setSearchedLoans(data);
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
                <span id="text" className="border-4 border-green-600 py-2 px-8 text-white rounded-md bg-orange-500">اطلاعات امانتی ها</span>
            </div>
            <div className="flexbox my-8">
                <div className="search">
                    <div>
                        <input onChange={(e) => setSearchedLoans(loans.filter(l => l.FirstName.startsWith(e.target.value) || l.LastName.startsWith(e.target.value)))} title="جستجو کن" style={{ direction: "rtl" }} type="text" placeholder="نام عضو موردنظر را وارد کنید" />
                    </div>
                </div>
            </div>
            <table className="relative mt-7 mb-20 text-center bg-red-600 text-white w-full md:w-11/12 min-[1300px]:w-10/12">
                <tbody>
                    <tr>
                        <th>شماره</th>
                        <th>نام</th>
                        <th>نام خانوادگی</th>
                        <th>کدملی</th>
                        <th>نام کتاب</th>
                        <th>تاریخ تحویل</th>
                        <th>تاریخ بازگرداندن</th>
                    </tr>
                    {
                        searchedLoans.map((l, index) => (
                            <tr key={l.Id}>
                                <td>{index + 1}</td>
                                <td>{l.FirstName}</td>
                                <td>{l.LastName}</td>
                                <td>{l.NationalCode}</td>
                                <td>{l.BookName}</td>
                                <td>{l.BorrowDate}</td>
                                <td>{l.ReturnDate}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <Particle />
        </div>
    );
}

export default Loans;