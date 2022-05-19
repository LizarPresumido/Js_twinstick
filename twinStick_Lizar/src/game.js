var game = {
    bgGradient: null,
    player: null,
    enemies: null,
    spawner: null,

    Start: function()
    {
        // prepare the bg gradient
        this.bgGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        this.bgGradient.addColorStop(1, "rgb(112, 162, 218)");
        this.bgGradient.addColorStop(0.9494949494949495, "rgb(0, 122, 255)");
        this.bgGradient.addColorStop(0.4292929292929293, "rgb(38, 71, 108)");
        this.bgGradient.addColorStop(0.16161616161616163, "rgb(0, 0, 0)");
        this.bgGradient.addColorStop(0, "rgb(1, 1, 1)");
    
        // player is a global variable
        this.player = player;
        this.player.lifes = this.player.maxLifes;
        this.player.Start(new Vector2(canvas.width / 2, canvas.height / 2));

        //spawn an enemy
        this.enemies = [];
        this.spawner = new Spawner(3);
    },

    Update: function(deltaTime)
    {
        // Update the player
        this.player.Update(deltaTime);
        this.spawner.Update(deltaTime);
        this.enemies.forEach(enemy => enemy.Update(deltaTime));
    },

    Draw: function(ctx)
    {

        // background gradient
        ctx.fillStyle = this.bgGradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // draw the player
        this.player.Draw(ctx);

        this.enemies.forEach(enemy => enemy.Draw(ctx));

        // draw the aiming point
        ctx.drawImage(graphicAssets.aim.image, Input.mouse.x - graphicAssets.aim.image.width / 2,  Input.mouse.y - graphicAssets.aim.image.height / 2, graphicAssets.aim.image.width, graphicAssets.aim.image.height);
        
    }

}