<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\JsonResponse;

class ArticleController extends Controller
{
    private $dataFile = 'articles.json';

    public function __construct()
    {
        $this->initializeData();
    }

    private function initializeData()
    {
        if (!Storage::exists($this->dataFile)) {
            $defaultData = [
                [
                    'id' => 1,
                    'title' => 'Pelatihan Kepemimpinan Mahasiswa Tingkat Dasar 2024',
                    'category' => 'Kaderisasi',
                    'author' => 'Humas BEM SV UNS',
                    'date' => '15 MAR 2024',
                    'status' => 'published',
                    'excerpt' => 'BEM SV UNS mengadakan pelatihan kepemimpinan untuk mahasiswa baru angkatan 2024',
                    'image' => '/assets/images/blog/kegiatan-bem-1.jpg',
                    'content' => 'Badan Eksekutif Mahasiswa Sekolah Vokasi UNS (BEM SV UNS) telah sukses menyelenggarakan kegiatan Pelatihan Kepemimpinan Mahasiswa Tingkat Dasar (PKMD) 2024.',
                    'tags' => ['Kaderisasi', 'Kepemimpinan', 'Mahasiswa']
                ],
                [
                    'id' => 2,
                    'title' => 'Bakti Sosial di Panti Asuhan Harapan Mulia',
                    'category' => 'Sosial',
                    'author' => 'Humas BEM SV UNS',
                    'date' => '20 FEB 2024',
                    'status' => 'published',
                    'excerpt' => 'Kegiatan bakti sosial sebagai wujud kepedulian mahasiswa terhadap masyarakat sekitar',
                    'image' => '/assets/images/blog/kegiatan-bem-2.jpg',
                    'content' => 'BEM SV UNS mengadakan kegiatan bakti sosial di Panti Asuhan Harapan Mulia.',
                    'tags' => ['Sosial', 'Bakti Sosial']
                ]
            ];
            Storage::put($this->dataFile, json_encode($defaultData, JSON_PRETTY_PRINT));
        }
    }

    private function readData()
    {
        try {
            $data = Storage::get($this->dataFile);
            return json_decode($data, true) ?? [];
        } catch (\Exception $e) {
            return [];
        }
    }

    private function writeData($data)
    {
        try {
            Storage::put($this->dataFile, json_encode($data, JSON_PRETTY_PRINT));
            return true;
        } catch (\Exception $e) {
            return false;
        }
    }

    public function index()
    {
        $articles = $this->readData();
        return response()->json([
            'success' => true,
            'articles' => $articles,
            'total' => count($articles)
        ]);
    }

    public function show($id)
    {
        $articles = $this->readData();
        $article = collect($articles)->firstWhere('id', (int)$id);

        if (!$article) {
            return response()->json([
                'success' => false,
                'message' => 'Article not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'article' => $article
        ]);
    }

    public function store(Request $request)
    {
        $articles = $this->readData();
        $maxId = collect($articles)->max('id') ?? 0;

        $newArticle = array_merge($request->all(), [
            'id' => $maxId + 1,
            'author' => $request->input('author', 'Admin BEM SV UNS'),
            'date' => now()->format('d M Y')
        ]);

        array_unshift($articles, $newArticle);

        if ($this->writeData($articles)) {
            return response()->json([
                'success' => true,
                'message' => 'Article created successfully',
                'article' => $newArticle
            ], 201);
        }

        return response()->json([
            'success' => false,
            'message' => 'Failed to save article'
        ], 500);
    }

    public function update(Request $request, $id)
    {
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

        $articles[$index] = array_merge($articles[$index], $request->all());

        if ($this->writeData($articles)) {
            return response()->json([
                'success' => true,
                'message' => 'Article updated successfully',
                'article' => $articles[$index]
            ]);
        }

        return response()->json([
            'success' => false,
            'message' => 'Failed to save article'
        ], 500);
    }

    public function destroy($id)
    {
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

        array_splice($articles, $index, 1);

        if ($this->writeData($articles)) {
            return response()->json([
                'success' => true,
                'message' => 'Article deleted successfully'
            ]);
        }

        return response()->json([
            'success' => false,
            'message' => 'Failed to save changes'
        ], 500);
    }

    public function dashboardStats()
    {
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
                ]
            ]
        ]);
    }
}

