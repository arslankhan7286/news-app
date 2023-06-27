<?php

namespace App\Http\Controllers;

use GuzzleHttp\Client;
use Illuminate\Http\Request;

class NYTimesController extends Controller
{
    private $apiKey;
    private $client;

    public function __construct()
    {
        $this->apiKey = config('services.nytimes.key');
        $this->client = new Client([
            'base_uri' => 'https://api.nytimes.com/svc/topstories/v2/',
        ]);
    }

    public function index()
    {
        $response = $this->client->request('GET', 'home.json', [
            'query' => [
                'api-key' => $this->apiKey,
            ],
        ]);

        $articles = json_decode($response->getBody()->getContents())->results;

        return response()->json($articles);
    }
}
