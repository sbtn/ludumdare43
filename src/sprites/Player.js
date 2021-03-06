export default class Player extends Phaser.GameObjects.Sprite {
    constructor(Config) {
        super(Config.scene, Config.x, Config.y, 'player', Config.color);

        Config.scene.physics.world.enable(this)
        this.scene = Config.scene;
        this.body.setBounce(0.2)
        this.body.setSize(this.width, this.height - 8);
        this.alive = true;
        this.input = this.scene.input.keyboard.createCursorKeys();

        game.anims.create({
            key: 'left',
            frames: game.anims.generateFrameNames('player'),
            frameRate: 20,
            repeat: -1
        });

        this.jumpSound = this.scene.sound.add('jumpSound');
        this.jumpSound.setVolume(0.1)

        console.log(this.color);
        this.scene.add.existing(this);
        this.setColor(Config.color);
    }

    jump() {
        this.body.setVelocityY(-450);
        this.jumpSound.play();
    }

    setColor(newColor) {
        this.color = newColor;
        this.setTint(this.color);
        console.log('newColor', newColor);
    }

    update(time, delta) {
        if (this.alive) {

            if (this.body.onFloor()) {
                // Player should jump
                this.scene.input.keyboard.on('keydown_SPACE', function () {
                    this.jump();
                }, this);
            }

        } else {
            // How can we die?
            // Load game over scene
        }
    }
}