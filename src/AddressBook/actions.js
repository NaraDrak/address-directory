import { actions as searchActions } from "./SearchContacts";
import { actions as contactDetailsActions } from "./ContactDetails";


//ESTA FUNCIÓN RECIBE EL TEXTO DEL INPUT: NOTIFICA QUE SE HA INICIADO UNA BÚSQUEDA
//searchActions.updateSearchPhraseStart
//HACE UNA PETICIÓN HTTP PARA ENCONTRAR DATA QUE COINCIDA CON LA PHRASE
//DESPUÉS ESTA data LA MOLDEA Y REGRESA UN ARRAY 
// data.map(contact => ({id: contact.id, value: contact.name})) 

export function updateSearchPhrase(newPhrase) {
  return (dispatch, getState, { httpApi }) => {
    
    dispatch(searchActions.updateSearchPhraseStart({ newPhrase }));

    httpApi.getFirst5MatchingContacts({ namePart: newPhrase }).then(({ data }) => {
      
        const matchingContacts = data.map(contact => ({id: contact.id, value: contact.name}));

          dispatch(searchActions.updateSearchPhraseSuccess({ matchingContacts }));
      
      })
      .catch(() => {
        dispatch(
          contactDetailsActions.fetchContactDetailsFailure()
        );
      });
  };
}

//ESTA ACCIÓN RECIBE EL DATO QUE ESCRIBIMOS EL EL INPUT Y 
//HACE LA PETICIÓN HTTP PARA RECUPERAR LOS DETALLES DEL USUARIO
export function selectMatchingContact(selectedMatchingContact) {

  return (dispatch, getState, { httpApi, dataCache }) => {

    function getContactDetails() {

      const detalles = httpApi.getContact({ contactId: selectedMatchingContact.id }).then(({ data }) => (
        {
          id: data.id,
          name: data.name,
          phone: data.phone,
          addressLines: data.addressLines,
        })).catch((err) => console.log(err));

      return detalles.then(item => (item));
    }

    //ESTA ACCIÓN MANDA AL STORE EL CONTACTO SELECCIONADO
    dispatch(searchActions.selectMatchingContact({ selectedMatchingContact }));

    //ESTA ACCIÓN MARCA QUE SE INICIO EL FETCH DE DETALLES DEL CONTACTO
    dispatch(contactDetailsActions.fetchContactDetailsStart());

    getContactDetails()
      .then((contactDetails) => {dataCache.store({key: contactDetails.id, value: contactDetails})
      dispatch(
        // ESTA ACCIÓN DEBE MANDAR LOS DETALLES DEL USUARIO AL STORE
        contactDetailsActions.fetchContactDetailsSuccess(contactDetails) 
      );
    })
      .catch(() => {
        dispatch(
          contactDetailsActions.fetchContactDetailsFailure()
        );
      });
  };
}
