document.addEventListener('DOMContentLoaded', () => {
    const quartos = document.querySelectorAll('.quarto');
    let quartoSelecionado = null;
  
    // Seleciona a acomodação ao clicar
    quartos.forEach((quarto) => {
      quarto.addEventListener('click', () => {
        if (quartoSelecionado) {
          quartoSelecionado.classList.remove('selecionado');
        }
        quartoSelecionado = quarto;
        quarto.classList.add('selecionado');
      });
    });
  
    // Valida o formulário e exibe a acomodação selecionada
    const formReserva = document.getElementById('formReserva');
    formReserva.addEventListener('submit', (e) => {
      e.preventDefault();
  
      if (!quartoSelecionado) {
        alert('Reserva registrada com sucesso!');
        return;
      }
  
      const dadosCliente = {
        nome: document.getElementById('nomeTutor').value,
        cpf: document.getElementById('cpfTutor').value,
        telefone: document.getElementById('telefoneTutor').value,
      };
  
      const dadosPet = {
        nome: document.getElementById('nomePet').value,
        raca: document.getElementById('racaPet').value,
        idade: document.getElementById('idadePet').value,
      };
  
      const dadosReserva = {
        checkIn: document.getElementById('checkIn').value,
        checkOut: document.getElementById('checkOut').value,
        quarto: quartoSelecionado.dataset.id,
      };
  
      console.log('Dados da Reserva:', { dadosCliente, dadosPet, dadosReserva });
      alert('Reserva cadastrada com sucesso!');
      formReserva.reset();
    });
  });
  
  document.addEventListener('DOMContentLoaded', () => {
    const formReserva = document.getElementById('formReserva');
  
    formReserva.addEventListener('submit', function(event) {
      event.preventDefault();
  
      // Coleta as informações do formulário
      const nomeCliente = document.getElementById('nomeCliente').value;
      const telefoneCliente = document.getElementById('telefoneCliente').value;
      const nomePet = document.getElementById('nomePet').value;
      const acomodacao = document.getElementById('acomodacao').value;
      const dataEntrada = document.getElementById('dataEntrada').value;
      const dataSaida = document.getElementById('dataSaida').value;
  
      // Cria um objeto com os dados da reserva
      const reserva = {
        nomeCliente,
        telefoneCliente,
        nomePet,
        acomodacao,
        dataEntrada,
        dataSaida
      };
  
      // Recupera as reservas existentes ou cria um array vazio
      const reservas = JSON.parse(localStorage.getItem('reservas')) || [];
  
      // Adiciona a nova reserva ao array
      reservas.push(reserva);
  
      // Salva as reservas no localStorage
      localStorage.setItem('reservas', JSON.stringify(reservas));
  
      // Redireciona para a tela de consulta de reservas
      window.location.href = "ConsultaReservas.html";
    });
  });
  document.addEventListener('DOMContentLoaded', () => {
    // Recupera a acomodação selecionada do localStorage
    const quartoSelecionadoId = localStorage.getItem('quartoSelecionado');
    if (quartoSelecionadoId) {
      const quartoSelecionado = document.querySelector(`[data-id="${quartoSelecionadoId}"]`);
      if (quartoSelecionado) {
        quartoSelecionado.classList.add('selecionado');
      }
    }
  });
  
  