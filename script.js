let currentPageUrl = 'https://swapi.dev/api/people/'

window.onload = async () => {
   try {
    await  loadCharacters(currentPageUrl);
   }catch (error) {
    console.log(error);
    alert('Erro ao carregar cards!');
   } 

   const nextButton = document.getElementById('inext-button')
   const backButton = document.getElementById('iback-button')

   nextButton.addEventListener('click', loadNextPage)
   backButton.addEventListener('click', loadPreviousPage)
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

            card.onclick = () => {
                const modal = document.getElementById('imodal')
                modal.style.visibility = "visible"
            }

            mainContent.appendChild(card)
        });

        
        const nextButton = document.getElementById('inext-button')
        const backButton = document.getElementById('iback-button')

        nextButton.disable = !responseJson.next
        backButton.disable = !responseJson.previous

        backButton.style.visibility = responseJson.previous? "visible" : "hidden"
        
        currentPageUrl = url

    } catch(error) {
        alert('erro ao carregar os personagens')
        console.log(error)

    }
}

async function loadNextPage() {
    if (!currentPageUrl) return;
  
    try {
      const response = await fetch(currentPageUrl)
      const responseJson = await response.json()
  
      await loadCharacters(responseJson.next)
    } catch (error) {
      console.log(error)
      alert('Erro ao carregar a próxima página')
    }
  }



async function loadPreviousPage() {
    if (!currentPageUrl) return;

    try {
        const response = await fetch(currentPageUrl)
        const responseJson = await response.json()

        await loadCharacters(responseJson.previous)
        
    } catch (error) {
        console.log(error)
        alert('Erro ai carregar a pagina anterior')
    }
}

function hideModal() {
    const modal = document.getElementById('imodal')
    modal.style.visibility = "hidden"

}