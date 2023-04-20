export const toCamelCase = (str: string | undefined) : string | undefined => {
  if (!str || typeof str === 'undefined') {
    return undefined;
  }
    // converter a string para minúsculas e remover espaços e caracteres especiais
    const cleanStr = str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
    
    // dividir a string em uma matriz de palavras
    const words = cleanStr.split(/(?:_| )+/);
    
    // converter a primeira letra de cada palavra em maiúscula e juntar as palavras novamente
    return words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('');
  };