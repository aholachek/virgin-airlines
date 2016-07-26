import { combineReducers } from 'redux'

export default function(state = {}, action){
  switch (action.type){
    case 'update_variable':
      return Object.assign({},
         state,
         action.data
       )
    default:
      return state
  }
}
