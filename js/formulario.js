

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










const formulario = document.querySelectorAll('[data-tipo]')
formulario.forEach(input => {
  input.addEventListener('blur', () => {
    alteraTypeInputQuantidade()
    const inputNome = document.querySelector('[data-tipo="nome"]');
    const inputTipo = document.querySelector('[data-tipo="tipo"]');
    console.log(validaEnvioFormulario(inputNome,inputTipo));
    if(validaEnvioFormulario(inputNome,inputTipo)){

      console.log(validaEnvioFormulario(inputNome,inputTipo));
      cadastroFormulario()
    }
    else{
      mostramensagemErro()
    }

  })
});

function alteraTypeInputQuantidade (){
  let inputTipo = document.querySelector('[data-tipo="tipo"]');
  let inputQuantidade = document.querySelector('[data-tipo="quantidade"]');
  inputQuantidade.type ="text"
    
  if(inputTipo.value==='Hora Extra'){
    inputQuantidade.type="time"
  }
  
  

}
function validaEnvioFormulario(nome,tipo){
const formularioValido = false;
if(nome.value != "Nenhum" & tipo.value != "nenhum"){
  console.log('ta certo')
  formularioValido = true
}

return formularioValido;




}
function mostramensagemErro (){}


