# 🖼️ Computação Gráfica Plana

Repositório de aplicação educacional para simulação de transformações geométricas 2D (planares) em formas poligonais. Ideal para estudos de álgebra linear, computação gráfica, e visualização computacional.

> 🔗 Acesse o repositório: [github.com/7acini/ComputacaoGraficaPlana](https://github.com/7acini/ComputacaoGraficaPlana)

---

## 📐 Funcionalidades

A aplicação permite criar formas poligonais e aplicar sobre elas transformações geométricas clássicas:

- ✅ Criação de pontos e polígonos
- 🔄 **Rotação** (horária e anti-horária)
- ➡️ **Translação** (direita, esquerda, cima e baixo)
- 🔍 **Escala** (aumentar e diminuir)
- 🪞 **Cisalhamento** (horizontal e vertical)
- 🎨 Escolha de cores para preenchimento e contorno
- 🖼️ Aplicação de fundo com textura (imagem fractal)

---

## 📊 Transformações Implementadas

### 🔁 Rotação
Rotação dos pontos ao redor do centroide da figura:

```math
x' = cos(θ) · (x - cx) - sin(θ) · (y - cy) + cx  
y' = sin(θ) · (x - cx) + cos(θ) · (y - cy) + cy
```

### ➡️ Translação
Desloca a figura no plano cartesiano:

```math
x' = x + dx  
y' = y + dy
```

### 🔍 Escala
Modifica o tamanho da forma mantendo o centro:

```math
x' = cx + (x - cx) · s  
y' = cy + (y - cy) · s
```

### 🪞 Cisalhamento
Inclina a figura sobre os eixos X e Y:

```math
x' = x + shX · y  
y' = y + shY · x
```

---

## 🛠️ Estrutura do Projeto

```
.
├── Documentação.txt
├── README.md
└── Source
    ├── Classes
    │   └── Ponto.js
    ├── GUI
    │   └── ComputacaoGraficaPlana.html
    ├── Images
    │   ├── BackGroundFractal.png
    │   └── background.jpg
    ├── Javascript
    │   ├── ComputacaoGraficaPlana.js
    │   └── Transformacao.js
    └── Styles
        └── ComputacaoGraficaPlana.css
```

- `ComputacaoGraficaPlana.html`: Interface gráfica e botões de controle.
- `ComputacaoGraficaPlana.js`: Lógica principal da aplicação e eventos.
- `Transformacao.js`: Funções de transformação geométrica.
- `Ponto.js`: Classe para representação de pontos 2D.

---

## ▶️ Como Executar

1. Clone o repositório:

```bash
git clone https://github.com/7acini/ComputacaoGraficaPlana.git
```

2. Abra o arquivo `ComputacaoGraficaPlana.html` em um navegador moderno (Chrome, Firefox, etc):

```bash
cd ComputacaoGraficaPlana/Source/GUI
open ComputacaoGraficaPlana.html
```

---

## 👨‍💻 Autores

Projeto desenvolvido por [Guilherme Facini (7acini)](https://github.com/7acini) e (Nicolas Fischer)[https://github.com/NicolasFischer2002]

---

## 📄 Licença

Este projeto está licenciado sob a **MIT License**. Consulte o arquivo `LICENSE` para mais detalhes.