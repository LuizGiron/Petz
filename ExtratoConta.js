document.addEventListener('DOMContentLoaded', () => {
    const petSelector = document.getElementById('petSelector');
    const tabelaExtrato = document.getElementById('tabelaExtrato').querySelector('tbody');
    const finalizarContaBtn = document.getElementById('finalizarConta');
  
    // Recupera os consumos e reservas do localStorage
    const consumos = JSON.parse(localStorage.getItem('consumos')) || [];
    const reservas = JSON.parse(localStorage.getItem('reservas')) || [];
  
    // Preenche o seletor com os pets disponíveis
    reservas.forEach(reserva => {
      const option = document.createElement('option');
      option.value = reserva.nomePet;
      option.textContent = reserva.nomePet;
      petSelector.appendChild(option);
    });
  
    // Atualiza o extrato quando um pet é selecionado
    petSelector.addEventListener('change', function () {
      const petSelecionado = this.value;
  
      // Limpa a tabela antes de preencher
      tabelaExtrato.innerHTML = '';
  
      // Filtra os consumos do pet selecionado e exibe na tabela
      const consumosPet = consumos.filter(consumo => consumo.petNome === petSelecionado);
  
      if (consumosPet.length > 0) {
        let total = 0;
  
        consumosPet.forEach(consumo => {
          const row = tabelaExtrato.insertRow();
          row.innerHTML = `
            <td>${consumo.numeroAcomodacao}</td>
            <td>${consumo.tipoComida}</td>
            <td>${consumo.quantidade}</td>
            <td>R$ ${parseFloat(consumo.preco).toFixed(2)}</td>
            <td>${consumo.dataConsumo}</td>
          `;
          total += parseFloat(consumo.preco); // Soma o preço ao total
        });
  
        // Adiciona uma linha para o total no final da tabela
        const totalRow = tabelaExtrato.insertRow();
        totalRow.innerHTML = `
          <td colspan="3"><strong>Total</strong></td>
          <td colspan="2"><strong>R$ ${total.toFixed(2)}</strong></td>
        `;
        totalRow.style.backgroundColor = '#f4f4f4'; // Estilo para destacar o total
      } else {
        const row = tabelaExtrato.insertRow();
        row.innerHTML = `<td colspan="5">Nenhum consumo registrado para este pet.</td>`;
      }
    });
  
    // Finaliza a conta do pet selecionado
    finalizarContaBtn.addEventListener('click', () => {
      const petSelecionado = petSelector.value;
  
      if (!petSelecionado) {
        alert('Por favor, selecione um pet para finalizar a conta.');
        return;
      }
  
      // Remove os consumos do pet selecionado
      const consumosAtualizados = consumos.filter(consumo => consumo.petNome !== petSelecionado);
      localStorage.setItem('consumos', JSON.stringify(consumosAtualizados));
  
      // Atualiza a tabela
      tabelaExtrato.innerHTML = `<td colspan="5">Nenhum consumo registrado para este pet.</td>`;
  
      alert(`Conta do pet "${petSelecionado}" finalizada com sucesso!`);
    });
  });
  