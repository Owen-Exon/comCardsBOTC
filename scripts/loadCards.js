const presetColours = {
    "evil":"hsl(0, 35%, 18%)",
    "good":"hsl(198, 51%, 25%)",
    "meta":"hsl(320, 51%, 25%)",
    "tellme":"hsl(51, 50%, 25%)",
    "tellyou":"hsl(272, 39%, 26%)",
    "ability":"hsl(39, 41%, 21%)",
    "neutral":"hsl(108, 39%, 26%)",
}


const message = document.getElementById("message")
const logo = document.getElementById("logo")
const background = document.getElementById("background")

function loadCard(i) {
    card = cards[i]
    cardText = card.text

    cardText = cardText.replace(
        /\//g,
       " <br> "
    )

    cardText = cardText.replace(
        /\b[A-Z]{2,}\b[?]*/g,
        match => `<span class="keyWord"> ${match} </span>`
    )
    
    cardText = cardText.replace(
        /\([^)]*\)/g,
        match => `<span class="mini"> ${match} </span>`
    )

    message.innerHTML = cardText

    if (presetColours.hasOwnProperty(card.colour)) {
        background.style.backgroundColor = presetColours[card.colour]
    } else {
        background.style = card.colour
    }

    logo.src = `./icons/${card.logo}.png`
    if (this.card.hasOwnProperty("rotation")) {
        logo.style.rotate = `${card.rotation}turn`
    }
    if (this.card.hasOwnProperty("mirror")) {
        logo.style.scale = `${"-1" ? card.mirror.indexOf("x") != -1 : "1"} ${"-1" ? card.mirror.indexOf("y") != -1 : "1"}`
        card.mirror
    }
}

loadCard(0)