<?php

namespace App\Http\Controllers;

use GuzzleHttp\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class NewsController extends Controller
{
    private $apiKey;
    private $client;

    public function index()
    {
        $newsapi = $this->newsapi();
        $nytimes = $this->nytimes();
        $bbc = $this->bbc();

        $final_Data = [
            'newsapi' => $newsapi,
            'nytimes' => $nytimes,
            'bbc' => $bbc,
        ];

        return response()->json($final_Data);
    }

    public function newsapi()
    {

        $this->apiKey = config('services.newsapi.key');
        $this->client = new Client([
            'base_uri' => 'https://newsapi.org/v2/',
        ]);

        $response = $this->client->request('GET', 'top-headlines', [
            'query' => [
                'apiKey' => $this->apiKey,
                'country' => 'us',
            ],
        ]);

        $articles = json_decode($response->getBody()->getContents())->articles;

        return $articles;
    }

    public function nytimes()
    {
        $this->apiKey = config('services.nytimes.key');
        $this->client = new Client([
            'base_uri' => 'https://api.nytimes.com/svc/topstories/v2/',
        ]);

        $response = $this->client->request('GET', 'home.json', [
            'query' => [
                'api-key' => $this->apiKey,
            ],
        ]);

        $articles = json_decode($response->getBody()->getContents())->results;

        return $articles;
    }

    public function bbc()
    {
        $this->apiKey = config('services.newsapi.key');
        $this->client = new Client([
            'base_uri' => 'https://newsapi.org/v2/',
        ]);

        $response = $this->client->request('GET', 'top-headlines', [
            'query' => [
                'apiKey' => $this->apiKey,
                'sources' => 'bbc-news'
            ],
        ]);

        $articles = json_decode($response->getBody()->getContents())->articles;

        return $articles;
    }

}
