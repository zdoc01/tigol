export default () => {
  let logs;
  try {
    logs = JSON.parse(localStorage.getItem('logs')) || [];
  } catch(e) {
    logs = [];
  }
  return logs;
};