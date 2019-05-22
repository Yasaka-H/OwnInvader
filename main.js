window.addEventListener("load", init);

function init() {
    stage = new createjs.Stage("myCanvas");
    count = 0;
    enemyList1 = [];
    enemyList2 = [];
    enemyList3 = [];
    enemyList4 = [];
    enemyList5 = [];
    playerBulletList = [];
    enemyBulletList = [];
    scene = 0;
    let enemy;

    time = 31;
    timeCount = new createjs.Text(time, "24px serif", "white");
    timeCount.x = 700;
    timeCount.y = 50;

    score = 0;
    scoreCount = new createjs.Text("", "24px serif", "white");
    scoreCount.x = 800;
    scoreCount.y = 50;

    let bg = new createjs.Shape();
    bg.graphics.beginFill("black")
        .drawRect(0, 0, 960, 660);
    stage.addChild(bg);

    player = new createjs.Bitmap("img/player.png");
    player.x = 480;
    player.y = 600;

    for (let i = 0; i < 11; i++) {
        enemy = new createjs.Bitmap("img/alian1.png");
        enemy.x = i * 70 + 100;
        enemy.y = 300;
        enemyList1.push(enemy);
    }


    for (let i = 0; i < 11; i++) {
        enemy = new createjs.Bitmap("img/alian2.png");
        enemy.x = i * 70 + 100;
        enemy.y = 250;
        enemyList2.push(enemy);
    }

    for (let i = 0; i < 11; i++) {
        enemy = new createjs.Bitmap("img/alian7.png");
        enemy.x = i * 70 + 100;
        enemy.y = 200;
        enemyList3.push(enemy);
    }

    for (let i = 0; i < 11; i++) {
        enemy = new createjs.Bitmap("img/alian8.png");
        enemy.x = i * 70 + 100;
        enemy.y = 150;
        enemyList4.push(enemy);
    }

    for (let i = 0; i < 11; i++) {
        enemy = new createjs.Bitmap("img/alian9.png");
        enemy.x = i * 70 + 100;
        enemy.y = 100;
        enemyList5.push(enemy);
    }


    titleText = new createjs.Text("Invader Game", "80px sans-serif", "red");
    titleText.x = 480;
    titleText.y = 200;
    titleText.textAlign = "center";
    stage.addChild(titleText);

    howToText = new createjs.Text("How to play : Player Movement Control（＜−　−＞key）,\nGun Shoot（Space key）", "20px sans-serif", "white");
    howToText.x = 480;
    howToText.y = 300;
    howToText.textAlign = "center";
    stage.addChild(howToText);

    pressSpaceText = new createjs.Text("Push Space key to start", "40px sans-serif", "blue");
    pressSpaceText.x = 480;
    pressSpaceText.y = 400;
    pressSpaceText.textAlign = "center";
    stage.addChild(pressSpaceText);

    createjs.Sound.registerSound("shot1.mp3");
    createjs.Sound.registerSound("shot-struck1.mp3");


    createjs.Ticker.framerate = 20;
    createjs.Ticker.addEventListener("tick", handleTick);

    function handleTick() {
        if (scene === 0) {
            stage.update();
        }

        if (scene === 1) {

            let clearCount = 0;
            for (let i = 0; i < enemyList5.length; i++) {
                if (enemyList5[i]) clearCount++;

            }

            if (clearCount === 0) gameClear();

            stage.addChild(player);
            stage.addChild(timeCount);
            stage.addChild(scoreCount);

            if (isPressRight === true)
                player.x += 10;
            if (isPressLeft === true)
                player.x -= 10;

            if (count === 0) {
                for (let i = 0; i < enemyList1.length; i++) {
                    enemy = enemyList1[i];
                    stage.addChild(enemy);
                }

                for (let i = 0; i < enemyList2.length; i++) {
                    enemy = enemyList2[i];
                    stage.addChild(enemy);
                }

                for (let i = 0; i < enemyList3.length; i++) {
                    enemy = enemyList3[i];
                    stage.addChild(enemy);
                }

                for (let i = 0; i < enemyList4.length; i++) {
                    enemy = enemyList4[i];
                    stage.addChild(enemy);
                }
                for (let i = 0; i < enemyList5.length; i++) {
                    enemy = enemyList5[i];
                    stage.addChild(enemy);
                }


            }

            if (count % 50 === 0) {
                let enemyBullet = new createjs.Shape();
                enemyBullet.graphics.beginFill("yellow").drawCircle(0, 0, 5);

                enemyBullet.x = 960 * Math.random();
                enemyBullet.y = 0;

                stage.addChild(enemyBullet);
                enemyBulletList.push(enemyBullet);
            }
            count++;

            for (let i = 0; i < enemyBulletList.length; i++) {
                enemyBulletList[i].y += 10;
            }

            for (let i = 0; i < playerBulletList.length; i++) {
                playerBulletList[i].y -= 20;
            }

            for (let i = 0; i < enemyBulletList.length; i++) {
                let enemyLocal = enemyBulletList[i].localToLocal(0, 0, player);
                if (player.hitTest(enemyLocal.x, enemyLocal.y)) {
                    gameOver();
                }
            }


            for (let i = 0; i < playerBulletList.length; i++) {

                /*
                for (let j = 0; j < enemyList1.length; j++) {

                    let localPoint1 = playerBulletList[i].localToLocal(0, 0, enemyList1[j]);
                    if (enemyList1[j].hitTest(localPoint1.x, localPoint1.y)) {
                        score += 100;
                        scoreCount.text = String(score);


                        stage.removeChild(enemyList1[j]);
                        enemyList1.splice(j, 1);

                        createjs.Sound.play("shot-struck1.mp3");
                        stage.removeChild(playerBulletList[i]);
                        playerBulletList.splice(i, 1);

                        break;
                    }

                }
                */

                for (let j = 0; j < enemyList1.length; j++) {
                    let localPoint1 = playerBulletList[i].localToLocal(0, 0, enemyList1[j]);
                    if (enemyList1[j].hitTest(localPoint1.x, localPoint1.y)) {
                        score += 100;
                        scoreCount.text = String(score);

                        stage.removeChild(enemyList1[j]);
                        enemyList1.splice(j, 1);

                        createjs.Sound.play("shot-struck1.mp3");
                        stage.removeChild(playerBulletList[i]);
                        playerBulletList.splice(i, 1);

                        break;
                    }
                }

                for (let j = 0; j < enemyList2.length; j++) {
                    let localPoint2 = playerBulletList[i].localToLocal(0, 0, enemyList2[j]);
                    if (enemyList2[j].hitTest(localPoint2.x, localPoint2.y)) {
                        score += 200;
                        scoreCount.text = String(score);

                        stage.removeChild(enemyList2[j]);
                        enemyList2.splice(j, 1);

                        createjs.Sound.play("shot-struck1.mp3");
                        stage.removeChild(playerBulletList[i]);
                        playerBulletList.splice(i, 1);

                        break;
                    }
                }

                for (let j = 0; j < enemyList3.length; j++) {
                    let localPoint3 = playerBulletList[i].localToLocal(0, 0, enemyList3[j]);
                    if (enemyList3[j].hitTest(localPoint3.x, localPoint3.y)) {
                        score += 300;
                        scoreCount.text = String(score);

                        stage.removeChild(enemyList3[j]);
                        enemyList3.splice(j, 1);

                        createjs.Sound.play("shot-struck1.mp3");
                        stage.removeChild(playerBulletList[i]);
                        playerBulletList.splice(i, 1);

                        break;
                    }
                }

                for (let j = 0; j < enemyList4.length; j++) {
                    localPoint = playerBulletList[i].localToLocal(0, 0, enemyList4[j]);
                    if (enemyList4[j].hitTest(localPoint.x, localPoint.y)) {
                        score += 400;
                        scoreCount.text = String(score);

                        stage.removeChild(enemyList4[j]);
                        enemyList4.splice(j, 1);

                        createjs.Sound.play("shot-struck1.mp3");
                        stage.removeChild(playerBulletList[i]);
                        playerBulletList.splice(i, 1);

                        break;
                    }
                }
                for (let j = 0; j < enemyList5.length; j++) {
                    localPoint = playerBulletList[i].localToLocal(0, 0, enemyList5[j]);
                    if (enemyList5[j].hitTest(localPoint.x, localPoint.y)) {
                        score += 500;
                        scoreCount.text = String(score);

                        stage.removeChild(enemyList5[j]);
                        enemyList5.splice(j, 1);

                        createjs.Sound.play("shot-struck1.mp3");
                        stage.removeChild(playerBulletList[i]);
                        playerBulletList.splice(i, 1);

                        break;
                    }
                }

            }
        }

        time = time - 1 / 60;
        timeCount.text = Math.floor(time);

        if (time <= 0) gameOver();


        stage.update();
    }
}