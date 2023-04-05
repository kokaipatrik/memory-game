import { ref } from 'vue';
import type { Ref } from 'vue';

import type { Images } from '@/types/images.types';

export default function useImages() {
  const loading: Ref<boolean> = ref(true);
  const error: Ref<string> = ref('');
  const result: Ref<Array<Images>> = ref([]);

  const fetchImages = async (limit: number): Promise<void> => {
    try {
      await fetch(`${import.meta.env.VITE_API}/images/search?limit=${limit}`)
        .then(images => images.json())
        .then(images => result.value = images);
    } catch (e) {
      error.value = 'An error occured while fetched images.';
      throw new Error(`An error occured while fetched images. ${e}`);
    } finally {
      loading.value = false;
    }
  }

  return {
    loading,
    fetchImages,
    result,
    error,
  };
};
