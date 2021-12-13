class Game {
    constructor(player, com) {
      this.player = player;
      this.com = com;
      this.result = null;
      this.round = 1;
  
      this.versus = document.querySelector('.versus h1');
      this.resultClass = document.querySelector('.versus div div');
      this.textResult = document.querySelector('.versus h5');
      this.comBox = document.querySelectorAll('.greyBox.comImage');
      this.playerBox = document.querySelectorAll('.greyBox.playerImage');
    }
  
    getResult(player, com) {
      if (player.choice === com.choice) this.result = 'DRAW';
      if (player.choice === 'rock' && com.choice === 'scissor') { this.result = 'PLAYER 1 WIN'; }
      if (player.choice === 'paper' && com.choice === 'rock') { this.result = 'PLAYER 1 WIN'; }
      if (player.choice === 'scissor' && com.choice === 'paper') { this.result = 'PLAYER 1 WIN'; }
      if (player.choice === 'rock' && com.choice === 'paper') { this.result = 'COM WIN'; }
      if (player.choice === 'paper' && com.choice === 'scissor') { this.result = 'COM WIN'; } 
      if (player.choice === 'scissor' && com.choice === 'rock') { this.result = 'COM WIN'; }
    }
  
    setPlayerGreyBox(player) {
      if (player.choice === 'rock') { this.playerBox[0].style.backgroundColor = '#c4c4c4'; } 
      else if (player.choice === 'paper') { this.playerBox[1].style.backgroundColor = '#c4c4c4'; } 
      else this.playerBox[2].style.backgroundColor = '#c4c4c4';
    }
  
    setComGreyBox(com) {
      if (com.choice === 'rock') { this.comBox[0].style.backgroundColor = '#c4c4c4'; } 
      else if (com.choice === 'paper') { this.comBox[1].style.backgroundColor = '#c4c4c4'; } 
      else this.comBox[2].style.backgroundColor = '#c4c4c4';
    }
  
    showResult(player, com) {
      this.versus.style.color = '#9c835f';
      this.resultClass.classList.add('result');
      this.textResult.innerHTML = this.result;
      this.textResult.style.backgroundColor = '#4c9654';
      if (this.result === 'DRAW') { this.textResult.style.backgroundColor = '#225c0e'; }
      this.setComGreyBox(com);
    }

    comThink() {
      const start = new Date().getTime();
      let i = 0;
  
      setInterval(() => {
        if (new Date().getTime() - start >= 1000) {
          clearInterval;
          return;
        }
        
        this.comBox[i++].style.backgroundColor = '#c4c4c4';
        if (i == this.comBox.length) i = 0;
      }, 50);

  
      setTimeout(() => {
        setInterval(() => {
          if (new Date().getTime() - start >= 1200) {
            clearInterval;
            return;
          }
          const comBox = document.querySelectorAll('.greyBox.comImage');
          comBox[i++].style.backgroundColor = '#9c835f';
          if (i == comBox.length) i = 0;
        }, 50);
      }, 50);
    }
  
    startGame(player, com) {
      com.getComChoice();
      this.getResult(player, com);
      this.setPlayerGreyBox(player);
  
      this.comThink();
  
      setTimeout(() => {
        this.showResult(player, com);
      }, 1200);
  
      this.round++;
    }
  
    refresh() {
      this.textResult.innerHTML = '';
      this.resultClass.classList.remove('result');
      this.versus.style.color = 'rgb(189,48,46)';
      this.result = null;
  
      for (let i = 0; i < this.comBox.length; i++) {
        this.playerBox[i].style.backgroundColor = '#9c835f';
        this.comBox[i].style.backgroundColor = '#9c835f';
      }
    }
  }
  
  class Player {
    constructor() {
      this.choice = null;
    }
  
    getPlayerChoice(choice) {
      this.choice = choice;
    }
  }
  
  class Com extends Player {
    constructor() {
      super();
    }
  
    getComChoice() {
      const choice = Math.random();
      if (choice <= 1 / 3) this.choice = 'rock';
      if (choice > 1 / 3 && choice <= 2 / 3) this.choice = 'paper';
      if (choice > 2 / 3) this.choice = 'scissor';
    }
  }
  
  const p1 = new Player();
  const cpu = new Com();
  const game = new Game(p1, cpu);
  
  document.querySelectorAll('.contentImage .player').forEach((playerimg) => {
    playerimg.addEventListener('click', () => {
      if (!game.result) {
        const playerChoice = playerimg.className.substr(7, 7);
  
        p1.getPlayerChoice(playerChoice);
  
        game.startGame(p1, cpu);
      } else alert('Please reset the game first.');
    });
  });
  
  document
    .querySelector('.refresh')
    .addEventListener('click', () => game.refresh());
