<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 27-10-2017
 * Time: 11:15
 */

namespace App\Http\RequestQueries\Contact\Grid;


use App\Helpers\RequestQuery\RequestJoiner;
use Carbon\Carbon;

class Joiner extends RequestJoiner
{

    protected function applyEmailAddressJoin($query)
    {
        $query->leftJoin('email_addresses', function ($join) {
            $join->on('email_addresses.contact_id', '=', 'contacts.id')
                ->where('email_addresses.primary', '=', 1);
        });
    }

    protected function applyPhoneNumberJoin($query)
    {
        $query->leftJoin('phone_numbers', function ($join) {
            $join->on('phone_numbers.contact_id', '=', 'contacts.id')
                ->where('phone_numbers.primary', '=', 1);
        });
    }

    protected function applyAddressJoin($query)
    {
        $query->leftJoin('addresses', function ($join) {
            $join->on('addresses.contact_id', '=', 'contacts.id')
                ->where('addresses.primary', '=', 1);
        });
    }

    protected function applyPeopleJoin($query)
    {
        $query->leftJoin('people', 'people.contact_id', '=', 'contacts.id');
    }

    protected function applyParticipationsJoin($query)
    {
        $query->leftJoin('participation_production_project', function ($join) {
            $join->on('participation_production_project.contact_id', '=',
                'contacts.id');
        });
    }

    protected function applyOccupationJoin($query)
    {
        $query->leftJoin('occupation_contact', function ($join) {
            $join->on('occupation_contact.contact_id', '=',
                'contacts.id');
            $join->orOn('occupation_contact.primary_contact_id', '=',
                'contacts.id');
        });
    }

    protected function applyOpportunityJoin($query)
    {
        $query->leftJoin('intakes', function ($join) {
            $join->on('intakes.contact_id', '=',
                'contacts.id');
        });
        $query->leftJoin('opportunities', function ($join) {
            $join->on('opportunities.intake_id', '=',
                'intakes.id');
        });
    }

    protected function applyOrderProductJoin($query)
    {
        $query->leftJoin('orders', function ($join) {
            $join->on('orders.contact_id', '=',
                'contacts.id')->where('orders.status_id', 'active');
        });
        $query->leftJoin('order_product', function ($join) {
            $join->on('order_product.order_id', '=',
                'orders.id')
                ->where('order_product.date_start', '<=', Carbon::today()->format('Y-m-d'))
                ->where(function ($q) {
                    $q->where(function ($q) {
                        $q->where('order_product.date_end', '>=', Carbon::today()->format('Y-m-d'));
                    })->orWhere(function ($q) {
                        $q->whereNull('order_product.date_end');
                    });});

        });
    }

}