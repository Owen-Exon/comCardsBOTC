export const cardsData = [
    // Evil Setup
    {
        text:"meet your fellow MINIONS // _(keep your eyes open)_",
        logo:"legion",
        rotation:-0.08,
        colour:"evil",
        scriptsWith:"any"
    },
    {
        text:"this is the DEMON",
        logo:"demon",
        colour:"evil",
        scriptsWith:"any"
    },
    {
        text:"these are your MINIONS",
        logo:"minion",
        colour:"evil",
        scriptsWith:"any"
    },
    {
        text:"_your word is:_ // “[input]”",
        logo:"mezepheles",
        colour:"evil",
        scriptsWith:["mezepheles"]
    },
    {
        text:"_your phrase is:_ // “[input]”",
        logo:"yaggababble",
        colour:"evil",
        scriptsWith:["yaggababble"]
    },
    {
        text:"choose who BABYSITS lil' monsta",
        logo:"lilmonsta",
        colour:"evil",
        scriptsWith:["lilmonsta"]
    },
    {
        text:"you // CAN'T OPEN // YOUR EYES tonight",
        logo:"wraith",
        colour:"evil",
        scriptsWith:["wraith"]
    },
    "break",
    // Info
    {
        text:"these characters are NOT // IN PLAY",
        logo:"outsider",
        colour:"neutral",
        scriptsWith:"any"
    },
    {
        text:"this character IS // IN PLAY",
        logo:"toymaker",
        colour:"neutral",
        scriptsWith:["widow","damsel"]
    },
    {
        text:"this character SELECTED you",
        logo:"revolutionary",
        colour:"neutral",
        scriptsWith:["harpy","cerenovus","barber","boffin","hatter","preacher","exorcist","barista","harlot"]
    },
    "break",
    // Alignment And Identity
    {
        text:"YOU // are",
        logo:"townsfolk",
        colour:"tellyou",
        scriptsWith:"any" // <- travelers else: ["imp","fanggu","riot","pithag","summoner","scarletwoman","lunatic","barber","bountyhunter","goon","snakecharmer","cultleader","engineer","farmer","tor"]
    },
    {
        text:"THIS PLAYER is",
        logo:"ojo",
        colour:"tellyou",
        scriptsWith:["lunatic","king","nightwatchman"]
    },
    {
        text:"you are GOOD",
        logo:"saint",
        colour:"good",
        scriptsWith:"any" // <- travelers else: ["goon","barber","pithag","snakecharmer","cultleader"]
    },
    {
        text:"you are // EVIL",
        logo:"wraith",
        colour:"evil",
        scriptsWith:"any" // <- travelers else: ["fanggu","barber","pithag","bountyhunter","snakecharmer","cultleader"]
    },
    "break",
    // Ability
    {
        text:"CHOOSE // for your ability",
        logo:"devilsadvocate",
        colour:"ability",
        scriptsWith:"any"
    },
    {
        text:"do you // use your ABILITY?",
        logo:"amnesiac",
        colour:"ability",
        scriptsWith:["assassin","wizard","engineer","nightwatchman","courtier","seamstress","philosopher","huntsman","professor","bonecollector"]
    },
    {
        text:"your ABILITY is",
        logo:"alchemist",
        colour:"ability",
        scriptsWith:["alchemist","apprentice","boffin"]
    },
    {
        text:"choose [option] [option] [option]",
        logo:"amnesiac",
        options:[
            "a",
            "one",
            "two",
            "three",
            "living",
            "dead",
            "PLAYER",
            "PLAYERS",
            "CHARACTER",
            "CHARACTERS",
            "NUMBER",
            "NUMBERS",
            ""
        ],
        colour:"ability",
        scriptsWith:"any"

    },
    "break",
    // Tell me
    {
        text:"did you VOTE // today",
        logo:"flowergirl",
        colour:"tellme",
        scriptsWith:["flowergirl"]
    },
    {
        text:"did you NOMINATE // today",
        logo:"towncrier",
        rotation:0.5,
        colour:"tellme",
        scriptsWith:["towncrier"]
    },
    "break",
    // Meta
    {
        text:"we should CHAT tomorrow",
        logo:"yaggababble",
        mirror:"x",
        colour:"meta",
        scriptsWith:"any"
    },
    {
        text:"i made a MISTAKE this is my correction",
        logo:"steward",
        colour:"meta",
        scriptsWith:"any"
    },
    {
        text:"that's not allowed CHOOSE AGAIN",
        logo:"gossip",
        colour:"meta",
        scriptsWith:"any"
    },
    "break",
    // Custom
    {
        text:"[input]",
        logo:"amnesiac",
        colour:"#000",
        scriptsWith:"any"
    }
]
