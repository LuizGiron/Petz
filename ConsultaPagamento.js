document.addEventListener('DOMContentLoaded', () => {
    const tabelaPagamentos = document.getElementById('tabelaPagamentos').querySelector('tbody');
  
    // Recupera as reservas e consumos do localStorage
    const reservas = JSON.parse(localStorage.getItem('reservas')) || [];
    const consumos = JSON.parse(localStorage.getItem('consumos')) || [];
  
    // Filtra os pets com status "Pendente"
    const petsPendentes = reservas.filter(reserva => {
      // Verifica se há consumos associados ao pet e se ele ainda não foi finalizado
      const consumosDoPet = consumos.filter(consumo => consumo.petNome === reserva.nomePet);
      return consumosDoPet.length > 0; // Se houver consumos, o status será "Pendente"
    });
  
    // Preenche a tabela com os pets pendentes
    petsPendentes.forEach(reserva => {
      const row = tabelaPagamentos.insertRow();
      row.innerHTML = `
        <td>${reserva.nomePet}</td>
        <td>${reserva.nomeCliente}</td>
        <td>${reserva.acomodacao}</td>
        <td><span style="color: red; font-weight: bold;">Pendente</span></td>
      `;
    });
  
    // Caso não haja pets pendentes
    if (petsPendentes.length === 0) {
      const row = tabelaPagamentos.insertRow();
      row.innerHTML = `<td colspan="4">Nenhum pagamento pendente no momento.</td>`;
    }
  });
  