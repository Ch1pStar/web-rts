/** @namespace util */


let nextUid = 0;
/**
 * Gets the next unique id.
 *
 * @memberof util
 * @return {number} The nexst unique id.
 */
export function uid(){
  return nextUid++;
}

/**
 * Fast replacement for splice that quickly removes elements from an array.
 *
 * @memberof util
 * @param {Array<*>} array - The array to manipulate.
 * @param {number} startIdx - The starting index.
 * @param {number} removeCount - The number of elements to remove.
 */
export function removeElements(array, startIdx = 0, removeCount = 1){
  const length = array.length;

  removeCount = startIdx + removeCount > length ? (length - startIdx) : removeCount;
  const newLength = length - removeCount;

  for (let i = startIdx; i < newLength; ++i){
    array[i] = array[i + removeCount];
  }

  array.length = newLength;
}