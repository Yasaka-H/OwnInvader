window.addEventListener("load", init);
function init() {
    // キーボードイベントの登録
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    function handleKeyDown(event) {
        let keyCode = event.keyCode;

        if (keyCode === 32) { // space
            if (scene === 0) {
                scene = 1;
                stage.removeChild(titleText);
                stage.removeChild(howToText);
                stage.removeChild(pressSpaceText);
            }
            else {
                let playerBullet = new createjs.Shape();
                playerBullet.graphics.beginFill("white").drawCircle(0, 0,5);
                playerBullet.x = player.x + 20;
                playerBullet.y = player.y;

                playerBulletList.push(playerBullet);
                stage.addChild(playerBullet);
                createjs.Sound.play("shot1.mp3");
            }
        }
        if (keyCode === 39)   // 右
            isPressRight = true;

        else if (keyCode === 37)  // 左
            isPressLeft = true;

    }

    function handleKeyUp(event) {
        let keyCode = event.keyCode;
        if (keyCode === 39) { // 右
            isPressRight = false;// 真偽値が切り替わる
        } else if (keyCode === 37) { // 左
            isPressLeft = false;
        }
    }

}