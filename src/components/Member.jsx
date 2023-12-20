import Particle from "./Particle";
import Header from "./Header";
import axios from "axios";
import { useEffect, useState } from "react";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const Member = () => {

    const [members, setMembers] = useState([]);
    const [searchedMembers, setShearchedMembers] = useState([]);
    const [sortItem, setSortItem] = useState("صعودی برحسب نام");
    const [showSortList, setShowSortList] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res1 = await axios.get("http://localhost:3000/members");
                const res2 = await axios.get("http://localhost:3000/addresses");
                const membersArr = res1.data;
                const addressesArr = res2.data;
                for (let i = 0; i < membersArr.length; i++) {
                    const address = addressesArr[membersArr[i].Address - 1];
                    membersArr[i].Address = `${address.City} خ ${address.Street} ک ${address.Alley} پ${address.Plaque}`;
                }
                setMembers(membersArr);
                setShearchedMembers(membersArr);
            } catch (err) {
                console.log(err);
            }
        }
        fetchData();
    }, []);

    const handleDelete = (nationalCode) => {
        setMembers(members.filter(m => m.NationalCode != nationalCode));
        setShearchedMembers(members.filter(m => m.NationalCode != nationalCode));
        axios.delete(`http://localhost:3000/members/${nationalCode}`)
            .then(response => {
                console.log('Response:', response.data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    const handleSort = async (p) => {
        if (p === "S")
            p = "membersS";
        else
            p = "membersN";

        try {
            const { data } = await axios.get(`http://localhost:3000/${p}`);
            setShearchedMembers(data);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="overflow-y-auto">
            <Header />
                <section style={{ direction: "ltr" }} className="absolute z-20 flex justify-center mt-10 ml-32">
                    <div style={{ top: -27 }} className="w-14 h-14 z-30 absolute left-40">
                        <div className="circle circle1"></div>
                        <div className="circle circle2"></div>
                        <div className="circle circle3"></div>
                        <div className="circle circle4"></div>
                        <div className="circle circle5"></div>
                    </div>
                    <div style={{ backgroundColor: "rgba(10, 10, 10, 0.8)" }} className="border-2 inline-flex flex-col font-bold z-10 text-white rounded-md border-red-600">
                        <button className="flex justify-center space-x-1 w-48 items-center py-2 px-3 hover:scale-105" onClick={() => setShowSortList(x => !x)}>
                            <p>{sortItem}</p>
                        </button>
                        <div className={`${showSortList ? "block" : "hidden"} text-center overflow-hidden`}>
                            <button className="border-t-2 border-red-600 py-2 px-7 w-full  hover:scale-105" onClick={() => { setSortItem("صعودی برحسب نام"); setShowSortList(false); handleSort("S") }}>صعودی برحسب نام</button>
                            <br />
                            <button className="border-t-2 border-red-600 py-2 px-7 w-full hover:scale-105" onClick={() => { setSortItem("نزولی برحسب نام"); setShowSortList(false); handleSort("N") }}>نزولی برحسب نام</button>
                        </div>
                    </div>
                </section>

                <div id="caption" className="flex relative justify-center mt-10">
                    <span id="text" className="border-4 border-green-600 py-2 px-8 text-white rounded-md bg-orange-500">اطلاعات کتب</span>
                </div>
            <div className="flexbox my-8">
                <div className="search">
                    <div>
                        <input onChange={(e) => setShearchedMembers(members.filter(m => m.FirstName.startsWith(e.target.value) || m.LastName.startsWith(e.target.value)))} title="جستجو کن" style={{ direction: "rtl" }} type="text" placeholder="نام عضو موردنظر را وارد کنید" />
                    </div>
                </div>
            </div>
            <table className="relative mt-7 mb-20 text-center bg-red-600 text-white w-full md:w-11/12 min-[1300px]:w-10/12">
                <tbody>
                    <tr>
                        <th>حذف عضو</th>
                        <th>شماره</th>
                        <th>نام</th>
                        <th>نام خانوادگی</th>
                        <th>تاریخ تولد</th>
                        <th>کدملی</th>
                        <th>تحصیلات</th>
                        <th>آدرس</th>
                        <th>شماره تماس</th>
                        <th>تاریخ عضویت</th>
                    </tr>
                    {
                        searchedMembers.map((m, index) => (
                            <tr key={m.NationalCode}>
                                <td title="کلیک کن تا عضو موردنظر حذف شه" className="text-blue-950"><button onClick={() => handleDelete(m.NationalCode)}><DeleteForeverIcon fontSize="large" /></button></td>
                                <td>{index + 1}</td>
                                <td>{m.FirstName}</td>
                                <td>{m.LastName}</td>
                                <td>{m.DateOfBirth}</td>
                                <td>{m.NationalCode}</td>
                                <td>{m.Education}</td>
                                <td>{m.Address}</td>
                                <td>{m.PhoneNumber}</td>
                                <td>{m.MemberShipDate}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <Particle />
        </div>
    );
}

export default Member;