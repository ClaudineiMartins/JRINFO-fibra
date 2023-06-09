//------------------------------------------------------------------------------
const DASH_botaoAdicionar = document.querySelector('.dashboard--boasVindas__adicionar')
const DASH_formularioAdicionar = document.querySelector('.cadastroLancamentos')
const botaoFecharFormulario = document.querySelector('.fa-circle-xmark')
const fundoFormulario = document.querySelector('.backdropFilter-invivel_JS')

DASH_botaoAdicionar.addEventListener('click', toggleFormularioFuncionario)
botaoFecharFormulario.addEventListener('click', toggleFormularioFuncionario )
fundoFormulario.addEventListener('click', toggleFormularioFuncionario)
function toggleFormularioFuncionario (){
    DASH_formularioAdicionar.classList.toggle('ocultaCadastro_JS')
    fundoFormulario.classList.toggle('backdropFilter-invivel_JS')
}

const formularioCadastro = document.querySelector('.cadastroLancamentos__formulario')
const inputTipo = formularioCadastro.querySelectorAll('[data-tipo]')
inputTipo.forEach(input => {
  input.addEventListener('change', () => {
    validaCadastroLancamentoForm(input)

  })
});


//todo o bloco acima: abre e fecha o formulario de cadastro.----------------

function validaCadastroLancamentoForm(input){
  const tipoDeInput = input.dataset.tipo

  if (validadores[tipoDeInput]) {//caso tenha o tipo de input dentro de validadores
    validadores[tipoDeInput](input)//informa o input para o validadores para que possa seguir com a validação
  }
  setTimeout(() => {
    validarPreechimentoInputs(input)//verifica se o input esta valido inserindo/removendo classe
  }, 100);
  InputDropdownFormularioObrigatorio()//torna a opção "selecionar" invalida para envio do form
  cadastroFormularioNaTabela(input)//cadastra formulario na tabela
}

//tornam os dropdowns obrigatorios.
function InputDropdownFormularioObrigatorio(){
  
  let inputsDropdown = DASH_formularioAdicionar.querySelectorAll("select");
  inputsDropdown.forEach(input => {
    input.addEventListener('change', () => {
      if (input.value === 'nenhum') {
        input.setCustomValidity('Selecione uma opção');
      } else {
        input.setCustomValidity('');
      }
    });
    
  })
  


}
window.onload = function() {
  InputDropdownFormularioObrigatorio()
};

function verificaDataInvalida(input){
  let mensagem = ''
  
  let dataHoje = new Date();
  let dataRecebida = new Date(input.value)

  if(dataRecebida>dataHoje){
    mensagem = 'nao é possivel selecionar uma data maior que a data de hoje'
  }
  
  input.setCustomValidity(mensagem)

}

function alteraTypeInputQuantidade (){

  let inputTipo = document.querySelector('[data-tipo="tipo"]');
  let inputQuantidade = document.querySelector('[data-tipo="quantidade"]');
  inputQuantidade.type ="text"
  console.log('text')
    
  if(inputTipo.value==='Hora Extra'){
    console.log('hora extra')
    inputQuantidade.type="time"
  }
  
} 
const validadores = {
  data:input => verificaDataInvalida(input),
  tipo:input => alteraTypeInputQuantidade(),
  
}
const tiposDeErro = [
  'customError',
  'valueMissing',
  'typeMismatch',
  'patternMismatch',
]
const mensagensDeErro = {
  nome: {
      valueMissing: 'O campo de nome não pode estar vazio.',
      customError: 'Selecione um funcionario da lista'
  },
  descricao: {
      valueMissing: 'O campo de descrição não pode estar vazio.'
  },
  tipo: {
      valueMissing: 'O campo de tipo não pode estar vazio.',
      customError: 'Selecione uma opção da lista'
  },
  quantidade: {
      valueMissing: 'O campo de quantidade não pode estar vazio.'
  },
  data: {
      valueMissing: 'O campo de data não pode estar vazio.',
      customError: 'Não é possivel selecionar uma data maior que a data de hoje!'
  }

}

function mostramensagemErro(input){
  const tipoDeInput = input.dataset.tipo;
  let mensagem = ''
  tiposDeErro.forEach(erro =>{
    if(input.validity[erro]){
      mensagem = mensagensDeErro[tipoDeInput][erro]
    }
  })

  return mensagem
 
}



