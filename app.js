import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.1/firebase-app.js'
import { getFirestore, collection, getDocs, onSnapshot, addDoc, serverTimestamp, doc, deleteDoc, updateDoc } from 'https://www.gstatic.com/firebasejs/9.0.1/firebase-firestore.js'

const firebaseConfig = {
  apiKey: 'AIzaSyCJdfhVE1hd7QBMLgksySdFaahdlvg0L5Y',
  authDomain: 'first-firebase-project-a6b0d.firebaseapp.com',
  projectId: 'first-firebase-project-a6b0d',
  storageBucket: 'first-firebase-project-a6b0d.appspot.com',
  messagingSenderId: '383557068263',
  appId: '1:383557068263:web:8fb64c4bfe5f50b3c3c942',
  measurementId: 'G-7QZ8HSQDRB'
}

const gamesList = document.querySelector('[data-js="games-list"]')
const formAddGame = document.querySelector('[data-js="add-game-form"]')

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const collectionGames = collection(db, 'games')

const createDocLis = querySnapshot => {
  const gamesLis = querySnapshot.docs.reduce((acc, doc) => {
    const { title, developedBy, createdAt } = doc.data()

    acc += `<li data-id="${doc.id}" class="my-4">
        <h5>${title}</h5>
  
        <ul>
          <li>Desenvolvido por ${developedBy}</li>
          <li>Adicionado no banco em ${new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short', timeStyle: 'short' }).format(createdAt.toDate())}</li>
        </ul>
  
        <button data-remove="${doc.id}" class="btn btn-danger btn-sm">Remover</button>
      </li>`

    return acc
  }, '')

  gamesList.innerHTML = gamesLis
}

const createDocGame = async e => {
  e.preventDefault()

  try {
    const collectionData = await addDoc(collectionGames, {
      title: e.target.title.value.trim(),
      developedBy: e.target.developer.value.trim(),
      createdAt: serverTimestamp()
    })

    console.log('Document criado com o ID', collectionData.id)
    e.target.reset()
    e.target.title.focus()
  } catch ({ message }) {
    console.log(message)
  }
}

const deleteDocGame = e => {
  const removeButtonId = e.target.dataset.remove

  if (removeButtonId) {
    const dbGame = doc(db, 'games', removeButtonId)

    try {
      deleteDoc(dbGame)
      console.log('Jogo removido com sucesso!')
    } catch ({ message }) {
      console.log(message)
    }
  }
}

onSnapshot(collectionGames, querySnapshot => {
  if (!querySnapshot.metadata.hasPendingWrites) {
    createDocLis(querySnapshot)
  }
})

formAddGame.addEventListener('submit', createDocGame)
gamesList.addEventListener('click', deleteDocGame)

// The code below shows how to modificate the doc when needed

// const eldenRingRef = doc(db, 'games', 'rAlBUm3aTBpRyVoNt1gn') //doc id inserted manually
// updateDoc(eldenRingRef, { title: 'Demon\s Souls', newField: 'field criado' })
//   .then(console.log('Jogo atualizado!'))
//   .catch(console.log)

// The updateDoc create a new field if the field does not exists on that doc