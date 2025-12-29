importScripts("https://www.gstatic.com/firebasejs/10.7.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.7.0/firebase-messaging-compat.js");

self.firebase.initializeApp({
    appId: "1:123:web:abcd",
    apiKey: "AIzaSyDvn3bH61I30YuzcfeaN46HwExzB4yR0jw",
     authDomain: "docker-ecom.firebaseapp.com",
       messagingSenderId: "836920462176",
   projectId: "docker-ecom",
});

const messaging = self.firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("📩 BG MESSAGE RECEIVED:", payload);

  const title = payload.notification?.title || "Default Title";
  const options = {
    body: payload.notification?.body || "Default body",
  };

  self.registration.showNotification(title, options);
});
