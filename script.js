document.addEventListener('DOMContentLoaded', function () {
  // Verificar e adicionar event listeners somente se o formulário existir
  const formCadastro = document.getElementById('formCadastro');
  if (formCadastro) {
    formCadastro.addEventListener('submit', function (e) {
      e.preventDefault();

      const nomeTutor = document.getElementById('nomeTutor').value;
      const nomePet = document.getElementById('nomePet').value;
      const email = document.getElementById('email').value;
      const cpf = document.getElementById('cpf').value;
      const senha = document.getElementById('senha').value;

      // Validação dos campos
      if (!nomeTutor || !nomePet || !email || !cpf || !senha) {
        alert("Por favor, preencha todos os campos.");
        return;
      }

      const usuario = {
        nomeTutor,
        nomePet,
        email,
        cpf,
        senha
      };

      // Salva o usuário no localStorage
      localStorage.setItem(email, JSON.stringify(usuario));

      alert('Cadastro realizado com sucesso!');

      setTimeout(function () {
        window.location.href = 'login.html';  // Redireciona para login
      }, 1000);
    });
  }

  const formLogin = document.getElementById('formLogin');
  if (formLogin) {
    formLogin.addEventListener('submit', function (e) {
      e.preventDefault();

      const loginEmail = document.getElementById('loginEmail').value.trim();
      const loginSenha = document.getElementById('loginSenha').value.trim();

      const usuarioSalvo = JSON.parse(localStorage.getItem(loginEmail));

      if (usuarioSalvo && usuarioSalvo.senha === loginSenha) {
        alert('Login bem-sucedido!');
        localStorage.setItem("userEmail", loginEmail);
        window.location.href = 'perfil.html';
      } else {
        alert('E-mail ou senha inválidos.');
      }
    });
  }

  // Obter o e-mail do usuário que está logado
  const email = localStorage.getItem("userEmail");

  if (email) {
    // Buscar os dados do usuário no localStorage
    const usuario = JSON.parse(localStorage.getItem(email));

    if (usuario) {
      // Preencher os campos com as informações do usuário
      document.getElementById("nomeTutor").innerText = usuario.nomeTutor;
      document.getElementById("email").innerText = usuario.email;
      document.getElementById("cpf").innerText = usuario.cpf;
      document.getElementById("nomePet").innerText = usuario.nomePet;

      // Se você tiver campos de foto, preencha também
      if (usuario.fotoTutor) {
        document.getElementById("fotoTutor").src = usuario.fotoTutor;
      }
      if (usuario.fotoPet) {
        document.getElementById("fotoPet").src = usuario.fotoPet;
      }
    } else {
      alert("Dados do usuário não encontrados.");
      window.location.href = "login.html"; // Redireciona se não encontrar o usuário
    }
  } else {
    alert("Usuário não autenticado.");
    window.location.href = "login.html"; // Redireciona se não estiver logado
  }

  // Manipulação de foto do tutor e do pet
  document.getElementById("inputFotoTutor").addEventListener("change", function (e) {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = function () {
      // Atualiza a imagem exibida no perfil
      document.getElementById("fotoTutor").src = reader.result;

      // Salva a imagem no localStorage (associada ao e-mail do usuário)
      const email = localStorage.getItem("userEmail");
      if (email) {
        const usuario = JSON.parse(localStorage.getItem(email));
        if (usuario) {
          usuario.fotoTutor = reader.result;
          localStorage.setItem(email, JSON.stringify(usuario));
        }
      }
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  });

  document.getElementById("inputFotoPet").addEventListener("change", function (e) {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = function () {
      // Atualiza a imagem exibida no perfil
      document.getElementById("fotoPet").src = reader.result;

      // Salva a imagem no localStorage (associada ao e-mail do usuário)
      const email = localStorage.getItem("userEmail");
      if (email) {
        const usuario = JSON.parse(localStorage.getItem(email));
        if (usuario) {
          usuario.fotoPet = reader.result;
          localStorage.setItem(email, JSON.stringify(usuario));
        }
      }
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  });

  // Simulação de serviços (normalmente isso viria de um banco de dados ou API)
  const servicosSimulados = [
    { pet: "Rex", servico: "Banho e Tosa", data: "2024-11-01" },
    { pet: "Rex", servico: "Consulta Veterinária", data: "2024-10-25" },
    { pet: "Bolt", servico: "Vacinação", data: "2024-11-05" }
  ];

  // Carregar o histórico de serviços
  function carregarHistorico() {
    const email = localStorage.getItem("userEmail");
    const usuario = JSON.parse(localStorage.getItem(email));

    if (!usuario) {
      alert("Usuário não autenticado.");
      window.location.href = "login.html";
      return;
    }

    const nomePet = usuario.nomePet;
    const historicoDiv = document.getElementById("historico");

    // Filtra os serviços para o pet do usuário
    const historicoPet = servicosSimulados.filter(servico => servico.pet === nomePet);

    if (historicoPet.length > 0) {
      historicoPet.forEach(servico => {
        const historicoItem = document.createElement("div");
        historicoItem.classList.add("historico-item");
        historicoItem.innerHTML = `
          <p><strong>Serviço:</strong> ${servico.servico}</p>
          <p><strong>Data:</strong> ${servico.data}</p>
        `;
        historicoDiv.appendChild(historicoItem);
      });
    } else {
      historicoDiv.innerHTML = `<p>Sem histórico para <strong>${nomePet}</strong>.</p>`;
    }
  }

  carregarHistorico(); // Chama a função para carregar o histórico

  // Captura os parâmetros passados pela URL
  const urlParams = new URLSearchParams(window.location.search);
  const quarto = urlParams.get('quartoSelecionado');
  const dataEntrada = urlParams.get('dataEntrada');
  const dataSaida = urlParams.get('dataSaida');

  // Preenche os campos da tela com os dados recebidos
  document.getElementById('quartoPerfil').textContent = quarto || 'Indefinido';
  document.getElementById('checkInPerfil').textContent = dataEntrada || 'Indefinido';
  document.getElementById('checkOutPerfil').textContent = dataSaida || 'Indefinido';
});
