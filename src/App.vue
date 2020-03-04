<template>
  <v-app id="sandbox">
    <v-navigation-drawer
      v-model="primaryDrawer.model"
      :clipped="primaryDrawer.clipped"
      :floating="primaryDrawer.floating"
      :mini-variant="primaryDrawer.mini"
      :permanent="primaryDrawer.type === 'permanent'"
      :temporary="primaryDrawer.type === 'temporary'"
      app
      overflow
    />
    <v-app-bar :clipped-left="primaryDrawer.clipped" app style="background-color:#002749">
      <v-img
        class="mx-2"
        src="http://institutoibest.com.br/wp-content/uploads/2019/09/logo_branca_md.png"
        max-height="80"
        max-width="80"
        contain
      ></v-img>
      <v-toolbar-title style="color:white;margin-left:10px;">Cadastro</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container fluid>
        <v-row align="center" justify="center">
          <v-col cols="11">                        
            <div>
              <v-stepper v-model="e1">
                <v-stepper-header>
                  <template>
                    <v-stepper-step :complete="e1 > 1" step="1" editable>Dados Pessoais</v-stepper-step>
                    <v-stepper-step :complete="e1 > 2" step="2" editable>Endereço</v-stepper-step>
                    <v-stepper-step :complete="e1 > 3" step="3" editable>Inscrição</v-stepper-step>
                    <v-stepper-step :complete="e1 > 4" step="4" v-show="inscricao.isAtendimentoEspecial" editable>Atendimento Especial</v-stepper-step>
                    <v-stepper-step :complete="e1 > 5" step="5" v-if=false>Inscrição Realizada</v-stepper-step>
                    <v-divider></v-divider>
                  </template>
                </v-stepper-header>

                <v-stepper-items>
                  <v-stepper-content :step="1" >
                    <v-card class="mb-12" color="lighten-1">
                      <v-form v-model="firstStepValid" ref="form">
                        <v-row align="center" justify="center">
                          <v-col cols="5">
                            <v-text-field
                              label="Nome Completo"
                              :rules="[rules.required, rules.counterName]"
                              hide-details="true"
                              v-model="dadosPessoa.nome"    
                              outlined                          
                              dense                              
                            ></v-text-field>
                          </v-col>
                          <v-col cols="3">
                            <v-text-field
                              label="CPF"
                              :rules="[rules.required, rules.validateCpf]"
                              hide-details="true"
                              v-mask="['###.###.###-##']"
                              v-model="dadosPessoa.cpf"      
                              outlined                       
                              dense
                            ></v-text-field>
                          </v-col>
                          <v-col cols="2">
                            <v-text-field
                              label="Data Nascimento"
                              v-mask="['##/##/####']"
                              hide-details="true"
                              v-model="dadosPessoa.dataNascimento"      
                              outlined                       
                              dense
                            ></v-text-field>
                          </v-col>
                          <v-col cols="2"> 
                            <v-radio-group v-model="dadosPessoa.sexo" row :mandatory="true">
                            <v-radio label="Masculino" value="M"></v-radio>
                            <v-radio label="Feminino" value="F"></v-radio>
                          </v-radio-group></v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="2">
                            <v-text-field
                              label="RG"
                              :rules="[rules.required]"
                              hide-details="true"
                              v-model="dadosPessoa.identidade"
                              outlined
                              dense
                            ></v-text-field>
                          </v-col>                         
                          <v-col cols="2">
                            <v-text-field
                              label="Órgão Expeditor"
                              :rules="[rules.required]"
                              hide-details="true"
                              outlined
                              v-model="dadosPessoa.orgaoExpedidor"
                              dense
                            ></v-text-field>
                          </v-col>
                             <v-col cols="2">
                            <v-text-field
                              label="UF RG"
                              :rules="[rules.required]"
                              hide-details="true"
                              v-model="dadosPessoa.identidadeUF"
                              outlined
                              dense
                            ></v-text-field>
                          </v-col>
                            <v-col cols="3">
                            <v-text-field
                              label="Nome Pai"                              
                              hide-details="true"
                              outlined
                               v-model="dadosPessoa.nomePai"
                              dense
                            ></v-text-field>
                          </v-col>
                             <v-col cols="3">
                            <v-text-field
                              label="Nome Mãe"                              
                              hide-details="true"
                              outlined
                              dense
                               v-model="dadosPessoa.nomeMae"
                            ></v-text-field>
                          </v-col>                        
                        </v-row>
                        <v-row align="center" justify="center">
                          <v-col cols="4">
                            <v-text-field
                              label="E-mail"
                              :rules="[rules.required, rules.email]"
                              hide-details="true"
                              outlined
                              dense
                               v-model="dadosPessoa.email"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="4">
                            <v-text-field
                              label="Senha"
                              type="password"
                              :rules="[rules.required]"
                              hide-details="true"
                              outlined
                               v-model="dadosPessoa.senha"
                              dense
                            ></v-text-field>
                          </v-col>
                          <v-col cols="4">
                            <v-text-field
                              label="Confirmar Senha"
                              type="password"
                              :rules="[v=> v === dadosPessoa.senha || 'Inválido']"
                              hide-details="true"
                              outlined
                               v-model="dadosPessoa.senhaConfirmacao"
                              dense
                            ></v-text-field>
                          </v-col>                          
                        </v-row>
                        <v-row align="center" justify="center">
                          <v-col cols="4">
                            <v-text-field
                              label="Telefone Residencial"
                              v-mask="['(##) ####-####', '(##) #####-####']"
                              hide-details="true"                              
                              outlined
                              dense
                               v-model="dadosPessoa.telefoneResidencial"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="4">
                            <v-text-field
                              label="Telefone Celular"
                              v-mask="['(##) ####-####', '(##) #####-####']"                              
                              :rules="[rules.counterPhone]"
                              hide-details="true"
                              outlined
                               v-model="dadosPessoa.telefoneCelular"
                              dense
                            ></v-text-field>
                          </v-col>
                          <v-col cols="4">
                                <v-text-field
                              label="Telefone Comercial"
                              v-mask="['(##) ####-####', '(##) #####-####']"
                              hide-details="true"                              
                              v-model="dadosPessoa.telefoneComercial"
                              outlined
                              dense
                            ></v-text-field>
                          </v-col>
                            <v-col cols="2"></v-col>
                        </v-row>
                        <v-row align="center" justify="center">
                          <v-col cols="4"></v-col>
                          <v-col cols="4"></v-col>
                          <v-col cols="4"></v-col>
                        </v-row>
                        <v-row align="center" justify="center">
                          <v-col cols="4"></v-col>
                          <v-col cols="4"></v-col>
                          <v-col cols="4"></v-col>
                        </v-row>
                      </v-form>
                    </v-card>
                    <v-btn color="#ff4e31" style="color:white" @click="nextStep()" :disabled="!firstStepValid">Próximo</v-btn>                    
                  </v-stepper-content>
                  <v-stepper-content :step="2">
                    <v-card class="mb-12" color="lighten-1">
                      <v-form v-model="secondStepValid" ref="form">
                        <v-row align="center" justify="center">
                          <v-col cols="2">
                            <v-text-field
                              label="CEP"                              
                              :rules="[rules.required]"
                              hide-details="true"
                              v-model="dadosPessoa.cep"
                              outlined
                              dense
                              @focusout="buscarCep()"
                              :loading="buscandoCep" 
                              :disabled="buscandoCep"
                            ></v-text-field>                            
                          </v-col>
                          <v-col cols="4">
                            <v-text-field
                              label="Logradouro"
                              :rules="[rules.required]"
                              hide-details="true"
                              v-model="dadosPessoa.logradouro"
                              outlined
                              dense
                              :disabled="!validacoesCep.cepNaoPossuiLogradouro"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="1">
                            <v-text-field
                              label="Nº"
                              hide-details="true"
                              v-model="dadosPessoa.numero"
                              :rules="[rules.required]"
                              outlined
                              dense
                            ></v-text-field>
                          </v-col>
                          <v-col cols="5">
                            <v-text-field
                              label="Complemento"
                              :rules="[rules.required]"
                              hide-details="true"
                              v-model="dadosPessoa.complemento"
                              outlined
                              dense
                            ></v-text-field>
                          </v-col>
                        </v-row>
                        <v-row align="center" justify="center">
                          <v-col cols="3">
                            <v-text-field
                              label="Bairro"
                              :rules="[rules.required]"
                              hide-details="true"
                              v-model="dadosPessoa.bairro"
                              outlined
                              dense
                              :disabled="!validacoesCep.cepNaoPossuiBairro"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="3">
                            <v-text-field
                              label="Cidade"
                              :rules="[rules.required]"
                              hide-details="true"
                              v-model="dadosPessoa.municipio"
                              outlined
                              dense
                              :disabled="!validacoesCep.cepNaoPossuiCidade"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="1">
                            <v-text-field
                              label="UF"
                              hide-details="true"
                              :rules="[rules.required]"
                              v-model="dadosPessoa.uf"
                              outlined
                              dense
                              :disabled="!validacoesCep.cepNaoPossuiUf"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="5"></v-col>
                        </v-row>
                        <v-row align="center" justify="center">
                          <v-col cols="4"></v-col>
                          <v-col cols="4"></v-col>
                          <v-col cols="4"></v-col>
                        </v-row>
                        <v-row align="center" justify="center">
                          <v-col cols="4"></v-col>
                          <v-col cols="4"></v-col>
                          <v-col cols="4"></v-col>
                        </v-row>
                      </v-form>
                    </v-card>
                    <v-btn color="#ff4e31" style="color:white" @click="nextStep()" :disabled="!secondStepValid">Próximo</v-btn>
                    <v-btn text @click="forwardStep()">Voltar</v-btn>
                  </v-stepper-content>
                  <v-stepper-content :step="3">
                    <v-card class="mb-12" color="lighten-1">
                      <v-form v-model="thirdStepValid" ref="form">
                        <v-row align="center" justify="center">
                          <v-col cols="6">
                           <v-autocomplete
                          v-model="inscricao.idconcurso"
                          :items="concursos"
                          item-text="descricao"
                          item-value="id"
                          filled
                          label="Concurso" :rules="[rules.dropDownRequired]"></v-autocomplete>                        
                          </v-col>
                          <v-col cols="6">
                                 <v-autocomplete
                          v-model="inscricao.idescolaridade"
                          :items="escolaridades"
                          item-text="descricao"
                          item-value="id"
                          filled
                          label="Escolaridade" :rules="[rules.dropDownRequired]"></v-autocomplete>  
                          </v-col>
                        </v-row>
                        <v-row align="center" justify="center">
                          <v-col cols="6">
                         <v-autocomplete
                          v-model="inscricao.idespecialidadefase"
                          :items="cargos"
                          item-text="descricao"
                          item-value="id"
                          filled
                          label="Cargo" :rules="[rules.dropDownRequired]"></v-autocomplete>
                          </v-col>
                          <v-col cols="6">
                              <v-autocomplete
                          v-model="inscricao.idlocalidadeprova"
                          :items="localidades"
                          item-text="descricao"
                          item-value="id"
                          filled
                          label="Localidade Prova" :rules="[rules.dropDownRequired]"></v-autocomplete>
                          </v-col>
                        </v-row>
                        <v-row align="center" justify="center">
                          <v-col cols="6">
                            <v-container fluid>
                          <v-switch v-model="inscricao.isVagaDeficiente" :label=" `${inscricao.isVagaDeficiente ? 'Me' : 'Não me'} enquadro nas cotas para pessoas com deficiência.`"></v-switch>
                          </v-container>
                          </v-col>
                          <v-col cols="6">
                          <v-container fluid>
                          <v-switch v-model="inscricao.isAtendimentoEspecial" :label=" `${inscricao.isAtendimentoEspecial ? 'Eu' : 'Eu não'} necessitarei de atendimento especial no dia da prova.`"></v-switch>
                          </v-container>
                          </v-col>
                        </v-row>
                        <v-row align="center" justify="center" v-if="inscricao.isVagaDeficiente">
                          <v-col cols="6">
                           <v-file-input
                            :rules="[rules.fileSize]"
                            accept="image/png, image/jpeg, image/bmp"
                            placeholder="Faça upload do laudo que comprove sua deficiência"
                            prepend-icon="mdi-camera"
                            label="Imagem Laudo"
                          ></v-file-input>
                          </v-col>
                           <v-col cols="6"></v-col>
                        </v-row>
                        <v-row align="center" justify="center">
                          <v-col cols="7">
                              <v-checkbox
                            v-model="inscricao.declaroterlidoedital"
                            label="Declaro conhecer e aceitar todas as normas estabelecidas no Edital Normativo."
                            :rules="[rules.required]"
                          ></v-checkbox>
                          </v-col>
                          <v-col cols="5"></v-col>
                        </v-row>
                      </v-form>
                    </v-card>
                     <v-btn color="#ff4e31" style="color:white" @click="nextStep()" :disabled="!thirdStepValid">Próximo</v-btn> 
                    <v-btn text @click="forwardStep()">Voltar</v-btn>
                  </v-stepper-content>
                     <v-stepper-content :step="4">
                    <v-card class="mb-12" color="lighten-1">
                      <v-card-subtitle class="pb-0"><p>Ao solicitar um atendimento especial, você deverá anexar:</p>
                      <p>1) Cópia legível do CPF</p>
                      <p>2) Cópia legível do laudo médico, emitido nos últimos 12 meses, quando o tipo de atendimento selecionado assim exigir. </p>
                      </v-card-subtitle>
                      <v-form v-model="fourthStepValid" ref="form">
                        <v-row align="center" justify="center">
                          <v-col cols="6">
                              <p style="color:#ff4e31"><b>AUDITIVA</b></p>
                           <v-checkbox
                            label="Autorização para uso de prótese auditiva" hide-details
                          ></v-checkbox>
                          <v-checkbox
                            label="Intérprete de LIBRAS"
                            hide-details
                          ></v-checkbox>
                          </v-col>
                           <v-col cols="6">
                            <p style="color:#ff4e31"><b>FÍSICA</b></p>
                           <v-checkbox
                            label="Mesa e cadeira separadas" hide-details
                          ></v-checkbox>
                          <v-checkbox
                            label="Mesa e cadeira separadas (cadeirante)"
                            hide-details
                          ></v-checkbox>
                              <v-checkbox
                            label="Sala em andar térreo"
                            hide-details
                          ></v-checkbox>
                          </v-col>
                        </v-row>
                         <v-row align="center" justify="center">
                          <v-col cols="6">
                           <p style="color:#ff4e31"><b>VISUAL</b></p>
                           <v-checkbox
                            label="Prova ampliada (fonte 16) com cartão-resposta normal" hide-details
                          ></v-checkbox>
                          <v-checkbox
                            label="Prova ampliada (fonte 16) com cartão-resposta ampliado"
                            hide-details
                          ></v-checkbox>
                             <v-checkbox
                            label="Prova superampliada (fonte 24) com cartão-resposta normal"
                            hide-details
                          ></v-checkbox>
                             <v-checkbox
                            label="Prova superampliada (fonte 24) com cartão-resposta ampliado"
                            hide-details
                          ></v-checkbox>
                           <v-checkbox
                            label="Prova em braile"
                            hide-details
                          ></v-checkbox>
                           <v-checkbox
                            label="Ledor"
                            hide-details
                          ></v-checkbox>
                          </v-col>
                             <v-col cols="6">
                            <p style="color:#ff4e31"><b>OUTROS</b></p>
                           <v-checkbox
                            label="Auxílio no preenchimento do cartão resposta" hide-details
                          ></v-checkbox>
                            <v-checkbox
                            label="Autorização para uso de medicação" hide-details
                          ></v-checkbox>
                             <v-checkbox
                            label="Cadeira para canhoto" hide-details
                          ></v-checkbox>
                            <v-checkbox
                            label="Tempo Adicional de prova (1 hora)" hide-details
                          ></v-checkbox>
                             <v-checkbox
                            label="Minha necessidade não está contemplada acima" hide-details
                          ></v-checkbox>
                          </v-col>
                        </v-row>
                        <v-row align="center" justify="center">
                                <v-col cols="6">
                             <p style="color:#ff4e31"><b>LACTANTE</b></p>
                           <v-checkbox
                            label="Sala para amamentação (autorização para levar acompanhante maior de 18 anos)" hide-details
                          ></v-checkbox>
                          </v-col>
                       
                          <v-col cols="6">
                          
                          </v-col>
                        </v-row>
                        <v-row align="center" justify="center" v-if="inscricao.isVagaDeficiente">
                          <v-col cols="6">
                           
                          </v-col>
                           <v-col cols="6"></v-col>
                        </v-row>
                        <v-row align="center" justify="center">
                          <v-col cols="7">
                           
                          </v-col>
                          <v-col cols="5"></v-col>
                        </v-row>
                      </v-form>
                    </v-card>
                     <v-btn color="#ff4e31" style="color:white" @click="nextStep()" :disabled="!thirdStepValid">Próximo</v-btn> 
                    <v-btn text @click="forwardStep()">Voltar</v-btn>
                  </v-stepper-content>
                </v-stepper-items>
              </v-stepper>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-content>

    <v-footer :inset="footer.inset" app>
      <span class="px-4">&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mask } from "vue-the-mask";
