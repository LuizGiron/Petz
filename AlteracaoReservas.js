document.addEventListener('DOMContentLoaded', () => {
    // Recupera os dados da reserva da localStorage
    const reserva = JSON.parse(localStorage.getItem('reservaAtual'));
    const reservaIndex = localStorage.getItem('reservaIndex'); // Recupera o índice da reserva
  
    if (reserva) {
      // Preenche os campos do formulário com os dados da reserva
      document.getElementById('nomeCliente').value = reserva.nomeCliente;
      document.getElementById('telefoneCliente').value = reserva.telefoneCliente; // Preenche o campo de telefone
      document.getElementById('nomePet').value = reserva.nomePet;
      document.getElementById('acomodacao').value = reserva.acomodacao;
      document.getElementById('dataEntrada').value = reserva.dataEntrada;
      document.getElementById('dataSaida').value = reserva.dataSaida;
  
      // Armazena o índice da reserva para atualizá-la depois
      document.getElementById('reservaIndex').value = reservaIndex;
    }
  });
  
  // Função para atualizar a reserva
  document.getElementById('formAlteracaoReserva').addEventListener('submit', function(event) {
    event.preventDefault();
  
    // Recupera o índice da reserva a ser alterada
    const reservaIndex = document.getElementById('reservaIndex').value;
    const reservas = JSON.parse(localStorage.getItem('reservas')) || [];
  
    // Atualiza a reserva no índice correspondente
    reservas[reservaIndex] = {
      nomeCliente: document.getElementById('nomeCliente').value,
      telefoneCliente: document.getElementById('telefoneCliente').value, // Inclui o telefone aqui
      nomePet: document.getElementById('nomePet').value,
      acomodacao: document.getElementById('acomodacao').value,
      dataEntrada: document.getElementById('dataEntrada').value,
      dataSaida: document.getElementById('dataSaida').value
    };
  
    // Salva as reservas atualizadas no localStorage
    localStorage.setItem('reservas', JSON.stringify(reservas));
  
    // Redireciona para a página de consulta de reservas após a atualização
    window.location.href = "ConsultaReservas.html";
  });
  