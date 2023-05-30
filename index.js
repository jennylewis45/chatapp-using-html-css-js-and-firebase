var username = document.getElementById("username");

var emailInput = document.getElementById("email");
var fullNameInput = document.getElementById("full-name");
var designationInput = document.getElementById("designation");
var passwordInput = document.getElementById("password");

function setUserDataInBrowser(fullname, email, token) {
    localStorage.setItem("fullName", fullname)
    localStorage.setItem("userEmail", email)
    if (token) {
        localStorage.setItem("token", token)
    }
}

function signUp() {
    var email = emailInput.value;
    var fullName = fullNameInput.value;
    var password = passwordInput.value;

    firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            var user = userCredential.user;

            return user.updateProfile({
                displayName: fullName,
            }).then(() => {
                console.log("User signed up:", user);

                return user.getIdToken().then((idToken) => {
                    var userToken = idToken;
                    setUserDataInBrowser(fullName, email, userToken);
                    window.location.href = "/chat.html";
                });
            });
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.error("Sign up error:", errorCode, errorMessage);
        });
}

function logIn() {
    var email = emailInput.value;
    var password = passwordInput.value;

    firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            var user = userCredential.user;

            var userFullName = user.displayName;
            var userEmail = user.email;
            return user.getIdToken().then((idToken) => {
                var userToken = idToken;
                setUserDataInBrowser(userFullName, userEmail, userToken)
                window.location.href = "/chat.html";

            });
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.error("Login error:", errorCode, errorMessage);
        });
}

function logOut() {
    firebase
        .auth()
        .signOut()
        .then(() => {
            console.log("User logged out.");

            localStorage.removeItem("fullName");
            localStorage.removeItem("userEmail");
            localStorage.removeItem("token");
            window.location.href = "/login.html";
        })
        .catch((error) => {
            console.error("Logout error:", error);
        });
}


function getUser() {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            var userFullName = user.displayName;
            var userEmail = user.email;
            setUserDataInBrowser(userFullName, userEmail)

            username.innerHTML = userFullName
        } else {
            window.location.href = "/login.html";
            console.log("User is not authenticated.");
        }
    });
}



// var firebaseConfig = {
//     apiKey: "AIzaSyDqbiCOGZTaXp8mk_-FkPTgumMtPy4G2UY",
//     authDomain: "chat-app-ff369.firebaseapp.com",
//     projectId: "chat-app-ff369",
//     storageBucket: "chat-app-ff369.appspot.com",
//     messagingSenderId: "106226641869",
//     appId: "1:106226641869:web:95a33ffa8b6fb709ddf284"
//   };


 //var messagesRef = firebase.database().ref('messages');

function sendMessage(){
    


    console.log("hello")
     var messageInput = document.getElementById('message-input');
    var message = messageInput.value;

    

    
    messagesRef.push().set({
      message: message
    })
      .then(function() {
        
        messageInput.value = ''; 
      })
      .catch(function(error) {
        console.error("Error sending message:", error);
      });
  }





  
//   function deleteMessage(messageId) {
//     var messageRef = messagesRef.child(messageId);

//     messageRef.remove()
//       .catch(function(error) {
//         console.error("Error deleting message:", error);
//       });
//   }

//   function displayMessages(messagesRef) {
//     messagesRef.on('child_added', function(snapshot) {
//       var message = snapshot.val().message;
//       var messageId = snapshot.key;

//       var messageElement = document.createElement("div");
//       messageElement.textContent = message;
//       messageElement.classList.add("message");

//       var deleteButton = document.createElement("button");
//       deleteButton.textContent = "Delete";
//       deleteButton.classList.add("delete-button");
//       deleteButton.addEventListener("click", function() {
//         deleteMessage(messageId);
//       });

//       var chatContainer = document.getElementById("chat-container");
//       chatContainer.appendChild(messageElement);
//       messageElement.appendChild(deleteButton);
//     });
//   }

 //displayMessages();




var messagesRef = firebase.database().ref('messages');

messagesRef.on('value', function (snapshot) {
    var messages = snapshot.val();

    for (var key in messages) {
        if (messages.hasOwnProperty(key)) {
            var message = messages[key];
            console.log(message);
        }
    }
});


// var firebaseConfig = {
// };
// firebase.initializeApp(firebaseConfig);

var messagesRef = firebase.database().ref('messages');

displayMessages(messagesRef);
