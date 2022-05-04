/*
    Author: Andreas Schwörer    Matr. 763833    SWB4
    Hochschule Esslingen    Modul MCI2  04.05.2022
*/
window.onload = function () {
    let canvas = document.getElementById("myCanvas")
    const ctx = canvas.getContext('2d')
    let aPath = new Path2D()
    let bPath = new Path2D()
    let lvl = 4             // the level and number of digits the code has
    let maxLvl = 8          // edit to adjust limit of max digit code
    let code = []           // the code to remember
    let guess = []          // code inserted by spinning the wheel
    let inside = false      // to check if finger is in wheel
    let oldAlpha = 0
    let delta = 0           // delta for swipe
    let triesLeft = 3       // initial tries to check the code
    let lineArray = []      // for calc is switch is swiped
    let deltaAlpha = 0      // delta for rotation
    let number = 0          // for saving into guess while rotating wheel
    let atIndex = 0         // for controlling at which index to put the number into guess
    let color = "black"
    let showTutorial = false

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
        if (lvl === maxLvl) {
            plainTextDiv.innerHTML = "You completetd all levels, congrats!"
        } else {
            plainTextDiv.innerHTML = `Next Level will be a ${lvl+1} digit code`
        }
    }
    // start screen elements ----------------------------------------------------------------------
    let containerDiv = document.getElementById("containerDiv")
    let codeDiv = document.getElementById("codeDiv")
    let randomBtn = document.getElementById("randomBtn")
    let clearBtn = document.getElementById("clearBtn")
    let startBtn = document.getElementById("startBtn")

    // number buttons functionality
    function msg() {startBtn.style.color = "red"; console.log("press start")}
    let num1Btn = document.getElementById("num1Btn")
    let num2Btn = document.getElementById("num2Btn")
    let num3Btn = document.getElementById("num3Btn")
    let num4Btn = document.getElementById("num4Btn")
    let num5Btn = document.getElementById("num5Btn")
    let num6Btn = document.getElementById("num6Btn")
    let num7Btn = document.getElementById("num7Btn")
    let num8Btn = document.getElementById("num8Btn")
    let num9Btn = document.getElementById("num9Btn")
    num1Btn.addEventListener('click', () => { if (code.length < lvl){code.push(1); refreshCode()} else {msg()}})
    num2Btn.addEventListener('click', () => { if (code.length < lvl){code.push(2); refreshCode()} else {msg()}})
    num3Btn.addEventListener('click', () => { if (code.length < lvl){code.push(3); refreshCode()} else {msg()}})
    num4Btn.addEventListener('click', () => { if (code.length < lvl){code.push(4); refreshCode()} else {msg()}})
    num5Btn.addEventListener('click', () => { if (code.length < lvl){code.push(5); refreshCode()} else {msg()}})
    num6Btn.addEventListener('click', () => { if (code.length < lvl){code.push(6); refreshCode()} else {msg()}})
    num7Btn.addEventListener('click', () => { if (code.length < lvl){code.push(7); refreshCode()} else {msg()}})
    num8Btn.addEventListener('click', () => { if (code.length < lvl){code.push(8); refreshCode()} else {msg()}})
    num9Btn.addEventListener('click', () => { if (code.length < lvl){code.push(9); refreshCode()} else {msg()}})

    // Random/hardmode button functionality
    randomBtn.addEventListener('click', () => {
        let item = 0
        code = []
        for (let i = 0; i < lvl; i++) {
            if (code.length < lvl) {
                item = Math.floor(Math.random() * 9 + 1)
                code.push(item)
            }
        }
        refreshCode()
        //console.log(code)
    })
    
    // Clear button functionality
    clearBtn.addEventListener('click', () => {code = []; startBtn.style.color = "black"; refreshCode()})
    
    // Start button functionality
    startBtn.addEventListener('click', () => {
        if (code.length === lvl) {
            containerDiv.style.display = "none"
            gamingDiv.style.display = "flex"
            startBtn.style.color = "black"
            animate()
        } else {console.log("code incomplete")}
    })
    //---------------------------------------------------------------------------------------------




    // gaming screen elements ---------------------------------------------------------------------
    let gamingDiv = document.getElementById("gamingDiv")
    let guessDiv = document.getElementById("guessDiv")
    let triesLeftSpan = document.getElementById("triesLeftSpan")
    let clearBtn2 = document.getElementById("clearBtn2")
    let checkBtn = document.getElementById("checkBtn")

    gamingDiv.style.display = "none"

    // clear all button functionality
    clearBtn2.addEventListener('click', () => {
        guess = []
        atIndex = 0
        triesLeft -= 1
        if (triesLeft === 0) {
            gamingDiv.style.display = "none"
            gameOverDiv.style.display = "flex"
        }
    })

    
    // check button and swipe functionality
    function nextLevel() {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        gamingDiv.style.display = "none"
        nextLvlDiv.style.display = "flex"
    }

    const equals = (a, b) => a.length === b.length && a.every((v, i) => v === b[i])
    function swipeEvent() {
        triesLeft -= 1
        if (equals(code, guess)) {
            nextLevel()
        } else {
            if (triesLeft === 0) {
                gamingDiv.style.display = "none"
                gameOverDiv.style.display = "flex"
            } else {
                guess = []
                atIndex = 0
                console.log("maybe next time...")
            }
        }
    }

    checkBtn.addEventListener('click', () => {
        checkBtn.style.color = "black"
        swipeEvent()
    })

    // --------------------------------------------------------------------------------------------




    // next level screen elements -----------------------------------------------------------------
    let nextLvlDiv = document.getElementById("nextLvlDiv")
    let solutionDiv = document.getElementById("solutionDiv")
    let plainTextDiv = document.getElementById("plainTextDiv")
    let quitBtn = document.getElementById("quitBtn")
    let nextBtn = document.getElementById("nextBtn")

    nextLvlDiv.style.display = "none"

    solutionDiv.innerHTML = `original code = your code`
    solutionDiv.style.color = "green"
    
    // quit button functionality
    quitBtn.addEventListener('click', () => {
        nextLvlDiv.style.display = "none"
        gameOverDiv.style.display = "flex"
    })

    // next button functionality
    nextBtn.addEventListener('click', () => {
        nextLvlDiv.style.display = "none"
        if (lvl === maxLvl) {
            gameOverDiv.style.display = "flex"
        } else {
            code = []
            guess = []
            triesLeft = 3
            atIndex = 0
            lvl += 1
            containerDiv.style.display = "flex"
        }
    })
    // --------------------------------------------------------------------------------------------




    // game over screen elements ------------------------------------------------------------------
    let gameOverDiv = document.getElementById("gameOverDiv")
    let tryAgainBtn = document.getElementById("tryAgainBtn")
    let closeBtn = document.getElementById("closeBtn")

    gameOverDiv.style.display = "none"
    
    // try again button functionality
    tryAgainBtn.addEventListener('click', () => {
        document.location.reload()
    })

    // close game button functionality
    closeBtn.addEventListener('click', () => {
        if (confirm("Close Game?")){
            window.close()
        }
    })
    // --------------------------------------------------------------------------------------------
    

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
        constructor(x, y, c1, radius) {
            this.x = x
            this.y = y
            this.c1 = c1
            this.radius = radius
        }

        
        drawWheel(rotationAngle) {
            // draw Background Circle
            ctx.beginPath()
            ctx.fillStyle = this.c1
            ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI, true)
            ctx.fill()
            ctx.closePath()
            ctx.resetTransform()

            ctx.beginPath();
            ctx.fillStyle='darkred';
            ctx.moveTo(this.x, this.y);
            ctx.arc(this.x,this.y,this.radius,-4*(Math.PI/8)+(Math.PI/16),(Math.PI/4)+(Math.PI/16),false); 
            ctx.fill();
            ctx.fillStyle= 'grey'
            ctx.closePath();
            
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
            for (let i = Math.PI; i <= Math.PI*2+Math.PI/4; i) {
                ctx.save()
                ctx.rotate(-i)
                ctx.translate(0, 120)
                ctx.strokeRect(0, 0, 3, 20)
                ctx.restore()
                i += Math.PI/8
            }
            ctx.restore()
        }
        
        isInside(ix, iy) {
            inside = distance(x, y, ix, iy) < this.radius
        }
        
        calcNewAlpha(ix, iy, ox, oy) {
            let newAlpha = Math.atan2( oy-iy, ox-ix)
            if (oldAlpha) deltaAlpha += newAlpha - oldAlpha
            oldAlpha = newAlpha
        }

        reset() {
            inside = false
            oldAlpha = undefined
            delta = 0
            lineArray = []
            deltaAlpha = 0
            atIndex += 1
            number = 0
        }
    }
    
    class SwitchLock {
        constructor(x, y, w, h) {
            this.x = x
            this.y = y
            this.w = w
            this.h = h
        }

        drawSwitch(c) {
            // draw rect
            ctx.save()
            ctx.beginPath()
            ctx.fillRect(this.x-100, this.y, this.w, this.h)
            ctx.fillStyle = "grey"
            ctx.closePath()
            ctx.restore()
            ctx.resetTransform()

            // draw arrow on switch
            bPath.moveTo(7, 0)
            bPath.lineTo(2, 2)
            bPath.lineTo(3, 0.5)
            bPath.lineTo(-7, 0.5)
            bPath.lineTo(-7, -0.5)
            bPath.lineTo(3, -0.5)
            bPath.lineTo(2, -2)
            bPath.lineTo(7, 0)
            bPath.closePath()
            
            ctx.save()
            ctx.translate(x, y+canvas.height/3-canvas.height/20)
            ctx.scale(7, 7)
            ctx.strokeStyle = c
            ctx.fillStyle = c
            ctx.fill(bPath)
            ctx.stroke(bPath)
            ctx.restore()
            ctx.resetTransform()
        }

        isInsideRect(ix, iy, e) {
            if (ix<this.x-100+this.w && ix>this.x-100 && iy<this.y+this.h && iy>this.y) {
                color = "green"
                lineArray.push(e.touches[0].pageX)
                for (let i = 1; i<lineArray.length; i++) {
                    delta += (lineArray[i-1] - lineArray[i])
                    if (delta<-600) {
                        delta = 0
                        swipeEvent()
                    }
                }
            } //else console.log("is not inside")
        }
    }
    function drawTutorial() {
        ctx.save()
        ctx.beginPath()
        ctx.font="13px Arial"
        ctx.fillStyle = "black"
        ctx.fillText("Tutorial: swipe FAST! to check", x-115, y+18*(canvas.height/50))
        ctx.closePath()
        ctx.restore()
    
        ctx.save()
        ctx.beginPath()
        ctx.font="13px Arial"
        ctx.fillStyle = "black"
        ctx.fillText("Tutorial: Choose number by rotating arrow counterclockwise,", x-220, y-canvas.height/4+9)
        ctx.fillText("release finger to lock the digit and get to next digit.", x-220, y-canvas.height/4+25)
        ctx.fillText("Malfunction if finger moves over red section.", x-220, y-canvas.height/4+41)
        ctx.closePath()
        ctx.restore()        
    }
    function drawDigit() {
        ctx.save()
        ctx.translate(x, y)
        ctx.fillStyle = "black"
        ctx.font = 30 + "px arial";
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        ctx.rotate(deltaAlpha);
        ctx.translate(0, -wheel.radius * 1.50);
        ctx.rotate(-deltaAlpha);
        ctx.fillText(number.toString(), 0, 0);
        ctx.rotate(deltaAlpha);
        ctx.translate(0, wheel.radius * 1.50);
        ctx.rotate(-deltaAlpha);
        ctx.restore()
        ctx.resetTransform()
    }
    const wheel = new Wheel(x, y, "grey", 100)
    const unlock = new SwitchLock(x, 3 * canvas.height / 4, 200, 50)


    function draw(rotationAngle) {
        wheel.drawWheel(rotationAngle)
        wheel.drawOuterWheel()
        unlock.drawSwitch(color)
        if (!inside && showTutorial) {
            drawTutorial()
        }
        if (number>0) {
            drawDigit()
        }
    }
    
    function checkInside(e) {
        wheel.isInside(e.touches[0].pageX, e.touches[0].pageY)
        unlock.isInsideRect(e.touches[0].pageX, e.touches[0].pageY, e)
    }
    function deltaAlphaToNumber() {
        return Math.abs(Math.round(deltaAlpha/(Math.PI/8)))
    }

    refreshCode()   // single call of refreshCode() for correct display of initial screen

    // touch events -------------------------------------------------------------------------------
    canvas.addEventListener('touchstart', (e) => {
        e.preventDefault()
        wheel.isInside(e.touches[0].pageX, e.touches[0].pageY)
        lineArray.push(e.touches[0].pageX)
    }, false)
    
    canvas.addEventListener('touchmove', (e) => {
        e.preventDefault()
        if (inside && atIndex<lvl) {
            wheel.calcNewAlpha(e.touches[0].pageX, e.touches[0].pageY, x, y)
            number = deltaAlphaToNumber()
            if (number > 0) {
                guess[atIndex] = number     // for live incremental display of the guess
            } else if (number === 0 && atIndex === 0) {
                guess = []                  // for displaying initial message if first digit turns to be 0
            }
        } else if (inside) {
            checkBtn.style.color = "green"  // guess full
        }
        checkInside(e)    
    }, false)
    
    canvas.addEventListener('touchend', (e) => {
        e.preventDefault()
        if (inside && atIndex<=lvl) {
            wheel.reset()
        }
        color = "black"
    }, false)
    // --------------------------------------------------------------------------------------------
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        refreshCode()
        draw(deltaAlpha)
        requestAnimationFrame(animate)
    }
    if (confirm("Show Tutorial messages?")) {
        showTutorial = true
    }
}