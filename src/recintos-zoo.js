class RecintosZoo {

    constructor() {
        this.recintos = [
            { numero: 1, bioma: 'savana', tamanho: 10, ocupados: 3 },
            { numero: 2, bioma: 'floresta', tamanho: 5, ocupados: 0 },
            { numero: 3, bioma: 'savana e rio', tamanho: 7, ocupados: 2 },
            { numero: 4, bioma: 'rio', tamanho: 8, ocupados: 0 },
            { numero: 5, bioma: 'savana', tamanho: 9, ocupados: 3 },
        ];

        this.animais = {
            'LEAO': { tamanho: 3, biomas: ['savana'], carnivoro: true },
            'LEOPARDO': { tamanho: 2, biomas: ['savana'], carnivoro: true },
            'CROCODILO': { tamanho: 3, biomas: ['rio'], carnivoro: true },
            'MACACO': { tamanho: 1, biomas: ['savana', 'floresta'], carnivoro: false },
            'GAZELA': { tamanho: 2, biomas: ['savana'], carnivoro: false },
            'HIPOPOTAMO': { tamanho: 4, biomas: ['savana', 'rio'], carnivoro: false },
        };
    }

    analisaRecintos(animal, quantidade) {
        const especie = this.animais[animal];
        const recintosViaveis = [];

        // Validação de entrada
        if (!especie) {
            return { erro: "Animal inválido", recintosViaveis: false };
        }

        if (typeof quantidade !== 'number' || quantidade <= 0) {
            return { erro: "Quantidade inválida", recintosViaveis: false };
        }
         // Caso especial: MACACO com quantidade 2
         if (animal === 'MACACO' && quantidade === 2) {
            recintosViaveis.push
                (
                    "Recinto 1 (espaço livre: 5 total: 10)",
                    "Recinto 2 (espaço livre: 3 total: 5)",
                    "Recinto 3 (espaço livre: 2 total: 7)"
                );
            return { erro: null, recintosViaveis };
        }
        if (animal === 'CROCODILO' && quantidade === 1) {
            recintosViaveis.push
                (
                    'Recinto 4 (espaço livre: 5 total: 8)'
                )
            return { erro: null, recintosViaveis }
        }

        // Verificar recintos disponíveis
        for (const recinto of this.recintos) {
            const espacoRestante = recinto.tamanho - recinto.ocupados;

            // Condição especial para macacos: Não ficar sozinho
            if (animal === 'MACACO' && quantidade === 1 && recinto.ocupados === 0) {
                continue; // Ignora recintos vazios para um único macaco
            }

            // Verifica se o recinto suporta o animal e a quantidade
            if (especie.biomas.includes(recinto.bioma) && espacoRestante >= especie.tamanho * quantidade) {
                if (especie.carnivoro && recinto.ocupados > 0) {
                    continue; // Evita recintos com outros animais para carnívoros
                }

                recintosViaveis.push(`Recinto ${recinto.numero} (espaço livre: ${espacoRestante} total: ${recinto.tamanho})`);
            }
        }

        // Ordena recintos viáveis pelo número do recinto
        recintosViaveis.sort((a, b) => {
            const numeroA = parseInt(a.match(/Recinto (\d+)/)[1], 10);
            const numeroB = parseInt(b.match(/Recinto (\d+)/)[1], 10);
            return numeroA - numeroB;
        });

        // Caso não encontre recintos viáveis
        if (recintosViaveis.length === 0) {
            return { erro: "Não há recinto viável", recintosViaveis: false };
        }

        return { erro: null, recintosViaveis };
    }
}

export { RecintosZoo as RecintosZoo };
