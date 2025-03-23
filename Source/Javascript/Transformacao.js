class Transformacao {
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

        return { x: xNovo, y: yNovo };
    }
}

// Certifique-se de que a classe está acessível globalmente
window.Transformacao = Transformacao;
