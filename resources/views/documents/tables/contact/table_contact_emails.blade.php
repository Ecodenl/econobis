<br><br>

<style>
    table {
        table-layout: fixed;
        background-color: transparent;
        border-collapse: collapse;
        border-spacing: 0;
        font-family: "Raleway", sans-serif;
        font-size: 14px;
        line-height: 1.6;
        color: #333;
    }

    table th {
        overflow: hidden;
    }

    th {
        font-weight: 600;
        text-align: left;
    }

    th, tr {
        font-size: 12px;
    }

    .table {
        width: 75%;
        max-width: 75%;
    }

    .table > thead > tr > th {
        vertical-align: bottom;
        border-bottom: 2px solid #ddd;
    }

    .table > tbody > tr > td {
        line-height: 1.6;
        vertical-align: top;
        border-top: 1px solid #ddd;
    }

    .thead-title {
        background-color: #30815f;
        color: #fff;
    }

    .table-condensed > thead > tr > th {
        padding: 5px;
    }

</style>


<table class="table table-condensed table-striped">
    <thead class="thead-title">
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