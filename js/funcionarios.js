const botaoAdicionarFuncionario = document.querySelector('.colaboradores_cabecalho__adicionar')
const formularioAdicionarFuncionario = document.querySelector('.cadastroFuncionario')
const botaoFecharFormularioFuncionario = document.querySelector('.fa-circle-xmark')
const fundoFormularioFuncionario = document.querySelector('.backdropFilter-invivel_JS--funcionario')

botaoAdicionarFuncionario.addEventListener('click', toggleFormularioFuncionario)
botaoFecharFormularioFuncionario.addEventListener('click', toggleFormularioFuncionario )
fundoFormularioFuncionario.addEventListener('click', toggleFormularioFuncionario)
function toggleFormularioFuncionario (){
    formularioAdicionarFuncionario.classList.toggle('ocultaCadastro_JS--funcionario')
    fundoFormularioFuncionario.classList.toggle('backdropFilter-invivel_JS--funcionario')
    

}
//para cada input passa o input clicado atravez do evento blur para futura verificação
const inputsFormularioFuncionarios = document.querySelectorAll('[data-tipo]')
inputsFormularioFuncionarios.forEach(input => {
    const tipoDeInput = input.dataset.tipo;
   input.addEventListener('blur', () => {
    verificaInputValido(input)

    })
})
//verifica o input recebido do evento blur e adiciona ou remove a classe que estiliza o erro.

function verificaInputValido(input){
    if(input.validity.valid){
        input.parentElement.classList.remove('container-form--invalido')
        input.parentElement.querySelector('.mensagem-erro').innerHTML=""
    }
    else{
        input.parentElement.classList.add('container-form--invalido')
        input.parentElement.querySelector('.mensagem-erro').innerHTML=mostraMensagemErro(input)

    }

}

//tipos de erros que um input pode receber do validity
const tiposDeErro = [
    'badInput',
    'customError',
    'patternMismatch',
    'rangeOverflow',
    'rangeUnderflow',
    'stepMismatch',
    'tooShort',
    'typeMismatch',
    'valueMissing',
    'tooLong',
]
//mensagens de erros personalizadas para cada input dependendo do erro;
const mensagensDeErro = {

    nome: {
        valueMissing:'O campo de nome Não pode estar vazio.',
        tooShort: 'ta curto bro'
    },
    cargo: {
        valueMissing:'O campo de cargo Não pode estar vazio.',
        tooShort: 'ta curto bro'
    },
    admissao: {
        valueMissing:'O campo de admissao Não pode estar vazio.',
        tooShort: 'ta curto bro'
    },
    salario: {
        valueMissing:'O campo de salario Não pode estar vazio.',
        tooShort: 'ta curto bro'
    }
    

}
//mostra a mensagem de erro dependendo do erro recebido para cada input

//recebe um input => verifica o tipo de input=>inicia uma mensagem vazia => se tiver algum dos erros no input
//=>muda a mensagem para o valor da mensagem na costante 'mensagensDeErro'=> retorna essa mensagem de erro;
function mostraMensagemErro(input){
    let tipoDeInput = input.dataset.tipo;
    let mensagem = ""
    tiposDeErro.forEach(erro =>{
        if(input.validity[erro]){
        mensagem = mensagensDeErro[tipoDeInput][erro]
        }
    })

    
    
    
    
    return mensagem
    

}
const botaoCadastrarFuncionario = document.querySelector('.formualario__botao');
botaoCadastrarFuncionario.addEventListener('click', cadastraFormularioNaTabela)

function cadastraFormularioNaTabela(event){
    event.preventDefault()
    
    inputsFormularioFuncionarios.forEach(input =>{
        if(!input.validity.valid){
            verificaInputValido(input)
        }
        else{
            cadastrarDadosNaTabela(input)
        }
    
    })
}
buscaDadosNoJson();

function cadastrarDadosNaTabela(input){
    const tipoDeInput = input.dataset.tipo
    dadosFormularioFuncionario[tipoDeInput] = input.value;

    if(Object.values(dadosFormularioFuncionario).every(valor => valor !== '')){
        cadastraDadosNoJSON()
        

        Object.keys(dadosFormularioFuncionario).forEach(dado => dadosFormularioFuncionario[dado] = '');
        Object.values(input.form.elements).forEach(input => input.value = '');

        
        
    }
    
}

const dadosFormularioFuncionario = {
    nome: '',
    cargo: '',
    admissao: '',
    salario: '',

}
function cadastraDadosNoJSON(){
    fetch('http://localhost:3000/funcionarios', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(dadosFormularioFuncionario)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Funcionário cadastrado com sucesso:', data);
        buscaDadosNoJson()
    })
    .catch(error => console.error('Erro ao cadastrar funcionário:', error));

    
}

function buscaDadosNoJson(){
    const tabela = document.querySelector('.colaboradores-tabela');

  // Remove todas as linhas de dados existentes na tabela
  const linhasDados = tabela.querySelectorAll('tr:not(:first-child)');
  linhasDados.forEach(linha => linha.remove());

  

//buscar dados no json
    fetch('http://localhost:3000/funcionarios')
    .then(response => response.json())
    .then(data => {
        data.forEach(dadosFuncionario => {
            console.log(dadosFuncionario)
        exibeTabela(dadosFuncionario);
        });
    })
    .catch(error => console.log(error));





}
function exibeTabela(dadosFuncionario) {
    const tabela = document.querySelector('.colaboradores-tabela');
  
    const novaLinha = tabela.insertRow(-1);
    Object.keys(dadosFuncionario).forEach(propriedade => {
      const celula = novaLinha.insertCell(-1);
      celula.innerText = dadosFuncionario[propriedade];
    });
  
    Object.values(dadosFormularioFuncionario).forEach((valor, index) => {
      Object.keys(dadosFormularioFuncionario)[index].value = '';
    });



}

 


