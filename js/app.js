// Create a list that holds all of cards class names
const cardsClassName = [
    'fa-diamond',
    'fa-paper-plane-o',
    'fa-anchor',
    'fa-bolt',
    'fa-cube',
    'fa-leaf',
    'fa-bicycle',
    'fa-bomb',
    'fa-diamond',
    'fa-paper-plane-o',
    'fa-anchor',
    'fa-bolt',
    'fa-cube',
    'fa-leaf',
    'fa-bicycle',
    'fa-bomb'
];

// Game Title
const GameHeader = document.querySelector('.game-header');

// cards array holds all cards
const cards = document.querySelectorAll('.card');

// cards container of all cards in game
const cardContainer = document.querySelector('.deck');

// score panel
const scorePanel = document.querySelector('.score-panel');

// array for opened cards
let openedCards = [];

// Destructuring values from an array opened cards
let [card1,card2] = openedCards;

// declaring variable of openedCards array length
let len = openedCards.length;

// declaring variable of matchedCards
let matchedCards = document.querySelectorAll('.match');

// declaring and initialize no of moves variable
let movesCounter = 0;
const moves = document.querySelector('.moves');

// Restart Button
const restartButton = document.querySelector('.restart');

// show leaderboard panel button
const showLeaderboardButton = document.querySelector('.show-leaderboard');

// congratulation popup modal
const modal = document.querySelector('#modal');
const modalBody = document.querySelector('.modal-body');
const modalCircle = document.querySelector('.circle-loader');
const modalCheckMark = document.querySelector('.check-mark');
const modalButton = document.querySelector('.modal-btn');
const modalLeaderboardButton = document.querySelector('.modal-leaderboard-btn');
const newParagraph = document.createElement('p');

// Declare stars list and index to be used in rating
let starList;
let starIndex = 1;

// Game Timer
let timer = document.querySelector('.timer');
let second = 0, minute = 0, hour = 0;
let minuteString, secondString;
let interval;

// LeaderBoard
const leaderboard = document.querySelector('#leaderboard');
const leaderboardTable = document.querySelector('#leadedboard-table');
const tableBody = document.querySelector('tbody');
let playerNamev;
let tableRow;
let tableRankCell;
let tableNameCell;
let tableMovesCell;
let tableStarsCell;
//close button
const leaderboardClose = document.querySelector('.close');
//clear data button
const clearDataButton = document.querySelector('.leaderboard-header .fas');


/** @description shuffles cards
* @param {object} array of cards
* @returns {object} shuffled array
* Shuffle function from http://stackoverflow.com/a/2450976
*/
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}


// @description shuffles cards when page is loaded
document.addEventListener('DOMContentLoaded', startGame());


// @description function to start a new play
function startGame() {
    // reset moves
    movesCounter = 0;
    moves.textContent = '0 Moves';
    // reset timer
    second = 0;
    minute = 0;
    hour = 0;
    timer.innerHTML = '00:00';
    clearInterval(interval);
    // Reset stars by using class name for stars.
    starList = document.querySelectorAll('.stars li');
    starList.forEach( function(element, index) {
        element.firstElementChild.className = 'fa fa-star';
    });
    // shuffle cards
    let shuffledCard= shuffle(cardsClassName);
    cards.forEach(function(card,index,all) {
        // apply style for card
      	card.className='card';
        // shuffle cards by using class name for icons.
        card.firstElementChild.className=`fa ${shuffledCard[index]}`;
    });
    // display cards container,score panel and game header
    cardContainer.style.display = 'flex';
    scorePanel.style.display = 'block';
    GameHeader.style.display = 'block';
    // get player name
    let playerName = getPlayerName();
    // store name in session storage with key name
    sessionStorage.setItem('name', playerName);
    validatePlayerName();
}


/** @description function to prevent playing game
* until player enter his/her name
*/
function validatePlayerName() {
    if (sessionStorage.name === '' || sessionStorage.name === 'null' || sessionStorage.name === 'Player Name') {
        cardContainer.style.display = 'none';
        scorePanel.style.display = 'none';
        alert('You must enter your name to start Game !!!');
        startGame();
    }
}


// @description add opened cards to OpenedCards list and check if cards are match or not
function cardOpen() {
    openedCards = document.querySelectorAll('.open');
    [card1,card2] = openedCards;
    len = openedCards.length;
    if (len === 2) {
        countMoves();
        (card1.firstElementChild.className === card2.firstElementChild.className) ? matched() : unmatched();
    }
}


// @description when cards match
function matched() {
    card1.className = 'card match disabled';
    card2.className = 'card match disabled';
    matchedCards = document.querySelectorAll('.match');
    disable();
    setTimeout(function() {
        enable();
    },1000);
    if (matchedCards.length === 16) {
        setTimeout(function() {
            openModal();
        }, 1100);
    }
}


// description when cards don't match
function unmatched() {
    card1.classList.add('unmatch');
    card2.classList.add('unmatch');
    disable();
    setTimeout(function() {
        card1.classList.remove('show', 'open', 'unmatch');
        card2.classList.remove('show', 'open', 'unmatch');
        enable();
    }, 1100);
}