const dadosFormulario = {
  nome:"",
  descricao:"",
  tipo:"",
  quantidade:"",
  data:"",
}

buscaDadosNoJson();//busca dados no JSON para imprimir na tabela;
function cadastroFormularioNaTabela(input){
  //botao cadastrar
  const btnCadastrarForm = DASH_formularioAdicionar.querySelector('.formualario__botao');
  btnCadastrarForm.addEventListener('click', function(event){
    event.preventDefault();//previne padrao.
    // Identifica o tipo de campo do input pelo atributo data-tipo
    const tipoCampo = input.dataset.tipo;
   // Define o valor do input no campo correspondente da constante dadosFormulario
   dadosFormulario[tipoCampo] = input.value;
    
    // Verifica se todos os campos foram preenchidos
    if (Object.values(dadosFormulario).every(valor => valor !== '')) {
      // // Limpa o valor de todos os campos do formulário após cadastrar
      Object.values(input.form.elements).forEach(campo => campo.value = '');
      cadastraDadosNoJSON()
    } 
    else {
      //mostra estilizações informando o erro.
      mostramensagemErro(input);
    }
  });
}
const botaoCadastro = DASH_formularioAdicionar.querySelector('.formualario__botao');
botaoCadastro.addEventListener('click', function(event){
  const inputTipo = document.querySelectorAll('[data-tipo]')
  //inputTipo = todos os inputs com data-tipo=tipo
  inputTipo.forEach(input =>{
  validarPreechimentoInputs(input)

  })
})

function validarPreechimentoInputs(input){
  if(input.validity.valid){
    input.parentElement.classList.remove('container-form--invalido')
    // input.parentElement.querySelector('.mensagem-erro').innerHTML = mostramensagemErro(input)
  }
  else{
    input.parentElement.classList.add('container-form--invalido')
    input.parentElement.querySelector('.mensagem-erro').innerHTML = mostramensagemErro(input)
  }

}
//cadastra valores ao dropdown 'nome' no formulario de cadastro.----------------
const dropdownCadastroNome = [];

let selectCadastroNome = document.querySelector('[data-tipo="nome"]');

fetch('http://localhost:3000/funcionarios')
    .then(response => response.json())
    .then(data => {
        let selecNome = data.map(dados => dados.nome);
        dropdownCadastroNome.push(...selecNome);
        criarOptions(selectCadastroNome);
    });

function criarOptions(select) {
    dropdownCadastroNome.forEach(funcionario => {
        let novaOption = document.createElement('option');
        novaOption.text = funcionario;
        novaOption.value = funcionario;
        select.appendChild(novaOption);
    });
}
//-----------------------------------------------------------------


function cadastraDadosNoJSON(){
  fetch('http://localhost:3001/BancoHoras', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(dadosFormulario)
  })
  .then(response => response.json())
  .then(data => {
      console.log('Funcionário cadastrado com sucesso:', data);
      buscaDadosNoJson()
  })
  .catch(error => console.error('Erro ao cadastrar funcionário:', error));

  
}

function buscaDadosNoJson(){
  const tabela = document.querySelector('.UltimosCadastros-tabela');

  // Remove todas as linhas de dados existentes na tabela
  const linhasDados = tabela.querySelectorAll('tr:not(:first-child)');
  linhasDados.forEach(linha => linha.remove());
  fetch('http://localhost:3001/BancoHoras')
  .then(response => response.json())
  .then(data => {
    data.forEach(dadoHoras => {
      exibeTabela(dadoHoras)
    })
    

  })
    .catch(error => console.log(error));
}



function exibeTabela(dadosHoras) {
  const tabela = document.querySelector('.UltimosCadastros-tabela');

  const novaLinha = tabela.insertRow(-1);
  Object.keys(dadosHoras).forEach(propriedade => {
    const celula = novaLinha.insertCell(-1);
    celula.innerText = dadosHoras[propriedade];
  });

  Object.values(dadosFormulario).forEach((valor, index) => {
    Object.keys(dadosFormulario)[index].value = '';
  });
  // buscaDadosNoJson();


}
