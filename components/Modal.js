import { useRecoilState } from "recoil"
import { Dialog, Transition } from "@headlessui/react"
import {Fragment ,useRef ,useState } from "react"
import { modalState } from "../atom/modalAtom"
import { CameraIcon } from "@heroicons/react/outline";
import { db, storage } from "/firebase"
import {useSession} from "next-auth/react"
import { addDoc, collection ,serverTimestamp,updateDoc,doc } from "@firebase/firestore"
import { ref, getDownloadURL, uploadString } from "@firebase/storage"

function Modal() {
    const { data: session } = useSession()
    const [open, setOpen] = useRecoilState(modalState);
    const filePickerRef = useRef(null)
    const captionref = useRef(null)
    const [loading,setLoading] = useState(false)
    const [selectedFile, setSelectedfile] = useState(null)
    const addImageToPost = (x) => {
        const reader = new FileReader();
        if (x.target.files[0]) {
            reader.readAsDataURL(x.target.files[0])
        }
        reader.onload = (readerEvent) => {
            setSelectedfile(readerEvent.target.result);
        }
    }
    const uploadPost = async () => {
        if (loading) return;
        setLoading(true)


        const docRef = await addDoc(collection(db, 'posts'), {
            username: session.user.username,
            caption: captionref.current.value,
            profileImg: session.user.image,
            timestamp: serverTimestamp()
        })
        const imageRef = ref(storage, `posts/${docRef.id}/image`)

        await uploadString(imageRef, selectedFile, "data_url").then(async snapshot => {
            const downloadURL = await getDownloadURL(imageRef);

            await updateDoc(doc(db, 'posts', docRef.id), {
                image:downloadURL
            })
        })
        setOpen(false)
        setLoading(false)
        setSelectedfile(null)
    }
   return (
      <Transition.Root show={open} as={Fragment}>
          <Dialog onClose={setOpen} as="div" className="fixed z-20 inset-0 overflow-y-auto">
              <div className="flex items-end justify-center min-h-[800px] sm:min-h-screen pt-4 px-4 pb-20 text-center
              sm:block sm:p-0">
                  <Transition.Child
                      as={Fragment}
                      enter="ease-out duration-290"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="ease-in duration-200"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0">
                      <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-60 transition-opacity"/>
                  </Transition.Child>
                  <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                      &#8203;
                  </span>
                  <Transition.Child
                      as={Fragment}
                      enter="ease-out duration-290"
                      enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                      enterTo="opacity-100 translate-y-0 sm:scale-100"
                      leave="ease-in duration-200"
                      leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                      leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                      <div className="inline-block align-bottom bg-white rounded-lg px-4
                    pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all">
                          <div>
                               {selectedFile ? (
                                   <img className="w-full object-contain cursor-pointer"
                                       src={selectedFile} alt="" onClick={() => setSelectedfile(null)}  ></img>
                               ): (
            
                                <div className="mx-auto flex items-center justify-center h-12 w-12 round-lg bg-blue-200 cursor-pointer"
                                onClick={()=> filePickerRef.current.click()}>
                              
                               <CameraIcon className=" h-6 w-6 text-red-500"
                                       aria-hidden="true" />
                           </div>
                              
                              )}
                              
                              <div>
                                  <div className="mt-3 text-center sm:mt-5">
                                      <Dialog.Title as="h3"
                                          className=" text-lg loading-6 font-medium text-gray-900">
                                          Upload Photo
                                      </Dialog.Title>
                                      <div>
                                          <input ref={filePickerRef} 
                                              type="file" hidden
                                           onChange = {addImageToPost}
                                          >
                                         </input>
                                      </div>
                                      <div className="mt-2">
                                          <input 
                                              className="border-none focus:ring-0 w-full text-center"
                                               type="text"
                                               ref = {captionref}
                                          placeholder = "Caption???"/>
                                      </div>
                                  </div>

                              </div>
                              <div className="mt-5 sm:mt-6">

                                  <button type="button" className="inline-flex justify-center
                                  w-full rounded-md border-transparent shadow-md
                                  px-4 py-2 bg-red-300 text-base font-mediuem text-white
                                  hover:bg-red-600 focus:outline-none
                                  focus:ring-2 focus:ring-offset-2 focus:ring-red-600
                                  disabled:cursor-not-allowed"
                                       onClick={uploadPost}>{loading ? "Uploading...." : "Upload"}</button>
                              </div>
                          </div>
                    </div>
                  </Transition.Child>
              </div>
              
  </Dialog>
    </Transition.Root>
  )
}

export default Modal