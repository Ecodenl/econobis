<?php
/**
 * Created by PhpStorm.
 * User: Fren
 * Date: 20-10-2017
 * Time: 9:35
 */

namespace App\Http\Controllers\Api\ProductionProject;

use App\Eco\Email\Email;
use App\Eco\ProductionProject\ProductionProject;
use App\Helpers\RequestInput\RequestInput;
use App\Http\Controllers\Api\ApiController;
use App\Http\RequestQueries\ProductionProject\Grid\RequestQuery;
use App\Http\Resources\GenericResource;
use App\Http\Resources\ProductionProject\FullProductionProject;
use App\Http\Resources\ProductionProject\GridProductionProject;
use App\Http\Resources\ProductionProject\ProductionProjectPeek;
use Illuminate\Support\Facades\Auth;

class ProductionProjectController extends ApiController
{

    public function grid(RequestQuery $requestQuery)
    {
        $productionProjects = $requestQuery->get();

        return GridProductionProject::collection($productionProjects)
            ->additional(['meta' => [
            'total' => $requestQuery->total(),
            ]
        ]);
    }

    public function show(ProductionProject $productionProject)
    {
        $productionProject->load([
            'productionProjectStatus',
            'productionProjectType',
            'ownedBy',
            'createdBy',
            'productionProjectValueCourses.productionProject',
            'productionProjectValueCourses.createdBy',
            'productionProjectRevenues.type',
            'productionProjectRevenues.category',
            'productionProjectRevenues.createdBy',
            'tasks',
            'documents',
        ]);

        $productionProject->relatedEmailsInbox = $this->getRelatedEmails($productionProject->id, 'inbox');
        $productionProject->relatedEmailsSent = $this->getRelatedEmails($productionProject->id, 'sent');

        return FullProductionProject::make($productionProject);
    }

    public function store(RequestInput $requestInput)
    {

        $this->authorize('manage', ProductionProject::class);

        $data = $requestInput
            ->string('name')->validate('required')->next()
            ->string('code')->validate('required')->next()
            ->string('description')->next()
            ->integer('ownedById')->validate('required|exists:users,id')->alias('owned_by_id')->next()
            ->integer('productionProjectStatusId')->validate('nullable|exists:production_project_status,id')->onEmpty(null)->alias('production_project_status_id')->next()
            ->date('dateStart')->validate('nullable|date')->alias('date_start')->next()
            ->date('dateProduction')->validate('nullable|date')->alias('date_production')->next()
            ->date('dateStartRegistrations')->validate('nullable|date')->alias('date_start_registrations')->next()
            ->date('dateEndRegistrations')->validate('nullable|date')->alias('date_end_registrations')->next()
            ->integer('productionProjectTypeId')->validate('nullable|exists:production_project_type,id')->onEmpty(null)->alias('production_project_type_id')->next()
            ->string('postalCode')->alias('postal_code')->next()
            ->string('address')->next()
            ->string('city')->next()
            ->string('ean')->next()
            ->string('eanManager')->alias('ean_manager')->next()
            ->string('warrantyOrigin')->alias('warranty_origin')->next()
            ->string('eanSupply')->alias('ean_supply')->next()
            ->integer('participationWorth')->alias('participation_worth')->next()
            ->integer('powerKwhAvailable')->alias('power_kwh_available')->next()
            ->integer('maxParticipations')->alias('max_participations')->next()
            ->string('taxReferral')->alias('tax_referral')->next()
            ->integer('maxParticipationsYouth')->alias('max_participations_youth')->next()
            ->integer('totalParticipations')->alias('total_participations')->next()
            ->integer('minParticipations')->alias('min_participations')->next()
            ->boolean('isMembershipRequired')->alias('is_membership_required')->next()
            ->boolean('isParticipationTransferable')->alias('is_participation_transferable')->next()
            ->get();

        $productionProject = new ProductionProject();

        $productionProject->fill($data);

        $productionProject->save();

        return $this->show($productionProject);
    }


    public function update(RequestInput $requestInput, ProductionProject $productionProject)
    {
        $this->authorize('manage', ProductionProject::class);

        $data = $requestInput
            ->string('name')->validate('required')->next()
            ->string('code')->validate('required')->next()
            ->string('description')->next()
            ->integer('ownedById')->validate('required|exists:users,id')->alias('owned_by_id')->next()
            ->integer('productionProjectStatusId')->validate('nullable|exists:production_project_status,id')->onEmpty(null)->alias('production_project_status_id')->next()
            ->date('dateStart')->validate('nullable|date')->alias('date_start')->next()
            ->date('dateProduction')->validate('nullable|date')->alias('date_production')->next()
            ->date('dateStartRegistrations')->validate('nullable|date')->alias('date_start_registrations')->next()
            ->date('dateEndRegistrations')->validate('nullable|date')->alias('date_end_registrations')->next()
            ->integer('productionProjectTypeId')->validate('nullable|exists:production_project_type,id')->onEmpty(null)->alias('production_project_type_id')->next()
            ->string('postalCode')->alias('postal_code')->next()
            ->string('address')->next()
            ->string('city')->next()
            ->string('ean')->next()
            ->string('eanManager')->alias('ean_manager')->next()
            ->string('warrantyOrigin')->alias('warranty_origin')->next()
            ->string('eanSupply')->alias('ean_supply')->next()
            ->integer('participationWorth')->alias('participation_worth')->next()
            ->integer('powerKwhAvailable')->alias('power_kwh_available')->next()
            ->integer('maxParticipations')->alias('max_participations')->next()
            ->string('taxReferral')->alias('tax_referral')->next()
            ->integer('maxParticipationsYouth')->alias('max_participations_youth')->next()
            ->integer('totalParticipations')->alias('total_participations')->next()
            ->integer('minParticipations')->alias('min_participations')->next()
            ->boolean('isMembershipRequired')->alias('is_membership_required')->next()
            ->boolean('isParticipationTransferable')->alias('is_participation_transferable')->next()
            ->get();

        $productionProject->fill($data);

        $productionProject->save();

        return $this->show($productionProject);
    }

    public function destroy(ProductionProject $productionProject)
    {
        $this->authorize('manage', ProductionProject::class);

        $productionProject->forceDelete();
    }

    public function peek()
    {
        return ProductionProjectPeek::collection(ProductionProject::orderBy('id')->get());
    }

    public function getObligationNumbers(ProductionProject $productionProject){
        $obligationNumbers = [];

        foreach ($productionProject->participantsProductionProject as $participation){
            $obligationNumbers = array_merge($obligationNumbers, $participation->obligationNumbers()->pluck('number')->toArray());
        }

        return $obligationNumbers;
    }

    public function getRelatedEmails($id, $folder)
    {
        $user = Auth::user();

        $mailboxIds = $user->mailboxes()->pluck('mailbox_id');

        return Email::whereIn('mailbox_id', $mailboxIds)->where('production_project_id', $id)->where('folder', $folder)->get();
    }
}