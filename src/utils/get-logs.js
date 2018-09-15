export default () => {
  let logs;
  try {
    logs = JSON.parse(localStorage.getItem('entries')) || [];
  } catch(e) {
    logs = [];
  }
  return logs;
};