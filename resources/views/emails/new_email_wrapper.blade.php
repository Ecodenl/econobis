<?php
/**
 * @var string $content
 * @var \App\Eco\Cooperation\Cooperation $cooperation
 */
$cooperation = \App\Eco\Cooperation\Cooperation::first();
?>

<div style="font-family: {{ $cooperation->getFontFamilyDefault() }}; font-size: {{ $cooperation->getFontSizeDefault() }}px; color: {{ $cooperation->getFontColorDefault() }}">
    {{ $content ?? '' }}
</div>