import { MeiliSearch } from "meilisearch";

export const client = new MeiliSearch({
  host: "http://localhost:7700",
});
