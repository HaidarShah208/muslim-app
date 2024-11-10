import React, {createContext, useState, useContext} from 'react';

const DownloadContext = createContext();

export const DownloadProvider = ({children}) => {
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);

  return (
    <DownloadContext.Provider
      value={{
        downloadProgress,
        setDownloadProgress,
        isDownloading,
        setIsDownloading,
      }}>
      {children}
    </DownloadContext.Provider>
  );
};

export const useDownload = () => useContext(DownloadContext);
