let scoreJ1Data = document.querySelector("#scoreJ1")
let scoreJ2Data = document.querySelector("#scoreJ2")
let barProgressDataJ1 = document.querySelector("#line-progressJ1")
let barProgressDataJ2 = document.querySelector("#line-progress-j2")
let globalfondPopUp = document.querySelector(".global-pop-up")
let fondPopUp = document.querySelector(".fond-pop-up")
let btnReplay = document.querySelector(".replay")
let j1 = document.querySelector("#joueur1")
let j2 = document.querySelector("#joueur2")
let joueur1 = "obiwan Kenobi"
let joueur2 = "Dark Maul"
j1.innerHTML = joueur1;
j2.innerHTML = joueur2;
let scoreJ1 = 0
let scoreJ2 = 0
let maximumScore = 5
let gameActive = true; // Le clavier est actif au début du jeu
let sound = 0 
let timerJ1 = 0; // Chronomètre en secondes pour le joueur 1
let timerJ2 = 0; // Chronomètre en secondes pour le joueur 2
let intervalJ1, intervalJ2; // Variables pour stocker les intervalles de chronomètre

//--------------------------------------------------------------Evenement touche clavier avec S et M------------------------------------------------------
document.addEventListener("keyup", (event) => {

  if (!gameActive) return;


  if (event.key === "s") {
    resetTimerJ1();
    increment(joueur1)
    changeColorJ1(barProgressDataJ1, scoreJ1)

    

  } else if (event.key === "m") {
    resetTimerJ2()
    increment(joueur2)
    changeColorJ2(barProgressDataJ2, scoreJ2)
    }

  

})

function increment(joueur){
if(joueur === joueur1){
  scoreJ1++
  scoreJ1Data.innerHTML = scoreJ1
  const calculBarProgress = (scoreJ1 / maximumScore) * 100;
  barProgressDataJ1.style.height = 2.5 * calculBarProgress + "px"
  if (scoreJ1 === maximumScore) {
    endGame(joueur)
  }
} else {
  scoreJ2++
  scoreJ2Data.innerHTML = scoreJ2
  const calculBarProgress = (scoreJ2 / maximumScore) * 100;
  barProgressDataJ2.style.height = 2.5 * calculBarProgress + "px"
  if (scoreJ2 === maximumScore) {
    endGame(joueur)
  }
}
  

    
}


/*---------------------------------------------------Affichage du popUp---------------------------------------------------------------------*/
function popUp(winner) {
  globalfondPopUp.style.display = "block";

  // Vérifiez et supprimez tout h1 existant pour éviter de dupliquer le message
  let existingH1 = fondPopUp.querySelector(".h1Winner");
  if (existingH1) {
    fondPopUp.removeChild(existingH1);
  }

  // Vérifiez et supprimez tout h1 existant pour éviter de dupliquer le message
  let existingH3 = fondPopUp.querySelector(".h3Winner");
  if (existingH3) {
    fondPopUp.removeChild(existingH3);
  }

  // Créez un nouveau h1 pour afficher le gagnant
  let h1Winner = document.createElement("h1");
  h1Winner.className = "h1Winner"
  let contentWinner = document.createTextNode(winner + " a gagné");
  h1Winner.appendChild(contentWinner);

  // Ajoutez le h1 dans la popup
  fondPopUp.appendChild(h1Winner);



  if (winner === joueur1) {
    
    divH3("Que la Force soit avec vous !")

    h1Winner.style.color = "#000dff"; // Couleur bleue pour maul

    sound = new Audio("audios/obiwan_kenobi.MP3");
    sound.play();


  }
  else if (winner === joueur2) {
    divH3("Que votre colère vous rende invincible !")
    
    h1Winner.style.color = "#ff0000"; // Couleur rouge pour maul
    
    sound = new Audio("audios/dark_maul.MP3");
    sound.play();
  }


  btnReplay.addEventListener("click", () => {

    resetGame()
  })
}

/*----------------------------------------------------------function ResetTimer joueur1-----------------------------------------------------*/

