import { defineStore } from "pinia";

export const contactsStore = defineStore("contacts", {
  state: () => ({
    _contacts: [],
    _contact: {},
  }),
  getters: {
    contacts: (state) => state._contacts,
    contact: (state) => state._contact,
  },
  actions: {
    setContacts(contacts) {
      this._contacts = contacts;
    },
    setContact(contact) {
      this._contact = contact;
    },
    removeContact(id) {
      this._contacts.splice(
        this._contacts.findIndex((c) => c.id === id),
        1
      );
    },
  },
});
