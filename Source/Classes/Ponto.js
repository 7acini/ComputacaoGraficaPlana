
class Ponto {

    constructor(x, y) {
        this.#validarCoordenada(x);
        this.#validarCoordenada(y);

        this.x = x;
        this.y = y;
    }

    /**
     * Valida se a coordenada informada é um número finito.
     * 
     * Este método privado verifica se o valor passado é do tipo `number` 
     * e se é um número finito (`isFinite`), garantindo que não sejam aceitos valores 
     * não numéricos, `NaN`, `Infinity` ou `-Infinity`. 
     * 
     * Caso seja um Number, a coordenada não poderá ser negativa.
     * 
     * Caso a validação falhe, uma exceção do tipo `Error` será lançada.
     * 
     * @private Cláusula de guarda.
     * @param {number} coordenada - O valor numérico da coordenada a ser validado.
     * @throws {Error} Se a coordenada não for um número válido.
     */
    #validarCoordenada(coordenada) {
        if (typeof coordenada !== 'number' || !isFinite(coordenada) || coordenada < 0) {
            throw new Error(`A coordenada informada [${coordenada}] não é válida.`);
        }
    }
    
    /**
     * Retorna uma representação do ponto em string.
     * @returns {string}
     */
    toString() {
        return `(${this.x}, ${this.y})`;
    }
}