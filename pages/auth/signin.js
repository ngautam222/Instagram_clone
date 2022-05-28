import { getProviders, signIn } from "next-auth/react"
import Header from "../../components/Header"

function signin({ providers }) {
  return (
      <>
          <Header />
          <div className="flex-col flex justify-between items-center min-h-screen py-2">
              <img classname="h-10 w-10" src="http://www.pngplay.com/wp-content/uploads/1/Instagram-Logo-Transparent-Image.png" alt="" />
          <div className="mt-40">
          {Object.values(providers).map(provider => (
              <div key={provider.name}>
                  <button className="p-4 bg-blue-600 rounded-lg text-white items-center"onClick={() => signIn(provider.id,{callbackUrl:"/"})}>
                      Sign in with {provider.name}
                  </button>
              </div>
          ))}
            </div>
          </div>
         
      </>
  )
}
export async function getServerSideProps() {
    const providers = await getProviders();

    return {
        props: {
            providers
        }
    }
}

export default signin