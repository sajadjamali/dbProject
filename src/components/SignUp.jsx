import Particle from "./Particle";
import '../styles/signUp.css';
import Header from "./Header";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const SignUp = () => {

    const [firstName, setFrirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");
    const [nationalCode, setNationalCode] = useState("");
    const [education, setEducation] = useState("");
    const [phoneNumberError, setPhoneNumberError] = useState(false);
    const [nationalCodeError, setNationalCodeError] = useState(false);
    const [isFillError, setIsFillError] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        let x = parseInt(nationalCode);
        let y = parseInt(phoneNumber);
        let isEmpty = /^[\s]*$/.test(firstName) || /^[\s]*$/.test(lastName)
            || /^[\s]*$/.test(password) || /^[\s]*$/.test(dateOfBirth)
            || /^[\s]*$/.test(phoneNumber) || /^[\s]*$/.test(address)
            || /^[\s]*$/.test(nationalCode) || /^[\s]*$/.test(education);

        if (!isEmpty && nationalCode.length == 10 && !isNaN(x) && phoneNumber.length == 11 && !isNaN(y)) {
            const member = {
                firstName: firstName.trimLeft(),
                lastName: lastName.trimLeft(),
                dateOfBirth: dateOfBirth.trimLeft(),
                nationalCode: Number(nationalCode.trimLeft()),
                education: education.trimLeft(),
                address: address.trimLeft(),
                phoneNumber: Number(phoneNumber.trimLeft()),
                memberShipDate: new Date().toLocaleDateString('fa-IR')
            }
            postMember(member);
            toast.dismiss();
            toast.success('با موفقیت ثبت نام شدید❤');
        } else {
            if (nationalCode.length !== 10 || isNaN(x))
                setNationalCodeError(true);
            if (phoneNumber.length !== 11 || isNaN(y))
                setPhoneNumberError(true);
            if (isEmpty) {
                setIsFillError(true);
            }
        }
    }

    const postMember = async (member) => {
        axios.post('http://localhost:3000/members', member)
            .then(response => {
                console.log('Response:', response.data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    return (
        <div>
            <Header />
            <section className="login-box rounded-lg w-full px-10 min-[500px]:w-10/12 md:w-6/12 lg:w-4/12">
                <h2 className="text-red-700 font-bold text-center border-2 border-yellow-300 rounded-md py-2">ثبت نام</h2>
                <form onSubmit={(e) => handleSubmit(e)} className="font-bold mt-8">
                    <div className="user-box">
                        <input onChange={(e) => { setFrirstName(e.target.value); setIsFillError(false) }} required={true} type="text" name="" />
                        <label>نام</label>
                    </div>
                    <div className="user-box">
                        <input onChange={(e) => { setLastName(e.target.value); setIsFillError(false) }} required={true} type="text" name="" />
                        <label>نام خانوادگی</label>
                    </div>
                    <div className="user-box">
                        <input onChange={(e) => { setPassword(e.target.value); setIsFillError(false) }} required={true} type="password" />
                        <label>رمزعبور</label>
                    </div>
                    <div className="user-box">
                        <input onChange={(e) => { setDateOfBirth(e.target.value); setIsFillError(false) }} required={true} />
                        <label>تاریخ تولد</label>
                    </div>
                    <div className="user-box">
                        <input onChange={(e) => { setPhoneNumber(e.target.value); setPhoneNumberError(false); setIsFillError(false) }} required={true} />
                        <label>شماره تماس</label>
                    </div>
                    {
                        phoneNumberError && <p className="text-red-800 text-center">شماره تماس حتما باید عدد 11 رقمی باشد</p>
                    }
                    <div className="user-box">
                        <input onChange={(e) => { setAddress(e.target.value); setIsFillError(false) }} required={true} type="text" />
                        <label>آدرس</label>
                    </div>
                    <div className="user-box">
                        <input onChange={(e) => { setNationalCode(e.target.value); setNationalCodeError(false); setIsFillError(false) }} required={true} type="text" />
                        <label>کدملی</label>
                    </div>
                    {
                        nationalCodeError && <p className="text-red-800 text-center">کدملی حتما باید عدد 10 رقمی باشد</p>
                    }
                    <div className="user-box">
                        <input onChange={(e) => { setEducation(e.target.value); setIsFillError(false) }} required={true} type="text" />
                        <label>تحصیلات</label>
                    </div>
                    {
                        isFillError && <p className="text-red-800 text-center">لطفا همه ی موارد را وارد کنید</p>
                    }
                    <button type="submit" className="flex w-full justify-center">
                        <a>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            ثبت نام
                        </a>
                    </button>

                </form>
            </section>
            <Particle />
        </div>
    );
}

export default SignUp;