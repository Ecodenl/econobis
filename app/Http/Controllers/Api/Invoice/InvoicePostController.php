<?php

namespace App\Http\Controllers\Api\Invoice;

use App\Eco\Invoice\InvoicePost;
use App\Http\Controllers\Controller;
use App\Http\RequestQueries\InvoicePost\Grid\RequestQuery;
use App\Http\Resources\InvoicePost\GridInvoicePost;
use Illuminate\Support\Facades\Storage;
use JosKolenberg\LaravelJory\Facades\Jory;

class InvoicePostController extends Controller
{

    public function jory()
    {
        return Jory::on(InvoicePost::class);
    }

    public function grid(RequestQuery $requestQuery)
    {
        $invoicePosts = $requestQuery->get();

        $invoicePosts->load(['administration']);

        return GridInvoicePost::collection($invoicePosts)
            ->additional([
                'meta' => [
                    'total' => $requestQuery->total(),
                ]
            ]);
    }

    public function downloadInvoicePost(InvoicePost $invoicePost){
        $filePath = Storage::disk('administrations')->path($invoicePost->filename);
        header('X-Filename:' . $invoicePost->name);
        header('Access-Control-Expose-Headers: X-Filename');
        return response()->download($filePath, $invoicePost->name, ['Content-Type: application/xml']);
    }

//    public function deleteInvoicePost(InvoicePost $invoicePost){
//        //soft delete (invoicePost kent nog geen softDelete / veld deleted_at
//        $invoicePost->delete();
//    }

}