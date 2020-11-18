import config from '../config'

const UserService = {
  //user id
  saveUserToken(userId) {
    window.sessionStorage.setItem(config.USER_KEY, userId)
  },
  getUserToken() {
    return window.sessionStorage.getItem(config.USER_KEY)
  },
  clearUserToken() {
    window.sessionStorage.removeItem(config.USER_KEY)
  },

  //user first name
  saveFNameToken(fName) {
    window.sessionStorage.setItem(config.FNAME_KEY, fName)
  },
  getFNameToken() {
    return window.sessionStorage.getItem(config.FNAME_KEY)
  },
  clearFNameToken() {
    window.sessionStorage.removeItem(config.FNAME_KEY)
  },

  //user last name
  saveLNameToken(lName) {
    window.sessionStorage.setItem(config.LNAME_KEY, lName)
  },
  getLNameToken() {
    return window.sessionStorage.getItem(config.LNAME_KEY)
  },
  clearLNameToken() {
    window.sessionStorage.removeItem(config.LNAME_KEY)
  }
}

export default UserService