var username = document.getElementById("username");

// Your other functions...

function displayMessages(messagesRef) {
  messagesRef.on("child_added", function (snapshot) {
    var message = snapshot.val().message;

    var messageElement = document.createElement("div");
    messageElement.textContent = message;
    messageElement.classList.add("message");

    var messagesContainer = document.getElementById("messages");
    messagesContainer.appendChild(messageElement);
  });
}

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    var userFullName = user.displayName;
    var userEmail = user.email;
    setUserDataInBrowser(userFullName, userEmail);

    username.innerHTML = userFullName;

    var messagesRef = firebase.database().ref("messages");
    displayMessages(messagesRef);
  } else {
    window.location.href = "/login.html";
    console.log("User is not authenticated.");
  }
});
