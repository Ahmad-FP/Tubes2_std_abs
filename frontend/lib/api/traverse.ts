import client from "./client";
import {
  TraverseRequest,
  TraverseResponse,
  LcaRequest,
  LcaResponse,
} from "@/types";

export const traverseTree = async (
  payload: TraverseRequest
): Promise<TraverseResponse> => {
  const { data } = await client.post<TraverseResponse>(
    "/api/traverse",
    payload
  );
  return data;
};

export const findLca = async (payload: LcaRequest): Promise<LcaResponse> => {
  const { data } = await client.post<LcaResponse>("/api/lca", payload);
  return data;
};