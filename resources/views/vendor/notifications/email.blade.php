@component('mail::message')
{{-- Greeting --}}
@if (! empty($greeting))
# {{ $greeting }}
@else
@if ($level == 'error')
# Oeps!
@else
# Hallo!
@endif
@endif

{{-- Intro Lines --}}
@foreach ($introLines as $line)
{!! $line !!}

@endforeach

{{-- Action Button --}}
@isset($actionText)
<?php
    switch ($level) {
        case 'success':
            $color = 'green';
            break;
        case 'error':
            $color = 'red';
            break;
        default:
            $color = 'blue';
    }
?>
@component('mail::button', ['url' => $actionUrl, 'color' => $color])
{{ $actionText }}
@endcomponent
@endisset

{{-- Outro Lines --}}
@foreach ($outroLines as $line)
{!! $line !!}

@endforeach

{{-- Salutation --}}
@if (! empty($salutation))
{{ $salutation }}
@else
Hartelijke groet,<br><br> Het Econobis team
@endif

{{-- Subcopy --}}
@isset($actionText)
@component('mail::subcopy')
    Als de applicatie na het klikken op de "{{ $actionText }}" knop niet opent, kopieer en plak dan deze link in je webbrowser:: [{{ $actionUrl }}]({{ $actionUrl }})
@endcomponent
@endisset
@endcomponent
