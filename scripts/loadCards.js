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

selection.onclick = () => selection.classList.add("hidden")

let cardTexts = []
let backgroundColors = []
let rotationStyles = []
let scaleStyles = []

for (let i = 0; i < cards.length; i++) {
    const card = cards[i]

    let cardText = card.text

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
    
    cardTexts.push(cardText)

    const cardColour = presetColours.hasOwnProperty(card.colour) ? presetColours[card.colour] : card.colour
    backgroundColors.push(cardColour)

    rotationStyles.push(
        card.hasOwnProperty("rotation")
            ? `${card.rotation}turn`
            : ""
    )

    scaleStyles.push(
        card.hasOwnProperty("mirror")
            ? `${card.mirror.includes("x") ? "-1" : "1"} ${card.mirror.includes("y") ? "-1" : "1"}`
            : ""
    )

    let buttonText = card.text

    buttonText = buttonText.replace(
        /\//g,
       ""
    )

    buttonText = buttonText.replace(
        /\b[A-Z]{2,}\b[?]*/g,
        match => `<span class="buttonKeyWord"> ${match} </span>`
    )
    
    buttonText = buttonText.replace(
        /\([^)]*\)/g,
        ""
    )

    const selectButton = document.createElement("button")
    selectButton.innerHTML = `<span style="color:${cardColour};">█</span> ${buttonText}`

    selectButton.onclick = () => {loadCard(i); selection.classList.add("hidden")}
    selection.appendChild(selectButton)
}

cardContainer.onclick = () => {selection.classList.remove("hidden")}

function loadCard(i) {
    const card = cards[i]

    message.innerHTML = cardTexts[i]

    background.style.backgroundColor = backgroundColors[i]

    logo.src = `./icons/${card.logo}.png`
    
    logo.style.rotate = rotationStyles[i]

    logo.style.scale = scaleStyles[i]
}

loadCard(0)