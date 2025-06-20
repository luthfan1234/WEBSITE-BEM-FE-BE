<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Health check route
Route::get('/health', function () {
    return response()->json([
        'status' => 'OK',
        'message' => 'BEM SV UNS Laravel 11 Backend is running',
        'timestamp' => now()->toISOString(),
        'version' => '1.0.0'
    ]);
});

// Function to get articles from storage
function getArticlesData() {
    $filePath = storage_path('app/articles.json');

    if (!file_exists($filePath)) {
        // Default articles if file doesn't exist
        $defaultArticles = [
            [
                'id' => 1,
                'title' => 'Pelatihan Kepemimpinan Mahasiswa Tingkat Dasar 2024',
                'category' => 'Kaderisasi',
                'author' => 'Humas BEM SV UNS',
                'date' => '15 MAR 2024',
                'status' => 'published',
                'excerpt' => 'BEM SV UNS mengadakan pelatihan kepemimpinan untuk mahasiswa baru angkatan 2024',
                'image' => 'https://via.placeholder.com/400x250/21E786/ffffff?text=PKMD+2024',
                'content' => 'Badan Eksekutif Mahasiswa Sekolah Vokasi UNS (BEM SV UNS) telah sukses menyelenggarakan kegiatan Pelatihan Kepemimpinan Mahasiswa Tingkat Dasar (PKMD) 2024.',
                'tags' => ['Kaderisasi', 'Kepemimpinan', 'Mahasiswa'],
                'created_at' => now()->toISOString(),
                'updated_at' => now()->toISOString()
            ],
            [
                'id' => 2,
                'title' => 'Bakti Sosial di Panti Asuhan Harapan Mulia',
                'category' => 'Sosial',
                'author' => 'Humas BEM SV UNS',
                'date' => '20 FEB 2024',
                'status' => 'published',
                'excerpt' => 'Kegiatan bakti sosial sebagai wujud kepedulian mahasiswa terhadap masyarakat sekitar',
                'image' => 'https://via.placeholder.com/400x250/28a745/ffffff?text=Bakti+Sosial',
                'content' => 'BEM SV UNS mengadakan kegiatan bakti sosial di Panti Asuhan Harapan Mulia sebagai wujud kepedulian mahasiswa terhadap masyarakat sekitar.',
                'tags' => ['Sosial', 'Bakti Sosial'],
                'created_at' => now()->toISOString(),
                'updated_at' => now()->toISOString()
            ]
        ];

        file_put_contents($filePath, json_encode($defaultArticles, JSON_PRETTY_PRINT));
        return $defaultArticles;
    }

    $content = file_get_contents($filePath);
    return json_decode($content, true) ?: [];
}

// Function to save articles to storage
function saveArticlesData($articles) {
    $filePath = storage_path('app/articles.json');
    return file_put_contents($filePath, json_encode($articles, JSON_PRETTY_PRINT));
}

// Get all articles
Route::get('/articles', function () {
    $articles = getArticlesData();

    return response()->json([
        'success' => true,
        'articles' => $articles,
        'total' => count($articles)
    ]);
});

// Get single article by ID
Route::get('/articles/{id}', function ($id) {
    $articles = getArticlesData();

    // Find article by ID
    $article = null;
    foreach ($articles as $item) {
        if ($item['id'] == $id) {
            $article = $item;
            break;
        }
    }

    if (!$article) {
        return response()->json([
            'success' => false,
            'message' => 'Article not found'
        ], 404);
    }

    // Add navigation for next/prev article
    $publishedArticles = array_filter($articles, function($item) {
        return $item['status'] === 'published';
    });

    // Sort by ID
    usort($publishedArticles, function($a, $b) {
        return $a['id'] - $b['id'];
    });

    // Find index in published articles
    $currentIndex = -1;
    foreach ($publishedArticles as $i => $item) {
        if ($item['id'] == $id) {
            $currentIndex = $i;
            break;
        }
    }

    // Add prev/next navigation
    if ($currentIndex !== -1) {
        if ($currentIndex > 0) {
            $article['prevArticle'] = [
                'id' => $publishedArticles[$currentIndex - 1]['id'],
                'title' => $publishedArticles[$currentIndex - 1]['title'],
                'image' => $publishedArticles[$currentIndex - 1]['image']
            ];
        } else {
            $article['prevArticle'] = null;
        }

        if ($currentIndex < count($publishedArticles) - 1) {
            $article['nextArticle'] = [
                'id' => $publishedArticles[$currentIndex + 1]['id'],
                'title' => $publishedArticles[$currentIndex + 1]['title'],
                'image' => $publishedArticles[$currentIndex + 1]['image']
            ];
        } else {
            $article['nextArticle'] = null;
        }
    }

    return response()->json([
        'success' => true,
        'article' => $article
    ]);
});

