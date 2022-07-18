let isInAirpocket = false
let enemyVelocity = 100;
let jellyVelocity = 20;
let hurt;
let heart1, heart2, heart3;
let lives = 3
let initialAir = 15;
let playerSpeed = 150
let winGameFlag = false
let joyStick = joyStick2 = { up: false, down: false, left: false, right: false };

let width, height;
let airBarContainer, airBarEmpty, airBarFill;

/* ======================
   START PHASER GAME
=========================*/
window.onload = function () {
    const config = {
        type: Phaser.AUTO,

        pixelArt: true,
        scale: {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH,
            parent: "thegame",
            // width: 370,
            // height: 160,
            width: 555,
            height: 220,

        },
        physics: {
            default: "arcade",
            arcade: {
                gravity: { y: 0 },
                debug: false
            }
        },
        scene: [GameIntro, GamePlay, GameOver]
    };
    this.game = new Phaser.Game(config);
    window.focus();
}


/* ======================
     GAME INTRO SCENE
=========================*/
class GameIntro extends Phaser.Scene {
    constructor() {
        super({
            key: "game-intro",
            pack: {
                files: [
                    {
                        type: "plugin",
                        key: "rexwebfontloaderplugin",
                        url: "https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexwebfontloaderplugin.min.js",
                        start: true,
                    },
                    //   {
                    //     type: "plugin",
                    //     key: "rexVirtualJoystick",
                    //     url: "https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexvirtualjoystickplugin.min.js",
                    //     start: true,
                    //   },
                    {
                        type: "image",
                        key: "tc-logo",
                        url: "https://cdn.glitch.global/d000a9ec-7a88-4c14-9cdd-f194575da68e/all%20white.png?v=1649980778495",
                    },
                ],
            },
        });
    }
    init() {
        width = this.cameras.main.width;
        height = this.cameras.main.height;
    }
    // preloads for the intro scene
    preload() {
        //----- loading screen


        // "loading..." text
        var loadingText = this.make.text({
            x: width / 2,
            y: height / 2 - 100,
            text: "Loading...",
            style: {
                font: "15px monospace",
                fill: "#ffffff",
            },
        });
        loadingText.setOrigin(0.5, 0.5);

        // loading bar
        var progressBar = this.add.graphics();
        var progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(
            game.config.width / 2 - 320 / 2,
            20,
            320,
            50
        );

        // "made by" text
        var madeByText = this.make.text({
            x: width / 2,
            y: height / 2 - 30,
            text: "game by",
            style: {
                font: "15px monospace",
                fill: "#ffffff",
            },
        });
        madeByText.setOrigin(0.5, 0.5);
        var taiCollective = this.make.text({
            x: width / 2,
            y: height / 2 - 12,
            text: "TAI COLLECTIVE.NZ",
            style: {
                font: "10px arial",
                fill: "#ffffff",
                align: 'center'
            },
        });
        taiCollective.setOrigin(0.5, 0.5);

        // tai collective logo
        this.add
            .image(width / 2, height / 2 + 50, "tc-logo")
            .setDisplaySize(100, 100);



        // font plugin
        this.plugins.get("rexwebfontloaderplugin").addToScene(this);

        this.load.rexWebFont({
            google: {
                families: ["Freckle Face", "Finger Paint", "Nosifer"],
            },
        });

        // map
        this.load.tilemapTiledJSON("map", "./assets/underwater_v4.json")


        // tile spritesheets used in map
        // 1) Underwaterlands_Tile_Set
        // 2) Underwater lands Tile Set 16x16 ?
        this.load.image(
            "underwater-tiles",
            "./assets/Underwaterlands_Tile_Set.png"
        );
        this.load.image(
            "caves",
            "./assets/main_lev_buildA.png",
        );

        // bg1
        this.load.image(
            "bg1",
            "./assets/bg1.png"
        );
        // bg2
        this.load.image(
            "bg2",
            "./assets/bg2.png"
        );
        // bg3
        this.load.image(
            "bg3",
            "./assets/bg3.png"
        );
        // air meter
        this.load.image(
            "bar-empty",
            "./assets/bar-emptyMeter.png"
        );
        this.load.image(
            "bar-container",
            "./assets/bar-meterContainer.png"
        );
        this.load.image(
            "bar-air",
            "./assets/bar-air.png"
        );
        // hearts
        this.load.image(
            "heart",
            "./assets/heart.png"
        );
        this.load.image(
            "heart-empty",
            "./assets/heart-empty.png"
        );


        // tane
        this.load.spritesheet(
            "tane-drowning",
            "./assets/spritesheet_drowning.png",
            {
                frameWidth: 128,
                frameHeight: 128,
            }
        );
        this.load.spritesheet(
            "tane-floating",
            "./assets/spritesheet_floating.png",
            {
                frameWidth: 128,
                frameHeight: 128,
            }
        );
        this.load.spritesheet(
            "tane-swimming",
            "./assets/spritesheet_swimming.png",
            {
                frameWidth: 128,
                frameHeight: 128,
            }
        );
        // angel fish
        this.load.spritesheet(
            "angler-fish",
            "./assets/fish-angler-sheet.png",
            {
                frameWidth: 32,
                frameHeight: 32,
            }
        );
        // crab
        this.load.spritesheet(
            "crab-claws",
            "./assets/crab-claws.png",
            {
                frameWidth: 32,
                frameHeight: 32,
            }
        );
        // jellyfish
        this.load.spritesheet(
            "jellyfish",
            "./assets/jellyfish.png",
            {
                frameWidth: 128,
                frameHeight: 128,
            }
        );
        // treasure chest
        this.load.spritesheet(
            "treasureChest",
            "./assets/chest-spritesheet.png",
            {
                frameWidth: 400,
                frameHeight: 400,
            }
        );
        // diamond
        this.load.spritesheet("dreamDiamond", "https://cdn.glitch.global/d000a9ec-7a88-4c14-9cdd-f194575da68e/dream-piece.png?v=1650241420024", { frameWidth: 480, frameHeight: 480, });

        this.load.audio("hurt", "assets/hurt.wav");
        this.load.audio("music", "assets/Kei-Te-Heke.mp3");
        this.load.audio("underwater", "assets/underwater_sfx.mp3");
        this.load.audio("splash", "assets/splash.wav");
        this.load.audio("breath", "assets/breath.wav");


        // sounds
        this.load.audio("fireworksSound", "https://cdn.glitch.global/d000a9ec-7a88-4c14-9cdd-f194575da68e/fireworks.wav?v=1649910586351");
        this.load.audio("cheer", "https://cdn.glitch.com/cd67e3a9-81c5-485d-bf8a-852d63395343%2Fcheer.wav?v=1609829231162");

        // game over assets preload in intro-scene
        this.load.audio("die", "https://cdn.glitch.global/d000a9ec-7a88-4c14-9cdd-f194575da68e/death_7_sean.mp3?v=1652937752144");
        this.load.audio("end-music", "https://cdn.glitch.com/cd67e3a9-81c5-485d-bf8a-852d63395343%2Fgameover-music.mp3?v=1609829224481");

        this.load.image("kowhaiwhai", "https://cdn.glitch.com/cd67e3a9-81c5-485d-bf8a-852d63395343%2Fkowhaiwhai.png?v=1609829230478");

        // joystick
        this.load.plugin('rexvirtualjoystickplugin', 'https://cdn.jsdelivr.net/npm/phaser3-rex-plugins@1.1.39/dist/rexvirtualjoystickplugin.min.js', true);

        this.load.scenePlugin("rexuiplugin",
            "https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js",
            "rexUI",
            "rexUI"
        );


        //  Load the Google WebFont Loader script
        this.load.script(
            "webfont",
            "//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js"
        );

        // Pre-loader
        this.load.on("progress", function (value) {
            console.log(value);
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(
                game.config.width / 2 - 300 / 2,
                30,
                300 * value,
                30
            );
        });
        // this.load.on("fileprogress", function (file) {
        //   console.log(file.src);
        // });
        this.load.on("complete", function () {
            console.log("complete");
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
        });

    }
    // create for the intro scene
    create() {

        addMap.call(this)
        this.anims.create({
            key: "angler-fish",
            frames: "angler-fish",
            frameRate: 7,
            repeat: -1,
        });

        // dialog ONE (Using rexUI)
        let dialog1 = this.rexUI.add
            .dialog({
                x: width / 2,
                y: height / 2,
                width: 100,
                background: this.rexUI.add.roundRectangle(0, 0, 100, 100, 10, 0x654aad),
                content: this.createLabel(
                    this,
                    "Navigate the underwater cave to find Tangaroa's treasure.",
                    20,
                    20,
                    17
                ),
                // description: this.add
                //     .image(0, 0, "taha-emojis").setDisplaySize(300, 100)
                // ,
                description: ''
                ,
                actions: [this.createLabel(this, "NEXT", 10, 10, 20)],
                space: {
                    left: 20,
                    right: 20,
                    top: 50,
                    bottom: 20,
                    content: 20,
                    toolbarItem: 5,
                    choice: 15,
                    action: 15,
                    // description: 100,
                    descriptionLeft: 150,
                    descriptionRight: 150,
                },
                align: {
                    content: "center",
                    description: "center",
                    actions: "right", // 'center'|'left'|'right'
                },
                click: {
                    mode: "release",
                },
            })
            .layout()
            .drawBounds(this.add.graphics(), 0xff0000)
            .popUp(1000)
            .setDepth(600);

        // dialog TWO
        let dialog2 = this.rexUI.add
            .dialog({
                x: width / 2,
                y: height / 2,
                width: 200,
                background: this.rexUI.add.roundRectangle(0, 0, 100, 100, 20, 0x654aad),
                content: this.createLabel(
                    this,
                    "Avoid Tangaroa's creatures",
                    20,
                    20,
                    17
                ),
                // description:'',
                description: this.add
                    .sprite(0, 0, "angler-fish")
                    .play("angler-fish")
                    .setDisplaySize(50, 100),
                // .setScale(0.5),
                actions: [this.createLabel(this, "START GAME", 10, 10, 20)],
                space: {
                    left: 20,
                    right: 20,
                    top: 50,
                    bottom: 20,
                    content: 20,
                    toolbarItem: 5,
                    choice: 15,
                    action: 15,
                    // description: 50,
                    // descriptionLeft: 50,
                    // descriptionRight: 50,
                },
                align: {
                    content: "center",
                    description: "center",
                    actions: "right", // 'center'|'left'|'right'
                },
                click: {
                    mode: "release",
                },
            })
            .layout()
            //  .drawBounds(this.add.graphics(), 0xff0000)
            .setVisible(false)
            .setDepth(600);

        var tween = this.tweens.add({
            targets: [dialog1, dialog2],
            scaleX: 1,
            scaleY: 1,
            ease: "Bounce", // 'Cubic', 'Elastic', 'Bounce', 'Back'
            duration: 1000,
            repeat: 0, // -1: infinity
            yoyo: false,
        });

        dialog1.on(
            "button.click",
            function (button) {
                if (button.text === "NEXT") {
                    dialog1.setVisible(false);
                    dialog2.setVisible(true).popUp(1000);
                }
            },
            this
        );

        dialog2.on(
            "button.click",
            function (button) {
                if (button.text === "START GAME") {
                    console.log("starting game");
                    // scene.start("game-hud")
                    this.scene.start("game-play");
                }
            },
            this
        );
    }
    // settings for the dialog labels
    // settings for the dialog labels
    createLabel(scene, text, spaceTop, spaceBottom, fontSize) {
        return scene.rexUI.add.label({
            width: 40, // Minimum width of round-rectangle
            height: 40, // Minimum height of round-rectangle
            background: scene.rexUI.add.roundRectangle(0, 0, 100, 40, 20, 0x8f80b6),
            text: scene.add
                .text(0, 0, text, {
                    fontFamily: "Freckle Face",
                    fontSize: fontSize + "px",
                    color: "#ffffff",
                })
                .setShadow(2, 2, "#333333", 2, false, true)
                .setAlign("center"),
            space: {
                left: 10,
                right: 10,
                top: spaceTop,
                bottom: spaceBottom,
            },
        });
    }
    update() { }
}

