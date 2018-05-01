<?php
/**
 * Created by PhpStorm.
 * User: Fren
 * Date: 20-10-2017
 * Time: 9:35
 */

namespace App\Http\Controllers\Api\Product;


use App\Eco\Product\PriceHistory;
use App\Eco\Product\Product;
use App\Helpers\Delete\DeleteHelper;
use App\Helpers\RequestInput\RequestInput;
use App\Http\Controllers\Api\ApiController;
use App\Http\RequestQueries\Product\Grid\RequestQuery;
use App\Http\Resources\GenericResource;
use App\Http\Resources\Product\ProductPeek;
use App\Http\Resources\Product\FullProduct;
use App\Http\Resources\Product\GridProduct;

class ProductController extends ApiController
{

    public function grid(RequestQuery $requestQuery)
    {
        $products = $requestQuery->get();

        $products->load(['price']);

        return GridProduct::collection($products)
            ->additional(['meta' => [
            'total' => $requestQuery->total(),
            ]
        ]);
    }

    public function show(Product $product)
    {
        $product->load([
            'price',
            'priceHistory',
            'createdBy',
        ]);

        return FullProduct::make($product);
    }

    public function store(RequestInput $input)
    {
        $this->authorize('manage', Product::class);

        $data = $input
            ->string('code')->validate('required')->next()
            ->string('name')->validate('required')->next()
            ->string('invoiceText')->whenMissing('')->onEmpty('')->alias('invoice_text')->next()
            ->string('durationId')->whenMissing(null)->onEmpty(null)->alias('duration_id')->next()
            ->string('invoiceFrequencyId')->whenMissing(null)->onEmpty(null)->alias('invoice_frequency_id')->next()
            ->string('paymentTypeId')->whenMissing(null)->onEmpty(null)->alias('payment_type_id')->next()
            ->get();

        $product = new Product($data);

        $product->save();

        return $this->show($product);
    }


    public function update(RequestInput $input, Product $product)
    {
        $this->authorize('manage', Product::class);

        $data = $input
            ->string('code')->validate('required')->next()
            ->string('name')->validate('required')->next()
            ->string('invoiceText')->whenMissing('')->onEmpty('')->alias('invoice_text')->next()
            ->string('durationId')->whenMissing(null)->onEmpty(null)->alias('duration_id')->next()
            ->string('invoiceFrequencyId')->whenMissing(null)->onEmpty(null)->alias('invoice_frequency_id')->next()
            ->string('paymentTypeId')->whenMissing(null)->onEmpty(null)->alias('payment_type_id')->next()
            ->get();

        $product = $product->fill($data);

        $product->save();

        return $this->show($product);
    }

    public function destroy(Product $product)
    {
        $this->authorize('manage', Product::class);

        DeleteHelper::delete($product);
    }

    public function storePriceHistory(RequestInput $input)
    {
        $this->authorize('manage', Product::class);

        $data = $input
            ->string('productId')->validate('required|exists:products,id')->next()
            ->string('date_start')->validate('required|date')->next()
            ->integer('price')->validate('required')->next()
            ->integer('vat_percentage')->validate('required')->next()
            ->get();

        $priceHistory = new PriceHistory($data);

        $priceHistory->save();

        return GenericResource::make($priceHistory);
    }

    public function peek()
    {
        return ProductPeek::collection(Product::orderBy('name')->whereNull('deleted_at')->get());
    }
}