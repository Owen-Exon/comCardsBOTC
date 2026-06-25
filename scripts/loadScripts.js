async function loadAllGameScripts() {
    const scriptNames = [
        "Bad Moon Rising.json",
        "Sects and Violets.json",
        "Trouble Brewing.json"
    ]

    const scriptData = await Promise.all(
        scriptNames.map(file =>
            fetch(`scripts/gameScripts/${file}`)
                .then(r => r.json())
        )
    );

    return scriptData
}

export const scripts = await loadAllGameScripts();