/* ======================
    GAME PLAY SCENE   <<---- THIS IS THE ACTUAL GAME
=========================*/
class GamePlay extends Phaser.Scene {
    constructor() {
        super({
            key: "game-play",
        });
    }
    init() {
        lives = 3
    }

    preload() {
        this.load.scenePlugin("rexuiplugin",
            "https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js",
            "rexUI",
            "rexUI"
        );
    }

    create() {
        addMap.call(this)
        addSounds.call(this)
        addPlayer.call(this)
        addAnimations.call(this)
        addAirpockets.call(this)
        addEnemyBounds.call(this)
        addEnemys.call(this)
        addHud.call(this)
        addColliders.call(this)
        addControls.call(this)
        addCamera.call(this)
        addCircleTraps.call(this)
        addPathTraps.call(this)

    }

    update() {
        // touching
        var touching = !this.player.body.touching.none;
        var wasTouching = !this.player.body.wasTouching.none;

        if (!touching && wasTouching) this.player.emit("overlapend", this);

        if (this.player.anims.getName() === 'tane-float') {

        } else {
            this.player.setScale(0.5)

        }

        // player controls
        if (!isInAirpocket) this.player.body.setVelocity(0);

        // Horizontal movement
        if (this.cursors.left.isDown || joyStick.left) {
            this.player.body.setVelocityX(-playerSpeed);
        } else if (this.cursors.right.isDown || joyStick.right) {
            this.player.body.setVelocityX(playerSpeed);
        }

        // Vertical movement
        if (this.cursors.up.isDown || joyStick.up) {
            this.player.body.setVelocityY(-playerSpeed);
        } else if (this.cursors.down.isDown || joyStick.down) {
            this.player.body.setVelocityY(playerSpeed);
        }

        // Update the animation last and give left/right animations precedence over up/down animations
        if (!isInAirpocket) {
            if (this.cursors.left.isDown || joyStick.left) {
                this.player.anims.play("tane-swim", true);
                this.player.flipX = false;
            } else if (this.cursors.right.isDown || joyStick.right) {
                this.player.anims.play("tane-swim", true);
                this.player.flipX = true;
            } else if (this.cursors.up.isDown || joyStick.up) {
                this.player.anims.play("tane-swim", true);
            } else if (this.cursors.down.isDown || joyStick.down) {
                this.player.anims.play("tane-swim", true);
            } else {
                // this.player.anims.stop();
                this.player.setScale(0.45)
                this.player.anims.play("tane-float", true);
            }
        } else if (isInAirpocket) {
            if (this.cursors.left.isDown || joyStick.left) {

                this.player.anims.play("tane-float", true);
                this.player.flipX = false;
            } else if (this.cursors.right.isDown || joyStick.right) {
                this.player.anims.play("tane-float", true);
                this.player.flipX = true;
            } else if (this.cursors.up.isDown || joyStick.up) {
                this.player.anims.play("tane-float", true);
            } else if (this.cursors.down.isDown || joyStick.down) {
                this.player.anims.play("tane-float", true);
            } else {
                this.player.anims.play("tane-float", true);
            }
        }
    }

