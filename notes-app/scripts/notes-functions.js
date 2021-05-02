'use strict'

// Read existing notes from local storage
const getSavedNotes = () => {
    const notesJSON = localStorage.getItem('notes')
    try {
        return notesJSON ? JSON.parse(notesJSON) : []
    } catch (e){
        return []
    }
}

// save notes to local storage
const saveNotes = (notes) => {
    localStorage.setItem('notes', JSON.stringify(notes))
}

// remove note button function
const removeNote = (id) => {
    const noteIndex = notes.findIndex((note) =>  note.id === id)
    if(noteIndex > -1){
        notes.splice(noteIndex, 1)
    }
}

// generate the dom structure for note

const generateNoteDOM = (note) => {
    const noteEl = document.createElement('a')
    const textEl = document.createElement('p')
    const statusEl = document.createElement('p')

    //setup note title text
    if(note.title.length > 0){
        textEl.textContent = note.title
    } else {
        textEl.textContent = 'Unnamed note'
    }
    textEl.classList.add('list-item__title')
    noteEl.appendChild(textEl)

    // seting up the link
    noteEl.setAttribute('href', `/edit.html#${note.id}`)
    noteEl.classList.add('list-item')

    //setiing up status message
    statusEl.textContent = generateLastEdited(note.updatedAt)
    statusEl.classList.add('list-item__subtitle')
    noteEl.appendChild(statusEl)

    return noteEl
}

// sort your notes 
const sortNotes = (notes, sortBy) => {
    if(sortBy === 'byEdited'){
        return notes.sort((a,  b) => {
            if(a.updatedAt > b.updatedAt){
                return -1
            } else if (a.updatedAt < b.updatedAt){
                return 1
            } else {
                return 0
            }
        })
    } else if(sortBy === 'byCreated'){
        return notes.sort((a,b) => {
            if(a.createdAt > b.createdAt){
                return -1
            } else if(a.createdAt < b.createdAt){
                return 1
            } else {
                return 0
            }
        })
    } 
    else if(sortBy === 'byAlphabetical') {
        return notes.sort((a,b) => {
            if(a.title.toLowerCase() < b.title.toLowerCase()){
                return -1
            } else if (a.title.toLowerCase() > b.title.toLowerCase()){
                return 1
            } else {
                return 0
            }
        })
    } else {
        return notes
    }
}


// render application notes

const renderNotes = (notes, filter) => {
    const notesEl = document.querySelector('#notes')
    notes = sortNotes(notes, filters.sortBy)
    const filteredNotes = notes.filter((note) => note.title.toLowerCase().includes(filters.searchText.toLocaleLowerCase()))

    notesEl.innerHTML = ''
    if(filteredNotes.length > 0){
        filteredNotes.forEach((note) => {
            const noteEl = generateNoteDOM(note)
            notesEl.appendChild(noteEl)
        })
    } else {
        const emptyMessage = document.createElement('p')
        emptyMessage.textContent = 'No notes to show...'
        emptyMessage.classList.add('empty-message')
        notesEl.appendChild(emptyMessage)
    }
}

// Generate the last edited message
const generateLastEdited = (timestamp) => {
    return `Last edited ${moment(timestamp).fromNow()}`
}








