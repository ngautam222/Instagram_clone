import { useEffect ,useState} from "react"
import Circ from "../components/Circ"
import {useSession} from "next-auth/react"
function Story() {
    const { data: session } = useSession();
    const { faker } = require('@faker-js/faker'); 
    const [suggestion,setSuggestion] = useState([])
    useEffect(() => {
        const suggestion = [...Array(20)].map((_, i) => ({
            //...faker.helpers.contextualCard(),
            id:i,
        }) 
            
        )
        setSuggestion(suggestion)
    },[])
  return (
      <div className="flex space-x-2 p-6 bg-white mt-8 border border-gray-200 rounded-sm
      overflow-x-scroll scrollbar-thin scrollbar-thumb-black">
          {session && (
              <Circ img={session?.user?.image} src={session?.user?.image}
              username ={session?.user?.username}/>
          )}
          {suggestion.map(profile => {
              let randomName = faker.name.findName();
              let url = "https://source.unsplash.com/random/100x100?sig=" + Math.random()*100000;
             return  <Circ key={profile.id} img={faker.image.avatar()} username={randomName} />
          })}
    </div>
  )
}

export default Story