<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class RenameDoubleProducts extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {

        $this->renameProducts();

        Schema::table('products', function (Blueprint $table) {
            $table->string('code')->unique()->change();
            $table->string('name')->unique()->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
    }

    public function renameProducts(){
        $products = \App\Eco\Product\Product::withoutGlobalScopes()->get();

        foreach ($products as $product){
            if(\App\Eco\Product\Product::withoutGlobalScopes()->where('name', $product->name)->count() > 1){
                $productsFound = \App\Eco\Product\Product::withoutGlobalScopes()->where('name', $product->name)->get();
                $i = 0;
                foreach ($productsFound as $productFound){
                    if($i > 0){
                        $productFound->name = $productFound->name . $i;
                        $productFound->save();
                    }
                    $i++;
                }
                $this->renameProducts();
            }
            if(\App\Eco\Product\Product::withoutGlobalScopes()->where('code', $product->code)->count() > 1){
                $productsFound = \App\Eco\Product\Product::withoutGlobalScopes()->where('code', $product->code)->get();
                $i = 0;
                foreach ($productsFound as $productFound){
                    if($i > 0){
                        $productFound->code = $productFound->code . $i;
                        $productFound->save();
                    }
                    $i++;
                }
                $this->renameProducts();
            }
        }
    }
}
