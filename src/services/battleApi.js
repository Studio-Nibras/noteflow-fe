import axios from "axios";
import { supabase } from "./supabase";

const API_URL = import.meta.env.VITE_API_URL;

const getAuthHeaders = async () => {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return {
    Authorization: `Bearer ${session?.access_token}`,
  };
};

// ==================== QUIZ ====================

export const getQuizList = async (userId) => {
  return axios.get(`${API_URL}/quiz-list`, {
    params: {
      user_id: userId,
    },
    headers: await getAuthHeaders(),
  });
};

// ==================== BATTLE ====================

export const getPendingBattles = async () => {
  const { data } = await axios.get(`${API_URL}/pending`, {
    headers: await getAuthHeaders(),
  });

  return data;
};

export const createBattle = async (payload) => {
  const { data } = await axios.post(`${API_URL}/create`, payload, {
    headers: await getAuthHeaders(),
  });

  return data;
};

export const searchUsers = async (keyword = "") => {
  const { data } = await axios.get(`${API_URL}/users`, {
    params: {
      q: keyword,
    },
    headers: await getAuthHeaders(),
  });

  return data;
};

export const acceptBattle = async (sessionId) => {
  const { data } = await axios.post(
    `${API_URL}/accept/${sessionId}`,
    {},
    {
      headers: await getAuthHeaders(),
    },
  );

  return data;
};

export const getBattleSession = async (sessionId) => {
  const { data } = await axios.get(`${API_URL}/session/${sessionId}`, {
    headers: await getAuthHeaders(),
  });

  return data;
};

export const submitBattle = async (sessionId, payload) => {
  const { data } = await axios.post(`${API_URL}/submit/${sessionId}`, payload, {
    headers: await getAuthHeaders(),
  });

  return data;
};
