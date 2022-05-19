class FollowEnemy extends Enemy{
    constructor(speed, rotation, life, image)
    {
        let position = generateLocation(getPosition())
        super(new Vector2(position.x, position.y), speed, rotation, life, image);
    }

    Update(deltaTime){
        let direction = new Vector2((player.position.x - this.position.x),(player.position.y - this.position.y))
        direction = direction.Normalize();

        this.position.x +=  direction.x * this.speed * deltaTime;
        this.position.y +=  direction.y * this.speed * deltaTime;

        this.rotation = Math.atan2(direction.y,direction.x);
        this.CheckCollision();
    }
}