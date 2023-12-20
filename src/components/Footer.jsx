import TelegramIcon from '@mui/icons-material/Telegram';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';

const Footer = () => {
  return (
    <div id="footer" className="flex absolute bottom-0 mt-10 w-full items-center justify-center bg-transparent p-6 text-center">
      <div className="flex h-full w-full flex-col items-center justify-center gap-8 md:flex-row lg:justify-between lg:gap-0">
        <div className="order-1 flex h-full w-full items-center justify-center  gap-3 text-2xl lg:order-none ">
          <button className=" text-white/70 hover:scale-110 hover:text-white hover:opacity-100">
            <InstagramIcon className='text-pink-400' fontSize='large' />
          </button>
          <button className=" text-white/70 hover:scale-110 hover:text-white  hover:opacity-100">
            <TwitterIcon className='text-blue-400' fontSize='large' />
          </button>
          <button className=" text-white/70 hover:scale-110 hover:text-white hover:opacity-100">
            <YouTubeIcon className='text-red-400' fontSize='large' />
          </button>
          <button className=" text-white/70 hover:scale-110 hover:text-white hover:opacity-100">
            <TelegramIcon className='text-blue-400' fontSize='large' />
          </button>
        </div>
        <div className="order-1 flex w-full cursor-default flex-col items-center justify-center gap-1 border-x-stone-600 px-4 text-base text-white/70 hover:text-white hover:opacity-100 lg:order-none lg:border-x">
          <p>
            تمامی حقوق مادی و معنوی این سایت متعلق به
            <span className="font-bold text-md text-red-500"> کتابخانه مرکزی </span>
            میباشد
          </p>
        </div>

        <div className="flex h-full w-full flex-col flex-wrap items-center justify-center gap-2 ">
          <button className=" text-white/70 hover:text-white  hover:opacity-100">
            شماره تماس 11111111-021
          </button>
          <button className=" text-white/70 hover:text-white  hover:opacity-100">
            sajjad.jamal53@gmail.com :ایمیل
          </button>
        </div>
      </div>
    </div>
  );
};

export default Footer;