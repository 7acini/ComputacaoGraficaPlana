
let pontos = [];

document.addEventListener('DOMContentLoaded', function() {

    document.getElementById('criar-ponto').addEventListener('click', function() {
        try {
            let x = obterCoordenadaX();
            let y = obterCoordenadaY();

            const ponto = criarPonto(formatarCoordenada(x), formatarCoordenada(y));
            validarNovoPonto(ponto);
            pontos.push(ponto);

            atualizarPontosCriadosGUI();
        } catch (error) {
            alert(`Ocorreu um erro inesperado ao tentar criar o ponto: ${error.message}`);
        }
    });

    document.getElementById('excluir-ultimo-ponto').addEventListener('click', function() {
        try {
            removerUltimoPontoCriado();
            atualizarPontosCriadosGUI();
        } catch (error) {
            alert(`Ocorreu um erro inesperado ao tentar excluir o último ponto criado: ${error.message}`);
        }
    });

    document.getElementById('desenhar-pontos').addEventListener('click', function() {
        try {
            desenharPontos();
        } catch (error) {
            alert(`Ocorreu um erro inesperado ao tentar desenhar: ${error.message}`)
        }
    });

});

/**
 * Retorna o valor informado pelo usuário no input de coordenada X
 * @returns {string}
 */
const obterCoordenadaX = () => {
    return document.getElementById('coordenada-x').value;
}

/**
 * Retorna o valor informado pelo usuário no input de coordenada Y
 * @returns {string}
 */
const obterCoordenadaY = () => {
    return document.getElementById('coordenada-y').value;
}

/**
 * Retorna a coordenada formatada aplicando o método trim()
 * @param {string} coordenada 
 * @returns {string}
 */
const formatarCoordenada = (coordenada) => {
    return coordenada.trim();
}

/**
 * Cria um novo ponto
 * @param {*} x Coordenada X
 * @param {*} y Coordenada Y
 * @returns {Ponto} 
 */
const criarPonto = (x, y) => {
    x = Number(x);
    y = Number(y);

    return new Ponto(x, y);
}

/**
 * Atualiza a sessão de pontos criados, adicionando o novo ponto na GUI
 * @param {Ponto} ponto
 * @returns {void} 
 */
const atualizarPontosCriadosGUI = () => {
    const sessaoPontosCriados = document.getElementById('pontos-criados');
    sessaoPontosCriados.textContent = todosOsPontos();
}

/**
 * Avalia se o ponto informado já existe no array de pontos. Caso exista, o ponto é inválido
 * @param {Ponto} novoPonto 
 * @returns {void}
 */
const validarNovoPonto = (novoPonto) => {
    pontos.forEach(p => {
        if (p.x === novoPonto.x && p.y === novoPonto.y) {
            throw new Error(`O ponto informado com as coordenadas ` +
                `(${novoPonto.x},${novoPonto.y}) já existe e não pode ser criado novamente.`);
        } 
    });
}

/**
 * 
 * @returns {void}
 */
const removerUltimoPontoCriado = () => {
    pontos.pop();
}

/**
 * 
 * @returns {string} Todos os pontos existentes formatados em (x,y)
 */
const todosOsPontos = () => {
    let todosPontos = ''; 

    pontos.forEach(p => {
        todosPontos = `${todosPontos} ${p.toString()}`; 
    });

    return todosPontos;
}

/**
 * Obtém a cor da linha do polígono selecionada pelo usuário
 * @returns {CorHexadecimal}
 */
const obterCorDaLinhaPoligono = () => {
    return document.getElementById('color-picker-linha').value;
}

/**
 * Obtém a cor do polígono selecionada pelo usuário
 * @returns {CorHexadecimal}
 */
const obterCorDoPoligono = () => {
    return document.getElementById('color-picker-poligono').value;
}

const desenharPontos = () => {
    const quantidadeMinimaPontos = 3;

    if (pontos.length >= quantidadeMinimaPontos) {
        const canvas = document.getElementById('sessao-canvas');
        const ctx = canvas.getContext("2d");

        // Ajustar a resolução do canvas para evitar borrado
        ajustarResolucaoCanvas();

        // Limpa o canvas antes de desenhar
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Define as cores utilizando os métodos criados
        ctx.strokeStyle = obterCorDaLinhaPoligono();
        ctx.fillStyle = obterCorDoPoligono();
        ctx.lineWidth = 1; // Espessura da linha
        ctx.imageSmoothingEnabled = false; // Evita borrado

        // Começa o desenho
        // Math.round utilizado para arredondar as coordenadas para evitar serrilhados nas linhas
        const pontoInicial = pontos[0];
        ctx.beginPath();
        ctx.moveTo(Math.round(pontoInicial.x), Math.round(pontoInicial.y));

        // Liga os pontos
        pontos.forEach(p => {
            ctx.lineTo(Math.round(p.x), Math.round(p.y));
        });

        // Fecha o desenho voltando ao ponto inicial
        ctx.closePath();
        
        // Preenche o polígono
        ctx.fill();
        // Desenha a borda do polígono
        ctx.stroke();
    } else {
        throw new Error(`O número de pontos necessários para fechar um desenho é ${quantidadeMinimaPontos}.`);
    }
};

/**
 * Ajusta a resolução do canvas para evitar borrões e distorções ao desenhar.
 * 
 * O problema ocorre porque o canvas pode ter um tamanho físico definido via CSS
 * (por exemplo, 500x500 pixels), mas a resolução interna real pode ser diferente 
 * dependendo do `devicePixelRatio` do dispositivo. Isso faz com que o desenho 
 * fique borrado ou distorcido, especialmente em telas de alta densidade como 
 * as Retina Displays.
 * 
 * Esta função resolve esse problema definindo a resolução interna do canvas 
 * para corresponder ao tamanho real multiplicado pelo `devicePixelRatio`, garantindo
 * que os desenhos fiquem nítidos.
 *
 * @returns {void}
 */
const ajustarResolucaoCanvas = () => {
    const canvas = document.getElementById('sessao-canvas');
    const ctx = canvas.getContext("2d");

    // Obtém as dimensões visíveis do canvas definidas via CSS
    const largura = canvas.clientWidth;
    const altura = canvas.clientHeight;

    /**
     * Ajusta a resolução interna do canvas para evitar borrões.
     * 
     * O `devicePixelRatio` representa a densidade de pixels da tela. 
     * Multiplicamos a largura e a altura pelo `devicePixelRatio` para 
     * garantir que a resolução real seja proporcional à densidade da tela, 
     * evitando que os desenhos fiquem pixelados ou borrados.
     */
    canvas.width = largura * window.devicePixelRatio;
    canvas.height = altura * window.devicePixelRatio;

    /**
     * Ajusta a escala do contexto de desenho para compensar a mudança de resolução.
     * 
     * Como aumentamos a resolução interna do canvas, precisamos aumentar a escala do 
     * contexto para garantir que os desenhos continuem no mesmo tamanho visual.
     * 
     * Exemplo: Se o `devicePixelRatio` for 2, então a resolução interna do canvas será
     * o dobro da original, mas ao escalar o contexto por `devicePixelRatio`, o desenho
     * ficará no tamanho correto sem distorção.
     */
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
};