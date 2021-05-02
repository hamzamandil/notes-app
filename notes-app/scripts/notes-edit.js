'use strict'

const edited = document.querySelector('#last-edited')
const title = document.querySelector('#note-title')
const body = document.querySelector('#note-body')
const button = document.querySelector('#remove-note')
const noteId = location.hash.substring(1)
let notes = getSavedNotes()
let note = notes.find((note) => note.id === noteId)

if(!note){
    location.assign('/index.html')
}

title.value = note.title
body.value = note.body

edited.textContent = `Last Edited ${moment(note.updatedAt).fromNow()}`

title.addEventListener('input', (e) => {
    note.title = e.target.value
    note.updatedAt = moment().valueOf()
    edited.textContent = `Last Edited ${moment(note.updatedAt).fromNow()}`
    saveNotes(notes)
})
body.addEventListener('input', (e) => {
    note.body = e.target.value
    note.updatedAt = moment().valueOf()
    edited.textContent = `Last Edited ${moment(note.updatedAt).fromNow()}`
    saveNotes(notes)
})


button.addEventListener('click', () => {
    removeNote(noteId)
    saveNotes(notes)
    location.assign('/index.html')
})

window.addEventListener('storage', (e) => {
    if(e.key === 'notes'){
        notes = JSON.parse(e.newValue)
        note = notes.find((note) => note.id === noteId)
        
        if(!note){
            location.assign('/index.html')
        }
        
        title.value = note.title
        body.value = note.body

        edited.textContent = `Last Edited ${moment(note.updatedAt).fromNow()}`
        
    }
})