// @description disable all cards temporarily
function disable() {
    Array.prototype.filter.call(cards, function(card) {
        card.classList.add('disabled');
    });
}


// @description enable cards and disable matched cards
function enable() {
    Array.prototype.filter.call(cards, function(card) {
        card.classList.remove('disabled');
        matchedCards.forEach( function (element, index) {
            element.classList.add('disabled');
        });
    });
}


/** Using Event delegation by adding one event listener to
* cards Container instead of adding 16 event listener to
* 16 Elements
*/
cardContainer.addEventListener('click',function(evt) {
	if (evt.target.nodeName ==='LI' && (evt.target.className==="card")) {
        evt.target.className = "card open show";
        cardOpen();
        removestars();
    }
});


// @description count player's moves
function countMoves() {
    movesCounter++;
    moves.textContent=`${movesCounter} Moves`;
    //start timer on first moves
    if (movesCounter===1) {
        second = 0;
        minute = 0;
        hour = 0;
        startTimer();
    }
}


// @description reload Game when press restart button
restartButton.addEventListener('click',function(event) {
    // Reload the page...
    location.reload();
});


/**
* @description set rates (No of stars) based on moves
* 5 stars if moves < 12
* 4 stars if 12 <= moves < 16
* 3 stars if 16 <= moves < 20
* 2 stars if 20 <= moves < 24
* 1 star if moves >= 24
*/
function removestars() {
    starList = document.querySelectorAll('.stars li');
    if ((movesCounter) > 9 && ((movesCounter) % 4) === 0) {
        if (starList[starList.length - starIndex].firstElementChild.className==='fa fa-star' && starList.length!==starIndex) {
            starList[starList.length - starIndex].firstElementChild.className ='fa fa-star-o';
        } else if (starList[starList.length - starIndex].firstElementChild.className==='fa fa-star-o') {
            starIndex++;
        }
    }
}


// @description game timer
function startTimer() {
    interval = setInterval(function() {
        // if minutes or seconds < 10 add 0 to left side
        minuteString = (minute < 10) ? `0${minute}` : `${minute}`;
        secondString = (second < 10) ? `0${second}` : `${second}`;
        timer.innerHTML = `${minuteString}:${secondString}`;
        second++;
        if (second == 60) {
            minute++;
            second = 0;
        }
        if (minute == 60) {
            hour++;
            minute = 0;
        }
    }, 1000);
}


/** @description congratulations when all cards match,
* show moves, time and rating
* ask player if he need to play again
*/
function openModal() {
    let starCount = 0;
    starList.forEach(function(element, index) {
        if (element.firstElementChild.className === 'fa fa-star') {
            starCount++;
        }
    });
    modal.style.display = 'block';
    newParagraph.className = 'content-text';
    newParagraph.textContent = `With ${moves.textContent} and ${starCount} Stars
    after ${minute} minutes and ${second} seconds!`;
    modalBody.appendChild(newParagraph);
    setTimeout(function function_name() {
        modalCircle.classList.toggle('load-complete');
        modalCheckMark.style.display = 'inline';
    }, 1000);
    playerNamev = sessionStorage.name;
    storeData(playerNamev, moves.textContent, starCount);
}


// @desciption Resets game and hides the modal if button is clicked.
modalButton.addEventListener('click', playAgain);


// @desciption add event listener to show leaderboard from modal
modalLeaderboardButton.addEventListener('click', showLeaderBoard);


// @desciption add event listener to show leaderboard from main window
showLeaderboardButton.addEventListener('click', showLeaderBoard);


// @desciption for user to play Again
function playAgain() {
    modalBody.removeChild(newParagraph);
    modal.style.display = 'none';
    location.reload();
}


/** @description function to get player name from prompt
* @returns {string} name of player
*/
function getPlayerName() {
    let person = prompt('Please Enter your name:', 'Player Name');
    return person;
}


/** @description function to return player name array
* from local storage
* @returns {object} playerNameList
*/
function getPlayerNameList() {
    let playerNameList = localStorage.getItem('playerName');
    if (playerNameList) {
        playerNameList = JSON.parse(playerNameList);
    } else {
        playerNameList = [];
    }
    return playerNameList;
}


/** @description function to return moves number list
* from local storage
* @returns {object} moveNoList
*/
function getMovesList() {
    let moveNoList = localStorage.getItem('movesNo');
    if (moveNoList) {
        moveNoList = JSON.parse(moveNoList);
    } else {
        moveNoList = [];
    }
    return  moveNoList;
}


/** @description function to return stars number list
* from local storage
* @returns {object} starsNoList
*/
function getstarsNoList() {
    let starsNoList = localStorage.getItem('starsNo');
    if (starsNoList) {
        starsNoList = JSON.parse(starsNoList);
    } else {
        starsNoList = [];
    }
    return starsNoList;
}


