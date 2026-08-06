import {cardsData} from "./cards.js"
import {scripts} from "./loadScripts.js"
//#region variables

const cards = cardsData.filter((value) => value != "break")

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

let scriptCards = []
let buttons = []

//#endregion variables

//#region setupCards

scriptSelect.addEventListener("change", (e) => {
    changeScript(e.target);
});

for (let i = 0; i < cardsData.length; i++) {
    const card = cardsData[i]

    if (card == "break") {
        const div = document.createElement("div")
        div.classList.add("break")
        selection.appendChild(div)
        continue
    }

    const cardText = processCardText(card)

    const cardColour = presetColours.hasOwnProperty(card.colour) ? presetColours[card.colour] : card.colour

    const src = `./icons/${card.logo}.png`

    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    link.fetchPriority = 'high';

    document.head.append(link);

    const rotationStyle = card.hasOwnProperty("rotation") ? `${card.rotation}turn` : ""
        


    const scaleStyle =
        card.hasOwnProperty("mirror") ? `${card.mirror.includes("x") ? "-1" : "1"} ${card.mirror.includes("y") ? "-1" : "1"}` : ""

    let buttonText = card.text

    buttonText = buttonText.replace(
        /\/\//g,
       ""
    )

    buttonText = buttonText.replace(
        /\b[A-Z']{2,}\b[?]*/g,
        match => `<span class="buttonKeyWord">${match}</span>`
    )
    
    buttonText = buttonText.replace(
        /\_/g,
        ""
    )

    const selectButton = document.createElement("button")
    selectButton.innerHTML = `<span style="color:${cardColour};">█</span> ${buttonText}`

    selectButton.onclick = () => {loadCard(cardText,cardColour,src,rotationStyle,scaleStyle); selection.classList.add("hidden")}
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
        /\b[A-Z']{2,}\b[?]*/g,
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

function changeInputText(element) {
    console.log(element.value)
    if ((element.nodeName == "INPUT" && event.key == "Enter") || element.nodeName == "SELECT") {
        const text = processCardText(element.value)

        const template = document.createElement("template");
        template.innerHTML = text;
        element.replaceWith(...template.content.childNodes);
    }
}

window.changeInputText = changeInputText

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
    hideUneededBreaks()
}

function hideUneededBreaks() {
    Array.from(selection.getElementsByClassName("break")).slice(1).forEach((breakPoint) => {
        let done = false
        let currentCompare = breakPoint.previousSibling
        while (!done) {
            if (currentCompare.classList.contains("break")) {
                breakPoint.classList.add("hidden")
                done = true
            } else if (!currentCompare.classList.contains("hidden")) {
                breakPoint.classList.remove("hidden")
                done = true
            }
            currentCompare = currentCompare.previousSibling
        }
    })
}

//#endregion functions

buttons.at(-1).onclick()
selection.classList.remove("hidden")