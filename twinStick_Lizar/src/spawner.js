class Spawner{
    constructor(spawnRate){
        this.spawnRate = spawnRate;
        this.timer = 0;
        let enemy = new FollowEnemy(150,0,100,graphicAssets.star.image)
        game.enemies.push(enemy)
    }

    Update(deltaTime){
        if(this.timer >= this.spawnRate){
            let enemy = (RandomBetween(1,2) < 1.5) ? new FollowEnemy(150,0,60,graphicAssets.star.image) : new Kamikaze(1500,0,100,graphicAssets.kamikaze.image);
            //let enemy = new Kamikaze(1500,0,100,graphicAssets.kamikaze.image, 5);
            let i;
            for(i = 0; i < game.enemies.length && game.enemies[i] != null; ++i)
            ;
            if(i < game.enemies.length)
                game.enemies[i] = enemy;
            else
                game.enemies.push(enemy)
            this.timer = 0;
        }else{
            this.timer += deltaTime;
        }
    }
}