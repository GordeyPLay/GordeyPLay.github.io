// Импортируй необходимые функции из SDK Firebase
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";

// Firebase конфигурация
const firebaseConfig = {
  apiKey: "AIzaSyDeDNc5rX1PU64qi_bIzAM3COK7axZ_1gA",
  authDomain: "githubsite-922e3.firebaseapp.com",
  databaseURL: "https://githubsite-922e3-default-rtdb.firebaseio.com",
  projectId: "githubsite-922e3",
  storageBucket: "githubsite-922e3.appspot.com",
  messagingSenderId: "434404217253",
  appId: "1:434404217253:web:d7fbdd2c0138ae4870984c"
};

// Инициализация Firebase
const app = initializeApp(firebaseConfig);

// Инициализация сервисов Firebase
const auth = getAuth(app);
const database = getDatabase(app);

// Функция регистрации пользователя
const registerForm = document.getElementById('registerForm');
registerForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      // Запись данных пользователя в Realtime Database
      set(ref(database, 'users/' + user.uid), {
        email: user.email,
        registrationDate: new Date().toISOString()
      });

      // Сообщение об успешной регистрации
      document.getElementById('message').innerText = 'Регистрация успешна!';
    })
    .catch((error) => {
      // Отображение ошибки
      document.getElementById('message').innerText = `Ошибка: ${error.message}`;
    });
});
