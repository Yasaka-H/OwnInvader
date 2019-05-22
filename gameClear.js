window.addEventListener("load", init);

function init() {
    gameClear = function() {
        createjs.Ticker.removeAllEventListeners();
        stage.removeAllEventListeners();

        let g = 0;

        let gazou1 = new createjs.Bitmap("img/game.png");
        gazou1.crossOrigin="Anonymous";
        gazou1.scaleX = 2.5 * 0.2;
        gazou1.scaleY = 2.5 * 0.2;
        gazou1.x = 20;
        gazou1.y = 20;
        stage.addChild(gazou1);

        let gazou2 = new createjs.Bitmap("img/clear.png");
        gazou2.crossOrigin="Anonymous";
        stage.addChild(gazou2);
        gazou2.scaleX = 1.5;
        gazou2.scaleY = 1.5;
        gazou2.x = 285;
        gazou2.y = 20;

        createjs.Ticker.setFPS(60);
        createjs.Ticker.on("tick", function () {
            if (gazou1.y >= 350) {
                g = g * -0.5;
            } else {
                g++;
            }
            gazou1.y += g/5;
            gazou2.y += g/5;

            stage.update()
        });
    }
}