// @description store name, movesNo and starsNo in local storage
// @param {string} name - name of player
// @param {number} moveNo - number of moves
// @param {number} starNo - number of stars
function storeData(name, moveNo, starNo) {
    let playerNameList = getPlayerNameList();
    let moveNoList = getMovesList();
    let starsNoList = getstarsNoList();
    moveNo = moveNo.split(" ");
    moveNo = moveNo[0];
    moveNo = Number(moveNo);
    if (typeof(Storage) !== "undefined") {
        /** check if name exist to prevent duplicate names
        * remove old score and add new score*/
        if (playerNameList.includes(name)) {
            let itemIndex = playerNameList.indexOf(name);
            playerNameList.splice(itemIndex, 1);
            moveNoList.splice(itemIndex, 1);
            starsNoList.splice(itemIndex, 1);
        }
        // add new records to arrays using push method
        playerNameList.push(name);
        moveNoList.push(moveNo);
        starsNoList.push(starNo);
        // store in local storage
        localStorage.setItem('playerName',JSON.stringify(playerNameList));
        localStorage.setItem('movesNo',JSON.stringify(moveNoList));
        localStorage.setItem('starsNo',JSON.stringify(starsNoList));
    } else {
    // Sorry! No Web Storage support..
        alert('Sorry! No Web Storage support');
    }
}


/** @description show Leaderboard by show modal
pop up table load data from local storage
*/
function showLeaderBoard(event) {
    /* Hide Game Header, cardContainer, score panel
    * and modal show leaderboard only */
    let buttonClassName = event.target.className;
    sessionStorage.setItem('classname', buttonClassName);
    GameHeader.style.display = 'none';
    cardContainer.style.display = 'none';
    scorePanel.style.display = 'none';
    modal.style.display = 'none';
    leaderboard.style.display = 'block';
    let playerNameList = getPlayerNameList();
    let moveNoList = getMovesList();
    let starsNoList = getstarsNoList();
    for (let i = 0; i < playerNameList.length; i++) {
        // create html element for table tr and td
        tableRow = document.createElement('tr');
        tableRankCell = document.createElement('td');
        tableNameCell = document.createElement('td');
        tableMovesCell = document.createElement('td');
        tableStarsCell = document.createElement('td');
        // update table contents from arrays data
        tableNameCell.textContent = playerNameList[i];
        tableMovesCell.textContent = moveNoList[i];
        tableStarsCell.textContent = starsNoList[i];
        // add table elements to the page
        tableRow.appendChild(tableRankCell);
        tableRow.appendChild(tableNameCell);
        tableRow.appendChild(tableMovesCell);
        tableRow.appendChild(tableStarsCell);
        tableBody.appendChild(tableRow);
    }
    sortTable();
    // after sort table based on movesNo, update RankNo
    let table, rows, rank;
    table = leaderboardTable;
    rows = leaderboardTable.rows;
    for (let i = 1; i < (rows.length); i++) {
        rank = rows[i].getElementsByTagName("TD")[0];
        rank.textContent = i;
    }
}


/** @description sort table based on Moves Number
* add small changes on sort table function from w3schools
* https://www.w3schools.com/howto/howto_js_sort_table.asp
*/
function sortTable() {
    let table, rows, switching, i, x, y, shouldSwitch;
    table = leaderboardTable;
    switching = true;
    /*Make a loop that will continue until
    no switching has been done:*/
    while (switching) {
        //start by saying: no switching is done:
        switching = false;
        rows = table.rows;
        /*Loop through all table rows (except the
        first, which contains table headers):*/
        for (i = 1; i < (rows.length - 1); i++) {
            //start by saying there should be no switching:
            shouldSwitch = false;
            /*Get the two elements you want to compare,
            one from current row and one from the next:*/
            x = rows[i].getElementsByTagName("TD")[2];
            y = rows[i + 1].getElementsByTagName("TD")[2];
            //check if the two rows should switch place:
            if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                //if so, mark as a switch and break the loop:
                shouldSwitch = true;
                break;
            }
        }
        if (shouldSwitch) {
            /*If a switch has been marked, make the switch
            and mark that a switch has been done:*/
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
    }
}


// add event listener to clear data
clearDataButton.addEventListener('click', clearData);


// @description clear local storage data
function clearData() {
    let r = confirm('Are you sure to delete all Game data in local storage?');
    if (r == true) {
        localStorage.clear();
        while (tableBody.firstChild) {
            tableBody.removeChild(tableBody.firstChild);
        }
    }
}


// @description add event lisstener to leaderboard button
leaderboardClose.addEventListener('click', closeLeaderBoard);


/** @description close leaderoard window
* check if leaderboard opened from Main window
* or from Modal pop-up to show proper Elements.
*/
function closeLeaderBoard() {
    while (tableBody.firstChild) {
        tableBody.removeChild(tableBody.firstChild);
    }
    leaderboard.style.display = 'none';
    if (sessionStorage.classname === 'fas fa-medal' || sessionStorage.classname === 'tooltiptext') {
        cardContainer.style.display = 'flex';
        scorePanel.style.display = 'block';
        GameHeader.style.display = 'block';
    } else if (sessionStorage.classname === 'modal-leaderboard-btn') {
        modal.style.display = 'block';
    }
}