    createLabel(scene, text, spaceTop, spaceBottom, fontSize) {
        return scene.rexUI.add.label({
            //width: 40, // Minimum width of round-rectangle
            //height: 40, // Minimum height of round-rectangle
            background: scene.rexUI.add.roundRectangle(0, 0, 100, 40, 20, 0x8f80b6),
            text: scene.add
                .text(0, 0, text, {
                    fontFamily: "Freckle Face",
                    fontSize: fontSize + "px",
                    color: "#ffffff",
                })
                .setShadow(2, 2, "#333333", 2, false, true)
                .setAlign("center"),

            space: {
                left: 10,
                right: 10,
                top: spaceTop,
                bottom: spaceBottom,
            },
        });
    }
}

/* ======================
    GAME OVER SCENE
=========================*/
class GameOver extends Phaser.Scene {
    constructor() {
        super({
            key: "game-over",
        });
    }
    // propped in data
    init(data) {
        console.log("game over scene started");
        this.deathBy = data.deathBy
    }
    // Game Over scene preload
    preload() {

    }
    // Game Over scene create
    create() {
        // set death message

        this.cameras.main.setBackgroundColor("lightgrey");

        // music
        this.scene.stop("game-play");
        this.sound.stopAll();
        this.sound.play("die", { volume: 0.3 });
        // load song
        const musicConfig = {
            volume: 0.5,
            loop: true,
            delay: 3000,
        };
        this.endMusic = this.sound.add("end-music", musicConfig);
        this.endMusic.play();

        const width = this.scale.width;
        const height = this.scale.height;

        this.add
            .tileSprite(
                game.config.width / 2,
                game.config.height / 2 + 500,
                game.config.width,
                3000,
                "kowhaiwhai"
            )
            .setScrollFactor(0, 0.25)
            .setAlpha(0.2)
            .setScale(1);

        WebFont.load({
            google: {
                families: ["Freckle Face", "Finger Paint", "Nosifer"],
            },
            active: () => {
                // game over
                this.gameOver = this.add
                    .text(
                        this.game.config.width / 2,
                        this.game.config.height / 2 - 50,
                        "You Died!",
                        {
                            fontFamily: "Freckle Face",
                            fontSize: 40,
                            color: "#ffffff",
                        }
                    )
                    .setShadow(2, 2, "#333333", 2, false, true);
                this.gameOver.setAlign("center");
                this.gameOver.setOrigin();
                this.gameOver.setScrollFactor(0);

                // restart button
                this.pressRestart = this.add
                    .text(
                        this.game.config.width / 2,
                        this.game.config.height / 2 + 10,
                        "Restart Game",
                        {
                            fontFamily: "Finger Paint",
                            fontSize: 17,
                            color: "#ffffff",
                        }
                    )
                    .setShadow(2, 2, "#333333", 2, false, true);
                this.pressRestart.setAlign("center");
                this.pressRestart.setOrigin();
                this.pressRestart.setScrollFactor(0);
                this.pressRestart.setInteractive()
                this.pressRestart.on('pointerdown', () => this.scene.start("game-play"));

                // quit button
                this.pressQuit = this.add
                    .text(
                        this.game.config.width / 2,
                        this.game.config.height / 2 + 60,
                        "Quit Game",
                        {
                            fontFamily: "Finger Paint",
                            fontSize: 17,
                            color: "#ffffff",
                        }
                    )
                    .setShadow(2, 2, "#333333", 2, false, true);
                this.pressQuit.setAlign("center");
                this.pressQuit.setOrigin();
                this.pressQuit.setScrollFactor(0);
                this.pressQuit.setInteractive()
                this.pressQuit.on('pointerdown', () => {
                    //TODO: @FFF quit back to app
                    console.log("quit back to app")
                });
            },
        });


    }
}


