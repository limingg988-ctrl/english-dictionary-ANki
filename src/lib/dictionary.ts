export interface DefinitionOption {
  id: string;
  definition: string;
  partOfSpeech?: string;
}

export async function fetchDictionaryEntries(word: string): Promise<unknown[]> {
  const response = await fetch(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`
  );
  if (!response.ok) throw new Error("Failed to fetch dictionary entries");
  return response.json();
}

export function extractDefinitionOptions(payload: unknown[]): DefinitionOption[] {
  const options: DefinitionOption[] = [];

  payload.forEach((entry: any, i) => {
    entry?.meanings?.forEach((meaning: any, j: number) => {
      meaning?.definitions?.forEach((d: any, k: number) => {
        if (typeof d?.definition === "string") {
          options.push({
            id: `${i}-${j}-${k}`,
            definition: d.definition,
            partOfSpeech: meaning.partOfSpeech
          });
        }
      });
    });
  });

  return options;
}
