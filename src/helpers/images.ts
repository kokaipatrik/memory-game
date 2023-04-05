import type { Images } from '@/types/images.types';

export const shuffle = (array: Array<Images>): Array<Images> => {
  for (let i = 0; i < array.length; i++) {
    let random = Math.floor((Math.random() * i + 1));
    let temp = array[i];

    array[i] = array[random];
    array[random] = temp;
  }

  return array;
};
