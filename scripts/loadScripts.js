async function loadAllGameScripts() {
    const res = await fetch(
    "/api/file/list?path=scripts/gameScripts/",
        {
            method: "GET"
        }
    );

    let scriptNames
    if (res.status == 404) {
        scriptNames = ["Bad Moon Rising.json","Sects and Violets.json","Trouble Brewing.json"]
    } else {
        const data = await res.json();
        console.log(data);
        
        scriptNames = data.map(file => {
            if (file.length != 0) {
                return file.name
            }
        })
    }

    const scriptData = await Promise.all(
        scriptNames.map(file =>
            fetch(`scripts/gameScripts/${file}`)
                .then(r => r.json())
        )
    );

    return scriptData
}

export const scripts = await loadAllGameScripts();
