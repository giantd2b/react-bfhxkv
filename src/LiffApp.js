import logo from "./logo.svg";
import "./App.css";
import liff from "@line/liff";
import React, { useEffect, useState } from "react";
import { firestore } from "./database/firebase";

function LiffApp() {
  const [pictureUrl, setPictureUrl] = useState(logo);
  const [idToken, setIdToken] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [userId, setUserId] = useState([]);
  const [email, setEmail] = useState("");
  const [memberPoint, setmemberPoint] = useState("");

  const logout = () => {
    liff.logout();
    window.location.reload();
  };

  const initLine = () => {
    liff.init(
      { liffId: "1655038597-qEd8MEr4" },
      () => {
        if (liff.isLoggedIn()) {
          runApp();
        } else {
          liff.login();
        }
      },
      err => console.error(err)
    );
  };

  const runApp = () => {
    liff
      .getProfile()
      .then(profile => {
        const mpoint = "";
        profile.emailId = liff.getDecodedIDToken().email;
        profile.memberPoint = mpoint;
        console.log(profile);

        //const addUserHandler =//
        const addUserHandler = profile => {
          const ref = firestore.collection("users").doc(profile.userId);
          console.log(ref.id);
          ref.get().then(doc => {
            if (!doc.data()) {
              ref
                .set(profile)
                .then(() => {
                  console.log("add success");
                  getuserProfile();
                })
                .catch(err => console.log(err));
            } else {
              console.log("มีผู้ใช้นี้แล้ว");
              getuserProfile();
            }
          });
        };

        addUserHandler(profile);

        async function getuserProfile() {
          const userRef = firestore.collection("users").doc(profile.userId);
          const doc = await userRef.get();
          setDisplayName(doc.data().displayName);
          setPictureUrl(doc.data().pictureUrl);
          setStatusMessage(doc.data().statusMessage);
          setUserId(doc.data().userId);
          setEmail(doc.data().emailId);
          setmemberPoint(doc.data().memberPoint);
        }

        console.log(profile);
      })

      .catch(err => console.error(err));
  };

  useEffect(() => {
    initLine();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <div style={{ textAlign: "center" }}>
          <h1>ระบบสมาชิกร้าน</h1>
          <h1>ไอริสคิทเช่น x แดกนัว</h1>
          <hr />
          <img src={pictureUrl} width="300px" height="300px" />
          <p
            style={{
              textAlign: "left",
              marginLeft: "20%",
              marginRight: "20%",
              wordBreak: "break-all"
            }}
          >
            <b>แต้มสะสม: {memberPoint} </b>
            <b> แต้ม</b>
          </p>
          <p
            style={{
              textAlign: "left",
              marginLeft: "20%",
              marginRight: "20%",
              wordBreak: "break-all"
            }}
          >
            <b>ชื่อสมาชิก: </b> {displayName}
          </p>

          <p
            style={{
              textAlign: "left",
              marginLeft: "20%",
              marginRight: "20%",
              wordBreak: "break-all"
            }}
          >
            <b> รหัสสมาชิก: </b> {userId}
          </p>
          <p
            style={{
              textAlign: "left",
              marginLeft: "20%",
              marginRight: "20%",
              wordBreak: "break-all"
            }}
          >
            <b>Email: </b> {email}
          </p>

          <button
            onClick={() => logout()}
            style={{ width: "100%", height: 30 }}
          >
            Logout
          </button>
        </div>
      </header>
    </div>
  );
}

export default LiffApp;
