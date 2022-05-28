import Image from "next/image"
import {
    HeartIcon,
    HomeIcon,
    MenuIcon,
    PaperAirplaneIcon,
    PlusCircleIcon,
    SearchIcon,
    UserGroupIcon
} from '@heroicons/react/outline';

import { useSession,signIn,signOut } from "next-auth/react"
import { useRouter } from "next/router";
import { modalState } from "../atom/modalAtom"
import {useRecoilState} from "recoil"


function Header() {
    const { data: session } = useSession()
    const router = useRouter();
    const [open,setOpen] = useRecoilState(modalState)
    console.log(session);
    
    return (
      <div className="sticky top-0 border-b bg-white z-50">
      <div className="flex justify-between bg-white max-w-6xl mx-5 lg:mx-auto">
          {/* left */}
          <div className="relative  w-24 hidden lg:inline-grid cursor-pointer">
                    <Image onClick={() => router.push("/")} src='http://www.pngplay.com/wp-content/uploads/1/Instagram-Logo-Transparent-Image.png'
              layout = 'fill' objectFit="contain" />
                </div>
                
                <div className="relative h-10 w-10 lg:hidden flex-shrink-0 cursor-pointer">
                    <Image onClick={() => router.push("/")} src='http://sguru.org/wp-content/uploads/2018/01/instagram-logo-black-transparent.png'
              layout = 'fill' objectFit="contain" />
          </div>
          
                {/* mid */}
                <div className="max-w-xs">
                <div className = "mt-1 relative p-3 rounded-md "> 
                <div className ="absolute inset-y-0 pl-3 flex items-center pointer-events-none">
                        <SearchIcon className="h-5 w-5 text-gray-500"/>
                    </div>
                    <input  className = "bg-gray-100 block w-full pl-10 sm: text-sm rounded-md border-gray-400 focus:ring-black focus:border-black " type="text" placeholder="Search"/>
                    </div>
                    </div>
                {/* middle */}
                <div className="flex items-center justify-end space-x-4">
                    <HomeIcon className="btn" onClick={()=>router.push("/")} />
                    <MenuIcon className="md:hidden cursor-pointer h-6 " />
                    {session ? (
                        <>
                               <div className ="relative btn">
                               <PaperAirplaneIcon className="btn rotate-45" />
                               <div className="absolute -top-1 -right-2 text-xs w-5 h-5 bg-red-400 rounded-full
                               justify-center flex animate-pulse">7</div>
                           </div>
                           <PlusCircleIcon onClick={()=>setOpen(true)} className="btn" />
                           <UserGroupIcon className="btn" />
                           <HeartIcon className="btn" />
                            <img onClick={signOut} src={session?.user?.image} alt="user" className=" w-10 h-10 rounded-full hover:scale-125 cursor-pointer" />
                            </>
                    ) : (
                            <button onClick={signIn}>Sign in</button>
                    )
                    }
             
                    </div>
                
            </div>
            </div>
  )
}


export default Header