/* =================
STANDALONG FUNCTIONS
================= */
function addMap() {
    // add map
    this.map = this.make.tilemap({
        key: "map",
    });

    // add map tiles (1st param name of tilesheet in Tiled, 2nd param key for tilesheet asset)
    const underwaterTileset = this.map.addTilesetImage("Underwaterlands_Tile_Set", "underwater-tiles");
    const underwaterTileset2 = this.map.addTilesetImage("main_lev_buildA", "caves");

    // add map layers from Tiled
    // this.walls = this.map
    //     .createLayer("walls", underwaterTileset, 0, 0)
    //     .setOrigin(0.5, 0.5)
    //     .setDepth(100)
    this.walls2 = this.map
        .createLayer("cave2", underwaterTileset2, 0, 0)
        .setOrigin(0.5, 0.5)
        .setDepth(301)
    this.airpocketLayer = this.map
        .createLayer("AirpocketTileLayer", underwaterTileset, 0, 0)
        .setOrigin(0.5, 0.5)
        .setDepth(200)
    this.airpocketWaveLayer = this.map
        .createLayer("AirpocketWaveTileLayer", underwaterTileset, 0, 0)
        .setOrigin(0.5, 0.5)
        .setDepth(300)

    // make cave2 layer collision
    this.walls2.setCollisionByExclusion(-1, true);

    // repeating parallax background
    var background1 = this.add.tileSprite(0, 0, this.map.widthInPixels, this.map.heightInPixels, 'bg1')
        .setOrigin(0)
        .setDepth(90)
        .setScale(1.6)
        .setScrollFactor(0.2)
    var background2 = this.add.tileSprite(0, 0, this.map.widthInPixels, this.map.heightInPixels, 'bg2')
        .setOrigin(0)
        .setDepth(90)
        .setScale(1.6)
        .setScrollFactor(0.3)
    var background3 = this.add.tileSprite(0, 0, this.map.widthInPixels, this.map.heightInPixels, 'bg3')
        .setOrigin(0)
        .setDepth(90)
        .setScale(1.6)
        .setScrollFactor(0.4)
    this.physics.add.existing(background1, true);
    this.physics.add.existing(background2, true);
    this.physics.add.existing(background3, true);

    // add treasure chest
    let chestPosition = this.map.findObject("TreasureChest", (obj) => obj.name === "treasurechest");
    this.chest = this.physics.add.sprite(chestPosition.x, chestPosition.y, "treasureChest");
    this.chest.setScale(0.3)
        .setDepth(201)
    this.chest.body.setSize(this.chest.width - 150, this.chest.height - 150)
    // .setOffset(0, 0);
    this.chest.setTint(0xd1deff);
    this.chest.body.setImmovable(true);
    this.chest.body.moves = false;

}
function addSounds() {
    this.sound.stopAll();
    hurt = this.sound.add('hurt', { volume: 0.9 });
    music = this.sound.add('music', { volume: 0.4 });
    breath = this.sound.add('breath', { volume: 0.5 });
    splash = this.sound.add('splash', { volume: 0.7 });
    underwaterSfx = this.sound.add('underwater', { volume: 0.4 });
    music.play({ loop: -1 })
    underwaterSfx.play({ loop: -1 })
}
function addPlayer() {
    // add tane
    // this.player = this.physics.add.sprite(this.game.config.width / 2, this.game.config.height / 2, "tane-swimming");
    let playerPosition = this.map.findObject("Player", (obj) => obj.name === "player");
    this.player = this.physics.add.sprite(playerPosition.x, playerPosition.y, "tane-swimming");
    this.player.setScale(0.5, 0.5)
        .setDepth(201)
    this.player.body.setSize(this.player.width - 60, 30).setOffset(35, 50);
    this.player.setTint(0xd1deff);
    // player air pocket overlap exit
    this.player.on("overlapend", function (context) {
        console.log("overlapend");
        if (isInAirpocket) {
            splash.play()
            this.setTint(0xd1deff);
            isInAirpocket = false
            // timer
            setAirTimer.call(context)
        }
    });
}
function addAirpockets() {
    // create air pockets
    let blockers = this.map.filterObjects("AirpocketObjectLayer", (obj) => obj.type == "airpocketBlocker");
    let airpockets = this.map.filterObjects("AirpocketObjectLayer", (obj) => obj.type == "airpocket");
    blockers.forEach(blocker => {

        let newBlocker = this.add
            .zone(blocker.x, blocker.y, blocker.width, blocker.height + 4)
            .setOrigin(0, 0)
        // .setScale(mapScale)
        // add physics to the garden zone
        // this.physics.world.enable(newBlocker);
        this.physics.add.existing(newBlocker, true);
        // player in airpocket overlap
        this.physics.add.collider(this.player, newBlocker, touchingBlock, null, this);



    }, this);
    airpockets.forEach(airpocket => {
        let newAirpocket = this.add
            .zone(airpocket.x, airpocket.y, airpocket.width, airpocket.height)
            .setOrigin(0, 0)
        // .setScale(mapScale)
        // add physics to the garden zone
        this.physics.world.enable(newAirpocket);
        // this.physics.add.existing(newAirpocket, true);
        // player in airpocket overlap
        this.physics.add.overlap(this.player, newAirpocket, inAirpocket, null, this)
    }, this);
}
function addEnemyBounds() {
    this.boundObjects = this.physics.add
        .group({
            allowGravity: false,
            immovable: true,
        })
        .setVisible(false);
    let bounds = this.map.filterObjects("Bounds", (obj) => obj.type == "bound");

    bounds.forEach((boundObj) => {
        let boundBox = this.boundObjects
            .create(boundObj.x, boundObj.y, null)
            .setOrigin(0.5, 0.5)
            .setVisible(false);
        boundBox.name = boundObj.name;
        boundBox.type = boundObj.type;
    });
}
function addEnemys() {
    this.enemyObjects = this.physics.add
        .group({
            allowGravity: false,
            immovable: true,
        })
    let enemys = this.map.filterObjects("Enemy", (obj) => obj.type == "enemy");
    let enemyVerticals = this.map.filterObjects("Enemy", (obj) => obj.type == "enemyV");
    console.log("enemys", enemys)
    console.log("enemyVerticals", enemyVerticals)

    enemys.forEach((enemyObj) => {
        let speed = enemyObj.properties ? enemyObj.properties[0].value : enemyVelocity
        let enemy = this.enemyObjects
            .create(enemyObj.x, enemyObj.y, "angler-fish")
            .setOrigin(0.5, 0.5)
            .setDepth(100)
        enemy.body.setSize(20, 20)
        enemy.name = enemyObj.name;
        enemy.type = enemyObj.type;
        let random = Phaser.Math.Between(1, 2);
        switch (random) {
            case 1:
                enemy.body.velocity.x = -speed;
            case 2:
                enemy.body.velocity.x = speed;
        }
        enemy.play("angler-fish");
        // tween
        this.tweens.add({
            targets: enemy,
            ease: 'ease',
            y: enemy.y - 5,
            duration: 200,
            yoyo: true,
            repeat: -1
        });
    });
    enemyVerticals.forEach((enemyObj) => {
        let speed = enemyObj.properties ? enemyObj.properties[0].value : jellyVelocity
        let enemy = this.enemyObjects
            .create(enemyObj.x, enemyObj.y, "jellyfish")
            .setOrigin(0.5, 0.5)
            .setDepth(100)
            .setScale(0.4)
        enemy.body.setSize(60, 60)
        // .setRotation(80)
        enemy.name = enemyObj.name;
        enemy.type = enemyObj.type;
        let random = Phaser.Math.Between(1, 2);
        console.log("enemy random:", random)
        switch (random) {
            case 1:
                enemy.body.velocity.y = -speed;
            case 2:
                enemy.body.velocity.y = speed;
        }
        enemy.play("jellyfish");
        // tween
        this.tweens.add({
            targets: enemy,
            ease: 'ease',
            x: enemy.x - 5,
            duration: 200,
            yoyo: true,
            repeat: -1
        });
    });


}
function addColliders() {
    // player hits walls
    this.physics.add.collider(this.player, this.walls2);

    // enemy touches bounds
    this.physics.add.collider(
        this.enemyObjects,
        this.boundObjects,
        touchingBound,
        null,
        this
    );

    // player touches enemys
    this.physics.add.collider(
        this.player,
        this.enemyObjects,
        touchingEnemy,
        null,
        this
    );

    // player touches treasure chest
    this.physics.add.overlap(
        this.player,
        this.chest,
        touchingTreasureChest,
        null,
        this
    );


}
function addControls() {
    // create user input via keyboard keys
    this.cursors = this.input.keyboard.createCursorKeys();

    // Show the joysticks only in mobile devices
    if (!this.sys.game.device.os.desktop) {
        joyStick = this.plugins.get('rexvirtualjoystickplugin').add(this, {
            x: 80, y: this.game.config.height / 2, radius: 20,
            base: this.add.circle(0, 0, 20, 0x888888).setAlpha(0.8).setDepth(1000),
            thumb: this.add.circle(0, 0, 20, 0xcccccc).setAlpha(0.5).setDepth(1000)
        }).on('update', this.update, this);

        // path

        let outline = new Phaser.Curves.Ellipse(80, this.game.config.height / 2, 40);
        // draw
        var graphics = this.add.graphics()
            .lineStyle(1, 0xffffff, 0.5);
        outline.draw(graphics, 128).setDepth(1000).setScrollFactor(0);

        // joyStick2 = this.plugins.get('rexvirtualjoystickplugin').add(this, {
        //     x: map.widthInPixels - 80, y: gameWorld.height / 2, radius: 20,
        //     base: this.add.circle(0, 0, 20, 0x888888).setAlpha(0.8).setDepth(4),
        //     thumb: this.add.circle(0, 0, 20, 0xcccccc).setAlpha(0.5).setDepth(4)
        // }).on('update', this.update, this);
    }
}
function addAnimations() {
    // player animations
    this.anims.create({
        key: "tane-swim",
        frames: "tane-swimming",
        frameRate: 7,
        repeat: -1,
    });
    this.anims.create({
        key: "tane-float",
        frames: "tane-floating",
        frameRate: 7,
        repeat: -1,
    });
    this.anims.create({
        key: "angler-fish",
        frames: "angler-fish",
        frameRate: 7,
        repeat: -1,
    });
    this.anims.create({
        key: "crab-claws",
        frames: "crab-claws",
        frameRate: 7,
        repeat: -1,
    });
    this.anims.create({
        key: "jellyfish",
        frames: "jellyfish",
        frameRate: 7,
        repeat: -1,
    });
    this.anims.create({
        key: "treasureChest",
        frames: "treasureChest",
        frameRate: 7,
    });
    this.anims.create({
        key: "dreamDiamond",
        frames: "dreamDiamond",
        frameRate: 15,
        repeat: -1,
    });
}
function addCamera() {
    // camera follow player
    this.cameras.main.startFollow(this.player);

    // set camera limits
    this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
}
function addHud() {
    this.airLeft = initialAir

    console.log("this.game.config.width", this.game.config.width)
    // lives
    heart1 = this.add.image(90 - 25, 10, "heart").setDepth(400).setScale(0.7).setScrollFactor(0)
    heart2 = this.add.image(90, 10, "heart").setDepth(400).setScale(0.7).setScrollFactor(0)
    heart3 = this.add.image(90 + 25, 10, "heart").setDepth(400).setScale(0.7).setScrollFactor(0)

    //air text
    WebFont.load({
        google: {
            families: ["Freckle Face", "Finger Paint", "Nosifer"],
        },
        active: () => {
            this.add
                .text(
                    30, 10,
                    "Lives:",
                    {
                        fontFamily: "Finger Paint",
                        fontSize: 13,
                        color: "#ffffff",
                    }
                )
                .setShadow(2, 2, "#333333", 2, false, true)
                .setAlign("center")
                .setOrigin()
                .setScrollFactor(0)
                .setDepth(400)
            this.add
                .text(
                    this.game.config.width - 150, 10,
                    "Air:",
                    {
                        fontFamily: "Finger Paint",
                        fontSize: 13,
                        color: "#ffffff",
                    }
                )
                .setShadow(2, 2, "#333333", 2, false, true)
                .setAlign("center")
                .setOrigin()
                .setScrollFactor(0)
                .setDepth(400)
        },
    });

    // air meter
    airBarContainer = this.add.image(this.game.config.width - 70, 10, "bar-container").setScale(0.2).setOrigin(0.5).setScrollFactor(0).setDepth(400)
    airBarEmpty = this.add.image(this.game.config.width - 70, 9.5, "bar-empty").setScale(0.2).setOrigin(0.5).setScrollFactor(0).setDepth(400)
    airBarFill = this.add.image(this.game.config.width - 70, 9, "bar-air").setScale(0.2).setOrigin(0.5).setScrollFactor(0).setDepth(400)
    airBarFill.mask = new Phaser.Display.Masks.BitmapMask(
        this,
        airBarEmpty
    );

    // timer
    setAirTimer.call(this)
}

