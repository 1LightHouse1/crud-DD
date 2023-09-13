const corpoTabelaPersonagens = document.getElementById('corpoTabelaPersonagens');

function testeApi() {
    axios.get('https://rickandmortyapi.com/api/character').then(response => {

        console.log(response);
        console.log(response.data);
        console.log(response.data.results);
        const personagens = response.data.results;
        preencherTabela(personagens)
    })
    .catch(error =>{
        console.error('Deu erro', error);
    });
}

function cadastrarUsuario(nome, email, disciplina, senha) {
    console.log('Dados capturados para cadastro');
    console.log('Nome: ',  nome);
    console.log('Email:', email);
    console.log('Disciplina:', disciplina);
    console.log('Senha:', senha);

    const novoUsuario = {
        nome: nome, 
        email: email,
        disciplina: disciplina,
        senha: senha
    };

    axios.post('http://infopguaifpr.com.br3052/cadastrarUsuario', novoUsuario,{
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response =>{
        console.log('Usuario cadastrado com Sucesso', response.data);
        $('#cadastrarUsuario').modal('hide');

        alert('Usuario cadastrado com Sucesso')

        buscarDadosEPreencherTabela();
    }).catch(error =>{
        alert('Erro ao cadastrar usuario:', error)
    })
}

function deletarUsuario(idUsuario) {
    axios.delete('http://infopguaifpr.com.br:3052/deletarUsuario/${idUsuario}').then(response =>{
        console.log('Usuario excluido com sucesso')

        buscarDadosEPreencherTabela();
    }).catch(error =>{
        console.error('Erro ao deletar:', error);
    })
}

function preencherTabela(personagens) {
    personagens.forEach(function (personagem) {
        const linha = document.createElement('tr')

        const nomeCelula = document.createElement('td');
        nomeCelula.textContent = personagem.name;
        linha.appendChild(nomeCelula);

        const especieCelula = document.createElement('td');
        especieCelula.textContent = personagem.species;
        linha.appendChild(especieCelula);

        const generoCelula  = document.createElement('td');
        generoCelula.textContent = personagem.gender;
        linha.appendChild(generoCelula);

        const situacaoCelula = document.createElement('td');
        situacaoCelula.textContent = personagem.status;
        linha.appendChild(situacaoCelula);

        corpoTabelaPersonagens.appendChild(linha);



    })
}

const botaoChamarAPI = document.getElementById('btChamaApi');

botaoChamarAPI.addEventListener('click', () => {

    testeApi();
    console.log('Fui clicado')
})

document.addEventListener('click', function (event){
    if(event.target && event.target.classlist.contains('btn-delete')){
        const idUsuario = event.target.dataset.id;
        deletarUsuario(idUsuario);
    }
})

document.querySelector('#btnCadastrarUsuario').addEventListener('click', function (){
    const nome = document.querySelector('#nome').value;
    const email = document.querySelector('#email').value;
    const disciplina = document.querySelector('#disciplina').value;
    const senha = document.querySelector('#senha').value;

    cadastrarUsuario(nome, email, disciplina, senha);
});