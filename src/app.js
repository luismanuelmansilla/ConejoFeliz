var HelloWorldLayer = cc.Layer.extend({
    sprFondo: null,
    sprConejo: null,
    sprVidas: null,
    bombs: [],
    carrots: [],
    lifes: [],
    carrotsTaken: 0,
    carrotsLabel: null,
    
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
        
        //Lifes
        var count = 20;
        for(var i=0; i< 5; i++){
            var size = cc.winSize;
            var life= new cc.Sprite(res.heart_png);
            life.setPosition(size.width/4 + count, size.height - 30);
            life.setScale(0.1,0.1);
            this.lifes.push(life);
            this.addChild(life, 3);
            count+=28;
        }
        
        //Carrots Counter
        this.carrotsLabel = new cc.LabelTTF("0", "Arial", 38);
        this.carrotsLabel.setAnchorPoint(1,1);
        this.carrotsLabel.setPosition((size.width*2)/3 +70, size.height-18);
        this.addChild(this.carrotsLabel, 5);
        var sprX = new cc.Sprite(res.x_png);
        sprX.setPosition((size.width*2)/3 , size.height-40);
        sprX.setScale(0.15,0.15);
        this.addChild(sprX, 3);
        var carrot = new cc.Sprite(res.zanahoria_png);
        carrot.setScale(0.5,0.5);
        carrot.setPosition((size.width*2)/3 -30, size.height-30);
        this.addChild(carrot, 1);
        
        // Schedule de bombas
        this.schedule(this.createBomb, 3);
        // Schedule de Zanahoria
        this.schedule(this.createCarrots, 3);
        // Schedule to check collitions
        this.schedule(this.manageCollitions, 0.1);
        
        return true;
    },
    
    reset: function(){
        this.lifes = new Array();
        this.carrotsTaken = 0;
        this.carrotsLabel.setString(this.carrotsTaken);
        //Adding lifes sprites
        var count = 20;
        for(var i=0; i< 5; i++){
            var size = cc.winSize;
            var life= new cc.Sprite(res.heart_png);
            life.setPosition(size.width/4 + count, size.height - 20);
            life.setScale(0.1,0.1);
            this.lifes.push(life);
            this.addChild(life, 3);
            count+=25;
        }
    },
    
    manageCollitions: function(){
        
		for(var i=0; i<this.bombs.length; i++){
            var bomb = this.bombs[i];
			if(cc.rectContainsPoint(bomb.getBoundingBox(), this.sprConejo.getPosition())){
                this.removeChild(bomb);
                this.bombs.splice(i, 1);
                this.removeChild(this.lifes[this.lifes.length-1]);
                this.lifes.pop();
                if(this.lifes.length == 0){
                    alert("Perdiste");
                    this.reset();
                }
			}
            if(bomb.getPositionY() < 0.5){
                this.removeChild(bomb);
                
            }
		}
        
        for(var i=0; i<this.carrots.length; i++){
            var carrot = this.carrots[i];
			if(cc.rectContainsPoint(carrot.getBoundingBox(), this.sprConejo.getPosition())){
                this.removeChild(carrot);
                this.carrots.splice(i, 1);
                this.carrotsTaken++;
                this.carrotsLabel.setString(this.carrotsTaken);
			}
            if(carrot.getPositionY() < 0.5){
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
    
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});