// Create new article
Route::post('/articles', function (Request $request) {
    $articles = getArticlesData();

    // Generate new ID
    $newId = 1;
    if (!empty($articles)) {
        $ids = array_column($articles, 'id');
        $newId = max($ids) + 1;
    }

    // Create new article
    $articleData = $request->all();
    $newArticle = [
        'id' => $newId,
        'title' => $articleData['title'] ?? 'Untitled Article',
        'category' => $articleData['category'] ?? 'Uncategorized',
        'author' => $articleData['author'] ?? 'Humas BEM SV UNS',
        'date' => $articleData['date'] ?? now()->format('d M Y'),
        'status' => $articleData['status'] ?? 'draft',
        'excerpt' => $articleData['excerpt'] ?? '',
        'image' => $articleData['image'] ?? 'https://via.placeholder.com/400x250/f0f0f0/666666?text=No+Image',
        'content' => $articleData['content'] ?? '',
        'tags' => $articleData['tags'] ?? [],
        'created_at' => now()->toISOString(),
        'updated_at' => now()->toISOString()
    ];

    // Add to articles array
    array_unshift($articles, $newArticle);

    // Save to file
    saveArticlesData($articles);

    return response()->json([
        'success' => true,
        'message' => 'Article created successfully',
        'article' => $newArticle
    ], 201);
});

// Update article
Route::put('/articles/{id}', function (Request $request, $id) {
    $articles = getArticlesData();

    // Find article index
    $index = -1;
    foreach ($articles as $i => $article) {
        if ($article['id'] == $id) {
            $index = $i;
            break;
        }
    }

    if ($index === -1) {
        return response()->json([
            'success' => false,
            'message' => 'Article not found'
        ], 404);
    }

    // Update article
    $articleData = $request->all();
    $updatedArticle = array_merge($articles[$index], [
        'title' => $articleData['title'] ?? $articles[$index]['title'],
        'category' => $articleData['category'] ?? $articles[$index]['category'],
        'author' => $articleData['author'] ?? $articles[$index]['author'],
        'date' => $articleData['date'] ?? $articles[$index]['date'],
        'status' => $articleData['status'] ?? $articles[$index]['status'],
        'excerpt' => $articleData['excerpt'] ?? $articles[$index]['excerpt'],
        'image' => $articleData['image'] ?? $articles[$index]['image'],
        'content' => $articleData['content'] ?? $articles[$index]['content'],
        'tags' => $articleData['tags'] ?? $articles[$index]['tags'],
        'updated_at' => now()->toISOString()
    ]);

    $articles[$index] = $updatedArticle;

    // Save to file
    saveArticlesData($articles);

    return response()->json([
        'success' => true,
        'message' => 'Article updated successfully',
        'article' => $updatedArticle
    ]);
});

// Delete article
Route::delete('/articles/{id}', function ($id) {
    $articles = getArticlesData();

    // Find article index
    $index = -1;
    foreach ($articles as $i => $article) {
        if ($article['id'] == $id) {
            $index = $i;
            break;
        }
    }

    if ($index === -1) {
        return response()->json([
            'success' => false,
            'message' => 'Article not found'
        ], 404);
    }

    // Remove article
    $deletedArticle = $articles[$index];
    array_splice($articles, $index, 1);

    // Save to file
    saveArticlesData($articles);

    return response()->json([
        'success' => true,
        'message' => 'Article deleted successfully',
        'deletedArticle' => $deletedArticle
    ]);
});

// Dashboard stats route
Route::get('/dashboard/stats', function () {
    $articles = getArticlesData(); // Reusing the function from above

    $publishedArticles = array_filter($articles, function($article) {
        return $article['status'] === 'published';
    });

    $draftArticles = array_filter($articles, function($article) {
        return $article['status'] === 'draft';
    });

    // Generate recent activity
    $recentActivity = [];

    // Sort articles by updated_at
    usort($articles, function($a, $b) {
        $dateA = isset($a['updated_at']) ? strtotime($a['updated_at']) : 0;
        $dateB = isset($b['updated_at']) ? strtotime($b['updated_at']) : 0;
        return $dateB - $dateA; // Descending order
    });

    // Add recent article activities
    foreach (array_slice($articles, 0, 3) as $article) {
        $action = isset($article['created_at']) && isset($article['updated_at']) &&
                  $article['created_at'] === $article['updated_at'] ? 'created' : 'updated';

        $time = isset($article['updated_at'])
            ? \Carbon\Carbon::parse($article['updated_at'])->diffForHumans()
            : 'recently';

        $recentActivity[] = [
            'type' => 'article',
            'message' => 'Article "' . $article['title'] . '" was ' . $action,
            'time' => $time,
            'icon' => $action === 'created' ? 'fas fa-plus-circle' : 'fas fa-edit',
            'color' => $action === 'created' ? 'text-success' : 'text-primary'
        ];
    }

    // Add system activity
    $recentActivity[] = [
        'type' => 'system',
        'message' => 'Dashboard was accessed',
        'time' => 'Just now',
        'icon' => 'fas fa-tachometer-alt',
        'color' => 'text-info'
    ];

    return response()->json([
        'success' => true,
        'totalArticles' => count($articles),
        'publishedArticles' => count($publishedArticles),
        'draftArticles' => count($draftArticles),
        'totalDepartments' => 8,
        'totalUsers' => 5,
        'recentActivity' => $recentActivity
    ]);
});
