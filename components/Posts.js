import Post from '../components/Post';
import { useState,useEffect}  from 'react';
import {db} from "../firebase"
import {onSnapshot,collection,orderBy,query} from "@firebase/firestore"
function Posts() {

    const [Place_holder, setPost] = useState([])
    useEffect(() => {
      const unsubscribe = onSnapshot(query(collection(db, 'posts'), orderBy('timestamp', 'desc')), snapshot => {
            setPost(snapshot.docs);
      })
        return unsubscribe;
    }, [db])
    console.log(Place_holder)
    return (
        <div>
            {Place_holder.map(post => (
                <Post key={post.id} id={post.id}
                    username={post.data().username} userImg={post.data().profileImg}
                img={post.data().image} caption={post.data().caption}/>
            ))}
    </div>
  )
}

export default Posts