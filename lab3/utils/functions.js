// 1. Сумма квадратов лайков
export function sumOfArtLikes(illustrations) {
    let sum = 0;
    for (let i = 0; i < illustrations.length; i++) {
      const likes = illustrations[i].likes || 0;
      sum += likes * likes;
    }
    return sum;
  }
  
  // 2. Сравнение объектов
  export function isEqualArtObj(obj1, obj2) {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    if (keys1.length !== keys2.length) return false;
  
    for (let key of keys1) {
      if (obj1[key] !== obj2[key]) return false;
    }
    return true;
  }
  
  // 3. Сравнение любых значений
  export function isEqualArtValue(a, b) {
    if (Array.isArray(a) && Array.isArray(b)) {
      if (a.length !== b.length) return false;
      for (let i = 0; i < a.length; i++) {
        if (!isEqualArtValue(a[i], b[i])) return false;
      }
      return true;
    }
  
    if (typeof a === "object" && typeof b === "object" && a && b) {
      return isEqualArtObj(a, b);
    }
  
    return a === b;
  }
  
  // 4. Палиндром (цикл)
  export function isPalindromArt(value) {
    const str = value.toString().toLowerCase().replace(/[^a-zа-я0-9]/gi, "");
    for (let i = 0; i < str.length / 2; i++) {
      if (str[i] !== str[str.length - 1 - i]) return false;
    }
    return true;
  }
  
  // 4. Палиндром (цикл с постусловием)
  export function isPalindromArtDoWhile(value) {
    const str = value.toString().toLowerCase().replace(/[^a-zа-я0-9]/gi, "");
  
    const uniqueChars = new Set(str);
  
    if (uniqueChars.size > str.length / 2 + 1) {
      return false;
    }
  
    let i = 0;
    let j = str.length - 1;
    let mismatchFound = false;
  
    do {
      if (str[i] !== str[j]) {
        mismatchFound = true;
      }
      i++;
      j--;
    } while (i < j && !mismatchFound);
  
    return !mismatchFound;
  }