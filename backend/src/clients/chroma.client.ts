import { ChromaClient, Collection } from 'chromadb';

let chroma;
const collectionName = 'dj-ai-memory';

let VectorCollection: Collection;

const runChromaClient = async () => {

    chroma = new ChromaClient();
    VectorCollection = await chroma.getOrCreateCollection({ name: collectionName });
  
  }

const getVectorCollection = async () => VectorCollection;

export { 
  runChromaClient, 
  getVectorCollection
};