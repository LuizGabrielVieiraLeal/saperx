import { api } from "boot/axios";

export default function useApi(url) {
  const create = async (payload) => {
    try {
      const response = await api.post(url, payload);
      return response.data;
    } catch (ex) {
      throw new Error(ex.response.data.error);
    }
  };

  const list = async () => {
    try {
      const response = await api.get(url);
      return response.data;
    } catch (ex) {
      throw new Error(ex.response.data.error);
    }
  };

  const show = async (id) => {
    try {
      const response = await api.get(`${url}/${id}`);
      return response.data;
    } catch (ex) {
      throw new Error(ex.response.data.error);
    }
  };

  const update = async (id, payload) => {
    try {
      const response = await api.patch(`${url}/${id}`, payload);
      return response.data;
    } catch (ex) {
      throw new Error(ex.response.data.error);
    }
  };

  const destroy = async (id) => {
    try {
      const response = await api.delete(`${url}/${id}`);
      return response.data;
    } catch (ex) {
      throw new Error(ex.response.data.error);
    }
  };

  return { create, list, show, update, destroy };
}
