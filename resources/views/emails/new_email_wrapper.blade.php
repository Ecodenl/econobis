<?php
/**
 * @var string $content
 * @var \App\Eco\Cooperation\Cooperation $cooperation
 */
$cooperation = \App\Eco\Cooperation\Cooperation::first();
$fontFamily = $cooperation ? $cooperation->getFontFamilyDefault() : 'Times';
$fontSize = $cooperation ? $cooperation->getFontSizeDefault() : 16;
$fontColor = $cooperation ? $cooperation->getFontColorDefault() : '#000000';
?>

<div style="font-family: {{ $fontFamily }}; font-size: {{ $fontSize }}px; color: {{ $fontColor }}">
    {{ $content ?? '' }}
</div>