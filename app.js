// Firebase 설정 - 아래 값은 직접 Firebase에서 복사해 넣어야 작동합니다
const firebaseConfig = {
  apiKey: "AIzaSyBKDLlC5UYASF9VszmKaPrqX2RzS4zT9lI",
  authDomain: "abdsfsdf-bde00.firebaseapp.com",
  databaseURL: "https://abdsfsdf-bde00-default-rtdb.firebaseio.com/",
  projectId: "abdsfsdf-bde00",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();
const dbRef = db.ref("messages");

const blacklist = ["시발", "ㅅㅂ", "ㅈㄴ", "병신", "멍청이"];

function filterMessage(msg) {
  for (let word of blacklist) {
    const stars = "*".repeat(word.length);
    msg = msg.replace(new RegExp(word, 'gi'), stars);
  }
  return msg;
}

function sendMessage() {
  const username = document.getElementById("username").value || "익명";
  let message = document.getElementById("message").value;
  message = filterMessage(message);
  dbRef.push({ user: username, msg: message });
  document.getElementById("message").value = '';
}

dbRef.on("child_added", function(snapshot) {
  const data = snapshot.val();
  const chatBox = document.getElementById("chat-box");
  const newMsg = document.createElement("p");
  newMsg.innerText = `${data.user}: ${data.msg}`;
  chatBox.appendChild(newMsg);
  chatBox.scrollTop = chatBox.scrollHeight;
});
