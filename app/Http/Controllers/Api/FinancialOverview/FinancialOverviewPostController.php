<?php

namespace App\Http\Controllers\Api\FinancialOverview;

use App\Eco\FinancialOverview\FinancialOverviewPost;
use App\Http\Controllers\Controller;
use App\Http\RequestQueries\FinancialOverviewPost\Grid\RequestQuery;
use App\Http\Resources\FinancialOverviewPost\GridFinancialOverviewPost;
use Illuminate\Support\Facades\Storage;
use JosKolenberg\LaravelJory\Facades\Jory;

class FinancialOverviewPostController extends Controller
{

    public function jory()
    {
        return Jory::on(FinancialOverviewPost::class);
    }

    public function grid(RequestQuery $requestQuery)
    {
        $financialOverviewPosts = $requestQuery->get();

        $financialOverviewPosts->load(['financialOverview']);

        return GridFinancialOverviewPost::collection($financialOverviewPosts)
            ->additional([
                'meta' => [
                    'total' => $requestQuery->total(),
                ]
            ]);
    }

    public function downloadFinancialOverviewPost(FinancialOverviewPost $financialOverviewPost){
        $filePath = Storage::disk('administrations')->path($financialOverviewPost->filename);
        header('X-Filename:' . $financialOverviewPost->name);
        header('Access-Control-Expose-Headers: X-Filename');
        return response()->download($filePath, $financialOverviewPost->name, ['Content-Type: application/xml']);
    }

//    public function deleteFinancialOverviewPost(FinancialOverviewPost $financialOverviewPost){
//        //soft delete (financialOverviewPost kent nog geen softDelete / veld deleted_at
//        $financialOverviewPost->delete();
//    }

}