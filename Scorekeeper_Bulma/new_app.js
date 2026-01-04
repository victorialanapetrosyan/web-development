const p1 = {
    score: 0,
    button: document.querySelector('#p1Button'),
    display: document.querySelector('#p1Display'),
}
const p2 = {
    score: 0,
    button: document.querySelector('#p2Button'),
    display: document.querySelector('#p2Display'),
}
const resetButton = document.querySelector('#reset');
const winningScoreSelect = document.querySelector('#playto');
const body = document.querySelector('body')
let winningScore = 3;
let isGameOver = false;

function updateScores(player,opponent){
    if(!isGameOver) {
        player.score += 1;
        if(player.score === winningScore) {
            isGameOver = true;
            player.display.classList.add('has-text-success')
            opponent.display.classList.add('has-text-danger')
            player.button.disabled = true;
            opponent.button.disabled = true;
        }
        player.display.textContent = player.score;
    }

}
p1.button.addEventListener('click',function(){
    updateScores(p1,p2)
})

p2.button.addEventListener('click',function(){
    updateScores(p2,p1)
})

winningScoreSelect.addEventListener('change',function(){
    winningScore = parseInt(this.value)
    reset();
})

resetButton.addEventListener('click',reset)

function reset() {
    const actionTimestamp = new Date();
    const formattedTime = formatActionTime(actionTimestamp);
    if (isGameOver===true) {

        const container = document.createElement("div")
        document.querySelector('section').append(container)
        container.classList.add('container')

        const columns = document.createElement("div")
        container.append(columns)
        columns.classList.add('columns')

        const columnsSize = document.createElement("div")
        columns.append(columnsSize)
        columnsSize.classList.add('column', 'is-half', 'is-offset-one-quarter')

        const card = document.createElement("div")
        columnsSize.append(card)
        card.classList.add('card')

        const cardContent = document.createElement("div")
        card.append(cardContent)
        cardContent.classList.add('card-content')

        const pTitle = document.createElement("p")
        cardContent.append(pTitle)
        pTitle.classList.add('title')

        const footer = document.createElement("footer")
        card.append(footer)
        footer.classList.add('card-footer')
        const footerItem = document.createElement("p")
        footer.append(footerItem)
        footerItem.classList.add('card-footer-item')
        const span = document.createElement("span")
        footerItem.append(span)
        span.innerText = `played on ${formattedTime}`
        const footerItemButton = document.createElement("p")
        footer.append(footerItemButton)
        footerItemButton.classList.add('card-footer-item')
        const scoresArray = []
        for(let p of [p1,p2]){
            scoresArray.push(p.score)
        }
        pTitle.innerText = `${scoresArray[0]} to ${scoresArray[1]}`
        const deleteButton = document.createElement("button")
        deleteButton.innerText = "Delete"
        deleteButton.classList.add('button', 'is-danger','is-large')

        deleteButton.classList.add('deleteButton'); 
        footerItemButton.append(deleteButton);

        deleteButton.addEventListener('click', () => {
            container.remove();
        });


        isGameOver = false;
        for(let p of [p1,p2]){
            p.score = 0;
            p.display.textContent = 0;
            p.display.classList.remove('has-text-success','has-text-danger');
            p.button.disabled = false;
        }

    } else {
        isGameOver = false;
        for(let p of [p1,p2]){
            p.score = 0;
            p.display.textContent = 0;
            p.display.classList.remove('has-text-success','has-text-danger');
            p.button.disabled = false;
        }
    }
    
    
    

}



function formatActionTime(date) {
    const pad = (n) => String(n).padStart(2, '0');

    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1);
    const day = pad(date.getDate());
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    const seconds = pad(date.getSeconds());

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}




