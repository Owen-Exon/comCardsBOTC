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
let srcs = []

for (let i = 0; i < cards.length; i++) {
    const card = cards[i]

    let cardText = card.text

    cardText = cardText.replace(
        /\[input\]/g,
        match => `<input class="cardInput" type="text" onkeydown="changeInputText(this)">`
    )
    
    cardText = cardText.replace(
        /\//g,
       "<br>"
    )

    cardText = cardText.replace(
        /\b[A-Z]{2,}\b[?]*/g,
        match => `<span class="keyWord">${match}</span>`
    )
    
    cardText = cardText.replace(
        /\_[^\_]*\_/g,
        match => `<span class="mini">${match.replace(/\_/g,"")}</span>`
    )
    
    cardTexts.push(cardText)

    const cardColour = presetColours.hasOwnProperty(card.colour) ? presetColours[card.colour] : card.colour
    backgroundColors.push(cardColour)

    src = `./icons/${card.logo}.png`

    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    link.fetchPriority = 'high';
    
    srcs.push(src)

    document.head.append(link);

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
        match => `<span class="buttonKeyWord">${match}</span>`
    )
    
    buttonText = buttonText.replace(
        /\_/g,
        ""
    )

    const selectButton = document.createElement("button")
    selectButton.innerHTML = `<span style="color:${cardColour};">█</span> ${buttonText}`

    selectButton.onclick = () => {loadCardIndex(i); selection.classList.add("hidden")}
    selection.appendChild(selectButton)
}

cardContainer.onclick = (e) => {if (e.target.nodeName != "INPUT") selection.classList.remove("hidden")}

function loadCard(text,backgroundColor,src,rotation,scale) {
    message.innerHTML = text

    background.style.backgroundColor = backgroundColor

    logo.src = src
    logo.style.rotate = rotation
    logo.style.scale = scale
}

function loadCardIndex(i) {
    loadCard(
        cardTexts[i],
        backgroundColors[i],
        srcs[i],
        rotationStyles[i],
        scaleStyles[i]
    )
}

function changeInputText(element) {
    if (event.key == "Enter") {
        let text = element.value

        text = text.replace(
            /\//g,
        "<br>"
        )

        text = text.replace(
            /\b[A-Z]{2,}\b[?]*/g,
            match => `<span class="keyWord">${match}</span>`
        )
        
        text = text.replace(
            /\_[^\_]*\_/g,
            match => `<span class="mini">${match.replace(/\_/g,"")}</span>`
        )

        const template = document.createElement("template");
        template.innerHTML = text;

        element.replaceWith(...template.content.childNodes);
    }
}

loadCardIndex(0)