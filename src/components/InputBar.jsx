import React, { useContext, useState } from 'react'
import Button from '@mui/material/Button';
import { doc, updateDoc, arrayUnion, arrayRemove, Timestamp, serverTimestamp } from "firebase/firestore";
import { db, storage } from '../firebase';
import { StateContext } from '../ChatContext';
import { AuthContext } from '../Auth';
import { v4 as uuid } from 'uuid';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

function InputBar() {

    const [text, setText] = useState("")
    const [img, setImg] = useState(null)
    const state = useContext(StateContext)
    const currentUser = useContext(AuthContext)
    console.log(state.chatId);

    const handleSendMessage = async () => {
        if (img) {
            const storageRef = ref(storage, uuid());
            const uploadTask = uploadBytesResumable(storageRef, img);
            uploadTask.on('state_changed',
                (snapshot) => {
                    // Observe state change events such as progress, pause, and resume
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            break;

                    }
                },
                (error) => {
                    // Handle unsuccessful uploads
                    console.log(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        await updateDoc(doc(db, "chat", state?.chatId), {
                            messages: arrayUnion({
                                text,
                                image: downloadURL,
                                senderId: currentUser.uid,
                                uid: uuid(),
                                date: Timestamp.now()
                            })
                        });
                    });
                }
            );


        } else {
            await updateDoc(doc(db, "chat", state?.chatId), {
                messages: arrayUnion({
                    text,
                    senderId: currentUser.uid,
                    uid: uuid(),
                    date: Date.now()
                })
            });
        }
        await updateDoc(doc(db, "userChat", currentUser.uid), {
            [state.chatId + ".lastMessage"]: text,
            [state.chatId + ".date"]: Date.now()

        })
        await updateDoc(doc(db, "userChat", state.user?.uid), {
            [state.chatId + ".lastMessage"]: text,
            [state.chatId + ".date"]: Date.now()

        })
        console.log('done this');
        setImg(null)
        setText('')
    }

    return (
        <div className='w-full gap-5 items-center flex h-[70px] bg-white'>
            <textarea onChange={(e) => setText(e.target.value)} value={text} style={{ outline: 'none' }} type="text" placeholder='Type something...' className='resize-none flex-1 h-full p-5' name="" id="" cols="30" rows="10"></textarea>
            <label htmlFor='file' class="fa-solid cursor-pointer text-2xl fa-image"></label>
            <input style={{ display: 'none' }} onChange={(e) => setImg(e.target.files[0])} type="file" id='file' />
            <i class="fa-solid text-2xl fa-microphone"></i>
            <Button onClick={handleSendMessage} variant="contained"><i class="fa-solid text-xl p-3.5 fa-paper-plane"></i></Button>
        </div>
    )
}

export default InputBar