
function Suggestions() {
    const { faker } = require('@faker-js/faker'); 
    const arr = [1,2,3,4,5,6,7,8];
  return (
      <div className="mt-5 ml-10">
          <div className="flex justify-between text-sm mb-5">
              <h3 className="text-gray-300">People you may know</h3>
              <button className="text-gray-600 font-semibold">see all</button>
          </div>
          {arr.map((x) => (
    
              <div key={Math.random() * 100} className="flex items-center justify-between mt-3">
                  <img className ="rounded-full border p-[2px] w-10 h-10" src={faker.image.avatar()} alt="" />
              <div className="flex-1 ml-4">
                      <h2 className="font-semibold text-sm" >{faker.name.lastName()}</h2>
                      <h3 className="text-xs text-gray-400">Works at {faker.company.companyName()}</h3>
                  </div>
                  <button className="text-xs text-blue-400 text-bold">Follow</button>
                  </div>
            
          ))}
          
             
          
    </div>
  )
}

export default Suggestions