function addCircleTraps() {
    // get circle trap 1
    let circleTraps = this.map.filterObjects("CircleTraps", (obj) => obj.type == "circleTrap");
    circleTraps.forEach((circleTrap) => {
        // console.log("circleTrap", circleTrap)
        let duration = circleTrap.properties[0].value
        let radius = circleTrap.properties[1].value

        // path
        path = new Phaser.Curves.Path();
        path.add(new Phaser.Curves.Ellipse(circleTrap.x, circleTrap.y, radius));
        // draw
        var graphics = this.add.graphics()
            .lineStyle(1, 0xffffff, 0.5);
        // path.draw(graphics, 128).setDepth(2000);

        // fish
        var fish = this.add.follower(path, path.x, path.y, "angler-fish").setDepth(100)
        this.physics.add.existing(fish);
        fish.play("angler-fish");
        // Prevent drift!
        fish.body.setImmovable(true);
        fish.body.moves = false;

        // follow
        fish.startFollow({
            duration: duration,
            // yoyo: true,
            loop: -1,
            onStart: function () {
                path.getPoint(3, fish.pathVector);

            },
            onUpdate: function (tween) {
                fish.body.velocity
                    .copy(fish.pathDelta)
                    .scale(1000 / tween.parent.systems.game.loop.delta);

                if (fish.body.velocity.x < 0) {
                    fish.flipX = true;
                } else {
                    fish.flipX = false;
                }
            },
            onLoop: function () {
            },
            onComplete: function () {
                fish.body.stop();
            }
        });

        // collider
        // enemy touches bounds
        // player touches enemys
        this.physics.add.collider(
            this.player,
            fish,
            touchingEnemy,
            null,
            this
        );

        this.physics.add.existing(fish, true);
        this.enemyObjects.add(fish)
    });


}
function addPathTraps() {
    // get circle trap 1
    let pathTraps = this.map.filterObjects("PathTraps", (obj) => obj.type == "pathTrap");
    pathTraps.forEach((pathTrap) => {
        // console.log("pathTrap", pathTrap)
        let delay = pathTrap.properties[0].value
        let duration = pathTrap.properties[1].value
        let enemies = pathTrap.properties[2].value

        var path = new Phaser.Curves.Path(pathTrap.x, pathTrap.y);
        for (var i = 1; i < pathTrap.polyline.length; i++) {
            path.lineTo(pathTrap.x + pathTrap.polyline[i].x, pathTrap.y + pathTrap.polyline[i].y);
        }
        // console.log("path", path)
        // draw path
        var graphics = this.add.graphics();
        // path.draw(graphics, 128).setDepth(2000);

        //add fish to path
        for (var x = 0; x < enemies; x++) {
            var fish = this.add.follower(path, path.startPoint.x, path.startPoint.y, "angler-fish").setDepth(100)
            this.physics.add.existing(fish);
            fish.play("angler-fish");
            // Prevent drift!
            fish.body.setImmovable(true);
            fish.body.moves = false;

            // // follow
            fish.startFollow({
                duration: duration,
                yoyo: true,
                loop: -1,
                delay: x * delay,
                positionOnPath: true,
                // rotateToPath: true,
                // verticalAdjust: false,
                onStart: function () {
                    path.getPoint(0, fish.pathVector);

                },
                onUpdate: function (tween) {
                    fish.body.velocity
                        .copy(fish.pathDelta)
                        .scale(1000 / tween.parent.systems.game.loop.delta);

                    if (fish.body.velocity.x < 0) {
                        fish.flipX = true;
                    } else {
                        fish.flipX = false;
                    }
                },
                onLoop: function () {
                },
                onComplete: function () {
                    // fish.body.stop();
                }
            });
        }


        // // collider
        // // enemy touches bounds
        // // player touches enemys
        this.physics.add.collider(
            this.player,
            fish,
            touchingEnemy,
            null,
            this
        );

        this.physics.add.existing(fish, true);
        this.enemyObjects.add(fish)
    });


}

