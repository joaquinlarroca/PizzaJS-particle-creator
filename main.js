import * as pjs from "/source/modules/index.js"
import * as p from "/source/Addons/particle.js"


pjs.setup(1920, 1080, 1, true);

let ui_bg = "#444444"

let ui_button_bg = "#333333"

let ui_button_color = "#fc7c51"

pjs.loadFont("FiraCode", "/source/fonts/FiraCode/FiraCode-Regular.ttf")

let particleCount = new pjs.slider(`color: ${ui_button_bg}`, "color: #FFFFFF", [1440, 64], [256, 64], 24, [1, 64], ui_button_color, 1)

let particleSize = new pjs.slider(`color: ${ui_button_bg}`, "color: #FFFFFF", [1440, 160], [256, 64], 24, [1, 64], ui_button_color, 12)

let colorBtn = new pjs.button(`color: ${ui_button_bg}`, [1440, 256], [256, 64], "Change Color", "#FFFFFF", 32, 500)

let modeBtn = new pjs.button(`color: ${ui_button_bg}`, [1728, 352], [160, 64], "Mode", "#FFFFFF", 32, 250)

let copy = new pjs.button(`color: ${ui_button_bg}`, [992, 984], [896, 64], "Copy Code", "#FFFFFF", 64, 250)

let mode = "none"

let timeSpeed = new pjs.slider(`color: ${ui_button_bg}`, "color: #FFFFFF", [1440, 736], [256, 64], 24, [0, 100], ui_button_color, 1)

let MaxSin = new pjs.slider(`color: ${ui_button_bg}`, "color: #FFFFFF", [1440, 832], [256, 64], 24, [0, 500], ui_button_color, 25)


let particleSpeedy = new pjs.slider(`color: ${ui_button_bg}`, "color: #FFFFFF", [1440, 352], [256, 64], 24, [-1000, 1000], ui_button_color, 0)

let particleSpeedx = new pjs.slider(`color: ${ui_button_bg}`, "color: #FFFFFF", [1440, 448], [256, 64], 24, [-1000, 1000], ui_button_color, 0)

let particleLifespan = new pjs.slider(`color: ${ui_button_bg}`, "color: #FFFFFF", [1440, 544], [256, 64], 24, [0, 5000], ui_button_color, 1000)

let particleRedAlpha = new pjs.slider(`color: ${ui_button_bg}`, "color: #FFFFFF", [1440, 640], [256, 64], 24, [0, 500], ui_button_color, 0)

let particle = new p.ParticleGenerator(480, 540, 0.1, 10, "#FFFFFF", 500, 500, 2505, 1)

let time = 0

let fps = "wait"

