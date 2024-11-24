document.addEventListener('DOMContentLoaded', function () {
    const formCheckout = document.getElementById('formCheckout');
    const numeroAcomodacaoInput = document.getElementById('numeroAcomodacao');
    const petNomeInput = document.getElementById('petNome');
    const valorEstadiaInput = document.getElementById('valorEstadia');
    const valorAlimentacaoInput = document.getElementById('valorAlimentacao');
    const servicosAdicionaisInput = document.getElementById('servicosAdicionais');
    const totalInput = document.getElementById('total');
    const tabelaConsumosBody = document.getElementById('tabelaConsumos').querySelector('tbody'); // Corpo da tabela de consumos
  
    // Função para carregar os dados de hospedagem e consumo
    function carregarDadosAcomodacao() {
        const numeroAcomodacao = numeroAcomodacaoInput.value;
  
        if (!numeroAcomodacao) return;
  
        const hospedagens = JSON.parse(localStorage.getItem('hospedagens')) || [];
        const consumos = JSON.parse(localStorage.getItem('consumos')) || [];
  
        // Busca a hospedagem pelo número da acomodação
        const hospedagem = hospedagens.find(
            (hospedagem) => hospedagem.numeroAcomodacao === numeroAcomodacao && !hospedagem.dataHoraCheckout
        );
  
        if (hospedagem) {
            // Preenche os dados de hospedagem no formulário
            petNomeInput.value = hospedagem.nomePet;
            valorEstadiaInput.value = hospedagem.valorEstadia || ''; // Preenche se já tiver valor
            valorAlimentacaoInput.value = hospedagem.valorAlimentacao || '';
            servicosAdicionaisInput.value = hospedagem.servicosAdicionais || '';
            
            // Carrega os consumos relacionados à acomodação
            const consumosAcomodacao = consumos.filter(consumo => consumo.numeroAcomodacao === numeroAcomodacao);
  
            let totalConsumo = 0;
            tabelaConsumosBody.innerHTML = ''; // Limpa a tabela de consumos
  
            consumosAcomodacao.forEach(consumo => {
                totalConsumo += parseFloat(consumo.preco);
                // Adiciona cada consumo à tabela
                const row = tabelaConsumosBody.insertRow();
                row.innerHTML = `
                    <td>${consumo.numeroAcomodacao}</td>
                    <td>${consumo.tipoComida}</td>
                    <td>${consumo.quantidade}</td>
                    <td>R$ ${parseFloat(consumo.preco).toFixed(2)}</td>
                    <td>${consumo.dataConsumo}</td>
                `;
            });
  
            // Atualiza o total com os consumos
            calcularTotal(totalConsumo);
        } else {
            alert("Acomodação não encontrada ou já finalizada. Verifique o número e tente novamente.");
            petNomeInput.value = '';
            valorEstadiaInput.value = '';
            valorAlimentacaoInput.value = '';
            servicosAdicionaisInput.value = '';
            totalInput.value = '';
            tabelaConsumosBody.innerHTML = ''; // Limpa a tabela de consumos
        }
    }
  
    // Função para calcular o total
    function calcularTotal(consumosTotais = 0) {
        const valorEstadia = parseFloat(valorEstadiaInput.value) || 0;
        const valorAlimentacao = parseFloat(valorAlimentacaoInput.value) || 0;
        const servicosAdicionais = parseFloat(servicosAdicionaisInput.value) || 0;
        const total = valorEstadia + valorAlimentacao + servicosAdicionais + consumosTotais;
        totalInput.value = total.toFixed(2);
    }
  
    // Evento para carregar dados ao digitar o número da acomodação
    numeroAcomodacaoInput.addEventListener('blur', carregarDadosAcomodacao);
  
    // Evento para calcular o total ao alterar os valores
    valorEstadiaInput.addEventListener('input', () => calcularTotal());
    valorAlimentacaoInput.addEventListener('input', () => calcularTotal());
    servicosAdicionaisInput.addEventListener('input', () => calcularTotal());
  
    formCheckout.addEventListener('submit', function (e) {
        e.preventDefault();
  
        const numeroAcomodacao = numeroAcomodacaoInput.value;
        const petNome = petNomeInput.value;
        const valorEstadia = parseFloat(valorEstadiaInput.value) || 0;
        const valorAlimentacao = parseFloat(valorAlimentacaoInput.value) || 0;
        const servicosAdicionais = parseFloat(servicosAdicionaisInput.value) || 0;
        const total = parseFloat(totalInput.value) || 0;
        const formaPagamento = document.getElementById('formaPagamento').value;
  
        // Finalizar checkout: salvar a data de checkout e remover a hospedagem
        const hospedagens = JSON.parse(localStorage.getItem('hospedagens')) || [];
        const indexHospedagem = hospedagens.findIndex(
            (hospedagem) => hospedagem.numeroAcomodacao === numeroAcomodacao
        );
  
        if (indexHospedagem === -1) {
            alert("Hospedagem não encontrada.");
            return;
        }
  
        // Atualiza a hospedagem
        hospedagens[indexHospedagem].dataHoraCheckout = new Date().toISOString();
        localStorage.setItem('hospedagens', JSON.stringify(hospedagens));
  
        // Remover a reserva da lista de reservas
        const reservas = JSON.parse(localStorage.getItem('reservas')) || [];
        const indexReserva = reservas.findIndex(reserva => reserva.numeroAcomodacao === numeroAcomodacao);

        if (indexReserva !== -1) {
            reservas.splice(indexReserva, 1); // Remove a reserva da lista
            localStorage.setItem('reservas', JSON.stringify(reservas)); // Atualiza o localStorage
        }

        // Exibe a mensagem de finalização
        alert(`Checkout finalizado com sucesso! Total: R$ ${total.toFixed(2)}. Forma de pagamento: ${formaPagamento}`);
        
        // Limpa o formulário
        numeroAcomodacaoInput.value = '';
        petNomeInput.value = '';
        valorEstadiaInput.value = '';
        valorAlimentacaoInput.value = '';
        servicosAdicionaisInput.value = '';
        totalInput.value = '';
        tabelaConsumosBody.innerHTML = ''; // Limpa a tabela de consumos
    });
});