// Fonction pour réinitialiser et démarrer le chronomètre pour le joueur 1
function resetTimerJ1() {
  clearInterval(intervalJ1); // Arrêter l'intervalle s'il est déjà en cours
  timerJ1 = 0;
  intervalJ1 = setInterval(() => {
    timerJ1 += 200;
    //console.log("Chronomètre joueur 1 : " + timerJ1 + "s"); 
    if (scoreJ1 > 0) 
      scoreJ1--
    scoreJ1Data.innerHTML = scoreJ1
    const calculBarProgress = (scoreJ1 / maximumScore) * 100;
    barProgressDataJ1.style.height = 2.5 * calculBarProgress + "px"
    changeColorJ1(barProgressDataJ1, scoreJ1)

  }, 200);

}

/*-------------------------------------------------------------function ResetTimer joueur2--------------------------------------------*/
// Fonction pour réinitialiser et démarrer le chronomètre pour le joueur 1
function resetTimerJ2() {
  clearInterval(intervalJ2); // Arrêter l'intervalle s'il est déjà en cours
  timerJ2 = 0;
  intervalJ2 = setInterval(() => {
    timerJ2 += 200;
    //console.log("Chronomètre joueur 2 : " + timerJ2 + "s"); 
    if (scoreJ2 > 0) 
      scoreJ2--
    scoreJ2Data.innerHTML = scoreJ2
    const calculBarProgress = (scoreJ2 / maximumScore) * 100;
    barProgressDataJ2.style.height = 2.5 * calculBarProgress + "px"
    changeColorJ2(barProgressDataJ2, scoreJ2)

  }, 200);

}




/*-----------------------------------fonction EndGame------------------------------------------------------------------*/

function endGame(winner) {
  // Définissez gameActive sur false pour désactiver le clavier à la fin du jeu
  gameActive = false;
  clearInterval(intervalJ1);
  clearInterval(intervalJ2);
  // alert("le joueur "+winner+" a gagné")
  popUp(winner)

}








/*----------------------------------------fonction resetGame------------------------------------------------------------*/
function resetGame() {
  scoreJ1 = 0;
  scoreJ2 = 0;
  gameActive = true;
  scoreJ1Data.innerHTML = scoreJ1;
  scoreJ2Data.innerHTML = scoreJ2;
  barProgressDataJ1.style.height = "0%";
  barProgressDataJ2.style.height = "0%";
  globalfondPopUp.style.display = "none";
  if (sound) {
    sound.pause();
    sound.currentTime = 0; // Réinitialise le son au début
  }
  


}


/*----------------------------------------------------------fonction changeClor joueur1------------------------------------*/
function changeColorJ1(progressBar, score) {

  if (score <= 25) {
    progressBar.style.backgroundColor = "#747bff";
  } else if (score <= 50) {
    progressBar.style.backgroundColor = "#4d56ff";
  } else if (score <= 75) {
    progressBar.style.backgroundColor = "#2c36ff";
  } else {
    progressBar.style.backgroundColor = "#000dff";
  }
}

/*----------------------------------------------------------fonction changeClor joueur2------------------------------------*/
function changeColorJ2(progressBar, score) {

  if (score <= 25) {
    progressBar.style.backgroundColor = "#ff7474";
  } else if (score <= 50) {
    progressBar.style.backgroundColor = "#ff4c4c";
  } else if (score <= 75) {
    progressBar.style.backgroundColor = "#ff2b2b";
  } else {
    progressBar.style.backgroundColor = "#ff0000";
  }
}


/*-------------------------------fonction divH3--------------------------------------*/
function divH3(text){
// Créez un nouveau h1 pour afficher le gagnant
let h3Winner = document.createElement("h3");
h3Winner.className = "h3Winner"
let contentH3Winner = document.createTextNode(text);
h3Winner.appendChild(contentH3Winner);

// Ajoutez le h3 dans la popup
fondPopUp.appendChild(h3Winner);
 }