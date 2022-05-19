class BulletPool
{
    constructor(initialSize)
    {
        this.bullets = [];
        for (let i = 0; i < initialSize; i++)
        {
            let bullet = new Bullet(new Vector2(0, 0), 0, 0, 0);
            this.bullets.push(bullet);
        }
    }

    Update(deltaTime)
    {
        // update all the Active bullets
        for(let i = 0; i < this.bullets.length; i++){
            if(this.bullets[i].active){
                this.bullets[i].Update(deltaTime);
                // check if a bullet has to be deactivated
                if(this.bullets[i].position.y < 0 || this.bullets[i].position.y > canvas.height || 
                    this.bullets[i].position.x < 0 || this.bullets[i].position.x > canvas.width){
                    this.Deactivate(this.bullets[i]);
                }

                if(this.bullets[i].active){
                    game.enemies.forEach(enemy => {
                        if(PointInsideCircle(this.bullets[i].position,new Vector2(enemy.position.x, enemy.position.y), enemy.halfWidth)){
                            enemy.Hit(this.bullets[i].power);
                            this.Deactivate(this.bullets[i]);
                        }
                    });
                }
            }
        }        
    }

    Draw(ctx)
    {
        // draw the Active bullets
        for(let i = 0; i < this.bullets.length; i++){
            if(this.bullets[i].active)
                this.bullets[i].Draw(ctx);
        }  
    }

    Activate(x, y, rotation, speed, power)
    {
        let newBullet = null;
        // look for the first non-active bullet of the pool
        for(let i = 0;!newBullet && i < this.bullets.length; i++){
            if(!this.bullets[i].active){
                newBullet  = this.bullets[i];
                newBullet.position.x = x;
                newBullet.position.y = y;
                newBullet.rotation = rotation;
                newBullet.speed= speed;
                newBullet.power = power;
                newBullet.active = true;
            }
        }

        if(!newBullet){
            newBullet = new Bullet(new Vector2(x,y),rotation,speed,power);
            this.bullets.push(newBullet);
        }

        newBullet.active = true;
        return newBullet;
        // if there is no non-active bullet found, create a new one
        // add the new bullet into the bullets array
        // activate the bullet
        // return the bullet reference
    }

    Deactivate(bullet)
    {
        // deactivate the bullet
        bullet.active = false;
    }
}