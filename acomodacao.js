document.addEventListener('DOMContentLoaded', () => {
    // Obter todos os elementos de casinha
    const quartos = document.querySelectorAll('.quarto');

    // Adicionar evento de clique para cada casinha
    quartos.forEach((quarto) => {
        // Ignorar casinhas ocupadas
        if (quarto.classList.contains('ocupada')) {
            return;
        }

        // Ao clicar na casinha
        quarto.addEventListener('click', () => {
            // Remover a classe 'selecionada' de todas as casinhas
            quartos.forEach((q) => q.classList.remove('selecionada'));
            
            // Adicionar a classe 'selecionada' à casinha clicada
            quarto.classList.add('selecionada');
            
            // Rolar para a seção de detalhes da reserva
            document.querySelector('.detalhes-reserva').scrollIntoView({ behavior: 'smooth' });
        });
    });
});
let quartoSelecionado = ""; // variável global para armazenar o quarto selecionado

    // Função para armazenar os dados do quarto e das datas
    function reservar(quarto) {
      quartoSelecionado = quarto; // Armazenar o quarto selecionado
      console.log("Quarto Selecionado:", quartoSelecionado); // Diagnóstico
    }

    // Função para submeter o formulário com as datas e o quarto selecionado
    function enviarFormulario() {
      const dataEntrada = document.getElementById('dataCheckIn').value;
      const dataSaida = document.getElementById('dataCheckOut').value;

      // Verificar se os dados de data e quarto estão completos
      console.log("Data Entrada:", dataEntrada); // Diagnóstico
      console.log("Data Saída:", dataSaida); // Diagnóstico
      console.log("Quarto Selecionado:", quartoSelecionado); // Diagnóstico

      if (!dataEntrada || !dataSaida || !quartoSelecionado) {
        alert("Por favor, selecione o quarto e as datas.");
        return;
      }

      // Preencher os campos ocultos com os dados
      document.getElementById('quartoSelecionado').value = quartoSelecionado;
      document.getElementById('dataEntrada').value = dataEntrada;
      document.getElementById('dataSaida').value = dataSaida;

      // Submeter o formulário
      document.getElementById('reservaForm').submit();
    }