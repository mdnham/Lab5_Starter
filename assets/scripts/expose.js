// expose.js
window.addEventListener('DOMContentLoaded', init);


function init() {
  
  const hornElement = document.getElementById('horn-select'); //the drop down element
  let partyHornBoolean = false;
  hornElement.addEventListener('change', (event) => { //if the option has been changed
    //change to the corresponding image source
    let hornImg = document.querySelector('img');
    hornImg.setAttribute("src", `assets/images/${event.target.value}.svg`);
    if (event.target.value == 'party-horn'){
      partyHornBoolean = true;
    }else{
      partyHornBoolean = false; 
    }
    //as well as audio source
    let hornAudio = document.querySelector('audio');
    hornAudio.setAttribute("src",`assets/audio/${event.target.value}.mp3`);
  });

  const volumeElement = document.getElementById('volume'); //the slider element
  var currVolume;

  volumeElement.addEventListener('input', (event) => { //if the slider has moved
    //change the icon depending on how loud
    let volumeImg = document.querySelector('div > img');
    if(event.target.value == 0) //lv.0 if 0
      volumeImg.setAttribute("src", "assets/icons/volume-level-0.svg");
    else if(event.target.value < 33) //lv.1 for [1,33)
      volumeImg.setAttribute("src", "assets/icons/volume-level-1.svg");
    else if(event.target.value < 67) //lv.2 for [33,67)
      volumeImg.setAttribute("src", "assets/icons/volume-level-2.svg");
    else //lv.3 for 67+
      volumeImg.setAttribute("src", "assets/icons/volume-level-3.svg");

    //as well as the volume for the audio
    let audioVolume = document.querySelector('audio');
    audioVolume.volume = event.target.value / 100; //volume is of [0.0,1.0]
    currVolume = event.target.value / 100;
  });

  const buttonElement = document.querySelector('button'); //the button element
  const jsConfetti = new JSConfetti();
  var audio = document.querySelector('audio');
  buttonElement.addEventListener('click', event => {
    audio.play();
    if (partyHornBoolean == true && currVolume > 0){
       jsConfetti.addConfetti();
    }
  });
}