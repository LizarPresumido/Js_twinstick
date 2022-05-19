
var player = {
    maxLifes: 5,
    lifes: 0,
    position: null,
    width: 0,
    height: 0,
    rotation: 0,

    img: null,

    halfWidth: 0,
    halfHeight: 0,

    speed: 400,
    speedTurboMultiplier: 1.5,

    dir: Vector2.Zero(),

    shotCadency: 0.1,
    shotCadencyAux: 0,

    bulletPool: null,

    Start: function (position) {
        this.position = position;

        // set the sprite reference
        this.img = graphicAssets.player_ship.image;
        this.hpImg = graphicAssets.hp.image;
        this.width = this.img.width;
        this.height = this.img.height;
        this.halfWidth = this.width / 2;
        this.halfHeight = this.height / 2;

        this.bulletPool = new BulletPool(20);
    },

    Update: function (deltaTime) {
        this.dir = Vector2.Zero();
        // movement

        //Captura de direccion
        if(Input.IsKeyDown(KEY_A) || Input.IsKeyPressed(KEY_A))
            this.dir.x -= 1;
        else if(Input.IsKeyUp(KEY_A))
            this.dir.x += 1;
        if(Input.IsKeyDown(KEY_D) || Input.IsKeyPressed(KEY_D))
            this.dir.x += 1;
        else if(Input.IsKeyUp(KEY_D))
            this.dir.x -= 1;
        if(Input.IsKeyDown(KEY_W) || Input.IsKeyPressed(KEY_W))
            this.dir.y -= 1;
        else if(Input.IsKeyUp(KEY_W))
            this.dir.y += 1;
        if(Input.IsKeyDown(KEY_S) || Input.IsKeyPressed(KEY_S))
            this.dir.y += 1;
        else if(Input.IsKeyUp(KEY_S))
            this.dir.y -= 1;

        //mover nave

        if(this.dir.x != 0 && this.dir.y != 0){
            let diagonal = this.dir.Normalize();

            this.position.x += diagonal.x * deltaTime * this.speed;
            this.position.y += diagonal.y * deltaTime * this.speed;
        }else{
            this.position.x += this.dir.x * deltaTime * this.speed;
            this.position.y += this.dir.y * deltaTime * this.speed;
        }

        //Colisiones con los bordes
        if(this.position.x < 0)
            this.position.x = 0;
        else if(this.position.x > canvas.width)
            this.position.x = canvas.width;
        else if(this.position.y < 0)
            this.position.y = 0;
        else if(this.position.y > canvas.height)
            this.position.y = canvas.height; 

        
        // rotation
        let offsetX = Input.mouse.x - this.position.x;
        let offsetY = Input.mouse.y - this.position.y;

        this.rotation = Math.atan2(offsetY,offsetX);

        if((Input.IsKeyPressed(KEY_SPACE) || Input.IsMousePressed()) && this.shotCadency <= this.shotCadencyAux){
            this.bulletPool.Activate(this.position.x, this.position.y, this.rotation, 500, 5);
            this.shotCadencyAux = 0;
            let shoot = new Audio("assets/laser.wav");
            shoot.play();
        }
        this.shotCadencyAux += deltaTime;
        this.bulletPool.Update(deltaTime);
    
    },

    Draw: function (ctx) {
        
        for(let i = this.lifes; i > 0; --i){
            ctx.drawImage(this.hpImg, canvas.width - 30 - this.hpImg.width * i, canvas.height - 30 - this.hpImg.height, this.hpImg.width, this.hpImg.height);
        }
        // draw the player sprite
        ctx.save();

        ctx.translate(this.position.x, this.position.y);
        ctx.rotate(this.rotation  + PIH);

        ctx.drawImage(this.img, -this.halfWidth, -this.halfHeight, this.width, this.height);

        ctx.restore();

        this.bulletPool.Draw(ctx);

        // draw the dir value
        const uiCirclePosition = {x: 50, y: canvas.height - 50};
        // outer circle (bounds)
        ctx.strokeStyle = "white";
        ctx.beginPath();
        ctx.arc(uiCirclePosition.x, uiCirclePosition.y, 30, 0, PI2, true);
        ctx.closePath();
        ctx.stroke();
        // inner circle (direction vector)
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(uiCirclePosition.x + this.dir.x * 30, uiCirclePosition.y + this.dir.y * 30, 10, 0, PI2, true);
        ctx.closePath();
        ctx.fill();
    },
    Hit: function(){
        --this.lifes;
        if(this.lifes <= 0){
            dead = !dead;
        }
    }

}