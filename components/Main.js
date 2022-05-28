import Story from "../components/Story"
import Posts from "../components/Posts"
import MinPro from "../components/MinPro"
import Suggestions from "../components/Suggestions"
import {useSession} from "next-auth/react"
function Main() {
    const { data: session } = useSession();
    return (
        <main className={"grid grid-cols-1 md:grid-cols-2 md:max-w-3xl xl:grid-cols-3 xl:max-w-6xl mx-auto bg-gray-50 overflow-y-scroll scrollbar-hide"}>
          <section className="col-span-2">
              <Story />
              <Posts/>
          </section>
          
          {session &&(
              <section className="hidden lg:inline-grid md:col-span-1">
              <div className="fixed top-20">
              <MinPro />
                  <Suggestions />
                  </div>
          </section>
          )
        }
          
          
   </main>
  )
}


export default Main
