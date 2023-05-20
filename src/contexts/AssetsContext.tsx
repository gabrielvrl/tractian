import { IAssets } from '@/interfaces';
import { api } from '@/pages/api';
import { createContext, useEffect, useState } from 'react';

const [assets, setAssets] = useState<IAssets[]>([]);

useEffect(() => {
  const getAssets = async () => {
    const { data } = await api.get('/assets')
    setAssets(data)
  }

  getAssets();
}, [])

export const AssetsContext = createContext({
  assets
});