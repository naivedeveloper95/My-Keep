import { addNoteToDB, addTagToDB } from '../firebase/firebaseAPI'

const REMOVE_NOTE = 'REMOVE_NOTE'
const GET_NOTES = 'GET_NOTES'
const GET_TAGS = 'GET_TAGS'
const SET_LAST_INDEX = 'SET_LAST_INDEX'
const GET_NOTE_STRUCTURE = 'GET_NOTE_STRUCTURE'
const UPDATE_STRUCTURE = 'UPDATE_STRUCTURE'
const EDIT_NOTE = 'EDIT_NOTE'
const CLEAR_EDIT_FORM = 'CLEAR_EDIT_FORM'

export const addNote = (note) => (dispatch, getState) => {
  addNoteToDB(note)
}
export const getNotes = (notes) => {
  return {
    type: GET_NOTES,
    payload: notes
  }
}
export const deleteNote = (note) => ({
  type: REMOVE_NOTE,
  payload: note.id
})
export const addTag = (tag) => (dispatch, getState) => {
  addTagToDB(tag)
}
export const getTags = (tags) => {
  return {
    type: GET_TAGS,
    payload: tags
  }
}

export const setLastIndex = (lastIndex) => {
  return {
    type: SET_LAST_INDEX,
    payload: lastIndex
  }
}
export const getNoteStructure = (noteStructure) => {
  return {
    type: GET_NOTE_STRUCTURE,
    payload: noteStructure
  }
}
export const updateStructureLocally = (newStructure) => {
  return {
    type: UPDATE_STRUCTURE,
    payload: newStructure
  }
}

export const editNote = (note) => {
  return {
    type: EDIT_NOTE,
    payload: note
  }
}

export const clearEditNote = () => {
  return {
    type: CLEAR_EDIT_FORM
  }
}

const initialState = {
  notes: [],
  structure: {},
  tags: [],
  noteStructure: {},
  lastIndex: 0,
  editedNote: {}
}

export const notes = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_NOTES':
      return {
        ...state,
        notes: action.payload
      }
    case 'REMOVE_NOTE':
      const newNotes = {}
      for (let prop in state.notes) {
        if (prop !== action.payload) {
          newNotes[prop] = state.notes[prop]
        }
      }
      return {
        ...state,
        notes: { ...newNotes }
      }
    case 'GET_TAGS':
      return {
        ...state,
        tags: action.payload
      }
    case 'SET_LAST_INDEX':
      return {
        ...state,
        lastIndex: action.payload
      }
    case 'GET_NOTE_STRUCTURE':
      return {
        ...state,
        noteStructure: action.payload
      }
    case 'UPDATE_STRUCTURE':
      return {
        ...state,
        noteStructure: action.payload
      }
    case 'EDIT_NOTE':
      return {
        ...state,
        editedNote: action.payload
      }
    case 'CLEAR_EDIT_FORM':
      return {
        ...state,
        editedNote: {}
      }
    // case "DELETE_NOTE":
    //   return {
    //     ...state,
    //     isLoggedIn: false,
    //     user: null
    //   };
    default:
      return { ...state }
  }
}
