import './App.css';
import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      options: ['rock', 'paper', 'scissors'],
      leftHand: 'rock',
      rightHand: 'rock',
      leftHandScore: 0,
      rightHandScore: 0,
      counterClass: '',
      counterNumber: 3,
      handsClass: '',
      optionsClass: '',
      gradientClass: '',
      modes: ['EASY', 'NORMAL', 'HARD'],
      activeMode: 'NORMAL',
    }
    this.counterInterval = ''
    // this.win = this.win.bind(this);

  }

  showHands() {
    this.setState(function (state) {

      let playerScore = state.leftHandScore
      let botScore = state.rightHandScore
      let player = state.leftHand
      let bot = state.rightHand
      let winner;

      winner = this.choiceWinner(player, bot)
      console.log(winner, player, bot);
      if(winner === player) {playerScore += 1} else {botScore += 1}

      return {
        handsClass: 'handsVisible',
        gradientClass: winner === player ? 'gradientLeft' : winner === bot ? 'gradientRight' : 'gradientDraw',
        optionsClass: '',
        counterClass: '',
        counterNumber: 3,
        leftHandScore: playerScore,
        rightHandScore: botScore,
      }
    }, function () {
      if (this.state.leftHandScore === 5) {
        this.end('player')
      }
      if (this.state.rightHandScore === 5) {
        this.end('bot')
      }
    })

  }

  choiceWinner(player, bot) {
    if (player === 'rock' && bot === 'paper') {
      return bot
    }
    else if (player === 'rock' && bot === 'scissors') {
      return player
    }
    else if (player === 'paper' && bot === 'rock') {
      return player
    }
    else if (player === 'paper' && bot === 'scissors') {
      return bot
    }
    else if (player === 'scissors' && bot === 'rock') {
      return bot
    }
    else if (player === 'scissors' && bot === 'paper') {
      return player
    } 
    else {
      return 'draw'
    }
  }

  choiceHand(name) {
      let rightHand = this.state.options[Math.floor(Math.random() * 3)];
  
      if (this.state.activeMode === 'EASY') {
          for (let i = 0; i < 10; i++) { // Максимум 10 попыток
              let winner = this.choiceWinner(name, rightHand);
              if (winner === name) break; // Остановить, если выбрана рука, проигрывающая игроку
              rightHand = this.state.options[Math.floor(Math.random() * 3)];
          }
      }
      return rightHand;
  }
  
  
  start(name) {
      let rightHand = this.choiceHand(name) || this.state.options[Math.floor(Math.random() * 3)];
  
      this.setState({
          rightHand,
          leftHand: name,
          counterClass: 'counterVisible',
          optionsClass: 'optionDisabled',
          gradientClass: '',
          handsClass: '',
      });
  
      this.counterInterval = setInterval(() => {
          this.setState((state) => {
              if (state.counterNumber === 1) clearInterval(this.counterInterval);
              return { counterNumber: state.counterNumber - 1 };
          }, () => {
              if (this.state.counterNumber === 0) this.showHands();
          });
      }, 1000);
  }
  
  end(winner) {
    this.setState({
      optionsClass: 'optionDisabled',
    })

    let emojis;
    if (winner === 'player') {
      emojis = ['😀', '😊', '🏆', '🏅', '✨', '😇', '🥰', '😋', '🐱', '👶🏾']
    }
    else {
      emojis = ['😞', '😒', '🙄', '😠', '😨', '😰', '😭', '🥺', '😣', '💔']
    }
    let divEmojis = document.getElementsByClassName('emojis')[0]

    for (let i = 0; i < 300; i++) {
      let s = document.createElement('span')
      s.innerHTML = emojis[Math.floor(Math.random() * 10)]
      s.style.fontSize = Math.floor(Math.random() * 100 + 50) + 'px'
      s.style.left = Math.floor(Math.random() * (window.innerWidth - 200)) + 'px'
      s.style.transition = Math.floor(Math.random() * 5 + 3) + 's'
      s.style.transitionTimingFunction = 'linear'
      s.style.transitionDelay = Math.floor(Math.random() * 5) + 's'
      divEmojis.appendChild(s)

      setTimeout(function () {
        s.style.transform = 'translateY(' + (window.innerHeight + 200) + 'px)'
        setTimeout(function () {
          s.remove()
        }, 13000)
      }, 1000)

    }
    setTimeout(() => {
      this.setState({
        options: ['rock', 'paper', 'scissors'],
        leftHand: 'rock',
        rightHand: 'rock',
        leftHandScore: 0,
        rightHandScore: 0,
        counterClass: '',
        counterNumber: 3,
        handsClass: '',
        optionsClass: '',
        gradientClass: '',
      })
    }, 10000)

  }



  render() {
    let handAnimation = window.innerWidth
    return (
      <div className="App">
        <div className="emojis"></div>
        <div id="game">
          <div className={this.state.gradientClass} id="gradient"></div>
          <h2 className='title'>ROCK PAPER SCISSORS!</h2>
          <h3 className={"counter " + this.state.counterClass}>{this.state.counterNumber}</h3>
          <div id="hands">
            <img className={'hl ' + this.state.handsClass} src={this.state.leftHand + '.svg'} style={{ transform: 'translateX(-' + handAnimation + 'px) scale(5)' }} alt="" />
            <img className={'hr ' + this.state.handsClass} src={this.state.rightHand + '.svg'} style={{ transform: 'translateX(' + handAnimation + 'px) scale(5)' }} alt="" />
          </div>
          <div id="score">
            <h3 className='sl'>{this.state.leftHandScore}</h3>
            <h3 className='sr'>{this.state.rightHandScore}</h3>
          </div>
          <div id="options">
            {
              this.state.options.map((name, i) => (
                <img className={name !== this.state.leftHand ? this.state.optionsClass : ''} key={i} src={name + '.svg'} alt="" onClick={() => this.state.optionsClass !== 'optionDisabled' ? this.start(name) : null} />
              ))
            }
          </div>
        </div>
        <div id="modes">
            {/* className='activeMode' */}
          {
            this.state.modes.map((name, i) => (
              <button key={i} className={name === this.state.activeMode ? 'activeMode' : ''} onClick={() => this.setState({activeMode: name})}>{name}</button>
              ))
          }
        </div>
      </div>
    )
  }
}

export default App;

// TODO доделать проект
