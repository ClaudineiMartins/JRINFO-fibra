

// let botaoAdd = document.querySelector(".dashboard--boasVindas__adicionar");
// let btnFecharForm = document.querySelector('.fa-circle-xmark')
// let btnCadastraForm = document.querySelector('.formualario__botao')

// botaoAdd.addEventListener('click', function(){
//     console.log('test')

//     const sessaoForm =".cadastroLancamentos"
//     const classForm = "ocultaCadastro_JS"
//     const sessaoFundo= ".backdropFilter-aprente"
//     const classFundo = "backdropFilter-invivel_JS"
// mostraFormLancamento(sessaoForm,classForm,sessaoFundo,classFundo)
// })

// btnFecharForm.addEventListener('click', function (){
//     const sessaoForm =".cadastroLancamentos"
//     const classForm = "ocultaCadastro_JS"
//     const sessaoFundo= ".backdropFilter-aprente"
//     const classFundo = "backdropFilter-invivel_JS"

//     removeFormLancamento(sessaoForm,classForm,sessaoFundo,classFundo)
// } )

// btnCadastraForm.addEventListener('click', function (){
//     const sessaoForm =".cadastroLancamentos"
//     const classForm = "ocultaCadastro_JS"
//     const sessaoFundo= ".backdropFilter-aprente"
//     const classFundo = "backdropFilter-invivel_JS"

//     removeFormLancamento(sessaoForm,classForm,sessaoFundo,classFundo)
// })



// function mostraFormLancamento(sectionForm, classeForm, sectionFundo, classeFundo){
    
    
//     document.querySelector(sectionForm).classList.remove(classeForm)
//     document.querySelector(sectionFundo).classList.remove(classeFundo)
// }

// function removeFormLancamento (sectionForm, classeForm, sectionFundo, classeFundo){
//     document.querySelector(sectionForm).classList.add(classeForm)
//     document.querySelector(sectionFundo).classList.add(classeFundo)
// }

/*CHA*/
const FORM_SECTION_SELECTOR = ".cadastroLancamentos";
const FORM_HIDDEN_CLASS = "ocultaCadastro_JS";
const BACKDROP_SECTION_SELECTOR = ".backdropFilter-aprente";
const BACKDROP_HIDDEN_CLASS = "backdropFilter-invivel_JS";

const toggleFormVisibility = () => {
  const formSection = document.querySelector(FORM_SECTION_SELECTOR);
  const backdropSection = document.querySelector(BACKDROP_SECTION_SELECTOR);
//   const formClass = isVisible ? "" : FORM_HIDDEN_CLASS;
//   const backdropClass = isVisible ? "" : BACKDROP_HIDDEN_CLASS;

  formSection.classList.toggle(FORM_HIDDEN_CLASS);
  backdropSection.classList.toggle(BACKDROP_HIDDEN_CLASS);
};

document.querySelector(".dashboard--boasVindas__adicionar").addEventListener("click", () => {
  toggleFormVisibility();
});

document.querySelector(".fa-circle-xmark").addEventListener("click", () => {
  toggleFormVisibility();
});

// document.querySelector(".formualario__botao").addEventListener("click", () => {
//   toggleFormVisibility(false);
// });






/*Adicionar valor a tabela*/

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

// PegaValoresFormulario(inputForm);



// function PegaValoresFormulario (inputs){
//   console.log(inputs)
//   inputs.forEach(input => {
//     const valorInput = input.value
//     console.log(valorInput)
//     AdicionarNaTabela(nome,descricao,tipo,quantidade,data)
//   })
// }



function AdicionarNaTabela(nome,descricao,tipo,quantidade,data){
  // console.log(nome,descricao,tipo,quantidade,data)
}