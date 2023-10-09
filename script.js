let currentPageUrl = 'https://swapi.dev/api/people/'

window.onload = async () => {
   try {
    await  loadCharacters(currentPageUrl);
   }catch (error) {
    console.log(error);
    alert('Erro ao carregar cards!');
   } 
};

async function loadCharacters(url) {
    const mainContent = document.getElementById('imain-content')
    mainContent.innerHTML = ''; //limpa resultados anteriores

    try {

        const response = await fetch(url);
        const responseJson = await response.json();

        responseJson.results.forEach((character)=> {
            const card = document.createElement("div")
            card.style.backgroundImage = `url('https://starwars-visualguide.com/assets/img/characters/${character.url.replace(/\D/g, "")}.jpg')`
            card.className = "cards"

            const characterNameBg = document.createElement("div")
            characterNameBg.className = 'character-name-bg' 

            const characterName = document.createElement("span")
            characterName.className = "characters-name"
            characterName.innerText = `${character.name}`

            characterNameBg.appendChild(characterName)
            card.appendChild(characterNameBg)
            mainContent.appendChild(card)
        })

        currentPageUrl = url

    } catch(error) {
        alert('erro ao carregar os personagens')
        console.log(error)

    }
}