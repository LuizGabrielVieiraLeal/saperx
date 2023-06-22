import useApi from "src/composables/useApi";

export default function contactService() {
  const { create, list, show, update, destroy } = useApi("contact");

  return { create, list, show, update, destroy };
}
