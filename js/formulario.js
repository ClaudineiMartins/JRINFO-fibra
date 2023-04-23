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
    defineSelectObrigatorio(input)

    if(verificaDataInvalida(input)){
      input.setCustomValidity('A data nao pode ser uma data futura')
      
    }
    else{
      input.setCustomValidity('')
    }

    mostramensagemErro(input)
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
    if(input.value==="nenhum"){
      input.setCustomValidity('Selecione Uma Opção')

    }
    else{
      input.setCustomValidity('')


    }
    
  })
  


}
function defineSelectObrigatorio(input){//Precisa reformular
  
  if(input.tagName === "SELECT" && input.value==='nenhum'){

      input.setCustomValidity('Selecione Uma Opção')
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


function mostramensagemErro(input){//precisa melhorar
  if(!input.validity.valid){
    input.parentElement.classList.add('container-form--invalido')
  }
  else{
    input.parentElement.classList.remove('container-form--invalido')
  }
}


const dadosFormulario = {
  nome:"",
  descricao:"",
  tipo:"",
  quantidade:"",
  data:"",
};

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
    // else {
    //   alert('Por favor, preencha todos os campos do formulário.');
    // }
  });
}



// const dadosFormulario = {
//   nome:"",
//   descricao:"",
//   tipo:"",
//   quantidade:"",
//   data:"",
// }

// function cadastroFormularioNaTabela(input){
//   const tabela = document.querySelector('.UltimosCadastros-tabela');
//   const btnCadastrarForm = FORMULARIO.querySelector('.formualario__botao');
//   btnCadastrarForm.addEventListener('click', function(event){
//     event.preventDefault();

//     // Identifica o tipo de campo do input pelo atributo data-tipo
//     const tipoCampo = input.dataset.tipo;

//     // Define o valor do input no campo correspondente da constante dadosFormulario
//     dadosFormulario[tipoCampo] = input.value;

//     // Cria uma nova linha na tabela e adiciona as células com os valores do formulário
//     const novaLinha = tabela.insertRow(-1);
//     Object.values(dadosFormulario).forEach(valor => {
//       const celula = novaLinha.insertCell(-1);
//       celula.innerText = valor;
//     });

//     // Limpa o valor do campo do formulário após cadastrar
//     input.value = '';

//   })
// }


// const dados ={}
// const dadosFormulario = {
//   nome: dados.nome,
//   descricao: dados.descricao,
//   tipo: dados.tipo,
//   quantidade: dados.quantidade,
//   data: dados.data
// }

// function cadastroFormularioNaTabela(input){


//     const btnCadastrarForm = FORMULARIO.querySelector('.formualario__botao');
 
//     const tiposDeInput = input.dataset.tipo
//     const valorDoInput = input.value
//     dadosFormulario[tiposDeInput] = valorDoInput;
//     console.log(dadosFormulario)

//     btnCadastrarForm.addEventListener('click', function(event){
//       event.preventDefault();
//       console.log('clicou')
      
//       const tabela = document.querySelector('.UltimosCadastros-tabela');
//       const novaLinha = tabela.insertRow(-1);

//       for (const [tiposDeInput, valorDoInput] of Object.entries(dadosFormulario)) {
//         const novaCelula = novaLinha.insertCell();
//         novaCelula.textContent = valorDoInput;

//         switch (tiposDeInput) {
//           case 'nome':
//             novaLinha.appendChild(novaCelula);
//             break;
//           case 'descricao':
//             novaLinha.appendChild(novaCelula);
//             break;
//           case 'tipo':
//             novaLinha.appendChild(novaCelula);
//             break;
//           case 'quantidade':
//             novaLinha.appendChild(novaCelula);
//             break;
//           case 'data':
//             novaLinha.appendChild(novaCelula);
//             break;
//         }
//       }

//     })
//   }


  // const formulario = document.querySelector('.cadastroLancamentos__formulario');

   // const inputForm = FORMULARIO.querySelectorAll('[data-tipo]');
  


    // input.forEach(input => {
    //   input.addEventListener('blur', function(event){
    //     const tiposDeInput = event.target.dataset.tipo
    //     const valorDoInput = event.target.value
    //     dadosOrdenados[tiposDeInput] = valorDoInput;
    //     console.log(dados)
    //   })
    // })