window.addEventListener("pjsUpdate", () => {
    pjs.clear()
    particle.draw()
    particle.update()
    pjs.ctx.fillStyle = ui_bg
    pjs.fillRect(960, 0, 960, 1080)
    pjs.ctx.fillStyle = "#FFFFFF"
    pjs.drawtext("FPS: " + fps, [992, 32], 32, "sans-serif", "middle", "left", 0, 1)
    pjs.drawtext("Particles: " + particle.particles.length, [1888, 32], 32, "sans-serif", "middle", "right", 0, 1)
    pjs.drawtext("Particle Creator", [1440, 32], 32, "sans-serif", "middle", "center", 0, 1)
    particleCount.draw()
    particle.particleCount = particleCount.percentage
    particle.sizeRange = particleSize.percentage
    particle.speedY = particleSpeedy.percentage
    particle.speedX = particleSpeedx.percentage
    particle.lifespanRange = particleLifespan.percentage
    particle.alphaReducer = particleRedAlpha.percentage / 100

    particleSize.draw()
    colorBtn.draw()
    if (colorBtn.click) {
        particle.color = prompt("Input Color")
    }
    particleSpeedy.draw()
    particleSpeedx.draw()
    particleLifespan.draw()
    particleRedAlpha.draw()
    MaxSin.draw()
    timeSpeed.draw()
    modeBtn.draw()
    copy.draw()
    if (copy.click) {
        navigator.clipboard.writeText(`ParticleGenerator(x, y, ${particle.particleCount}, ${particle.sizeRange}, "${particle.color}", ${particle.speedY}, ${particle.speedX}, ${particle.lifespanRange}, ${particle.alphaReducer})`);
    }
    if (copy.canClickDueTimeout) {
        copy.change("Copy Code", "sans-serif")
    }
    else {
        copy.change("Copied", "sans-serif")
    }
    if (modeBtn.click) {
        if (mode == "none") {
            mode = "Y sin"
        }
        else if (mode == "Y sin") {
            mode = "X sin"
        }
        else if (mode == "X sin") {
            mode = "Wave"
        }
        else if (mode == "Wave") {
            mode = "none"
        }
    }
    if (mode == "Y sin") {
        particleSpeedy.percentage = Math.round(MaxSin.percentage * Math.sin(time))
        particleSpeedy.thumbBlocked = true
    }
    else if (mode == "X sin") {
        particleSpeedx.percentage = Math.round(MaxSin.percentage * Math.sin(time))
        particleSpeedy.thumbBlocked = false
        particleSpeedx.thumbBlocked = true
    }
    else if (mode == "Wave") {
        particleSpeedx.percentage = -Math.round(MaxSin.percentage * Math.sin(time * 0.5))
        particleSpeedy.percentage = Math.round(MaxSin.percentage * Math.sin(time))
        particleSpeedy.thumbBlocked = true
        particleSpeedx.thumbBlocked = true
    }
    else {
        particleSpeedy.thumbBlocked = false
        particleSpeedx.thumbBlocked = false
    }


    pjs.ctx.fillStyle = "#FFFFFF"

    pjs.drawtext("Particle Amount: " + particleCount.percentage, [1408 - 32, 80], 32, "sans-serif", "top", "right")

    pjs.drawtext("Particle Size: " + particleSize.percentage, [1408, 176], 32, "sans-serif", "top", "right")

    pjs.drawtext("Particle Color: " + particle.color, [1440 - 32 - pjs.measureTextWidth("Particle Color: " + particle.color, "sans-serif", 32), 272], 32, "sans-serif")

    pjs.drawtext("Particle Speed Y: " + particleSpeedy.percentage, [1440 - 32 - pjs.measureTextWidth("Particle Speed Y: " + particleSpeedy.percentage, "sans-serif", 32), 368], 32, "sans-serif")

    pjs.drawtext("Particle Speed X: " + particleSpeedx.percentage, [1440 - 32 - pjs.measureTextWidth("Particle Speed X: " + particleSpeedx.percentage, "sans-serif", 32), 464], 32, "sans-serif")

    pjs.drawtext("mode: " + mode, [1728, 464], 32, "sans-serif")

    pjs.drawtext("Particle Lifespan: " + particleLifespan.percentage + "ms", [1440 - 32 - pjs.measureTextWidth("Particle Lifespan: " + particleLifespan.percentage + "ms", "sans-serif", 32), 560], 32, "sans-serif")

    pjs.drawtext("Particle Reduce Alpha: " + particleRedAlpha.percentage / 100, [1440 - 32 - pjs.measureTextWidth("Particle Reduce Alpha: " + particleRedAlpha.percentage / 100, "sans-serif", 32), 656], 32, "sans-serif")

    pjs.drawtext("Time: " + timeSpeed.percentage, [1440 - 32 - pjs.measureTextWidth("Time: " + timeSpeed.percentage, "sans-serif", 32), 752], 32, "sans-serif")

    pjs.drawtext("Max Sin: " + MaxSin.percentage, [1440 - 32 - pjs.measureTextWidth("Max Sin: " + MaxSin.percentage, "sans-serif", 32), 848], 32, "sans-serif")

    time += timeSpeed.percentage * pjs.global.deltaTime
})

setInterval(() => {
    fps = Math.round(1 / pjs.global.deltaTime)
}, 150)

pjs.start()