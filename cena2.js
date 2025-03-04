// Define a classe "cena2", que estende a classe "Scene" do Phaser.
class cena2 extends Phaser.Scene {
    // Método construtor da cena.
    constructor() {
        // Chama o construtor da classe pai (Phaser.Scene) e define a chave da cena como 'cena2'.
        // A chave é usada para identificar e trocar entre cenas.
        super({ key: 'cena2' });
    }


    // Método "preload": carrega os recursos antes da cena ser criada.
    preload() {
        // Carrega a imagem de fundo.
        this.load.image('bacground', 'assets/bacground.jpg');


        // Carrega a imagem do piloto.
        this.load.image('playerCar', 'assets/carro.png');


        // Carrega a imagem do carro inimigo.
        this.load.image('enemyCar', 'assets/inimigo.png');


        // Carrega a imagem da ferrari.
        this.load.image('coin', 'assets/coin.png');
    }


    // Método "create": é chamado após o "preload" e configura a cena, adicionando elementos visuais e lógica.
    create() {
        // Obtém a largura e altura da tela do jogo a partir das configurações do Phaser.
        const width = this.sys.game.config.width;
        const height = this.sys.game.config.height;


        // Adiciona o fundo em movimento.
        // Usa um TileSprite para criar um efeito de movimento contínuo.
        this.background = this.add.tileSprite(-5, -5, width, height, 'bacground').setOrigin(0, 0);


        // Adiciona o piloto.
        this.playerCar = this.physics.add.sprite(width / 2, height - 100, 'playerCar').setScale(0.5);
        this.playerCar.setCollideWorldBounds(true); // Impede que o piloto saia da tela.


        // Ajusta o corpo físico do jogador.
        this.playerCar.body.setSize(this.playerCar.width, this.playerCar.height); // Usa o tamanho completo do piloto.
        this.playerCar.body.offset.y = -20; // Ajuste no offset para melhorar a colisão.


        // Cria um grupo de carros inimigos.
        this.enemyCars = this.physics.add.group();


        // Cria um grupo de ferraris.
        this.coins = this.physics.add.group();


        // Configura o placar.
        this.score = 0; // Inicializa a pontuação.
        this.scoreText = this.add.text(32, 32, 'Placar: 0', { fontSize: '70px', fill: '#fff' }); // Exibe o placar.


        // Configura colisões.
        this.physics.add.collider(this.playerCar, this.enemyCars, this.hitEnemyCar, null, this); // Colisão entre jogador e carros inimigos.
        this.physics.add.overlap(this.playerCar, this.coins, this.collectCoin, null, this); // Sobreposição entre jogador e ferraris.


        // Configura o teclado para controle do jogador.
        this.cursors = this.input.keyboard.createCursorKeys();


        // Configura temporizadores para geração de carros inimigos e ferraris.
        this.time.addEvent({
            delay: 1000, // gera a cada 1 segundo.
            callback: this.spawnEnemyCar, // Função chamada para gerar carros inimigos.
            callbackScope: this, // Define o escopo da função como a própria cena.
            loop: true // Repete o evento indefinidamente.
        });


        this.time.addEvent({
            delay: 500, // gera a cada 0.5 segundos.
            callback: this.spawnCoin, // Função chamada para gerar ferraris.
            callbackScope: this, // Define o escopo da função como a própria cena.
            loop: true // Repete o evento indefinidamente.
        });
    }


    // Função para gerar carros inimigos.
    spawnEnemyCar() {
        const width = this.sys.game.config.width;
        const enemyCar = this.enemyCars.create(Phaser.Math.Between(50, width - 50), -100, 'enemyCar'); // Cria um carro inimigo em uma posição aleatória.
        enemyCar.setScale(0.9); // Redimensiona o carro inimigo.
        enemyCar.setVelocityY(Phaser.Math.Between(100, 200)); // Define uma velocidade vertical aleatória.
        enemyCar.setCollideWorldBounds(false); // Permite que os carros inimigos saiam da tela.


        // Ajusta o corpo físico do carro inimigo.
        enemyCar.body.setSize(enemyCar.width, enemyCar.height); // Usa o tamanho completo do carro.
        enemyCar.body.offset.y = 0; // Sem offset.
    }


    // Função para gerar ferraris.
    spawnCoin() {
        const width = this.sys.game.config.width;
        const coin = this.coins.create(Phaser.Math.Between(50, width - 50), -100, 'coin'); // Cria uma ferrari em uma posição aleatória.
        coin.setScale(0.3); // Redimensiona a ferrari.
        coin.setVelocityY(Phaser.Math.Between(50, 150)); // Define uma velocidade vertical aleatória.
        coin.setCollideWorldBounds(false); // Permite que as ferraris saiam da tela.
    }


    // Método "update": é chamado a cada frame e atualiza a lógica do jogo.
    update() {
        // Movimentação do piloto e sua velocidade.
        if (this.cursors.left.isDown) {
            this.playerCar.setVelocityX(-500); // Move para a esquerda.
        } else if (this.cursors.right.isDown) {
            this.playerCar.setVelocityX(500); // Move para a direita.
        } else {
            this.playerCar.setVelocityX(0); // Para o piloto se nenhuma tecla estiver pressionada.
        }


        // Movimentação do fundo.
        this.background.tilePositionY += 2; // Move o fundo para baixo, criando um efeito de movimento.


        // Remove carros inimigos e ferraris que saíram da tela.
        this.enemyCars.getChildren().forEach(enemyCar => {
            if (enemyCar.y > this.sys.game.config.height) {
                enemyCar.destroy(); // Destrói o carro inimigo.
            }
        });


        this.coins.getChildren().forEach(coin => {
            if (coin.y > this.sys.game.config.height) {
                coin.destroy(); // Destrói a ferrari.
            }
        });
    }


    // Função chamada quando o jogador colide com um carro inimigo.
    hitEnemyCar(playerCar, enemyCar) {
        // Verifica se houve colisão real (usando bounding boxes).
        if (this.physics.overlap(playerCar, enemyCar)) {
            this.scene.start('cena3'); // Inicia a cena3 (tela de game over ou reinício).
        }
    }


    // Função chamada quando o jogador coleta uma ferrari.
    collectCoin(playerCar, coin) {
        coin.disableBody(true, true); // Desativa e remove a ferrari.
        this.score += 10; // Aumenta a pontuação.
        this.scoreText.setText(`Pontuação: ${this.score}`); // Atualiza o texto do placar.
    }
}