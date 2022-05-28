import { BookmarkIcon, ChatIcon, DotsHorizontalIcon, EmojiHappyIcon, HeartIcon, PaperAirplaneIcon } from "@heroicons/react/outline"
import {HeartIcon as Filled} from "@heroicons/react/solid"
import { useSession } from "next-auth/react"
import Moment from "react-moment"
import {useState,useEffect } from "react"
import { db } from "../firebase"
import {onSnapshot,collection,orderBy,query} from "@firebase/firestore"
import { deleteDoc,addDoc,serverTimestamp,doc,setDoc } from "@firebase/firestore"
function Post({ id, username, userImg, img, caption }) {
    const { data: session } = useSession();
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);
    const [likes, setLikes] = useState([]);
    const [liked, setLiked] = useState(false);
    
    useEffect(() =>
        setLiked(likes.findIndex((like) => (like.id === session?.user?.uid)) !== -1)
        , [likes]);
    
    
    const likePost = async () => { 
        if (liked) {
            await deleteDoc(doc(db,'posts',id,'likes',session.user.uid))
        }
        await setDoc(doc(db, 'posts', id, 'likes', session.user.uid), {
            username:session.user.username
        })
    }
    useEffect(() => onSnapshot(collection(db,'posts',id,'likes'),snapshot =>setLikes(snapshot.docs)),[db] )
    
    useEffect(() => onSnapshot(query(collection(db, 'posts', id, 'comments'), orderBy('timestamp', 'desc')),
    (snapshot)=>setComments(snapshot.docs)), [db])

    const sendComment =  async function(x) {
        x.preventDefault();
        const commentTosend = comment;
        setComment('');

        await addDoc(collection(db, 'posts', id, 'comments'),{
            comment: commentTosend,
            username: session.user.username,
            userImage: session.user.image,
            timestamp:serverTimestamp()
        })
    }
    return (
        <div className='bg-white my-7 rounded-sm border'>
          
            <div className="flex items-center p-5">
                <img src={userImg} alt="" className="rounded-full h-12 w-12 object-contain border p-1 mr-3" />
                <p className="flex-1 font-bold">{username}</p>
                <DotsHorizontalIcon className="h-5" />
            </div>
            <img src={img} className="object-cover w-full" alt="" />
            {session && (
                < div className ="flex justify-between px-5 pt-5">
                    <div className="flex space-x-4">
                        {liked ? (
                            <Filled  onClick= {likePost} className="b2 text-red-600" />
                        ):(<HeartIcon  onClick={ likePost}className="b2" />)}
                        
                <ChatIcon className="b2" />
                <PaperAirplaneIcon className="b2 rotate-45" />
            </div>
            <BookmarkIcon className="b2" />
                </div>)}
            <p className="p-5 truncate">
                {likes.length > 0 && (
                    <p className="font-bold mb-1">likes {likes.length}</p>
                )}
            </p>
                 <div>
              <p className="p-3 truncate">
                  <span className="font-bold mr-2">{username}
                    </span>{caption}</p>
                {comments.length > 0 && (
                    <div className="ml-10 h-20 overflow-y-scroll scrollbar-thumb-black scrollbar-thin">
                        {comments.map((comment) => (
                            <div key={comment.id} className="flex  items-center space-x-2 mb-3">
                                <img className="h-7 rounded-full" src={comment.data().userImage} alt="" />
                                <p className="flex-1 text-sm"><span className="font-bold">
                                    {comment.data().username}
                                </span>{"  "}
                                    {comment.data().comment}</p>
                            <Moment fromNow className ="pr-10 text-gray-300 text-xs">{comment.data().timestamp?.toDate()}</Moment></div>
                        ))}
                        </div>
                )}
                {session && (
              <form className="flex items-center p-4">
                  <EmojiHappyIcon className="h-7" />
                    <input type="text" value={comment}
                        onChange={e=>setComment(e.target.value)}   className="border-none flex-1 pl-2 focus:ring-0 outline-none" placeholder="Comment" />
                  <button  onClick={sendComment}  className="font-semibold text-blue-500">Post</button>

                    </form>
                    )}
              
          </div>
         
      
    </div>
  )
}

export default Post
