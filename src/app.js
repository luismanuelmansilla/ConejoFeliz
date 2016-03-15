var HelloWorldLayer = cc.Layer.extend({
    sprFondo:null,
    sprConejo:null,
    
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
        
        
        //Schedule cada bomba para salir cada x tiempo
        this.schedule(this.createBomb, 2);
        //Schedule zanahorias
        this.schedule(this.createCarrots, 2)
        return true;
    },
    
    moveBunny:function(keyCode, event){
        
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
    
    //Creando Bombas
    createBomb: function(){
        var size = cc.winSize;
        var bomba = new cc.Sprite(res.bomba_png);
        bomba.setPosition(this.random(size.width/2 - size.width/4, size.width/2 + size.width/4), size.height );
        this.addChild(bomba, 1);
		var moveto = cc.moveTo(this.random(1,9), bomba.getPositionX(), 0);
		bomba.runAction(moveto);
        
    },
    //Creando Zanahorias
    createCarrots: function(){
        var size = cc.winSize;
        var carrots = new cc.Sprite(res.zanahoria_png);
        carrots.setPosition(this.random(size.width/2 - size.width/4, size.width/2 + size.width/4), size.height );
        this.addChild(carrots, 1);
		var moveto = cc.moveTo(this.random(1,9), carrots.getPositionX(), 0);
		carrots.runAction(moveto);
    }
    
    
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});

