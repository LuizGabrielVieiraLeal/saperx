<template>
  <q-banner class="bg-info text-white q-ma-md">
    No meu caso o tempo não foi hábil para a finalização da tarefa, obrigado
    pela oportunidade.
  </q-banner>

  <q-list>
    <q-item
      v-for="contact in contacts"
      :key="contact.id"
      class="q-my-sm"
      clickable
      v-ripple
      @click="showContact(contact.id)"
    >
      <q-item-section avatar>
        <q-avatar color="primary" text-color="white">
          {{ contact.name[0].toUpperCase() }}
        </q-avatar>
      </q-item-section>

      <q-item-section>
        <q-item-label>{{ contact.name }}</q-item-label>
      </q-item-section>
      <q-item-section side>
        <q-icon name="delete" color="red" @click="removeContact(contact.id)" />
      </q-item-section>
    </q-item>
  </q-list>

  <q-dialog v-model="dialog">
    <q-card>
      <q-card-section>
        <div class="text-h6">Infromações de {{ contact.name }}</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-form action="https://some-url.com" method="post">
          <q-input v-model="data.name" label="Nome" />
          <q-input v-model="data.email" label="E-mail" />
          <q-input v-model="data.cpf" label="CPF" />
        </q-form>
        <p class="q-mt-md text-bold">Telefones</p>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Atualizar" color="green" />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <q-page-sticky position="bottom-right" :offset="[18, 18]">
    <q-fab
      v-model="fab1"
      label="Ações"
      color="purple"
      icon="keyboard_arrow_left"
      direction="left"
      :hide-label="hideLabels"
    >
      <q-fab-action
        :hide-label="hideLabels"
        color="primary"
        @click="onClick"
        icon="description"
        label="Relatório"
      />
      <q-fab-action
        :hide-label="hideLabels"
        color="secondary"
        @click="onClick"
        icon="add"
        label="Adicionar contato"
      />
    </q-fab>
  </q-page-sticky>
</template>

<script setup>
import { computed, ref, reactive, onBeforeMount } from "vue";
import contactService from "src/services/contact";
import { contactsStore } from "src/stores/contacts";

const cStore = contactsStore();
const contacts = computed(() => cStore.contacts);
const contact = computed(() => cStore.contact);
const dialog = ref(false);
const data = reactive({
  name: "",
  email: "",
  cpf: "",
  birth: "",
});

onBeforeMount(async () => {
  try {
    const { list } = contactService();
    const contacts = await list();
    cStore.setContacts(contacts);
  } catch (ex) {
    console.log(ex);
  }
});

const showContact = async (id) => {
  try {
    const { show } = contactService();
    const contact = await show(id);
    data.name = contact.name;
    data.email = contact.email;
    data.cpf = contact.cpf;
    data.birth = contact.birth;
    cStore.setContact(contact);
    dialog.value = !dialog.value;
  } catch (ex) {
    console.log(ex);
  }
};

const removeContact = async (id) => {
  try {
    const { destroy } = contactService();
    await destroy(id);
    cStore.removeContact(id);
    dialog.value = !dialog.value;
  } catch (ex) {
    console.log(ex);
  }
};
</script>
