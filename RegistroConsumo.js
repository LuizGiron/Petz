document.addEventListener('DOMContentLoaded', () => {
    const numeroAcomodacaoInput = document.getElementById('numeroAcomodacao');
    const petNomeInput = document.getElementById('petNome');
  
    // Adiciona um evento para quando o valor do número da acomodação for alterado
    numeroAcomodacaoInput.addEventListener('input', function () {
      const numeroAcomodacao = this.value;
  
      // Recupera as reservas do localStorage
      const reservas = JSON.parse(localStorage.getItem('reservas')) || [];
  
      // Busca a reserva correspondente ao número da acomodação
      const reservaEncontrada = reservas.find(reserva => reserva.acomodacao === numeroAcomodacao);
  
      // Atualiza o campo de nome do pet se a reserva for encontrada
      if (reservaEncontrada) {
        petNomeInput.value = reservaEncontrada.nomePet;
      } else {
        // Limpa o campo de nome do pet caso não encontre nenhuma reserva
        petNomeInput.value = '';
      }
    });
  
    // Lógica para registrar o consumo
    document.getElementById('formConsumo').addEventListener('submit', function (event) {
      event.preventDefault();
  
      // Recupera os dados do formulário
      const consumo = {
        numeroAcomodacao: numeroAcomodacaoInput.value,
        petNome: petNomeInput.value,
        tipoComida: document.getElementById('tipoComida').value,
        quantidade: document.getElementById('quantidade').value,
        preco: document.getElementById('preco').value,
        dataConsumo: document.getElementById('dataConsumo').value,
      };
  
      // Recupera os consumos existentes no localStorage ou inicializa um array vazio
      const consumos = JSON.parse(localStorage.getItem('consumos')) || [];
  
      // Adiciona o novo consumo
      consumos.push(consumo);
  
      // Salva os consumos atualizados no localStorage
      localStorage.setItem('consumos', JSON.stringify(consumos));
  
      // Exibe uma mensagem de sucesso ou redireciona, se necessário
      alert('Consumo registrado com sucesso!');
      this.reset(); // Limpa o formulário após o registro
    });
  });
  