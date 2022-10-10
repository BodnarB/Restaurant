let datum = document.querySelector('#js-date')
let nap = document.querySelector('.js-day')
let levesAr = document.querySelector('#js-soup-price')
let levesNev = document.querySelector('#js-soup')
let foetelNev = document.querySelector('#js-main-name')
let foetelAr = document.querySelector('#js-main-price')
let napok = ['Hétfő', 'Kedd', 'Szerda', 'Csütörtök', 'Péntek']
let taroltNapok
let napDatumbol

addEventListener('load', fetchEtlap)
addEventListener('change', napValue)

function napValue() {
    let datumValue = datum.value
    let newDatum = new Date(datumValue)
    let napNum = newDatum.getDay()
    nap.innerText = napok[napNum - 1]
    napDatumbol = napok[napNum - 1]
}



async function fetchEtlap() {
    const response = await fetch('./data/menu.json')
    const etlap = await response.json()
    console.log(etlap) //////////////////////////////////////////////////////////////////
    taroltNapok = []
    let etlapHTML = '<h3>Étlap jelenleg:</h3>'
    for (let etel of etlap) {
        etlapHTML += `
        <div class="previewFood">
        <p>${etel.datum}</p>
        <p>${etel.nap}</p>
        <p>${etel.levesNev}</p>
        <p>${etel.levesAr} Ft</p>
        <p>${etel.foetelNev}</p>
        <p>${etel.foetelAr} Ft</p>
        <button class="food-btn food-del" id="${etel.nap}">Törlés</button>
        </div>`
        taroltNapok.push(etel.nap)
    }

    document.querySelector('.current-menu').innerHTML = etlapHTML


    for (let delBtn of document.querySelectorAll('.food-del')) {
        delBtn.addEventListener('click', async function (event) {
            let idx = event.target.id
            const response = await fetch(`./data/menu.json/${idx}`, {
                method: "delete"
            })
            if (!response.ok) {
                alert("A törlés sikertelen!")
                return
            }
            fetchEtlap()
        })
    }
}

async function addToMenu(event) {
    event.preventDefault()
    newNap = napDatumbol
    datum = datum.value
    foetelNev = foetelNev.value
    foetelAr = foetelAr.value
    levesNev = levesNev.value
    levesAr = levesAr.value

    const response = await fetch('./data/menu.json')
    const etlap = await response.json()
    const napok = etlap.find(({ nap }) => nap === newNap)
    console.log(napok.datum)


    if (taroltNapok.includes(newNap)) {
        console.log('van')
        napok
        
    }
    else {
        console.log('new meal')
    }
    //     const res = await fetch(napok, {
    //         method: "PUT",
    //         body: JSON.stringify({ nap, datum, levesNev, levesAr, foetelNev, foetelAr }),
    //         headers: {
    //             "content-type": "application/json",
    //         }
    //     })
    //     if (res.ok) {
    //         fetchEtlap();
    //     } else {
    //         alert("Server error");
    //     }
    // }

    // else {
    //     const res = await fetch('/data/menu.json', {
    //         method: "POST",
    //         headers: {
    //             "content-type": "application/json",
    //         },
    //         body: JSON.stringify({ nap, datum, levesNev, levesAr, foetelNev, foetelAr }),
    //     })
    //     if (res.ok) {
    //         fetchEtlap();
    //     } else {
    //         alert("Server error");
    //     }
    // }
}

document.querySelector('.submit-btn').addEventListener('click', addToMenu)