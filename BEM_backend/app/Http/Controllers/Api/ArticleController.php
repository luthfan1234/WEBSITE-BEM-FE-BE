<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;
use Exception;

class ArticleController extends Controller
{
    private string $dataFile = 'articles.json';

    public function __construct()
    {
        try {
            Log::info('ArticleController initialized');
            $this->ensureStorageExists();
            $this->initializeData();
        } catch (Exception $e) {
            Log::error('Error in ArticleController constructor: ' . $e->getMessage());
        }
    }

    private function ensureStorageExists(): void
    {
        try {
            $storagePath = storage_path('app');
            if (!file_exists($storagePath)) {
                mkdir($storagePath, 0755, true);
                Log::info('Created storage directory: ' . $storagePath);
            }
        } catch (Exception $e) {
            Log::error('Error ensuring storage exists: ' . $e->getMessage());
            throw $e;
        }
    }

    private function initializeData(): void
    {
        try {
            $filePath = storage_path('app/' . $this->dataFile);

            if (!file_exists($filePath)) {
                Log::info('Initializing default articles data');

                $defaultData = [
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
                        'content' => 'BEM SV UNS mengadakan kegiatan bakti sosial di Panti Asuhan Harapan Mulia.',
                        'tags' => ['Sosial', 'Bakti Sosial'],
                        'created_at' => now()->toISOString(),
                        'updated_at' => now()->toISOString()
                    ]
                ];

                $success = file_put_contents($filePath, json_encode($defaultData, JSON_PRETTY_PRINT));

                if ($success === false) {
                    throw new Exception('Failed to write default data to file');
                }

                Log::info('Default articles data created successfully');
            } else {
                Log::info('Articles data file already exists');
            }
        } catch (Exception $e) {
            Log::error('Error initializing articles data: ' . $e->getMessage());
            throw $e;
        }
    }

    private function readData(): array
    {
        try {
            $filePath = storage_path('app/' . $this->dataFile);

            if (!file_exists($filePath)) {
                Log::warning('Articles file does not exist: ' . $filePath);
                return [];
            }

            $data = file_get_contents($filePath);

            if ($data === false) {
                Log::error('Failed to read articles file');
                return [];
            }

            $decoded = json_decode($data, true);

            if (json_last_error() !== JSON_ERROR_NONE) {
                Log::error('JSON decode error: ' . json_last_error_msg());
                return [];
            }

            Log::info('Successfully read ' . count($decoded) . ' articles');
            return $decoded ?? [];

        } catch (Exception $e) {
            Log::error('Error reading articles data: ' . $e->getMessage());
            return [];
        }
    }

    private function writeData(array $data): bool
    {
        try {
            $success = Storage::disk('local')->put($this->dataFile, json_encode($data, JSON_PRETTY_PRINT));
            if ($success) {
                Log::info('Articles data written successfully');
            }
            return $success;
        } catch (Exception $e) {
            Log::error('Error writing articles data: ' . $e->getMessage());
            return false;
        }
    }

    public function index(): JsonResponse
    {
        try {
            Log::info('ArticleController@index called');

            $articles = $this->readData();

            Log::info('Articles retrieved successfully', ['count' => count($articles)]);

            return response()->json([
                'success' => true,
                'articles' => $articles,
                'total' => count($articles),
                'message' => 'Articles retrieved successfully'
            ], 200, [
                'Content-Type' => 'application/json',
                'Access-Control-Allow-Origin' => '*',
                'Access-Control-Allow-Methods' => 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers' => 'Content-Type, Authorization, X-Requested-With, Accept, Origin',
            ]);

        } catch (Exception $e) {
            Log::error('Error in ArticleController@index: ' . $e->getMessage());
            Log::error('Stack trace: ' . $e->getTraceAsString());

            return response()->json([
                'success' => false,
                'message' => 'Internal server error',
                'error' => $e->getMessage(),
                'articles' => []
            ], 500, [
                'Content-Type' => 'application/json',
                'Access-Control-Allow-Origin' => '*',
            ]);
        }
    }

    public function show(string $id): JsonResponse
    {
        try {
            $articles = $this->readData();
            $article = collect($articles)->firstWhere('id', (int)$id);

            if (!$article) {
                return response()->json([
                    'success' => false,
                    'message' => 'Article not found'
                ], 404);
            }

            // Add navigation articles (prev/next)
            $publishedArticles = collect($articles)->where('status', 'published')->values();
            $currentIndex = $publishedArticles->search(function ($item) use ($id) {
                return $item['id'] == $id;
            });

            $prevArticle = null;
            $nextArticle = null;

            if ($currentIndex !== false) {
                if ($currentIndex > 0) {
                    $prev = $publishedArticles[$currentIndex - 1];
                    $prevArticle = [
                        'id' => $prev['id'],
                        'title' => $prev['title'],
                        'image' => $prev['image']
                    ];
                }

                if ($currentIndex < count($publishedArticles) - 1) {
                    $next = $publishedArticles[$currentIndex + 1];
                    $nextArticle = [
                        'id' => $next['id'],
                        'title' => $next['title'],
                        'image' => $next['image']
                    ];
                }
            }

            $article['prevArticle'] = $prevArticle;
            $article['nextArticle'] = $nextArticle;

            return response()->json([
                'success' => true,
                'article' => $article
            ]);
        } catch (Exception $e) {
            Log::error('Error fetching article: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch article',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function store(Request $request): JsonResponse
    {
        try {
            $articles = $this->readData();
            $maxId = collect($articles)->max('id') ?? 0;

            $newArticle = array_merge($request->all(), [
                'id' => $maxId + 1,
                'author' => $request->input('author', 'Admin BEM SV UNS'),
                'date' => now()->format('d M Y'),
                'created_at' => now()->toISOString(),
                'updated_at' => now()->toISOString()
            ]);

            array_unshift($articles, $newArticle);

            if ($this->writeData($articles)) {
                return response()->json([
                    'success' => true,
                    'message' => 'Article created successfully',
                    'article' => $newArticle
                ], 201);
            }

            throw new Exception('Failed to save article to storage');
        } catch (Exception $e) {
            Log::error('Error creating article: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Failed to create article',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function update(Request $request, string $id): JsonResponse
    {
        try {
            $articles = $this->readData();
            $index = collect($articles)->search(function ($article) use ($id) {
                return $article['id'] == $id;
            });

            if ($index === false) {
                return response()->json([
                    'success' => false,
                    'message' => 'Article not found'
                ], 404);
            }

            $articles[$index] = array_merge($articles[$index], $request->all(), [
                'updated_at' => now()->toISOString()
            ]);

            if ($this->writeData($articles)) {
                return response()->json([
                    'success' => true,
                    'message' => 'Article updated successfully',
                    'article' => $articles[$index]
                ]);
            }

            throw new Exception('Failed to save article to storage');
        } catch (Exception $e) {
            Log::error('Error updating article: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Failed to update article',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function destroy(string $id): JsonResponse
    {
        try {
            $articles = $this->readData();
            $index = collect($articles)->search(function ($article) use ($id) {
                return $article['id'] == $id;
            });

            if ($index === false) {
                return response()->json([
                    'success' => false,
                    'message' => 'Article not found'
                ], 404);
            }

            $deletedArticle = $articles[$index];
            array_splice($articles, $index, 1);

            if ($this->writeData($articles)) {
                return response()->json([
                    'success' => true,
                    'message' => 'Article deleted successfully',
                    'deletedArticle' => $deletedArticle
                ]);
            }

            throw new Exception('Failed to save changes to storage');
        } catch (Exception $e) {
            Log::error('Error deleting article: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Failed to delete article',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function dashboardStats(): JsonResponse
    {
        try {
            $articles = $this->readData();
            $published = collect($articles)->where('status', 'published')->count();
            $draft = collect($articles)->where('status', 'draft')->count();

            return response()->json([
                'success' => true,
                'totalArticles' => count($articles),
                'publishedArticles' => $published,
                'draftArticles' => $draft,
                'totalDepartments' => 8,
                'totalUsers' => 5,
                'recentActivity' => [
                    [
                        'type' => 'info',
                        'message' => 'Total ' . count($articles) . ' articles in database',
                        'time' => 'Real-time',
                        'icon' => 'fas fa-newspaper',
                        'color' => 'text-primary'
                    ],
                    [
                        'type' => 'success',
                        'message' => $published . ' articles published',
                        'time' => 'Real-time',
                        'icon' => 'fas fa-check-circle',
                        'color' => 'text-success'
                    ],
                    [
                        'type' => 'warning',
                        'message' => $draft . ' articles in draft',
                        'time' => 'Real-time',
                        'icon' => 'fas fa-edit',
                        'color' => 'text-warning'
                    ]
                ]
            ]);
        } catch (Exception $e) {
            Log::error('Error fetching dashboard stats: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch dashboard stats',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
