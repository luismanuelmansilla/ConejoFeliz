var HelloWorldLayer = cc.Layer.extend({
    sprFondo: null,
    sprConejo: null,
    sprVidas: null,
    sprX: null,
    bombs: [],
    carrots: [],
    lifes: [0,0,0,0,0],
    lifesCount:5,
    carrotsTaken: 0,
    
    ctor:function () {
        this._super();
        //Obteniendo el tamaño de la pantalla
        var size = cc.winSize;

        //posicionando la imagen de fondo
        this.sprFondo = new cc.Sprite(res.fondo_png);
        this.sprFondo.setPosition(size.width / 2,size.height / 2);
        this.addChild(this.sprFondo, 0);
        
        //posicionando la imagen de fondo
        this.sprConejo = new cc.Sprite(res.conejo_png);
        this.sprConejo.setPosition(size.width / 2,size.height * 0.15);
        this.addChild(this.sprConejo, 1);
        
        
        //Inicializando eventos
		cc.eventManager.addListener({
			event: cc.EventListener.KEYBOARD,
			onKeyPressed:  this.moveBunny
		}, this);
        
        
        // Schedule de bombas
        this.schedule(this.createBomb, 3);
        // Schedule de Zanahoria
        this.schedule(this.createCarrots, 3);
        // Schedule to check collitions
        this.schedule(this.manageCollitions, 0.1);
        // Schedule lifes
        this.schedule(this.createLifes, 1);
        
        return true;
    },
    
    manageCollitions: function(){
        
		for(var bomb of this.bombs){
			var box = bomb.getBoundingBox();
			if(cc.rectContainsPoint(box, this.sprConejo.getPosition())){
                this.removeChild(bomb);
                //this.lifesCount--; 
                //alert(this.lifesCount);
			}
            if(bomb.getPositionY() < 2){
                this.removeChild(bomb);
                this.lifesCount--;
                this.lifes.removeChildAtIndex;
            }
           // if(carrot.getPositionY == )
		}
        
        for(var carrot of this.carrots){
			var box = carrot.getBoundingBox();
			if(cc.rectContainsPoint(box, this.sprConejo.getPosition())){
                this.removeChild(carrot);
                this.carrotsTaken++;
			}
            if(carrot.getPositionY() < 2){
                this.removeChild(carrot);
            }
		}
        
	},
    
    moveBunny: function(keyCode, event){
        
        var target = event.getCurrentTarget();
        var size = cc.winSize;
        
        // Boton izquierda presionado
        if(keyCode == 37){
            if(target.sprConejo.getPositionX() - 50 > size.width/2 - size.width/4)
                target.sprConejo.setPosition(target.sprConejo.getPositionX() - 50, target.sprConejo.getPositionY());
        }
        
        // Boton derecha presionado
        if(keyCode == 39){
            if(target.sprConejo.getPositionX() + 50 < size.width/2 + size.width/4)
                target.sprConejo.setPosition(target.sprConejo.getPositionX() + 50, target.sprConejo.getPositionY());
        }
    },
    
    random: function getRandomInt(min, max) {
    	return Math.floor(Math.random() * (max - min + 1)) + min;
	},
    
    // Method to create bombs and make them appear in the screen
    createBomb: function(){
        var size = cc.winSize;
        var bomb = new cc.Sprite(res.bomba_png);
        bomb.setPosition(this.random(size.width/2 - size.width/4, size.width/2 + size.width/4), size.height );
        this.addChild(bomb, 1);
        //commenting nonsense
        // Adding the Movement
		var moveto = cc.moveTo(this.random(1,9), bomb.getPositionX(), 0);
		bomb.runAction(moveto);
        this.bombs.push(bomb);
    },
    
    // Method to create carrots and make them appear in the screen
    createCarrots: function(){
        var size = cc.winSize;
        var carrot = new cc.Sprite(res.zanahoria_png);
        carrot.setPosition(this.random(size.width/2 - size.width/4, size.width/2 + size.width/4), size.height );
        this.addChild(carrot, 1);
        
        // Adding the movement
		var moveto = cc.moveTo(this.random(1,9), carrot.getPositionX(), 0);
		carrot.runAction(moveto);
        this.carrots.push(carrot);
    },
    
    createLifes: function(){
        //lifes = this.lifes;
        var count = 20;
        for(var i=0; i<this.lifesCount; i++){
            var size = cc.winSize;
            this.lifes[i] = new cc.Sprite(res.heart_png);
            this.lifes[i].setPosition(size.width/4 + count, size.height - 20);
            this.lifes[i].setScale(0.1,0.1)
            this.addChild(this.lifes[i], 3);
            count+=25;
        }
    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});