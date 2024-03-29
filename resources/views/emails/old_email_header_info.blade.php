<p></p>
<hr>
<p>
    <strong>Van: </strong>{{ $email->from }}<br />
    <strong>Verzonden: </strong>{{ \Carbon\Carbon::parse($email->date_sent)->isoFormat('dddd D MMMM YYYY HH:mm') }}<br />
    <strong>Aan: </strong>{{ implode("; ", $email->to) }}<br />
    @if($email->cc)
        <strong>Cc: </strong>{{ implode("; ", $email->cc) }}<br />
    @endif
    <strong>Onderwerp: </strong>{{ $email->subject }}<br />
</p>