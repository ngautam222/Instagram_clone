function Circ({img,username}) {
    return (
        <div >
            <img className="ht-14 w-14 rounded-full p-[1.5px] object-contain cursor-pointer border-red-500 border-2
            hover:scale-125 transition transform duration-200 ease-out"src={img} alt="" />
            <p className="text-xs w-14 truncate text-center ">{username}</p>
      </div>
    )
  }
  
  export default Circ
  