function inAirpocket(player, airpocket) {
    // console.log("in airpocket: player.body:", player.body)
    if (!isInAirpocket) {
        breath.play()
        this.gameTimer.remove();
        regenAir.call(this)
    }
    isInAirpocket = true
    this.player.body.setVelocityY(-50);
    this.player.clearTint()

    // player.setTexture('tane-floating')
}
function touchingBlock(player, blocker) {
    // console.log("blocker: player.body:", player.body)
}
function touchingBound(enemy, bound) {
    // console.log("from touching bound. enemy.properties:", enemy)
    let enemyVel = enemy.type == 'enemy' ? enemyVelocity : jellyVelocity
    let speed = enemy.properties ? enemy.properties[0].value : enemyVel

    // was moving right
    if (enemy.body.velocity.x > 0 && enemy.body.velocity.y == 0) {
        enemy.body.velocity.x = -enemyVel;
        enemy.setFlipX(true);
    }
    // was moving left
    else if (enemy.body.velocity.x <= 0 && enemy.body.velocity.y == 0) {
        enemy.body.velocity.x = enemyVel;
        enemy.setFlipX(false);
    }
    // was moving up
    else if (enemy.body.velocity.y < 0 && enemy.body.velocity.x == 0) {
        enemy.body.velocity.y = enemyVel;
    }
    // was moving up
    else if (enemy.body.velocity.y > 0 && enemy.body.velocity.x == 0) {
        enemy.body.velocity.y = -enemyVel;
    }
}
function touchingEnemy(player, enemy) {
    console.log("player hit:", player.body.touching)
    // if already hurt - return
    if (player.tintTopLeft == 0xFF00FF) return;
    // lose a life
    lives--;
    switch (lives) {
        case 2:
            heart3.setTexture('heart-empty')
            break;
        case 1:
            heart2.setTexture('heart-empty')
            break;
        case 0:
            heart1.setTexture('heart-empty')
            break;
        case -1:
            console.log("gameover")
            gameOver = true
            this.scene.start("game-over")
            break
        default:
            break
    }
    // hurt sound
    hurt.play();
    // hurt shake
    // this.cameras.main.shake(200);
    // hurt red tint
    player.setTint(0xFF00FF);
    // hurt tween flash
    player.setAlpha(0);
    this.tweens.add({
        targets: player,
        alpha: 1,
        duration: 200,
        ease: 'Linear',
        repeat: 10,
        onComplete: () => player.setTint(0xd1deff)
    });
    // hurt tween backwards
    this.tweens.add({
        targets: player,
        ease: 'ease',
        x: player.x - 15,
        duration: 200,
        // yoyo: true,
        // repeat: -1
    });

}
function touchingTreasureChest(player, chest) {
    if (!winGameFlag) {
        winGameFlag = true
        console.log("you win")
        chest.play("treasureChest")
        chest.on('animationcomplete', () => {
            //on complete
            winGame.call(this)
        });
    }

}
function setAirTimer(context) {
    console.log("airBarFill.x START:", airBarFill.x)
    let thisInContext = this ? this : context
    thisInContext.gameTimer = thisInContext.time.addEvent({
        delay: 1000,
        callback: function () {
            if (!isInAirpocket) {
                thisInContext.airLeft--;

                // dividing enery bar width by the number of seconds gives us the amount
                // of pixels we need to move the energy bar each second
                let stepWidth = airBarFill.displayWidth / initialAir;

                // moving the mask
                airBarFill.x -= stepWidth;
                if (thisInContext.airLeft <= 0) {

                    // thisInContext.scene.start("game-over")
                    touchingEnemy.call(this, this.player)
                }
            }

        },
        callbackScope: thisInContext,
        loop: true
    });
}
function regenAir() {
    console.log("renegerating air")
    let fullBar = 485 // x position of a full airBarFill.x
    // tween full air bar
    this.tweens.add({
        targets: airBarFill,
        ease: 'Linear',
        x: fullBar,
        // duration: 1000,
        onComplete: () => {
            initialAir = 15
            this.airLeft = 15
            airBarFill.x = fullBar
            console.log("air bar full")
        }
    });
}

