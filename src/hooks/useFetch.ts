import useSWR from 'swr';
import axios from '../services/api';

export default function useFetch(url: string) {
  const { data, error, mutate } = useSWR(url, async url => {
    const response = await axios.get(url);
    return response.data;
  });

  return { data, error, mutate };
}