import axios from "axios";
import type { UnitSchema, CreateUnitInput } from "../types/unit";

const api = axios.create({
    baseURL: "http://138.2.109.131:8001/api",
})

export const unitService = {
  getAll: () => api.get<UnitSchema[]>('/units'),
  create: (data: CreateUnitInput) => api.post<UnitSchema>('/units', data),
  update: (id: string, data: CreateUnitInput) => api.put<UnitSchema>(`/units/${id}`, data),
  delete: (id: string) => api.delete(`/units/${id}`),
};