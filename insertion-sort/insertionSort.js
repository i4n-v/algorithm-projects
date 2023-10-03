function insertionSort(array) {
  // Itera sobre cada elemento do conjunto não ordenado
  for (let index = 1; index < array.length; index++) {
    let currentElement = array[index];
    let lastIndex = index - 1;

    //Itera sobre cada elemento no conjunto ordenado
    while (lastIndex >= 0 && array[lastIndex] > currentElement) {
      array[lastIndex + 1] = array[lastIndex];
      lastIndex--;
    }

    //Insere o elemento na posição correta dentro do conjunto ordenado
    array[lastIndex + 1] = currentElement;
  }

  //Retorna o conjunto final completamente ordenado
  return array;
};

const unorded = [10, 7, 3, 13, 2];
const orded = insertionSort(unorded);

console.log("Orded list:", orded);