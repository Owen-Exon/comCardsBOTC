async function loadAllGameScripts() {
    const res = await fetch("scripts/gameScripts/");
    const html = await res.text();

    const doc = new DOMParser().parseFromString(html, "text/html");

    const files = [...doc.querySelectorAll("a")]
        .map(a => a.getAttribute("href"))
        .filter(href =>
            href &&
            href.endsWith(".json")
        )
        .map(href =>
            decodeURIComponent(href).replace(/\\\\/g, "/")
        )
        .map(path => path.split("\\").pop()); // keep only filename
    
    const data = await Promise.all(
        files.map(file =>
            fetch(`scripts/gameScripts/${file}`)
                .then(r => r.json())
        )
    );
    return data
}

export const scripts = await loadAllGameScripts();
