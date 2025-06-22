// const embed = async (text: string): Promise<number[]> => {
//   const response = await fetch('http://localhost:11434/api/embeddings', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ model: 'llama3', prompt: text })
//   });

//   const data = await response.json();

//   console.log('Embedding response:', data);

//   if (!data.embedding || !Array.isArray(data.embedding)) {
//     throw new Error('❌ Embedding failed or malformed');
//   }

//   return data.embedding;
// }

// export default embed;