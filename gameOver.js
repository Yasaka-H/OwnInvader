window.addEventListener("load", init);

function init() {
    gameOver = function() {

        createjs.Ticker.removeAllEventListeners();
        stage.removeAllEventListeners();
        alert("game over!");
    }
}