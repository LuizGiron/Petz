document.addEventListener('DOMContentLoaded', () => {
    // Recupera as reservas cadastradas do localStorage
    const reservas = JSON.parse(localStorage.getItem('reservas')) || [];

    // Recupera o elemento da tabela
    const tabelaReservas = document.getElementById('tabelaReservas');

    // Limpa a tabela antes de preenchê-la (evita duplicação de registros)
    tabelaReservas.innerHTML = '';

    // Função para preencher a tabela com as reservas
    function preencherTabela(reservas) {
        reservas.forEach((reserva, index) => {
            const row = tabelaReservas.insertRow();
            row.innerHTML = `
          <td>${reserva.nomeCliente}</td>
          <td>${reserva.telefoneCliente}</td>
          <td>${reserva.nomePet}</td>
          <td>${reserva.acomodacao}</td>
          <td>${reserva.dataEntrada}</td>
          <td>${reserva.dataSaida}</td>
          <td>
            <button class="btn-alterar" data-index="${index}">Alterar</button>
            <button class="btn-cancelar" data-index="${index}">Cancelar</button>
          </td>
        `;
        });
    }

    // Preenche a tabela inicial
    preencherTabela(reservas);

    // Adiciona os eventos para os botões de alterar e cancelar
    tabelaReservas.addEventListener('click', (event) => {
        if (event.target.classList.contains('btn-alterar')) {
            const index = event.target.dataset.index;
            alterarReserva(index);
        }

        if (event.target.classList.contains('btn-cancelar')) {
            const index = event.target.dataset.index;
            cancelarReserva(index);
        }
    });
});

// Função para alterar a reserva
function alterarReserva(index) {
    const reservas = JSON.parse(localStorage.getItem('reservas')) || [];
    const reserva = reservas[index];

    // Salva os dados da reserva no localStorage para serem recuperados na tela de alteração
    localStorage.setItem('reservaAtual', JSON.stringify(reserva));
    localStorage.setItem('reservaIndex', index); // Salva o índice da reserva

    // Redireciona para a página de alteração
    window.location.href = 'AlteracaoReservas.html';
}

// Função para cancelar a reserva
function cancelarReserva(index) {
    const reservas = JSON.parse(localStorage.getItem('reservas')) || [];
    reservas.splice(index, 1); // Remove a reserva do array

    // Atualiza o localStorage com as reservas restantes
    localStorage.setItem('reservas', JSON.stringify(reservas));

    // Recarrega a tabela completamente para refletir a remoção
    const tabelaReservas = document.getElementById('tabelaReservas');
    tabelaReservas.innerHTML = ''; // Limpa a tabela
    preencherTabela(reservas); // Preenche a tabela com as reservas restantes

    // Exibe uma mensagem de confirmação
    alert('Reserva cancelada com sucesso!');

    // Função para redirecionar para a tela de reserva
    
    }

    function reservar(nomeAcomodacao) {
        // Armazena o nome da acomodação no localStorage para ser usado na tela de reserva
        localStorage.setItem('acomodacaoSelecionada', nomeAcomodacao);
    
        // Redireciona para a página de reserva
        window.location.href = 'TelaReservas.html'; // Substitua pelo nome da sua página de reserva
}

