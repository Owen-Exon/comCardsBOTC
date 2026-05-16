//#region variables

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

const scriptSelect = document.getElementById("scriptSelect")

let cardTexts = []
let backgroundColors = []
let rotationStyles = []
let scaleStyles = []
let srcs = []

let scriptCards = []
let buttons = []

//#endregion variables

//#region setupCards

for (let i = 0; i < cards.length; i++) {
    const card = cards[i]

    const cardText = processCardText(card)

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
        /\/\//g,
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
    buttons.push(selectButton)
}

cardContainer.onclick = (e) => {if (["INPUT","SELECT"].indexOf(e.target.nodeName) == -1) selection.classList.remove("hidden")}
selection.onclick = (e) => {if (["SELECT"].indexOf(e.target.nodeName) == -1)selection.classList.add("hidden")}

scripts.forEach((script,indexScript) => {
    const cardIndexes = []
    cards.forEach((card,indexCard) => {
        if (card.scriptsWith === "any" || card.scriptsWith.some(character => script.includes(character))) {
            cardIndexes.push(indexCard)
        }
    })
    scriptCards.push(cardIndexes)

    const temp = document.createElement("option")
    temp.value = indexScript
    temp.innerHTML = script[0].name
    scriptSelect.appendChild(temp)
});

//#endregion setupCards

//#region functions

function processCardText(input) {
    let text = undefined
    let card = undefined
    if (typeof input == "string") {
        text = input
        card = undefined
    } else {
        card = input
        text = card.text
    }

    text = text.replace(
        /\/\//g,
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

    text = text.replace(
        /\[input\]/g,
        `<input class="cardInput" type="text" onkeydown="changeInputText(this)">`
    )

    if (card && card.hasOwnProperty("options")) {
        text = text.replace(
            /\[option\]/g,
            `<select class="cardInput" onchange="changeInputText(this)"><option value='Please Select'>Please Select</option>${card.options.map(option => `<option value="${option}">${option.replace(/\/\//g,"").replace(/\_/g,"")}</option>`).join('')}</select>`
        )
    }

    return text
}

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
    console.log(element.value)
    if ((element.nodeName == "INPUT" && event.key == "Enter") || element.nodeName == "SELECT") {
        const text = processCardText(element.value)

        const template = document.createElement("template");
        template.innerHTML = text;

        element.replaceWith(...template.content.childNodes);
    }
}

function changeScript(element) {
    if (element.value === "all") {
        buttons.forEach((button) => {
            button.classList.remove("hidden")
        })
    } else {
        buttons.forEach((button) => {
            button.classList.add("hidden")
        })
        scriptCards[parseInt(element.value)].forEach((index) => {
            buttons[index].classList.remove("hidden")
        })
    }
}

//#endregion functions

loadCardIndex(0)