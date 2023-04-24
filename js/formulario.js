const FORMULARIO = document.querySelector(".cadastroLancamentos__formulario");


const FORM_SECTION_SELECTOR = ".cadastroLancamentos";
const FORM_HIDDEN_CLASS = "ocultaCadastro_JS";
const BACKDROP_SECTION_SELECTOR = ".backdropFilter-aprente";
const BACKDROP_HIDDEN_CLASS = "backdropFilter-invivel_JS";

const toggleFormVisibility = () => {
  const formSection = document.querySelector(FORM_SECTION_SELECTOR);
  const backdropSection = document.querySelector(BACKDROP_SECTION_SELECTOR);

  formSection.classList.toggle(FORM_HIDDEN_CLASS);
  backdropSection.classList.toggle(BACKDROP_HIDDEN_CLASS);
};

document.querySelector(".dashboard--boasVindas__adicionar").addEventListener("click", () => {
  toggleFormVisibility();

});

document.querySelector(".fa-circle-xmark").addEventListener("click", () => {
  toggleFormVisibility();
});



const inputTipo = document.querySelectorAll('[data-tipo]')
inputTipo.forEach(input => {
  input.addEventListener('change', () => {
    validaCadastroLancamentoForm(input)

  })
});

function validaCadastroLancamentoForm(input){
  const tipoDeInput = input.dataset.tipo

  if (validadores[tipoDeInput]) {
    validadores[tipoDeInput](input)
    console.log(verificaDataInvalida)
  

  }
  console.log(input.validity)
  console.log(input.value)
  
  setTimeout(() => {
    
    validarPreechimentoInputs(input)
  }, 100);


 
  
  InputDropdownFormularioObrigatorio()
  cadastroFormularioNaTabela(input)
}

function alteraTypeInputQuantidade (){
  let inputTipo = document.querySelector('[data-tipo="tipo"]');
  let inputQuantidade = document.querySelector('[data-tipo="quantidade"]');
  inputQuantidade.type ="text"
    
  if(inputTipo.value==='Hora Extra'){
    inputQuantidade.type="time"
  }
  
 
}

function InputDropdownFormularioObrigatorio(){
  
  let inputsDropdown = FORMULARIO.querySelectorAll("select");
  inputsDropdown.forEach(input => {
    if (input.value === 'nenhum') {
      input.setCustomValidity('Selecione uma opção');
    } else {
      input.setCustomValidity('');
    }
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

function mostramensagemErro(input){//precisa melhorar
  const tipoDeInput = input.dataset.tipo;
  let mensagem = ''
  tiposDeErro.forEach(erro =>{
    if(input.validity[erro]){
      mensagem = mensagensDeErro[tipoDeInput][erro]
    }
  })

  return mensagem
 
}
function verificaDataInvalida(input){
  let mensagem = ''
  
  let dataHoje = new Date();
  let dataRecebida = new Date(input.value)

  if(dataRecebida>dataHoje){
    mensagem = 'nao é possivel selecionar uma data maior que a data de hoje'
  }
  
  input.setCustomValidity(mensagem)

}


const dadosFormulario = {
  nome:"",
  descricao:"",
  tipo:"",
  quantidade:"",
  data:"",
}


function cadastroFormularioNaTabela(input){
  const tabela = document.querySelector('.UltimosCadastros-tabela');
  const btnCadastrarForm = FORMULARIO.querySelector('.formualario__botao');
  

  

  btnCadastrarForm.addEventListener('click', function(event){
    event.preventDefault();

    // Identifica o tipo de campo do input pelo atributo data-tipo
    const tipoCampo = input.dataset.tipo;

   // Define o valor do input no campo correspondente da constante dadosFormulario
   dadosFormulario[tipoCampo] = input.value;
    

    // Verifica se todos os campos foram preenchidos
    if (Object.values(dadosFormulario).every(valor => valor !== '')) {
      // Cria uma nova linha na tabela e adiciona as células com os valores do formulário
      const novaLinha = tabela.insertRow(-1);
      Object.values(dadosFormulario).forEach(valor => {
        const celula = novaLinha.insertCell(-1);
        celula.innerText = valor;
      });

      // Limpa o valor de todos os campos do formulário após cadastrar
      Object.values(input.form.elements).forEach(campo => campo.value = '');
    } 
    else {
      mostramensagemErro(input);
    }
  });
}
const botaoCadastro = FORMULARIO.querySelector('.formualario__botao');
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
    input.parentElement.querySelector('.mensagem-erro').innerHTML = ''
  }
  else{
    input.parentElement.classList.add('container-form--invalido')
    input.parentElement.querySelector('.mensagem-erro').innerHTML = mostramensagemErro(input)
  }

}

