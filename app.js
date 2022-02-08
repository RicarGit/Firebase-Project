import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.1/firebase-app.js'
import { getFirestore, collection, getDocs } from 'https://www.gstatic.com/firebasejs/9.0.1/firebase-firestore.js'

const firebaseConfig = {
  apiKey: 'AIzaSyCJdfhVE1hd7QBMLgksySdFaahdlvg0L5Y',
  authDomain: 'first-firebase-project-a6b0d.firebaseapp.com',
  projectId: 'first-firebase-project-a6b0d',
  storageBucket: 'first-firebase-project-a6b0d.appspot.com',
  messagingSenderId: '383557068263',
  appId: '1:383557068263:web:8fb64c4bfe5f50b3c3c942',
  measurementId: 'G-7QZ8HSQDRB'
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

const games = collection(db, 'games')

const getDbData = async games => {
  const querySnapshot = await getDocs(games)
  const gamesLis = querySnapshot.docs.reduce((acc, doc) => {
    const { title, developedBy, createdAt } = doc.data()

    acc += `<li class="my-4">
      <h5>${title}</h5>

      <ul>
        <li>Desenvolvido por ${developedBy}</li>
        <li>Adicionado no banco em ${createdAt.toDate()}</li>
      </ul>

      <button class="btn btn-danger btn-sm">Remover</button>
    </li>`
    return acc
  }, '')

  const gamesList = document.querySelector('[data-js="games-list"]')
  gamesList.innerHTML += gamesLis
}

getDbData(games)