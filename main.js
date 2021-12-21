const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const timeEl = document.querySelector('#time')
const board = document.querySelector('#board')
let time = 0;
let timeRestart = 0;
let score = 0;
startBtn.addEventListener('click', (e) => {
    e.preventDefault();
    screens[0].classList.add('up')
})


timeList.addEventListener('click', e => {
    if (e.target.classList.contains('time-btn')) {
        time = parseInt(e.target.getAttribute('data-time'))
        timeRestart = time;
        console.log(timeRestart);
        screens[1].classList.add('up')

        startGame();
    }
})
board.addEventListener('click', e => {
    if (e.target.classList.contains('circle')) {
        score++;
        e.target.remove()
        createRandomCircle();
    } else if (e.target.classList.contains('primary')) {
        time = timeRestart;
        score = 0;
        e.target.remove()
        startGame()
    }

})

const startGame = () => {
    board.innerHTML = ''
    createRandomCircle();
    const interval = setInterval(() => {
        if (time <= 0) {
            finishGame()
            clearInterval(interval);
        } else {
            let current = --time
            if (current < 10) {
                current = `0${current}`
            }
            setTime(current)
        }
    }, 1000)
    setTime(time)

}



function setTime(value) {
    timeEl.innerHTML = `00:${value}`

}

function finishGame() {
    // timeEl.parentNode.innerHTML = `Press to restart`
    board.innerHTML = `<h1>Score: <span class="primary">${score}  press to restart </span></h1>`


}

function createRandomCircle() {
    const circle = document.createElement('div')
    const size = getRandom(10, 60)
    const { width, height } = board.getBoundingClientRect()
    const x = getRandom(0, width - size)
    const y = getRandom(0, height - size)
    circle.classList.add('circle')
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`
    board.append(circle)

}

function getRandom(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}