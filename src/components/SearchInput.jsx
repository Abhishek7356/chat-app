import React, { useContext, useState } from 'react'
import { collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
import { db } from '../firebase';
import { AuthContext } from '../Auth';

function SearchInput() {
    const [username, setUsername] = useState('')
    const [user, setUser] = useState(null)
    const [err, setErr] = useState(null)
    const currentUser = useContext(AuthContext)


    const searchUser = async () => {
        let q = query(collection(db, "users"), where("username", "==", username));

        try {
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                // console.log(doc.id, " => ", doc.data());
                setUser(doc.data())
            });
        } catch (err) {
            setErr(err)
        }

    }

    const handleKeyDown = (e) => {
        e.code == "Enter" && searchUser()
        // console.log(currentUser);
    }

    const handleSearchUser = async () => {
        //check whether the group(chat in firestore) exist, if not created
        const combineId = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid;
        try {
            const res = await getDoc(doc(db, "chat", combineId));

            if (!res.exists()) {
                //create
                await setDoc(doc(db, "chat", combineId), {
                    messages: []
                })

                //create userChat
                await updateDoc(doc(db, "userChat", currentUser.uid), {
                    [combineId + ".userInfo"]: {
                        uid: user.uid,
                        displayName: user.username,
                        photoUrl: user.profile_pic,
                        lastMessage: ""
                    },
                    [combineId + ".date"]: serverTimestamp()
                })
                await updateDoc(doc(db, "userChat", user.uid), {
                    [combineId + ".userInfo"]: {
                        uid: currentUser.uid,
                        displayName: currentUser.displayName,
                        photoUrl: currentUser.photoURL,
                        lastMessage: ""
                    },
                    [combineId + ".date"]: serverTimestamp()

                })
                console.log("done");
                setUser(null)
                setUsername('')
            }
        } catch (err) {
            console.log(err);
        }

    }

    return (
        <div className='w-full gap-3 flex flex-col items-center justify-center'>
            <input value={username} onKeyDown={handleKeyDown} onChange={(e) => setUsername(e.target.value)} className='focus:outline-none focus:border-b-2 bg-transparent outline-0 w-[90%] mt-3 border-b-2 border-b-gray-400 p-2' type="text" placeholder='Search for friend' />
            {err && <p>{err}</p>}
            {user && <div onClick={handleSearchUser} className='cursor-pointer flex w-full justify-start border-b-2 border-b-gray-400 items-center gap-3 hover:bg-slate-300 p-4'>
                <img className='w-[50px] h-[50px] object-cover rounded-full' src={user.profile_pic} alt="" />
                <h2 className='font-bold text-gray-700'>{user.username}</h2>
            </div>}
        </div>
    )
}

export default SearchInput
