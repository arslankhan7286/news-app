<?php

namespace App\Http\Controllers;

use GuzzleHttp\Client;
use Illuminate\Http\Request;

class BBCController extends Controller
{
    private $apiKey;
    private $client;

    public function __construct()
    {
        $this->apiKey = config('services.newsapi.key');
        $this->client = new Client([
            'base_uri' => 'https://newsapi.org/v2/',
        ]);
    }

    public function index()
    {
        $response = $this->client->request('GET', 'top-headlines', [
            'query' => [
                'apiKey' => $this->apiKey,
                'sources' => 'bbc-news'
            ],
        ]);

        $articles = json_decode($response->getBody()->getContents())->articles;

        return response()->json($articles);
    }
}
