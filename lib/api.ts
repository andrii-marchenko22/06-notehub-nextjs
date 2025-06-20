import axios from "axios";
import type { Note, NewPostCreate } from "../types/note";

const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
const BASE_URL = "https://notehub-public.goit.study/api/notes";

interface notesResponse {
  notes: Note[];
  page: number;
  totalPages: number;
}

type fetchNotesResponse = notesResponse & { totalCount: number };

export const fetchNotes = async (
  searchText: string,
  page = 1,
  perPage = 12
): Promise<fetchNotesResponse> => {
  const response = await axios.get<notesResponse>(BASE_URL, {
    params: {
      ...(searchText !== "" && { search: searchText }),
      page,
      perPage,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const totalCount = Number(response.headers["x-total-count"]);

  return { ...response.data, totalCount };
};

export const createNote = async (noteData: NewPostCreate) => {
  const response = await axios.post<Note>(BASE_URL, noteData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const deleteNote = async (notesId: number) => {
  const response = await axios.delete<Note>(`${BASE_URL}/${notesId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const fetchNoteById = async (id: string) => {
  const response = await axios.get<Note>(`${BASE_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
