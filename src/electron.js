// Workaround/hack to access the underlying electron interface
// per - https://medium.freecodecamp.org/building-an-electron-application-with-create-react-app-97945861647c
//  * electron is injected at runtime
//  * It is not available to webpack at build time, and therefore will cause build failures
const electron = window.require && window.require('electron');
export default electron;