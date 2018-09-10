document.addEventListener("DOMContentLoaded", () => {
  const { ipcRenderer } = require('electron');
  
  const form = document.querySelector('form');
  form.addEventListener('submit', (evt) => {
    console.log('form submitted!');
    evt.preventDefault();
    const input = form.querySelector('input');

    let entries;
    try {
      entries = JSON.parse(localStorage.getItem('entries')) || [];
    } catch(e) {
      entries = [];
    }
    
    entries.push(input.value);
    localStorage.setItem('entries', JSON.stringify(entries));

    // reset field
    input.value = '';

    // Send message to `main` that new entry was logged
    ipcRenderer.send('log:entry:new');
  });
});