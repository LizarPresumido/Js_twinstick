//queria hacer algo parecido a una enumeración
const State = {
    Looking: 0,
    Launching: 1
}
const spawnLocation = {
    top: 0,
    right: 1,
    bottom: 2,
    left: 3
}
class Kamikaze extends Enemy{
    static lookingTime = 3;
    constructor( speed, rotation, life, image)
    {
        let position = generateLocation(getPosition())
        super(new Vector2(position.x, position.y), speed, rotation, life, image);
        this.state = State.Looking;
        this.timer = 0;
        this.lookingTime = Kamikaze.lookingTime;
        this.direction = Vector2.Zero;
    }

    Update(deltaTime){
        if(this.alive){
            if(this.state == State.Looking){
                this.direction = new Vector2((player.position.x - this.position.x),(player.position.y - this.position.y))
                this.direction = this.direction.Normalize();

                //perseguir con la mirada
                if(this.timer < this.lookingTime){
                    this.rotation = Math.atan2(this.direction.y,this.direction.x);
                    this.timer += deltaTime;
                }else{
                    this.state = State.Launching;
                    this.timer = 0;
                }
            }else{
                //lanzamiento
                this.position.x += this.direction.x * this.speed * deltaTime;
                this.position.y += this.direction.y * this.speed * deltaTime;

                //comprobar si ha cruzado todo el canvas y reiniciar comportamiento
                if(this.position.x < 30){
                    this.position.x = 30;
                    this.state = State.Looking;
                }else if(this.position.x > canvas.width - 30){
                    this.position.x = canvas.width - 30;
                    this.state = State.Looking;
                }else if(this.position.y < 30){
                    this.position.y = 30;
                    this.state = State.Looking;
                }else if(this.position.y > canvas.height - 30){
                    this.position.y = canvas.height - 30;
                    this.state = State.Looking;
                }
            }
            this.CheckCollision();
        }
    }
}