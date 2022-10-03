import React, { useState, useEffect } from "react"
import ChatRoom from "./ChatRoom"
import { db } from "../firebaseConfig"
import firebase from "firebase/app"
const FirstSection = () => {
  const [name, setName] = useState("")
  const [showCfBt, setCfBt] = useState(false)
  const [stepValue, setStepValue] = useState("initial-section")
  const [roomName, setRoomName] = useState("")
  const [userRef, setUserRef] = useState("")
  const [roomRef, setRoomRef] = useState("")
  const [showErr, setShowErr] = useState(false)
  const [errMessage, setErrMessage] = useState("")

  const handleCreateuser = async () => {
    try {
      const ref = await db.collection("users").add({ name })
      setUserRef(ref.id)
      setStepValue("choose-section")
    } catch (error) {
      console.log(error)
    }
  }
  const checkAlreadyRoom = async () => {
    const ref = await db
      .collection("rooms")
      .where("roomName", "==", roomName)
      .get()
    const data = ref.docs.map((data) => data.id)
    if (data[0] !== undefined) {
      return false
    }
    return true
  }

  const handleCreateRoom = async () => {
    setShowErr(false)
    try {
      const check = await checkAlreadyRoom()
      if (check) {
        const ref = await db.collection("rooms").add({
          owner: name,
          roomName,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        })
        setRoomRef(ref.id)
        setStepValue("chatroom-section")
      } else {
        setShowErr(true)
        setErrMessage("Room already created")
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleJoinRoom = async () => {
    setShowErr(false)
    try {
      const ref = await db
        .collection("rooms")
        .where("roomName", "==", roomName)
        .get()
      const data = ref.docs.map((data) => data.id)
      if (data[0] !== undefined) {
        setRoomRef(data[0])
        setStepValue("chatroom-section")
      } else {
        setShowErr(true)
        setErrMessage("Room not found")
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    if (name !== "") {
      setCfBt(true)
    } else {
      setCfBt(false)
    }
  }, [name])

  return (
    <>
      {stepValue !== "chatroom-section" ? (
        <div className="first-section">
          {stepValue === "initial-section" && (
            <>
              <div className="title">
                <h6>ชื่อของคุณ</h6>
              </div>
              <div style={{ marginTop: "24px" }}>
                <input
                  className="input"
                  onChange={(e) => {
                    setName(e.target.value)
                  }}
                />
              </div>
              {showCfBt && (
                <div style={{ marginTop: "24px" }}>
                  <button className="acceptButton" onClick={handleCreateuser}>
                    ยืนยัน
                  </button>
                </div>
              )}
            </>
          )}
          {stepValue === "choose-section" && (
            <div className="fadein-section">
              <div className="title">
                <h6>{`คุณ ${name}`}</h6>
              </div>
              <div style={{ marginTop: "160px" }}>
                <button
                  className="createButton"
                  style={{ minWidth: "240px", padding: "16px" }}
                  onClick={() => setStepValue("create-section")}
                >
                  สร้างห้องใหม่
                </button>
              </div>
              <div style={{ marginTop: "8px", textAlign: "center" }}>
                <button
                  className="textButton"
                  onClick={() => setStepValue("join-section")}
                >
                  เข้าร่วมแชท
                </button>
              </div>
            </div>
          )}
          {stepValue === "create-section" && (
            <div className="fadein-section">
              <div className="title">
                <h6>สร้างห้องใหม่</h6>
              </div>
              <div style={{ marginTop: "24px" }}>
                <input
                  className="input"
                  onChange={(e) => {
                    setShowErr(false)
                    setRoomName(e.target.value)
                  }}
                />
              </div>
              <div className="button-wrapper">
                <div>
                  <button
                    className="textButton"
                    onClick={() => setStepValue("choose-section")}
                  >
                    กลับ
                  </button>
                </div>
                <div>
                  <button
                    className="acceptButton"
                    onClick={() => handleCreateRoom()}
                  >
                    ยืนยัน
                  </button>
                </div>
              </div>
            </div>
          )}
          {stepValue === "join-section" && (
            <div className="fadein-section">
              <div className="title">
                <h6>เข้าร่วมห้อง</h6>
              </div>
              <div style={{ marginTop: "24px" }}>
                <input
                  className="input"
                  onChange={(e) => {
                    setShowErr(false)
                    setRoomName(e.target.value)
                  }}
                />
              </div>
              <div className="button-wrapper">
                <div>
                  <button
                    className="textButton"
                    onClick={() => setStepValue("choose-section")}
                  >
                    กลับ
                  </button>
                </div>
                <div>
                  <button
                    className="acceptButton"
                    onClick={() => handleJoinRoom()}
                  >
                    ยืนยัน
                  </button>
                </div>
              </div>
            </div>
          )}
          {showErr && (
            <div style={{ color: "red", marginTop: "16px" }}>
              <p>{errMessage}</p>
            </div>
          )}
        </div>
      ) : (
        <ChatRoom
          roomRef={roomRef}
          userRef={userRef}
          userName={name}
          roomName={roomName}
        />
      )}
    </>
  )
}

export default FirstSection
