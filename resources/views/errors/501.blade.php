@extends('errors::minimal')

@section('title', __('Server Error'))
@section('code', '501')
@section('message', __('Er kon (tijdelijk) geen verbinding gemaakt worden. Probeer het later nog eens.'))
