import {View, Text} from 'react-native';
import React, {useState, useEffect} from 'react';

const useHadithScreen = ({data, chapter,No}) => {
  const [chapterData, setChapterData] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearch, setIsSearch] = useState(false);
  const [filterData, setFilterData] = useState(null);

  
  useEffect(() => {
    const filterHadiths = () => {
      const filtered = data?.hadiths?.data?.filter(item => {
        return (
          item.chapter.chapterEnglish.toLowerCase() == chapter.toLowerCase()
        );
      });
      setChapterData(filtered);
    };
    if (searchQuery == '') {
      filterHadiths();
      setFilterData(null);
      No = 1;
    }
  }, [searchQuery]);
  const handleSearch = text => {
    setSearchQuery(text);
    SearchFilter(text);
  };
  const SearchFilter = text => {
    if (!chapterData || chapterData.length === 0) {
      return;
    }

    if (!text) {
      setChapterData(filtered); // Show all data if no search text is provided
      return;
    }

    const filtered = chapterData.filter(item => {
      if (item.hadithEnglish) {
        return item.hadithEnglish.toLowerCase().includes(text.toLowerCase());
      } else {
        return false;
      }
    });

    setFilterData(filtered); // Save the filtered data to state
  };

  return {
    chapterData,
    handleSearch,
    isSearch,
    setIsSearch,
    filterData,
  
  };
};

export default useHadithScreen;
