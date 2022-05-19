class Enemy
{
    constructor(position, speed, rotation, life, image)
    {
        this.position = position;
        this.rotation = rotation;
        this.speed = speed;
        this.life = life;
        this.image = image;

        this.halfWidth = this.image.width / 2;
        this.halfHeight = this.image.height / 2;
        this.alive = true;
    }

    Update(deltaTime)
    {
        
    }

    Draw(ctx)
    {
        if(this.alive){
            ctx.save();

            /* area de colision
            ctx.beginPath();
            ctx.arc(this.position.x, this.position.y, this.halfWidth, 0, 2 * Math.PI, false);
            ctx.fillStyle = 'green';
            ctx.fill();
            ctx.lineWidth = 5;
            ctx.strokeStyle = '#003300';
            ctx.stroke();
            */

            ctx.translate(this.position.x, this.position.y);
            ctx.rotate(this.rotation + PIH);

            ctx.drawImage(this.image, -this.halfWidth, -this.halfHeight, this.image.width, this.image.height);

            

            ctx.restore();
        }
    }

    Hit(damage){
        this.life -= damage;
        if(this.life <= 0)
            this.Deactivate();
    }

    Deactivate(){
        //si no interactuas con la pagina web, salta una excepción por que no se ha hecho nada antes
        let explosion = new Audio("assets/explosion.wav");
        explosion.play();
        delete game.enemies[game.enemies.indexOf(this)]; 
    }

    CheckCollision(){
        if(SqrDistance(player.position, this.position) <= (player.halfWidth + this.halfWidth) * (player.halfWidth + this.halfWidth)){
            player.Hit();
            this.Deactivate();
        }
    }
}
