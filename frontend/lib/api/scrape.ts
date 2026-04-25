import client from "./client";
import { ScrapeRequest, ScrapeResponse } from "@/types";

export const scrapeHtml = async (
  payload: ScrapeRequest
): Promise<ScrapeResponse> => {
  const { data } = await client.post<ScrapeResponse>("/api/scrape", payload);
  return data;
};