// Define a classe "cena1", que estende a classe "Scene" do Phaser.
class cena1 extends Phaser.Scene {
    // Método construtor da cena.
    constructor() {
        // Chama o construtor da classe pai (Phaser.Scene) e define a chave da cena como 'cena1'.
        // A chave é usada para identificar e trocar entre cenas.
        super({ key: 'cena1' });
    }


    // Método "preload": carrega os recursos antes da cena ser criada.
    preload() {
        // Carrega a imagem de fundo.
        // 'background' é a chave usada para referenciar a imagem, e 'assets/background.jpg' é o caminho do arquivo.
        this.load.image('background', 'assets/background.jpg');
    }


    // Método "create": é chamado após o "preload" e configura a cena, adicionando elementos visuais e lógica.
    create() {
        // Obtém a largura e altura da tela do jogo a partir das configurações do Phaser.
        const width = this.sys.game.config.width;
        const height = this.sys.game.config.height;


        // Adiciona a imagem de fundo ao centro da tela.
        // width / 2 e height / 2 posicionam a imagem no centro horizontal e vertical, respectivamente.
        // 'background' é a chave da imagem carregada no método preload.
        // setDisplaySize(width, height) ajusta o tamanho da imagem para cobrir toda a tela.
        this.add.image(width / 2, height / 2, 'background').setDisplaySize(width, height);


        // Carrega uma fonte personalizada do Google Fonts.
        const url = 'https://fonts.googleapis.com/css2?family=Racing+Sans+One&display=swap';
        const link = document.createElement('link'); // Cria um elemento <link>.
        link.href = url; // Define o URL da fonte.
        link.rel = 'stylesheet'; // Define o tipo de recurso como uma folha de estilo.
        document.head.appendChild(link); // Adiciona o link ao <head> do documento.


        // Adiciona o título do jogo.
        this.add.text(width / 2, height * 0.15, 'F1 - Drive to Survive', {
            fontSize: '88px', // Tamanho da fonte.
            fill: '#ff0000', // Cor do texto (vermelho).
            fontFamily: 'Racing Sans One', // Fonte personalizada carregada.
            stroke: '#000000', // Cor da borda do texto (preto).
            strokeThickness: 5 // Espessura da borda.
        }).setOrigin(0.5); // Centraliza o texto no ponto de origem (centro).


        // Adiciona as instruções do jogo.
        this.add.text(width / 2, height * 0.8, 'Use as setas para mover o carro, fuja do seu inimigo e acumule Ferraris!', {
            fontSize: '44px', // Tamanho da fonte.
            fill: '#ffffff', // Cor do texto (branco).
            fontFamily: 'Arial, sans-serif', // Fonte padrão.
            backgroundColor: '#00000080', // Cor de fundo do texto (preto com 50% de transparência).
            padding: { x: 10, y: 5 } // Espaçamento interno do texto.
        }).setOrigin(0.5); // Centraliza o texto no ponto de origem (centro).


        // Adiciona a mensagem para iniciar o jogo.
        this.add.text(width / 2, height * 0.85, 'Pressione ESPAÇO para começar', {
            fontSize: '44px', // Tamanho da fonte.
            fill: '#ffffff', // Cor do texto (branco).
            fontFamily: 'Arial, sans-serif', // Fonte padrão.
            backgroundColor: '#00000080', // Cor de fundo do texto (preto com 50% de transparência).
            padding: { x: 10, y: 5 } // Espaçamento interno do texto.
        }).setOrigin(0.5); // Centraliza o texto no ponto de origem (centro).


        // Reseta a pontuação final ao iniciar o jogo.
        // Usa o registro do Phaser para armazenar a pontuação inicial (0).
        this.registry.set('finalScore', 0);


        // Configura um evento para iniciar o jogo ao pressionar a tecla ESPAÇO.
        this.input.keyboard.once('keydown-SPACE', () => {
            // Inicia a cena2 quando a tecla ESPAÇO é pressionada.
            this.scene.start('cena2');
        });
    }
}