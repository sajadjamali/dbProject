import Particle from "./Particle";
import axios from "axios";
import Header from "./Header";
import { useEffect, useState } from "react";
import '../styles/modal.css';
import { toast } from "react-toastify";
import "../styles/searchBox.css";

const Book = () => {

    const [books, setBooks] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [bookName, setBookName] = useState(0);
    const [nationalCode, setNationalCode] = useState(0);
    const [members, setMembers] = useState([]);
    const [error, setError] = useState(false);
    const [count, setCount] = useState(0);
    const [serchedBooks, setSerchedBooks] = useState([]);
    const [category, setCategory] = useState("همه");
    const [showCategoryList, setShowCategoryList] = useState(false);
    const [sortItem, setSortItem] = useState("صعودی برحسب نام");
    const [showSortList, setShowSortList] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res1 = await axios.get("http://localhost:3000/books");
                const res2 = await axios.get("http://localhost:3000/authors");
                const res3 = await axios.get("http://localhost:3000/members");
                const res4 = await axios.get("http://localhost:3000/listOfLoans");
                const booksArr = res1.data;
                const authorArr = res2.data;
                for (let i = 0; i < booksArr.length; i++) {
                    const author = authorArr[booksArr[i].Author - 1];
                    booksArr[i].Author = `${author.FirstName} ${author.LastName}`;
                }
                setBooks(booksArr);
                setSerchedBooks(booksArr);
                setMembers(res3.data);
                setCount(res4.data.length);
            } catch (err) {
                console.log(err);
            }
        }
        fetchData();
    }, []);

    const handleClick = (Isbn) => {
        setShowModal(true);
        setBookName(Isbn);
    }

    window.onclick = function (event) {
        var modal = document.getElementById("myModal");
        if (event.target == modal) {
            setShowModal(false);
        }
    }

    const handleSubmit = (e) => {
        console.log(count);
        e.preventDefault();
        const currentDate = new Date();
        let borrowDate = currentDate.toLocaleDateString('fa-IR');
        currentDate.setDate(currentDate.getDate() + 30)
        const returnDate = currentDate.toLocaleDateString('fa-IR');
        for (let i = 0; i < members.length; i++) {
            if (nationalCode == members[i].NationalCode) {
                setNationalCode(nationalCode);
                setShowModal(false);
                setCount(count + 1);
                const borrowItem = {
                    id: count + 1,
                    borrowerName: members[i].NationalCode,
                    bookName,
                    borrowDate,
                    returnDate,
                }
                postBorrow(borrowItem);
                toast.dismiss();
                toast.success('امانت داده شد❤');
                break;
            } else {
                setError(true);
            }
        }
    }

    const postBorrow = async (borrowItem) => {
        axios.post('http://localhost:3000/borrow', borrowItem)
            .then(response => {
                console.log('Response:', response.data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    const handleSort = async (p) => {
        if (p === "S")
            p = "booksS";
        else
            p = "booksN";

        try {
            const { data } = await axios.get(`http://localhost:3000/${p}`);
            setSerchedBooks(data);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="overflow-y-auto">
            <Header />
            <div className="flex justify-center items-center mt-72">
                <section style={{ direction: "ltr" }} className="z-20 absolute flex justify-center left-1/2">
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
                <section style={{ direction: "ltr" }} className="z-20 absolute flex justify-center mr-10 right-1/2">
                    <div style={{ top: -27 }} className="w-14 h-14 z-30 absolute left-32">
                        <div className="circle circle1"></div>
                        <div className="circle circle2"></div>
                        <div className="circle circle3"></div>
                        <div className="circle circle4"></div>
                        <div className="circle circle5"></div>
                    </div>
                    <div style={{ backgroundColor: "rgba(10, 10, 10, 0.8)" }} className="border-2 inline-flex flex-col font-bold z-10 text-white rounded-md border-red-600">
                        <button className="flex justify-center space-x-1 items-center py-2 px-3 w-40 hover:scale-105" onClick={() => setShowCategoryList(x => !x)}>
                            <p>{category}</p>
                        </button>
                        <div className={`${showCategoryList ? "block" : "hidden"} text-center`}>
                            <button className="border-t-2 border-red-600 py-2 px-7 w-full  hover:scale-105" onClick={() => { setSerchedBooks(books); setCategory("همه"); setShowCategoryList(false) }}>همه</button>
                            <br />
                            <button className="border-t-2 border-red-600 py-2 px-7 w-full hover:scale-105" onClick={() => { setSerchedBooks(books.filter(b => b.Category === "کودکان")); setCategory("کودکان"); setShowCategoryList(false) }}>کودکان</button>
                            <br />
                            <button className="border-t-2 border-red-600 py-2 px-7 w-full hover:scale-105" onClick={() => { setSerchedBooks(books.filter(b => b.Category === "جغرافیا")); setCategory("جغرافیا"); setShowCategoryList(false) }}>جغرافیا</button>
                            <br />
                            <button className="border-t-2 border-red-600 py-2 px-7 w-full hover:scale-105" onClick={() => { setSerchedBooks(books.filter(b => b.Category === "علمی")); setCategory("علمی"); setShowCategoryList(false) }}>علمی</button>
                            <br />
                            <button className="border-t-2 border-red-600 py-2 px-7 w-full hover:scale-105" onClick={() => { setSerchedBooks(books.filter(b => b.Category === "روانشناسی")); setCategory("روانشناسی"); setShowCategoryList(false) }}>روانشناسی</button>
                            <br />
                            <button className="border-t-2 border-red-600 py-2 px-7 w-full hover:scale-105" onClick={() => { setSerchedBooks(books.filter(b => b.Category === "تاریخ")); setCategory("تاریخ"); setShowCategoryList(false) }}>تاریخ</button>
                            <br />
                            <button className="border-t-2 border-red-600 py-2 px-7 w-full hover:scale-105" onClick={() => { setSerchedBooks(books.filter(b => b.PublisherName === "انتشارات فرهنگی")); setCategory("انتشارات فرهنگی"); setShowCategoryList(false) }}>انتشارات فرهنگی</button>
                            <br />
                            <button className="border-t-2 border-red-600 py-2 px-7 w-full hover:scale-105" onClick={() => { setSerchedBooks(books.filter(b => b.PublisherName === "انتشارات مرکزی")); setCategory("انتشارات مرکزی"); setShowCategoryList(false) }}>انتشارات مرکزی</button>
                            <br />
                            <button className="border-t-2 border-red-600 py-2 px-7 w-full hover:scale-105" onClick={() => { setSerchedBooks(books.filter(b => b.PublisherName === "انتشارات فاطمی")); setCategory("انتشارات فاطمی"); setShowCategoryList(false) }}>انتشارت فاطمی</button>
                            <br />
                            <button className="border-t-2 border-red-600 py-2 px-7 w-full hover:scale-105" onClick={() => { setSerchedBooks(books.filter(b => b.PublisherName === "نشریه ی انقلاب")); setCategory("نشریه ی انقلاب"); setShowCategoryList(false) }}>نشریه ی انقلاب</button>
                            <br />
                            <button className="border-t-2 border-red-600 py-2 px-7 w-full hover:scale-105" onClick={() => { setSerchedBooks(books.filter(b => b.PublisherName === "نشریه خراسان")); setCategory("نشریه خراسان"); setShowCategoryList(false) }}>نشریه خراسان</button>
                            <br />
                            <button className="border-t-2 border-red-600 py-2 px-7 w-full hover:scale-105" onClick={() => { setSerchedBooks(books.filter(b => b.PublisherName === "انتشارات مبتکران")); setCategory("انتشارات مبتکران"); setShowCategoryList(false) }}>انتشارات مبتکران</button>
                        </div>
                    </div>
                </section>
            </div>
            <div id="caption" className="flex relative justify-center mt-16">
                <span id="text" className="border-4 border-green-600 py-2 px-8 text-white rounded-md bg-orange-500">اطلاعات کتب</span>
            </div>
            <div className="flexbox my-8">
                <div className="search">
                    <div>
                        <input id="searchBox" onChange={(e) => setSerchedBooks(books.filter(b => b.BookName.startsWith(e.target.value)))} title="جستجو کن" style={{ direction: "rtl" }} type="text" placeholder="نام کتاب موردنظر را وارد کنید" />
                    </div>
                </div>
            </div>
            < table className="relative mt-9 mb-20 text-center bg-red-600 text-white w-full md:w-11/12 min-[1300px]:w-10/12" >
                <tbody>
                    <tr>
                        <th>امانت گرفتن</th>
                        <th>شماره</th>
                        <th>نام کتاب</th>
                        <th>نام نویسنده</th>
                        <th>کتگوری</th>
                        <th>شابک</th>
                        <th>قیمت</th>
                        <th>سال انتشار</th>
                        <th>منتشرکننده</th>
                    </tr>
                    {
                        serchedBooks.map((b, index) => (
                            <tr key={b.Isbn}>
                                <td><button onClick={() => handleClick(b.Isbn)} className="text-black font-bold">امانت میخوام</button></td>
                                <td>{index + 1}</td>
                                <td>{b.BookName}</td>
                                <td>{b.Author}</td>
                                <td>{b.Category}</td>
                                <td>{b.Isbn}</td>
                                <td>{b.Price}
                                    تومان
                                    000
                                </td>
                                <td>{b.PublishYear}</td>
                                <td>{b.PublisherName}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table >
            {
                showModal &&
                <div>
                    <div id="myModal" className={`modal ${showModal ? "block" : "none"}`}>
                        <div className="modal-content flex flex-col rounded-md bg-orange-500 pb-4 px-2 md:w-5/12 lg:w-3/12">
                            <span onClick={() => setShowModal(false)} className="text-5xl cursor-pointer self-end text-red-800 hover:text-blue-800 hover:scale-105">&times;</span>
                            <p className="text-center text-blue-950">  کدملی خود را وارد کنید</p>
                            <form onSubmit={(e) => handleSubmit(e)} className="w-full flex flex-col justify-center">
                                <input required={true} onChange={(e) => { setNationalCode(e.target.value); setError(false) }} type="text" className="rounded-md mt-2 w-10/12 hover:outline-none m-auto h-10" />
                                {
                                    error &&
                                    <p className="text-center mt-2 font-bold text-blue-950">عضوی با این کدملی وجود ندارد😑</p>
                                }
                                <button type="submit" className="bg-red-800 text-white py-2 w-10/12 m-auto mt-3 rounded-md">ثبت</button>
                            </form>
                        </div>
                    </div>
                </div>
            }
            <Particle />
        </div >
    );
}

export default Book;