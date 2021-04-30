import logo from "./logo.svg";
import "./App.css";
import liff from "@line/liff";
import React, { useEffect, useState } from "react";
import firestore from "./database/firebase";

function App() {
  const [pictureUrl, setPictureUrl] = useState(logo);
  const [idToken, setIdToken] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [userId, setUserId] = useState("");
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
    //const idToken = liff.getIDToken();
    //setIdToken(idToken);
    liff
      .getProfile()
      .then(profile => {
        const obj = profile;
        const mpoint = "";
        obj.emailId = liff.getDecodedIDToken().email;
        obj.memberPoint = mpoint;

        const addUserHandler = obj => {
          //const id = "myID#"+Math.random(999).toString();
          const ref = firestore.collection("users").doc(obj.userId);

          //console.log(obj.userId);

          ref.get().then(doc => {
            if (!doc.data()) {
              ref
                //.doc(id)
                .set(obj)
                .then(() => {
                  console.log("add success");

                  const obj2 = obj;

                  async function getuserProfile() {
                    const userRef = firestore
                      .collection("users")
                      .doc(obj2.userId);

                    const doc2 = await userRef.get();
                    setDisplayName(doc2.data().displayName);
                    setPictureUrl(doc2.data().pictureUrl);
                    setStatusMessage(doc2.data().statusMessage);
                    setUserId(doc2.data().userId);
                    setEmail(doc2.data().emailId);
                    setmemberPoint(doc2.data().memberPoint);

                    console.log(doc2.data());
                    return doc2;
                  }
                  getuserProfile();
                })
                .catch(err => console.log(err));
            } else {
              console.log("มีผู้ใช้นี้แล้ว");

              const obj2 = obj;

              async function getuserProfile() {
                const userRef = firestore.collection("users").doc(obj2.userId);

                const doc2 = await userRef.get();
                setDisplayName(doc2.data().displayName);
                setPictureUrl(doc2.data().pictureUrl);
                setStatusMessage(doc2.data().statusMessage);
                setUserId(doc2.data().userId);
                setEmail(doc2.data().emailId);

                const userRef2 = firestore.collection("users");
                userRef2.onSnapshot(
                  snapshot => {
                    snapshot.forEach(doc => {
                      let point = doc.data().memberPoint;
                      setmemberPoint(point);
                    });
                  },
                  err => {
                    console.log(err);
                  }
                );
                //setmemberPoint(doc2.data().memberPoint);

                //console.log(doc2.data());
              }
              getuserProfile();
            }
          });
        };
        addUserHandler(obj);

        // async function getuserProfile () {
        //   const userRef = firestore.collection("users").doc(obj2.userId);

        //   const doc2 = await userRef.get();
        //   setDisplayName(doc2.data().displayName);
        //   setPictureUrl(doc2.data().pictureUrl);
        //   setStatusMessage(doc2.data().statusMessage);
        //   setUserId(doc2.data().userId);
        //   setEmail(doc2.data().emailId);

        //   if (!doc2.exists) {
        //     console.log('No such document!');
        //   } else {

        //     console.log('Document data:', doc2.data().emailId);
        //   }
        // }
        // getuserProfile ();
        return obj;
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

export default App;