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

const getFormattedDateAndTime = createdAt => new Intl
  .DateTimeFormat('pt-BR', { dateStyle: 'short', timeStyle: 'short' })
  .format(createdAt.toDate())

const renderGame = docChange => {
  const [id, { title, developedBy, createdAt }] = [docChange.doc.id, docChange.doc.data()]

  const gameTitle = document.createElement('h5')
  gameTitle.textContent = title

  const ul = document.createElement('ul')

  const gameLi = document.createElement('li')
  gameLi.setAttribute('class', 'my-4')
  gameLi.setAttribute('data-id', id)

  const button = document.createElement('button')
  button.setAttribute('data-remove', id)
  button.setAttribute('class', 'btn btn-danger btn-sm')
  button.textContent = 'Remover'

  const developedByLi = document.createElement('li')
  developedByLi.textContent = `Desenvolvido por ${developedBy}`

  const createdAtLi = document.createElement('li')
  createdAtLi.textContent = `Adicionado no banco em ${getFormattedDateAndTime(createdAt)}`

  gameLi.append(gameTitle, ul, button)
  ul.append(developedByLi, createdAtLi)
  gamesList.append(gameLi)
}

const renderGameList = snapshot => {
  snapshot.docChanges().forEach(docChange => {
    if (docChange.type === 'removed') {
      const gameLi = document.querySelector(`[data-id="${docChange.doc.id}"]`)
      gameLi.remove()
      return
    }

    renderGame(docChange)
  })
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

const deleteDocGame = async e => {
  const removeButtonId = e.target.dataset.remove

  if (!removeButtonId) {
    return
  }

  try {
    const dbGame = doc(db, 'games', removeButtonId)
    await deleteDoc(dbGame)

    console.log('Jogo removido com sucesso!')
  } catch ({ message }) {
    console.log(message)
  }
}

const handleSnapshotError = error => console.log(error)

onSnapshot(collectionGames, snapshot => {
  if (!snapshot.metadata.hasPendingWrites) {
    renderGameList(snapshot)
  }

}, handleSnapshotError)

formAddGame.addEventListener('submit', createDocGame)
gamesList.addEventListener('click', deleteDocGame)

// The code below shows how to modificate the doc when needed

// const eldenRingRef = doc(db, 'games', 'rAlBUm3aTBpRyVoNt1gn') //doc id inserted manually
// updateDoc(eldenRingRef, { title: 'Demon\s Souls', newField: 'field criado' })
//   .then(console.log('Jogo atualizado!'))
//   .catch(console.log)

// The updateDoc create a new field if the field does not exists on that doc