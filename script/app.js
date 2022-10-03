let menu

async function apiMenu() {
    let response = await fetch('https://bodnarb-azure.azurewebsites.net/admin')
    menu = await response.json()
    etlapUpdate()
}

function etlapUpdate() {
    let hetiMenuHTML = document.querySelector('.heti-menu')
    let menuHTML = document.querySelector('.heti-menu-js')
    for (let nap of menu) {
        hetiMenuHTML.innerHTML += `
        <div class="${nap.nap} napi-menu">
            <h3>${nap.datum.replace(/-/g, '. ')}. ${nap.nap}</h3>
            <div class="napi-menu-tetel ">
                <div class="nev-ar"><label for="${nap.nap}-leves">${nap.levesNev}</label>
                    <p>${nap.levesAr} Ft</p>
                </div>
                <div class="input-db"><input type="number" name="${nap.nap}-leves" id="${nap.nap}-leves" min="1"
                        max="5">db</div>
            </div>
            <div class="napi-menu-tetel">
                <div class="nev-ar"><label for="${nap.nap}-foetel">${nap.foetelNev}</label>
                    <p>${nap.foetelAr} Ft</p>
                </div>
                <div class="input-db"><input type="number" name="${nap.nap}-foetel" id="${nap.nap}-foetel" min="1"
                        max="5">db
                </div>
            </div>

        </div>
        `
    }
    hetiMenuHTML.innerHTML += ` <button type="submit">Rendelés küldése >></button>`
}

addEventListener('load', apiMenu)