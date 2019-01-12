# Memory Game Project
 This is browser-based card matching game, created as a project for Udacity FEND Nanodegree.
## Table of Contents
 * [Instructions](#instructions)
 * [Interactive Effects](#Interactive-Effects)

## Instructions
## Getting started
 To play the game click and try to match two cards. When you do that, the timer starts.
## Technologies used
 * HTML and HTML5
 * CSS and CSS3
 * JAVASCRIPT and ES6
## Project-Dependencies
 * Icons that used in project from fontawesome.com
  ```
    <link rel="stylesheet prefetch" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.1/css/font-awesome.min.css">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/v4-shims.css">
  ```
 * Google Fonts
  ```
    <link rel="stylesheet prefetch" href="https://fonts.googleapis.com/css?family=Coda">
  ```
## Rules of the game
 The game board consists of sixteen "cards" arranged in a grid. The deck is made up of eight different pairs of cards, each with different symbols on one side. The cards are arranged randomly on the grid with the symbol face down. The gameplay rules are very simple: flip over two hidden cards at a time to locate the ones that match!

 Each turn:
 * Game request from user to enter his/her name at every start, you can't play Game until you Enter your Name.
 * The player flips one card over to reveal its underlying symbol.
 * The player then turns over a second card, trying to find the corresponding card  with the same symbol. at this point, moves counter increased by one.
 * Game Timer has not Effect on your Rating .
 * If the cards match, both cards stay flipped over.
 * If the cards do not match, both cards are flipped face down.
 * If the players needs too many moves, he will lose stars.
   - 5 stars if moves < 12
   - 4 stars if 12 <= moves < 16
   - 3 stars if 16 <= moves < 20
   - 2 stars if 20 <= moves < 24
   - 1 star if moves >= 24
 * The game ends once all cards have been correctly matched.
 * Once the game ends a modal will appear, containing the total timer, moves and stars.
 * In Modal pop-up
   - The user can click the play again button to restart the game.
   - The user can click Leaderboard button to show Game LeaderBoard.
 * In Main Window
   - The user can click the restart button to restart the game.
   - The user can click the Leaderboard button to show Game LeaderBoard.
 * In LeaderBoard pop-up
   - The user can click close button to close leaderboard.
   - The user can click delete button to Delete leaderboard data from local storage.
   - Confirmation message for user to confirm that he want to delete leaderboard data.

## Interactive-Effects
 * Add css animations when cards are clicked, unsuccessfully matched, and successfully matched.
 * Add css animations when a modal will appear.
 * Add unique functionality to implemnet a leaderboard, store game state using local storage.

