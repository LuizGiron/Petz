document.addEventListener('DOMContentLoaded', function () {
    const formCheckin = document.getElementById('formCheckin');
  
    formCheckin.addEventListener('submit', function (e) {
      e.preventDefault();
  
      // Captura os valores dos campos
      const clienteNome = document.getElementById('clienteNome').value;
      const clienteTelefone = document.getElementById('clienteTelefone').value;
      const petNome = document.getElementById('petNome').value;
      const numeroAcomodacao = document.getElementById('numeroAcomodacao').value;
      const checkinHora = new Date().toLocaleString(); // Data e hora atual no formato local
  
      // Validação dos campos
      if (!clienteNome || !clienteTelefone || !petNome || !numeroAcomodacao) {
        alert("Por favor, preencha todos os campos.");
        return;
      }
  
      // Recupera os registros existentes ou inicializa um array vazio
      const hospedagens = JSON.parse(localStorage.getItem('hospedagens')) || [];
  
      // Adiciona o novo registro de check-in
      hospedagens.push({
        nomeCliente: clienteNome,
        telefoneCliente: clienteTelefone,
        nomePet: petNome,
        numeroAcomodacao,
        dataHoraCheckin: checkinHora,
        dataHoraCheckout: null // Ainda não foi feito check-out
      });
  
      // Salva novamente no localStorage
      localStorage.setItem('hospedagens', JSON.stringify(hospedagens));
  
      // Exibe confirmação
      alert(`
        Check-in realizado com sucesso!
  
        Cliente: ${clienteNome}
        Telefone: ${clienteTelefone}
        Pet: ${petNome}
        Acomodação: ${numeroAcomodacao}
        Hora de Check-in: ${checkinHora}
      `);
  
      // Redireciona para a tela de acompanhamento
      window.location.href = 'AcompanhamentoHospedagem.html';
    });
  });
  