import { axios } from "axios";
import { pessoaApi } from "@/api/pessoa.api";
import { messageService} from "@/service/message-service";
import isCpf from 'iscpf'

export default {
  name: "App",
  directives: {
    mask,
    axios,
    pessoaApi,
    isCpf,
    messageService
  },
  data: () => ({    
    concursos: [
      { id: 1, descricao: 'Prefeitura São Domingos'}, {id: 2, descricao: 'Policia Civil'}
    ],
    escolaridades: [
      { id: 1, descricao: 'Ensino Médio'}, {id: 2, descricao: 'Ensino Superior'}
    ],
     cargos: [
      { id: 1, descricao: 'Cargo 1: Analista Administrativo - Advogado'}, {id: 2, descricao: 'Cargo 2: Analista Administrativo - Médico'}
    ],
    localidades: [
      { id: 1, descricao: 'São Domingos/GO'}, {id: 2, descricao: 'Brasília/DF'}
    ],
    inscricao: {isVagaDeficiente:false, isAtendimentoEspecial:false},
    dadosPessoa: { sexo: 'M' },
    e1: 1,
    firstStepValid: false,
    secondStepValid: false,
    thirdStepValid: false,
    fourthStepValid: false,
    steps: 5,
    buscandoCep: false,
    salvandoUsuario: false,
    validacoesCep: {
      cepNaoPossuiBairro: false,
      cepNaoPossuiLogradouro: false,
      cepNaoPossuiCidade: false,
      cepNaoPossuiUf: false
    },    
    rules: {
      required: value => !!value || "Obrigatório.",      
      counterPhone: value => (value &&  value.length > 13) || "Telefone inválido",
      counterName: value =>
        (value && value.length >= 3) || "Mínimo 3 caracteres",
      counterCpf: value => (value && value.length == 14) || "Dígitos Insuficientes",
      validateCpf: value => isCpf(value)  || "CPF Inválido",
      email: value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || "Invalid e-mail.";
      },
      fileSize: value => !value || value.size < 2000000 || 'Avatar size should be less than 2 MB!',
      dropDownRequired: value => value && value > 0 || 'Obrigatório'

    },
    drawers: ["Default (no property)", "Permanent", "Temporary"],
    primaryDrawer: {
      model: null,
      type: "Permanent",
      clipped: true,
      floating: true,
      mini: true
    },
    footer: {
      inset: false
    }
  }),

  watch: {
    steps(val) {
      if (this.e1 > val) {
        this.e1 = val;
      }
    }
  },
  methods: {    
    nextStep() {
      this.e1 = this.e1 + 1;
    },
    forwardStep() {
      this.e1 = this.e1 - 1;
    },
    buscarCep() {            
      if(this.dadosPessoa.cep && this.dadosPessoa.cep.length == 8) {
        this.buscandoCep = true;
        this.$http.get(`https://viacep.com.br/ws/${this.dadosPessoa.cep}/json`)
        .then(ret => {  

          this.validarDadosCep(ret.data);  

          this.$set(this.dadosPessoa, 'logradouro', ret.data.logradouro);
          this.$set(this.dadosPessoa, 'complemento', ret.data.complemento);
          this.$set(this.dadosPessoa, 'bairro', ret.data.bairro);
          this.$set(this.dadosPessoa, 'municipio', ret.data.localidade);
          this.$set(this.dadosPessoa, 'uf', ret.data.uf);
          this.$set(this.dadosPessoa, 'geocodigo', ret.data.ibge);

        }).catch(err => {
           messageService.showErrorMessage('Erro',`Erro ao buscar o cep: ${err}`);
        }).finally(() => this.buscandoCep = false);
      }
    },
    cadastrar() {
      this.salvandoUsuario = true;
      pessoaApi.cadastrarPessoa(this.dadosPessoa).then(() => {
          messageService.showSuccessMessage('Sucesso','Usuário cadastrado com Sucesso! Um e-mail com um link foi enviado a você. Clique no link para finalizar o cadastro.')
      }).catch(err => 
           console.log(err)
      ).finally(()=> this.salvandoUsuario = false);
    },
    validarDadosCep(cep){
        if(!cep.logradouro || cep.logradouro === '') this.validacoesCep.cepNaoPossuiLogradouro = true;
        if(!cep.localidade || cep.localidade === '') this.validacoesCep.cepNaoPossuiCidade = true;
        if(!cep.bairro     || cep.bairro     === '') this.validacoesCep.cepNaoPossuiBairro = true;
        if(!cep.uf         || cep.uf === '') this.validacoesCep.cepNaoPossuiUf = true;        
    }
  }
};
</script>