function winGame() {
    console.log("win game")
    // stop timer
    this.gameTimer.remove();

    this.sound.play("cheer");

    this.dialog4 = this.rexUI.add
        .dialog({
            x: this.game.config.width / 2,
            y: this.game.config.height / 2,
            width: 200,
            background: this.rexUI.add.roundRectangle(
                0,
                0,
                100,
                100,
                10,
                0x533d8e
            ),
            content: this.createLabel(this, "You found Tangaroa's treasure.\nReceive another dream piece.", 20, 20, 15),
            description: this.add
                .sprite({
                    x: 0,
                    y: 0,
                    key: "dreamDiamond",
                })
                .play("dreamDiamond")
                .setDisplaySize(50, 50),
            actions: [this.createLabel(this, "NEXT", 10, 10, 20)],
            space: {
                left: 10,
                right: 10,
                top: 10,
                bottom: 20,
                content: 10,
                toolbarItem: 5,
                choice: 15,
                action: 15,
                // description: 25,
                descriptionLeft: 50,
                descriptionRight: 50,
            },
            align: {
                content: "center",
                description: "center",
                actions: "center", // 'center'|'left'|'right'
            },
            click: {
                mode: "release",
            },
        })
        .layout()
        //  .drawBounds(this.add.graphics(), 0xff0000)
        .popUp(1000)
        .setDepth(1003)
        .setScrollFactor(0);

    this.dialog5 = this.rexUI.add
        .dialog({
            x: this.game.config.width / 2,
            y: this.game.config.height / 2,
            width: 200,
            background: this.rexUI.add.roundRectangle(
                0,
                0,
                100,
                100,
                10,
                0x533d8e
            ),
            content: this.createLabel(this, " Who do you have around you\nwho can help you achieve your moemoea??", 20, 20, 15),
            actions: [this.createLabel(this, "DONE", 10, 10, 17)],
            space: {
                left: 20,
                right: 20,
                top: 50,
                bottom: 20,
                content: 20,
                toolbarItem: 5,
                choice: 15,
                action: 15,
                description: 25,
                //  descriptionLeft: 200,
                //  descriptionRight: 200,
            },
            align: {
                content: "center",
                description: "center",
                actions: "center", // 'center'|'left'|'right'
            },
            click: {
                mode: "release",
            },
        })
        .layout()
        //  .drawBounds(this.add.graphics(), 0xff0000)
        .popUp(1000)
        .setDepth(1003)
        .setScrollFactor(0);
    this.dialog5.setVisible(false)



    this.dialog4.on(
        "button.click",
        function (button) {
            if (button.text === "NEXT") {
                this.dialog4.setVisible(false);
                this.dialog5.setVisible(true).popUp(1000);
            }
        },
        this
    );

    this.dialog5.on(
        "button.click",
        function (button) {
            if (button.text === "DONE") {
                // TODO: FFF exit game back to app
                console.log("// TODO: FFF exit game back to app")
                // in meantime restart game
                console.log("starting game again");
                this.scene.start("game-play");
            }
        },
        this
    )

}