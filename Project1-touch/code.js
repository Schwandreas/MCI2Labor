window.onload = function () {
    let canvas = document.getElementById("myCanvas")
    const ctx = canvas.getContext('2d')
    let aPath = new Path2D()
    let lvl = 4             // the level and number of digits the code has
    let code = []           // the code to remember
    let guess = []          // code inserted by spinning the wheel
    let inside = false      // to check if finger is in wheel
    let oldAlpha = 0
    let newAlpha = 0
    let delta = 0           // delta for swipe
    let triesLeft = 3       // initial tries to check the code
    let lineArray = []      // for calc is switch is swiped
    let deltaAlpha = 0
    let ix = 0              // initial touchpoint
    let iy = 0              // ""

    // start screen elements ---------------------------------
    let containerDiv = document.getElementById("containerDiv")
    let codeDiv = document.getElementById("codeDiv")
    
    // refresh code display
    function refreshCode() {
        if (code.length === 0) {
            codeDiv.innerHTML = `Enter a ${lvl} digit code`
            
        } else {
            codeDiv.innerHTML = code
        }
        if (guess.length === 0) {
            guessDiv.innerHTML = `Enter a ${lvl} digit code by rotating the wheel`
            triesLeftSpan.innerHTML = triesLeft
        } else {
            guessDiv.innerHTML = guess
            triesLeftSpan.innerHTML = triesLeft
        }
    }
    // number buttons functionality
    let num1Btn = document.getElementById("num1Btn")
    num1Btn.addEventListener('click', () => { if (code.length < lvl){code.push(1); refreshCode()} else {startBtn.style.color = "red"; console.log("press start")}})
    let num2Btn = document.getElementById("num2Btn")
    num2Btn.addEventListener('click', () => { if (code.length < lvl){code.push(2); refreshCode()} else {startBtn.style.color = "red"; console.log("press start")}})
    let num3Btn = document.getElementById("num3Btn")
    num3Btn.addEventListener('click', () => { if (code.length < lvl){code.push(3); refreshCode()} else {startBtn.style.color = "red"; console.log("press start")}})
    let num4Btn = document.getElementById("num4Btn")
    num4Btn.addEventListener('click', () => { if (code.length < lvl){code.push(4); refreshCode()} else {startBtn.style.color = "red"; console.log("press start")}})
    let num5Btn = document.getElementById("num5Btn")
    num5Btn.addEventListener('click', () => { if (code.length < lvl){code.push(5); refreshCode()} else {startBtn.style.color = "red"; console.log("press start")}})
    let num6Btn = document.getElementById("num6Btn")
    num6Btn.addEventListener('click', () => { if (code.length < lvl){code.push(6); refreshCode()} else {startBtn.style.color = "red"; console.log("press start")}})
    let num7Btn = document.getElementById("num7Btn")
    num7Btn.addEventListener('click', () => { if (code.length < lvl){code.push(7); refreshCode()} else {startBtn.style.color = "red"; console.log("press start")}})
    let num8Btn = document.getElementById("num8Btn")
    num8Btn.addEventListener('click', () => { if (code.length < lvl){code.push(8); refreshCode()} else {startBtn.style.color = "red"; console.log("press start")}})
    let num9Btn = document.getElementById("num9Btn")
    num9Btn.addEventListener('click', () => { if (code.length < lvl){code.push(9); refreshCode()} else {startBtn.style.color = "red"; console.log("press start")}})

    // Random button functionality
    let randomBtn = document.getElementById("randomBtn")
    randomBtn.addEventListener('click', () => {
        let item = null
        code = []
        for (let i = 0; i < lvl; i++) {
            if (code.length < lvl) {
                item = Math.floor(Math.random() * 9 + 1)
                code.push(item)
            }
        }
        refreshCode()
        console.log(code)
    })
    
    // Clear button functionality
    let clearBtn = document.getElementById("clearBtn")
    clearBtn.addEventListener('click', () => {code = []; startBtn.style.color = "black"; refreshCode()})
    
    // Start button functionality
    let startBtn = document.getElementById("startBtn")
    startBtn.addEventListener('click', () => {
        if (code.length === lvl) {
            containerDiv.style.display = "none"
            gamingDiv.style.display = "flex"
            animate()
        } else {console.log("code incomplete")}
    })
    //---------------------------------------------------------




    // gaming screen elements ---------------------------------
    let gamingDiv = document.getElementById("gamingDiv")
    gamingDiv.style.display = "none"
    let triesLeftSpan = document.getElementById("triesLeftSpan")
    triesLeftSpan.innerHTML = triesLeft
    let guessDiv = document.getElementById("guessDiv")
    // clear all button functionality
    let clearBtn2 = document.getElementById("clearBtn2")
    clearBtn2.addEventListener('click', () => {
        guess = []
        triesLeft -= 1
        if (triesLeft === 0) {
            gamingDiv.style.display = "none"
            gameOverDiv.style.display = "flex"
            console.log("out of tries")
        } else {
            refreshCode()
        }
        })

    // comparison of arrays
    const equals = (a, b) => a.length === b.length && a.every((v, i) => v === b[i])
    // check button functionality
    let checkBtn = document.getElementById("checkBtn")

    function nextLevel() {
        lvl += 1
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        gamingDiv.style.display = "none"
        nextLvlDiv.style.display = "flex"
        console.log(`the lvl is now ${lvl}`)
    }
    function swipeEvent() {
        triesLeft -= 1
        if (equals(code, guess)) {
            nextLevel()
        } else {
            if (triesLeft === 0) {
                gamingDiv.style.display = "none"
                gameOverDiv.style.display = "flex"
                console.log("out of tries")
            } else {
                guess = []
                refreshCode()
                //guessDiv.style.color = "red"
                console.log("next Try maybe...")
            }
            
        }
    }
    checkBtn.addEventListener('click', () => {
        triesLeft -= 1
        if (equals(code, guess)) {
            nextLevel()
        } else {
            if (triesLeft === 0) {
                gamingDiv.style.display = "none"
                gameOverDiv.style.display = "flex"
                console.log("out of tries")
            } else {
                guess = []
                refreshCode()
                //guessDiv.style.color = "red"
                console.log("next Try maybe...")
            }
            
        }
    })

    // -------------------------------------------------------




    // next level screen elements ----------------------------
    let nextLvlDiv = document.getElementById("nextLvlDiv")
    nextLvlDiv.style.display = "none"
    let solutionDiv = document.getElementById("solutionDiv")
    solutionDiv.innerHTML = `original code: ${code} <> your code: ${guess}`
    solutionDiv.style.color = "green"
    let plainTextDiv = document.getElementById("plainTextDiv")
    if (lvl === 10) {
        plainTextDiv.innerHTML = "You completetd all levels, congrats!"
    } else {plainTextDiv.innerHTML = `Next Level will be a ${lvl} digit code`}
    let quitBtn = document.getElementById("quitBtn")
    function endScreen() {
        nextLvlDiv.style.display = "none"
        gameOverDiv.style.display = "flex"
        refreshCode()
    }
    quitBtn.addEventListener('click', () => {endScreen()})
    let nextBtn = document.getElementById("nextBtn")
    nextBtn.addEventListener('click', () => {
        nextLvlDiv.style.display = "none"
        if (lvl === 11) {
            gameOverDiv.style.display = "flex"
        } else {
            triesLeft = 3
            containerDiv.style.display = "flex"
        }
        refreshCode()
    })
    // -------------------------------------------------------




    // game over screen elements -----------------------------
    let gameOverDiv = document.getElementById("gameOverDiv")
    gameOverDiv.style.display = "none"

    
    refreshCode() // first call to display message

    canvas.width = innerWidth
    canvas.height = innerHeight
    const x = canvas.width/2
    const y = canvas.height/2


    function distance(x1, y1, x2, y2) {
        let dx = x1 - x2;
        let dy = y1 - y2;
        return Math.sqrt(dx * dx + dy * dy)
    }
    class Wheel {
        constructor(x, y, c1, c2, radius) {
            this.x = x
            this.y = y
            this.c1 = c1
            this.c2 = c2
            this.radius = radius
        }

        
        drawWheel(rotationAngle) {
            // draw Background Circle
            ctx.beginPath()
            ctx.fillStyle = this.c1
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
            ctx.fill()
            ctx.resetTransform()
            
            // Draw Arrow on Circle
            aPath.moveTo(0, -5)
            aPath.lineTo(-3, 5)
            aPath.lineTo(0, 2)
            aPath.lineTo(3, 5)
            aPath.lineTo(0, -5)
            aPath.closePath()
            
            ctx.save()
            ctx.translate(x, y)
            ctx.scale(10, 10)
            ctx.rotate(rotationAngle)
            ctx.fillStyle = "Black"
            ctx.fill(aPath)
            ctx.stroke(aPath)
            ctx.restore()
            ctx.resetTransform()
            
        }
        
        // Draw Sections of outer Wheel
        drawOuterWheel() {
            ctx.save()
            ctx.translate(x, y)
            for (let i = 0; i <= Math.PI*2.1; i) {
                //ctx.fillText("|", 0, 0)
                ctx.save()
                ctx.translate(0, 120)
                ctx.strokeRect(0, 0, 3, 20)
                ctx.restore()
                ctx.rotate(i)
                i += Math.PI/8
            }
            ctx.restore()
        }
        
        isInside(ix, iy) {
            inside = distance(x, y, ix, iy) < this.radius
            if (inside) {
                
                // todo
                

            }
        }
        
        reset() {
            this.inside = false
            lineArray = []
            delta = 0
            deltaAlpha = undefined
        }
    }
    function calcDelta(num1, num2) {
        result = num2 - num1
        //console.log(`result: ${result}`)
        return result
    }
    class SwitchLock {
        constructor(x, y, c1, w, h) {
            this.x = x
            this.y = y
            this.c1 = c1
            this.w = w
            this.h = h
        }

        drawSwitch() {
            ctx.save()
            ctx.beginPath()
            ctx.fillRect(this.x-100, this.y, this.w, this.h)
            ctx.fillStyle = this.c1
            ctx.font="20px Arial"
            ctx.fillText("=> swipe to check =>", this.x-95, this.y+30)
            ctx.fillStyle = "grey"
            ctx.restore()
            ctx.resetTransform()
        }

        isInsideRect(ix, iy, e) {
            if (ix<this.x-100+this.w && ix>this.x-100 && iy<this.y+this.h && iy>this.y) {
                lineArray.push(e.touches[0].pageX)
                //console.log(`lineArray.length: ${lineArray.length}`)
                for (let i = 1; i<lineArray.length; i++) {
                    delta += calcDelta(lineArray[i], lineArray[i-1])
                    //console.log(`delta: ${delta}`)
                    if (delta<-500) {
                        delta = 0
                        swipeEvent()
                    }
                }
            } //else console.log("is not inside")
        }
    }
    const wheel = new Wheel(x, y, "grey", "lightgrey", 100)
    const unlock = new SwitchLock(x, 3 * canvas.height / 4, "white", 200, 50)

    function draw(rotationAngle) {
        wheel.drawWheel(rotationAngle)
        wheel.drawOuterWheel()
        unlock.drawSwitch()
    }
    function calcNewAlpha(ix, iy, ox, oy) {
        return Math.atan2( oy-iy, ox-ix)
    }
    function checkInside(e) {
        wheel.isInside(e.touches[0].pageX, e.touches[0].pageY)
        unlock.isInsideRect(e.touches[0].pageX, e.touches[0].pageY, e)
    }

    // touch events ------------------------------------------------
    canvas.addEventListener('touchstart', (e) => {
        e.preventDefault()
        wheel.isInside(e.touches[0].pageX, e.touches[0].pageY)

        lineArray.push(e.touches[0].pageX)
        if (inside) {
            ix = e.touches[0].pageX
            iy = e.touches[0].pageY
            newAlpha = oldAlpha
        }
        //console.log(`oldAlpha: ${oldAlpha}`)
    }, false)
    
    canvas.addEventListener('touchmove', (e) => {
        // calc different alphas, increment number in code field, rotate wheel
        e.preventDefault()
        if (inside) {
            deltaAlpha = calcNewAlpha( e.touches[0].pageX, e.touches[0].pageY,ix, iy)
            oldAlpha = newAlpha + deltaAlpha
        }
        //console.log(deltaAlpha)
        checkInside(e)    
    }, false)
    
    canvas.addEventListener('touchend', (e) => {
        e.preventDefault()
        wheel.reset()
    }) // ---------------------------------------------------------
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        draw(oldAlpha)
        
        requestAnimationFrame(animate)
    }
    //animate()
}