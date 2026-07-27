document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid')
    const flagsLeft = document.querySelector('#flags-left')
    let result = document.querySelector('#result')
    const width = 10
    let bombAmt = 20
    let squares = []
    let isGameOver = false
    let flags = 0

    // Create Board
    function createBoard() {
        flagsLeft.innerHTML = bombAmt

        // Create shuffled game array with random bombs
        const bombArr = Array(bombAmt).fill('bomb')
        const emptyArr = Array(width * width - bombAmt).fill('valid')
        const gameArr = emptyArr.concat(bombArr)
        const shufflArr = gameArr.sort(() => Math.random() - 0.5)

        for (let i = 0; i < width * width; i++) {
            const square = document.createElement('div')
            square.id = i
            square.classList.add(shufflArr[i])
            grid.appendChild(square)
            squares.push(square)

            // Left click
            square.addEventListener('click', () => {
                click(square)
            })

            // Right click / Ctrl + Left click
            square.addEventListener('contextmenu', (e) => {
                e.preventDefault()
                addFlag(square)
            })
        }

        // Add numbers around bombs
        for (let i = 0; i < squares.length; i++) {
            let total = 0
            const isLeftEdge = (i % width === 0)
            const isRightEdge = (i % width === width - 1)

            if (squares[i].classList.contains('valid')) {
                if (i > 0 && !isLeftEdge && squares[i - 1].classList.contains('bomb')) total++
                if (i >= width && !isRightEdge && squares[i + 1 - width].classList.contains('bomb')) total++
                if (i >= width && squares[i - width].classList.contains('bomb')) total++
                if (i > width && !isLeftEdge && squares[i - 1 - width].classList.contains('bomb')) total++
                if (i < 99 && !isRightEdge && squares[i + 1].classList.contains('bomb')) total++
                if (i < 90 && !isLeftEdge && squares[i - 1 + width].classList.contains('bomb')) total++
                if (i < 90 && !isRightEdge && squares[i + 1 + width].classList.contains('bomb')) total++
                if (i < 90 && squares[i + width].classList.contains('bomb')) total++
                squares[i].setAttribute('data', total)
            }
        }
    }
    createBoard()

    // Add or remove flag
    function addFlag(square) {
        if (isGameOver) return
        
        if (!square.classList.contains('checked')) {
            // Place Flag
            if (!square.classList.contains('flag') && flags < bombAmt) {
                square.classList.add('flag')
                flags++
                square.innerHTML = '🚩'
                flagsLeft.innerHTML = bombAmt - flags
                checkWin()
            // Remove Flag
            } else if (square.classList.contains('flag')) {
                square.classList.remove('flag')
                flags--
                square.innerHTML = ''
                flagsLeft.innerHTML = bombAmt - flags
            }
        }
    }

    // Click on square
    function click(square) {
        if (isGameOver || square.classList.contains('checked') || square.classList.contains('flag')) return

        if (square.classList.contains('bomb')) {
            gameOver()
        } else {
            let total = square.getAttribute('data')
            square.classList.add('checked') // Mark tile as checked

            if (total != 0) {
                if (total == 1) square.classList.add('one')
                if (total == 2) square.classList.add('two')
                if (total == 3) square.classList.add('three')
                if (total == 4) square.classList.add('four')
                square.innerHTML = total
            } else {
                checkSquare(square) // Expand 0s
            }
            checkWin()
        }
    }

    // Check neighboring squares when a zero-bomb square is checked
    function checkSquare(square) {
        const currentId = parseInt(square.id)
        const isLeftEdge = (currentId % width === 0)
        const isRightEdge = (currentId % width === width - 1)

        setTimeout(() => {
            if (currentId > 0 && !isLeftEdge) {
                const newSquare = document.getElementById(currentId - 1)
                click(newSquare)
            }
            if (currentId >= width && !isRightEdge) {
                const newSquare = document.getElementById(currentId + 1 - width)
                click(newSquare)
            }
            if (currentId >= width) {
                const newSquare = document.getElementById(currentId - width)
                click(newSquare)
            }
            if (currentId > width && !isLeftEdge) {
                const newSquare = document.getElementById(currentId - 1 - width)
                click(newSquare)
            }
            if (currentId < 99 && !isRightEdge) {
                const newSquare = document.getElementById(currentId + 1)
                click(newSquare)
            }
            if (currentId < 90 && !isLeftEdge) {
                const newSquare = document.getElementById(currentId - 1 + width)
                click(newSquare)
            }
            if (currentId < 90 && !isRightEdge) {
                const newSquare = document.getElementById(currentId + 1 + width)
                click(newSquare)
            }
            if (currentId < 90) {
                const newSquare = document.getElementById(currentId + width)
                click(newSquare)
            }
        }, 10)
    }

    // Check win either by 20 correctly flagged bombs OR all 80 empty squares cleared
    function checkWin() {
        let matches = 0
        let checkedCount = 0

        for (let i = 0; i < squares.length; i++) {
            if (squares[i].classList.contains('flag') && squares[i].classList.contains('bomb')) {
                matches++
            }
            if (squares[i].classList.contains('checked') && squares[i].classList.contains('valid')) {
                checkedCount++
            }
        }

        if (matches === bombAmt || checkedCount === (width * width - bombAmt)) {
            if (result) result.innerHTML = 'YOU WIN! 🎉'
            isGameOver = true
        }
    }

    // Game Over
    function gameOver() {
        if (result) result.innerHTML = 'BOOM! Game Over 💣'
        isGameOver = true

        squares.forEach(square => {
            if (square.classList.contains('bomb')) {
                square.innerHTML = '💣'
                square.classList.remove('bomb')
                square.classList.add('checked')
            }
        })
    }
})