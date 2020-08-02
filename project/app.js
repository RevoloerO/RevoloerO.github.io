document.addEventListener('DOMContentLoaded',()=>{
    const grid = document.querySelector('.grid')
    const flagAmount = document.querySelector('.flagAmount')

    let width = 10
    let bombAmount = 20
    let flags = 0
    let squares = []
    let max = width*width
    let isGameOver = false
    flagAmount.innerHTML = 'Flags Left: ' +(bombAmount - flags) +'/'+ bombAmount
    createBoard()
    const btn = document.getElementById("new-game-btn")
    btn.addEventListener("click", function () {
      location.reload()
    })


    //make board
    function createBoard(){
      const bombsArray = Array(bombAmount).fill('bomb')
      const emptyArray = Array(width*width - bombAmount).fill('valid')
      const gameArray = emptyArray.concat(bombsArray)
      const shuffledArray = gameArray.sort(() => Math.random() -0.5)
      //console.log(shuffledArray)

      for(let i = 0; i< width*width; i++){
        const square = document.createElement('div')
        square.setAttribute('id',i)
        square.classList.add(shuffledArray[i])
        grid.appendChild(square)
        squares.push(square)

        //normalclick
        square.addEventListener('click',function(e){
          click(square)
        })
        //ctrl and left click
        square.oncontextmenu = function(e){
          e.preventDefault()
          addFlag(square)
        }
      }
      //add hint
      for(let i = 0; i<squares.length; i++){
        let total = 0
        const isLeftEdge = ((i% width) ===0)
        const isRightEdge = ((i% width) === (width -1))

        if(squares[i].classList.contains('valid')){
            if(i>0 && !isLeftEdge && squares[i-1].classList.contains('bomb')) total++
            if(i>9 && !isRightEdge && squares[i+1-width].classList.contains('bomb')) total++
            if(i>9 && squares[i-width].classList.contains('bomb')) total++
            if(i>10 && !isLeftEdge && squares[i-1-width].classList.contains('bomb')) total++
            if(i<99 && !isRightEdge && squares[i+1].classList.contains('bomb')) total++
            if(i<90 && !isLeftEdge && squares[i-1 +width].classList.contains('bomb')) total++
            if(i<89 && !isRightEdge && squares[i+1+width].classList.contains('bomb')) total++
            if(i<90 && squares[i+width].classList.contains('bomb')) total++

            squares[i].setAttribute('data',total)
            //console.log(squares[i])
        }

      }
    }

    //add flag
    function addFlag(square){
      if(isGameOver)return
      if(!square.classList.contains('checked')){

        if(!square.classList.contains('flag') && (flags<bombAmount)){
          square.classList.add('flag')
          square.innerHTML = '🚩'
          flags++
          checkWin()
        }
        else if(square.classList.contains('flag')){
          square.classList.remove('flag')
          square.innerHTML = ''
          flags--
        }
        flagAmount.innerHTML = 'Flags Left: ' +(bombAmount - flags) +'/'+ bombAmount
      }
    }

    function click(square){
      let currentId = square.id
      if(isGameOver)return
      if(square.classList.contains('checked') || square.classList.contains('flag')) return
      if(square.classList.contains('bomb')){
        gameOver(square)
        flagAmount.innerHTML = 'BOOM! Good luck next one!!'
      }else{
        let total = square.getAttribute('data')
        if(total !=0){
          square.classList.add('checked')
          square.innerHTML = total
          checkWin()
          return
        }
        checkSquare(square,currentId)
      }
      square.classList.add('checked')
      checkWin()
    }

    //check neighbor quare
    function checkSquare(square, currentId){
      const isLeftEdge = ((currentId% width) ===0)
      const isRightEdge = ((currentId% width) === (width -1))

      setTimeout(()=>{
        if(currentId >0 && !isLeftEdge){
          const newId = squares[parseInt(currentId)-1].id
          const newSquare = document.getElementById(newId)
          click(newSquare)
        }
        if(currentId >(width-1) && !isRightEdge){
          const newId = squares[parseInt(currentId)+1-width].id
          const newSquare = document.getElementById(newId)
          click(newSquare)
        }if(currentId >width-1){
          const newId = squares[parseInt(currentId -width)].id
          const newSquare = document.getElementById(newId)
          click(newSquare)
        }
        if(currentId >(width) && !isLeftEdge){
          const newId = squares[parseInt(currentId)-1-width].id
          const newSquare = document.getElementById(newId)
          click(newSquare)
        }
        if(currentId <(max-1) && !isRightEdge){
          const newId = squares[parseInt(currentId)+1].id
          const newSquare = document.getElementById(newId)
          click(newSquare)
        }
        if(currentId <(max-width+1) && !isLeftEdge){
          const newId = squares[parseInt(currentId)-1+width].id
          const newSquare = document.getElementById(newId)
          click(newSquare)
        }
        if(currentId <(max-width) && !isRightEdge){
          const newId = squares[parseInt(currentId)+1+width].id
          const newSquare = document.getElementById(newId)
          click(newSquare)
        }if(currentId <(max-width+1) ){
          const newId = squares[parseInt(currentId)+width].id
          const newSquare = document.getElementById(newId)
          click(newSquare)
        }
      },10)

    }

    //GameOver

    function gameOver(square){
      console.log('GAME OVEEEERRR')
      isGameOver = true

      //show all bombs
      squares.forEach(square =>{
        if(square.classList.contains('bomb')){
          square.innerHTML = '💣'
        }
      })
    }

    //Check win
    function checkWin(){
      let matches = 0
      let checkes = 0

      for(let i = 0; i<squares.length;i++){

        if(squares[i].classList.contains('flag')& squares[i].classList.contains('bomb')){
          matches ++
        }
        if(squares[i].classList.contains('checked')&squares[i].classList.contains('valid')){
          checkes ++
        }
        if(matches === bombAmount || (max - checkes)=== bombAmount ){
          console.log('YOU GOT IT')
          flagAmount.innerHTML = 'You Got It'
          isGameOver = true
        }
      }
    }
})
