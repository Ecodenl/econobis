@extends('errors::minimal')

@section('title', __('Service Unavailable'))
@section('code', '503')
@section('message', __($exception->getMessage() ?: 'Vanwege onderhoud is deze applicatie tot 10.00 niet te gebruiken.'))
