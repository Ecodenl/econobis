<br><br>


<table>
    <thead>
    <tr>
        <th>ID</th>
        <th>Email</th>
        <th>Primair</th>
    </tr>
    </thead>
    <tbody>
    @foreach ($contact->emailAddresses as $emailAddress)
        <tr>
        <td>{{ $emailAddress->id }}</td>
        <td>{{ $emailAddress->email }}</td>
        <td>{{ $emailAddress->primary ? 'Ja' : 'Nee' }}</td>
        </tr>
    @endforeach
    </tbody>
</table>

<br><br>