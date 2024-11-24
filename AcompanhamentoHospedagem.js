document.addEventListener('DOMContentLoaded', () => {
    const tabelaHospedagem = document.getElementById('tabelaHospedagem').querySelector('tbody');
  
    // Recupera os registros de hospedagem do localStorage
    const hospedagens = JSON.parse(localStorage.getItem('hospedagens')) || [];
  
    // Preenche a tabela com os dados de check-in e check-out
    hospedagens.forEach(hospedagem => {
      const row = tabelaHospedagem.insertRow();
  
      // Determina o status e exibe "Hospedado" se o check-out não estiver registrado
      const status = hospedagem.dataHoraCheckout ? "Finalizado" : "Hospedado";
      const dataHoraCheckout = hospedagem.dataHoraCheckout || "<span style='color: red;'>Hospedado</span>";
  
      row.innerHTML = `
        <td>${hospedagem.nomePet}</td>
        <td>${hospedagem.nomeCliente}</td>
        <td>${hospedagem.dataHoraCheckin}</td>
        <td>${dataHoraCheckout}</td>
        <td><strong>${status}</strong></td>
      `;
    });
  
    // Caso não haja registros de hospedagem
    if (hospedagens.length === 0) {
      const row = tabelaHospedagem.insertRow();
      row.innerHTML = `<td colspan="5">Nenhum registro de hospedagem encontrado.</td>`;
    }
  });
  