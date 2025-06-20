// Ministry tag mapping configuration
export const MINISTRY_TAGS = {
    'kemahasiswaan': ['kemahasiswaan', 'advokasi', 'kesejahteraan', 'kreasi', 'potensi', 'mahasiswa'],
    'sosial_masyarakat': ['sosma', 'sosial', 'masyarakat', 'pengabdian', 'community', 'sosial_masyarakat', 'lingkungan'],
    'relasi_jejaring': ['relasi', 'jejaring', 'hubungan', 'jaringan', 'kolaborasi', 'kerjasama', 'partnership'],
    'posdm': ['posdm', 'pengembangan', 'organisasi', 'sdm', 'kaderisasi', 'pelatihan', 'manajemen'],
    'pengetahuan_pergerakan': ['pengetahuan', 'pergerakan', 'gender', 'kajian', 'strategis', 'aksi', 'kreatif', 'propaganda'],
    'media_komunikasi': ['media', 'komunikasi', 'branding', 'desain', 'kreatif', 'publikasi', 'humas'],
    'manajemen_kabinet': ['manajemen', 'kabinet', 'sekretaris', 'keuangan', 'ekonomi_kreatif', 'administrasi']
};

export const MINISTRY_DISPLAY_NAMES = {
    'kemahasiswaan': 'Kemahasiswaan',
    'sosial_masyarakat': 'Sosial Masyarakat',
    'relasi_jejaring': 'Relasi dan Jejaring',
    'posdm': 'POSDM',
    'pengetahuan_pergerakan': 'Pengetahuan dan Pergerakan',
    'media_komunikasi': 'Media dan Komunikasi',
    'manajemen_kabinet': 'Manajemen Kabinet'
};

/**
 * Check if an article matches a ministry tag
 * @param {Object} article - Article object with tags array
 * @param {string} ministryKey - Ministry key from MINISTRY_TAGS
 * @returns {boolean} - Whether article matches the ministry
 */
export const isArticleMatchingMinistry = (article, ministryKey) => {
    if (!ministryKey || !article.tags) return false;
    
    const ministryTagList = MINISTRY_TAGS[ministryKey.toLowerCase()];
    if (!ministryTagList) return false;
    
    return article.tags.some(articleTag => 
        ministryTagList.some(ministryTag => 
            articleTag.toLowerCase().includes(ministryTag.toLowerCase())
        )
    );
};

/**
 * Get display name for ministry
 * @param {string} ministryKey - Ministry key
 * @returns {string} - Display name
 */
export const getMinistryDisplayName = (ministryKey) => {
    return MINISTRY_DISPLAY_NAMES[ministryKey.toLowerCase()] || ministryKey;
};

/**
 * Get articles filtered by ministry tags
 * @param {Array} articles - Array of articles
 * @param {string} ministryKey - Ministry key to filter by
 * @returns {Array} - Filtered articles
 */
export const getArticlesByMinistry = (articles, ministryKey) => {
    return articles.filter(article => 
        article.status === 'published' && 
        isArticleMatchingMinistry(article, ministryKey)
    );
};
    