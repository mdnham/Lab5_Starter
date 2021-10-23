// explore.js

var voiceSelect;
var voices;
window.addEventListener('DOMContentLoaded', init);

function init() {
  populateVoiceList();
  if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoiceList;
  }

  var selected = '';
  const selectVoice = document.getElementById('voice-select');
  selectVoice.addEventListener('change', (event) => {
    selected = event.target.value;
  })

  const talkButton = document.querySelector('button');
  const inputTxt = document.getElementById('text-to-speak');
  talkButton.addEventListener('click', (event) => {
    var utterThis = new SpeechSynthesisUtterance(inputTxt.value);
    for(var i = 0; i < voices.length ; i++) {
      if(voices[i].name === selected) {
        utterThis.voice = voices[i];
      }
    }
    window.speechSynthesis.speak(utterThis);
    document.querySelector('img').setAttribute('src', 'assets/images/smiling-open.png');
    utterThis.addEventListener('end', (event) => {
      document.querySelector('img').setAttribute('src', 'assets/images/smiling.png');
    });
  });
  
}

function populateVoiceList() {
  voiceSelect = document.getElementById('voice-select');
  voices = window.speechSynthesis.getVoices();
  for(var i = 0; i < voices.length ; i++) {
    var option = document.createElement('option');
    option.textContent = voices[i].name + ' (' + voices[i].lang + ')';
    if(voices[i].default) {
      option.textContent += ' -- DEFAULT';
    }

    option.setAttribute('data-lang', voices[i].lang);
    option.setAttribute('data-name', voices[i].name);
    voiceSelect.appendChild(option);
  }
}