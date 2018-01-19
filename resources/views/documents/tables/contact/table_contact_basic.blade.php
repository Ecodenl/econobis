<br><br>


<table>
    <thead>
    <tr>
        <th>Header 1</th>
        <th>Header 2</th>
        <th>Header 3</th>
        <th>Header 4</th>
    </tr>
    </thead>
    <tbody>
    @foreach ($contact->vars as $var)
        <tr>
        <td>{{ $var->value }}</td>
        <td>{{ $var->value }}</td>
        <td>{{ $var->value }}</td>
        <td>{{ $var->value }}</td>
        </tr>
    @endforeach
    </tbody>
</table>

<br><br>