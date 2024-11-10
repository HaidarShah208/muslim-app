const getSurahByNumber = (quranData, surahNumber) => {
  return quranData.find(surah => surah.number === surahNumber);
};

const getAyahsByJuz = (quranData, juzNumber) => {
  return quranData.flatMap(surah =>
    surah.ayahs.filter(ayah => ayah.juz === juzNumber),
  );
};

const getAyahsByRuku = (quranData, rukuNumber) => {
  return quranData.flatMap(surah =>
    surah.ayahs.filter(ayah => ayah.ruku === rukuNumber),
  );
};

const getAyahsByManzil = (quranData, manzilNumber) => {
  return quranData.flatMap(surah =>
    surah.ayahs.filter(ayah => ayah.manzil === manzilNumber),
  );
};

const getAyahsByPage = (quranData, pageNumber) => {
  return quranData.flatMap(surah =>
    surah.ayahs.filter(ayah => ayah.page === pageNumber),
  );
};

const getAyahsByHizbQuarter = (quranData, hizbQuarterNumber) => {
  return quranData.flatMap(surah =>
    surah.ayahs.filter(ayah => ayah.hizbQuarter === hizbQuarterNumber),
  );
};
