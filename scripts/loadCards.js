const presetColours = {
    "evil":"hsl(0, 35%, 18%)",
    "good":"hsl(198, 51%, 25%)",
    "meta":"hsl(320, 51%, 25%)",
    "tellme":"hsl(51, 50%, 25%)",
    "tellyou":"hsl(272, 39%, 26%)",
    "ability":"hsl(39, 41%, 21%)",
    "neutral":"hsl(108, 39%, 26%)",
}

const cardContainer = document.getElementById("card")

const message = document.getElementById("message")
const logo = document.getElementById("logo")
const background = document.getElementById("background")

const selection = document.getElementById("selection")

for (let i = 0; i < cards.length; i++) {
    const selectButton = document.createElement("button")
    selectButton.innerHTML = cards[i].text
    selectButton.onclick = () => {loadCard(i); selection.classList.add("hidden")}
    selection.appendChild(selectButton)
}

cardContainer.onclick = () => {selection.classList.remove("hidden")}

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

    background.style.backgroundColor = presetColours.hasOwnProperty(card.colour) ? presetColours[card.colour] : card.colour

    logo.src = `./icons/${card.logo}.png`
    if (this.card.hasOwnProperty("rotation")) {
        logo.style.rotate = `${card.rotation}turn`
    }
    if (this.card.hasOwnProperty("mirror")) {
        logo.style.scale = `${card.mirror.indexOf("x") != -1 ? "-1" : "1"} ${card.mirror.indexOf("y") != -1 ? "-1" : "1"}`
        card.mirror
    }
}

loadCard(0)