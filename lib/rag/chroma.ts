import { ChromaClient } from "chromadb";

const client = new ChromaClient();

let collectionPromise: ReturnType<typeof client.getOrCreateCollection> | null =
  null;

export async function getCollection() {
  if (!collectionPromise) {
    collectionPromise = client.getOrCreateCollection({
      name: "ohara-archive",
    });
  }

  return collectionPromise;
}
