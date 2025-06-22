// import embed from "./embed.service";

// import { getVectorCollection } from "../../clients";

// const getMemory = async (userId: string, query: string): Promise<any[]> => {
//   const collection = await getVectorCollection();
//   const vector = await embed(query);
//   const result = await collection.query({
//     queryEmbeddings: [vector],
//     nResults: 5,
//     where: { userId }
//   });
//   return result.documents[0] || [];
// }

// export default getMemory;