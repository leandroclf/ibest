import Vue from 'vue';

const showErrorMessage = (titulo, mensagem) => {
    Vue.swal({
        title: titulo,
        text: mensagem,
        icon: 'error',
        confirmButtonText: 'Ok'
      });
};

const showSuccessMessage = (titulo, mensagem) => {
    Vue.swal({
        title: titulo,
        text: mensagem,
        icon: 'success',
        confirmButtonText: 'Ok'
      });
};


export const messageService = {
    showErrorMessage,
    showSuccessMessage
};



