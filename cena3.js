// Define a classe "cena3", que estende a classe "Scene" do Phaser.
// Esta cena será exibida quando o jogador perder o jogo (Game Over).
class cena3 extends Phaser.Scene {
    // Método construtor da cena.
    constructor() {
        // Chama o construtor da classe pai (Phaser.Scene) e define a chave da cena como 'cena3'.
        // A chave é usada para identificar e trocar entre cenas.
        super({ key: 'cena3' });
    }


    // Método "preload": carrega os recursos necessários antes da cena ser criada.
    preload() {
        // Carrega a imagem de fundo para a tela de Game Over.
        // 'gameoverBackground' é a chave usada para referenciar a imagem, e 'assets/fim.jpg' é o caminho do arquivo.
        this.load.image('gameoverBackground', 'assets/fim.jpg');
    }


    // Método "create": é chamado após o "preload" e configura a cena, adicionando elementos visuais e lógica.
    create() {
        // Obtém a largura e altura da tela do jogo a partir das configurações do Phaser.
        const width = this.sys.game.config.width;
        const height = this.sys.game.config.height;


        // Adiciona a imagem de fundo ao centro da tela.
        // width / 2 e height / 2 posicionam a imagem no centro horizontal e vertical, respectivamente.
        // 'gameoverBackground' é a chave da imagem carregada no método preload.
        // setDisplaySize(width, height) ajusta o tamanho da imagem para cobrir toda a tela.
        this.add.image(width / 2, height / 2, 'gameoverBackground').setDisplaySize(width, height);


        // Adiciona o título "Game Over" na tela.
        this.add.text(width / 2, height * 0.3, 'Game Over', {
            fontSize: '100px', // Tamanho da fonte.
            fill: '#ff0000', // Cor do texto (vermelho).
            fontFamily: 'Arial, sans-serif', // Fonte usada.
            stroke: '#000000', // Cor da borda do texto (preto).
            strokeThickness: 5 // Espessura da borda.
        }).setOrigin(0.5); // Centraliza o texto no ponto de origem (centro).


        // Adiciona uma instrução para reiniciar o jogo.
        this.add.text(width / 2, height * 0.8, 'Pressione ESPAÇO para reiniciar', {
            fontSize: '64px', // Tamanho da fonte.
            fill: '#ffffff', // Cor do texto (branco).
            fontFamily: 'Arial, sans-serif', // Fonte usada.
            backgroundColor: '#00000080', // Cor de fundo do texto (preto com 50% de transparência).
            padding: { x: 10, y: 5 } // Espaçamento interno do texto.
        }).setOrigin(0.5); // Centraliza o texto no ponto de origem (centro).


        // Configura um evento para reiniciar o jogo ao pressionar a tecla ESPAÇO.
        this.input.keyboard.once('keydown-SPACE', () => {
            // Inicia a cena1 (tela inicial) quando a tecla ESPAÇO é pressionada.
            this.scene.start('cena1');
        });
    }
}