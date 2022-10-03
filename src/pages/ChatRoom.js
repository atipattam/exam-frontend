import React, { useEffect, useState } from "react"
import { db } from "../firebaseConfig"
import firebase from "firebase/app"
const ChatRoom = ({ roomRef, userRef, userName, roomName }) => {
  const [text, setText] = useState("")
  const [message, setMessage] = useState([
    {
      text: "สวัสดี",
      createdBy: {
        userName: "user eiei",
        userRef: "openChat",
      },
    },
  ])
  const getAlldata = async () => {
    try {
      const allData = await db
        .collection("rooms")
        .doc(roomRef)
        .collection("messages")
        .limit(100)
        .orderBy("createdAt")
        .onSnapshot((querySnapshot) => {
          const data = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }))
          setMessage([...message, ...data])
        })
      const data = allData.docs.map((doc) => doc.data())
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  const sendMessage = async () => {
    try {
      const ref = await db
        .collection("rooms")
        .doc(roomRef)
        .collection("messages")
        .add({
          text,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          createdBy: {
            userRef,
            userName,
          },
        })
      setText("")
    } catch (error) {
      console.log(Error)
    }
  }
  useEffect(() => {
    getAlldata()
  }, [db])
  return (
    <>
      <div className="start-header">
        <h6>ห้อง {roomName}</h6>
      </div>
      <div className="chat-container">
        <div style={{ height: "85%", overflowY: "scroll" }}>
          {message.map((data, i) => {
            const key = `data_${i}`
            return (
              <React.Fragment key={key}>
                {data.createdBy.userRef === userRef ? (
                  <div className="me">
                    <div className="message-text">
                      <p>{data.text}</p>
                    </div>
                  </div>
                ) : (
                  <div className="other-user">
                    <p style={{ margin: 0 }} className="user-name">
                      {data.createdBy.userName}
                    </p>
                    <div className="message-text">
                      <p>{data.text}</p>
                    </div>
                  </div>
                )}
              </React.Fragment>
            )
          })}
        </div>
        <div
          style={{
            width: "100%",
            height: "15%",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
          }}
        >
          <input
            className="input"
            style={{ width: "99%" }}
            onChange={(e) => setText(e.target.value)}
            value={text}
            onKeyPress={(e) => {
              const { charCode } = e
              if (charCode === 13) {
                sendMessage()
              }
            }}
          ></input>
          <span
            style={{
              position: "absolute",
              right: 100,
              zIndex: 100,
            }}
          >
            Enter เพื่อส่ง
          </span>
        </div>
      </div>
    </>
  )
}

export default ChatRoom
