class Transformacao {

    static escalarForma(pontos, centro, fator) {
        return pontos.map(p => ({
            x: centro.x + (p.x - centro.x) * fator,
            y: centro.y + (p.y - centro.y) * fator
        }));
    }
        
    /**
     * Translada um ponto no plano
     * @param {Object} ponto - O ponto a ser transladado {x, y}
     * @param {number} dx - Deslocamento no eixo X
     * @param {number} dy - Deslocamento no eixo Y
     * @returns {Object} - Novo ponto transladado {x, y}
     */
    static transladarPonto(ponto, dx, dy) {
        return {
            x: ponto.x + dx,
            y: ponto.y + dy
        };
    }
    
    /**
     * Translada uma forma (lista de pontos)
     * @param {Array} pontos - Lista de pontos [{x, y}]
     * @param {number} dx - Deslocamento no eixo X
     * @param {number} dy - Deslocamento no eixo Y
     * @returns {Array} - Lista de pontos transladados
     */
    static transladarForma(pontos, dx, dy) {
        return pontos.map(ponto => this.transladarPonto(ponto, dx, dy));
    }
    
    /**
     * Calcula o centróide do polígono
     * @param {Array} pontos - Lista de pontos [{x, y}]
     * @returns {{x: number, y: number}} - Ponto do centróide
     */
    static calcularCentroide(pontos) {
        let somaX = 0, somaY = 0;
        pontos.forEach(p => {
            somaX += p.x;
            somaY += p.y;
        });
        return {
            x: somaX / pontos.length,
            y: somaY / pontos.length
        };
    }

    /**
     * Rotaciona um ponto em torno de um centro dado um ângulo
     * @param {Object} ponto - Objeto {x, y}
     * @param {Object} centro - Centro de rotação {x, y}
     * @param {number} angulo - Ângulo em graus
     * @returns {Object} - Novo ponto rotacionado {x, y}
     */
    static rotacionarPonto(ponto, centro, angulo) {
        let rad = (Math.PI / 180) * angulo;
        let cos = Math.cos(rad);
        let sin = Math.sin(rad);

        let xNovo = centro.x + (ponto.x - centro.x) * cos - (ponto.y - centro.y) * sin;
        let yNovo = centro.y + (ponto.x - centro.x) * sin + (ponto.y - centro.y) * cos;

        return { x: Math.round(xNovo), y: Math.round(yNovo) };
    }

    /**
     * Aplica o cisalhamento a um ponto
     * @param {Object} ponto - O ponto a ser transformado {x, y}
     * @param {number} shX - Fator de cisalhamento no eixo X
     * @param {number} shY - Fator de cisalhamento no eixo Y
     * @returns {Object} - Novo ponto transformado {x, y}
     */
    static cisalharPonto(ponto, shX, shY) {
        const novoX = Math.round(ponto.x + shX * ponto.y);
        const novoY = Math.round(ponto.y + shY * ponto.x);
        return { x: novoX, y: novoY };
    }

    /**
     * Aplica o cisalhamento a um conjunto de pontos
     * @param {Array} pontos - Lista de pontos [{x, y}]
     * @param {number} shX - Fator de cisalhamento no eixo X
     * @param {number} shY - Fator de cisalhamento no eixo Y
     * @returns {Array} - Lista de pontos transformados [{x, y}]
     */
    static cisalharForma(pontos, shX, shY) {
        return pontos.map(ponto => this.cisalharPonto(ponto, shX, shY));
    }
}

// Certifique-se de que a classe está acessível globalmente
window.Transformacao = Transformacao;
