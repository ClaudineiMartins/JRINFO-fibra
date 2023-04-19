

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
  InputDropdownFormularioObrigatorio()

});

document.querySelector(".fa-circle-xmark").addEventListener("click", () => {
  toggleFormVisibility();
});



const inputTipo = document.querySelectorAll('[data-tipo]')
inputTipo.forEach(input => {
  input.addEventListener('blur', () => {
    validaCadastroLancamentoForm(input)

  })
});

function validaCadastroLancamentoForm(input){
    alteraTypeInputQuantidade()
    teste(input)

    if(verificaDataInvalida(input)){
      input.setCustomValidity('A data nao pode ser uma data futura')
    }
    else{
      input.setCustomValidity('')
    }

    mostramensagemErro(input)
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
    if(input.value==="nenhum"){
      input.setCustomValidity('Selecione Uma Opção')
      console.log(input.validity.valid);

    }
    else{
      input.setCustomValidity('')


    }
    
  })
  


}
function teste(input){
  
  if(input.tagName === "SELECT" && input.value==='nenhum'){
    console.log('é um select vazio')
    console.log(input.value)

      input.setCustomValidity('Selecione Uma Opção')
    }
    else{   
       console.log(input.value)

      console.log('nao é select')
    }
    
  }
  



function verificaDataInvalida (input){
  let dataHoje = new Date();
  let dataRecebida = new Date(input.value)
  if(dataRecebida=='Invalid Date'){
    return
  }
  let datavalida = dataRecebida>=dataHoje
 
  return datavalida;

}


function mostramensagemErro(input){
  if(!input.validity.valid){
    input.parentElement.classList.add('container-form--invalido')
  }
  else{
    input.parentElement.classList.remove('container-form--invalido')
  }
}

function cadastroFormulario(){
}

const formulario = document.querySelector('.cadastroLancamentos__formulario');
const btnCadastrarForm = formulario.querySelector('.formualario__botao');
const inputForm = formulario.querySelectorAll('[data-tipo]');
const dados ={}


inputForm.forEach(input => {
  input.addEventListener('blur', function(event){
    const tiposDeInput = event.target.dataset.tipo
    const valorDoInput = event.target.value
    dados[tiposDeInput] = valorDoInput;
    console.log(dados)
  })
})

btnCadastrarForm.addEventListener('click', function(event){
  const tabela = document.querySelector('.UltimosCadastros-tabela');
  const novaLinha = tabela.insertRow(-1);

  for (const [tipo, valor] of Object.entries(dados)) {
    const novaCelula = novaLinha.insertCell();
    novaCelula.textContent = valor;

    switch (tipo) {
      case 'nome':
        novaLinha.appendChild(novaCelula);
        break;
      case 'descricao':
        novaLinha.appendChild(novaCelula);
        break;
      case 'tipo':
        novaLinha.appendChild(novaCelula);
        break;
      case 'quantidade':
        novaLinha.appendChild(novaCelula);
        break;
      case 'data':
        novaLinha.appendChild(novaCelula);
        break;
      // adicione outras cases para cada tipo de dado que você tem
    }
  }

})