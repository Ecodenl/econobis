<?php

use App\Http\Controllers\Api\Email\EmailAttachmentController;
use App\Http\Controllers\Api\Email\EmailDetailsController;
use App\Http\Controllers\Api\Email\EmailGenericController;
use App\Http\Controllers\Api\Email\EmailSendController;
use App\Http\Controllers\Api\Email\EmailSplitviewController;
use App\Http\Controllers\Api\Invoice\InvoiceMolliePaymentController;
use App\Http\Controllers\Api\Mailbox\MailboxController;
use App\Http\Controllers\Api\Mailbox\MailgunDomainBounceController;
use App\Http\Controllers\Api\Mailbox\MailgunDomainComplaintController;
use App\Http\Controllers\Api\Mailbox\MailgunEventController;
use App\Http\Middleware\EncryptCookies;
use Illuminate\Session\Middleware\StartSession;
use Illuminate\Support\Facades\Route;
use JosKolenberg\LaravelJory\Http\Controllers\JoryController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('password/email', 'Api\User\UserController@sendResetLinkEmail');
Route::post('password/reset', 'Auth\ResetPasswordController@reset');
Route::get('password/reset/{token}', [
    'as' => 'password.reset',
    'uses' => 'Auth\ResetPasswordController@showResetForm'
]);

Route::namespace('Api')
    ->middleware(['auth:api', 'scopes:use-app', 'two-factor'])
    ->group(function () {

// Todo WM: check rewrite code:  Shared api's. Naar namespce 'Shared' ??

        Route::get('/shared-area/search', '\App\Http\Controllers\Shared\SharedArea\SharedAreaController@searchArea');
        Route::get('/shared-area/{sharedArea}', '\App\Http\Controllers\Shared\SharedArea\SharedAreaController@show');
        Route::post('/shared-area/shared-area-details', '\App\Http\Controllers\Shared\SharedArea\SharedAreaController@getSharedAreaDetails');

        Route::get('/jobs', 'Job\JobController@getLastJobs');

        Route::get('/twinfield', 'Twinfield\TwinfieldController@twinfield');

        Route::get('/me', 'User\UserController@me');

        Route::get('/system-data', 'SystemData\SystemDataController@get');

        Route::get('/contact/grid', 'Contact\GridController@index');
        Route::get('/contact/csv', 'Contact\GridController@csv');
        Route::get('/contact/free-fields-csv', 'Contact\GridController@freeFieldsCsv');
        Route::get('/contact/energy-suppliers-csv', 'Contact\GridController@energySuppliersCsv');
        Route::get('/contact/excel/verbruik/gas', 'Contact\GridController@excelAddressEnergyConsumptionGas');
        Route::get('/contact/excel/verbruik/electriciteit', 'Contact\GridController@excelAddressEnergyConsumptionElectricity');
        Route::get('/contact/save-as-group', 'Contact\GridController@saveAsGroup');
        Route::get('/contact/peek' . '/{inspectionPersonType?}', 'Contact\ContactController@peek');
        Route::get('/contact/search' . '/{inspectionPersonType?}', 'Contact\ContactController@search');
        Route::get('/contact/address/peek', 'Contact\ContactController@peekWithAddress');
        Route::get('/contact/chart-data', 'Contact\ContactController@chartData');
        Route::get('/contact/get-primary-email-addresses-id', 'Contact\ContactController@getPrimaryEmailAddressesId');
        Route::post('/contacts/delete', 'Contact\ContactController@destroyContacts');
        Route::post('/contacts/merge', 'Contact\ContactController@mergeContacts');
        Route::post('/contact/validate-import', 'Contact\ContactController@validateImport');
        Route::post('/contact/import', 'Contact\ContactController@import');
        Route::post('contact/{contact}/owner/{user}/associate', 'Contact\ContactController@associateOwner');
        Route::get('/contact/{contact}', 'Contact\ContactController@show');
        Route::get('/contact/{contact}/addresses', 'Contact\ContactController@getContactWithAddresses');
        Route::get('/contact/{contact}/intakes', 'Contact\ContactController@intakes');
        Route::get('/contact/{contact}/housing-files', 'Contact\ContactController@housingFiles');
        Route::get('/contact/{contact}/groups', 'Contact\ContactController@groups');
        Route::post('/contact/{contact}/delete', 'Contact\ContactController@destroy');
        Route::get('/contact/{contact}/tasks', 'Contact\ContactController@tasks');
        Route::get('/contact/{contact}/make-hoomdossier', 'Contact\ContactController@makeHoomdossier');
        Route::get('/contact/{contact}/coach-attributes', 'Contact\ContactController@getCoachAttributes');
        Route::post('/contact/{contact}/coach-attributes', 'Contact\ContactController@updateCoachAttributes');

        Route::get('/intake/grid', 'Intake\IntakeController@grid');
        Route::get('/intake/amount-active', 'Intake\IntakeController@getAmountOfActiveIntakes');
        Route::get('/intake/peek', 'Intake\IntakeController@peek');
        Route::get('/intake/excel', 'Intake\IntakeController@excel');
        Route::get('/contact/{contact}/intake', 'Intake\IntakeController@getStore');
        Route::post('/contact/intake', 'Intake\IntakeController@store');
        Route::get('/intake/{intake}', 'Intake\IntakeController@showWithCustomCampaigns');
        Route::post('/intake/{intake}/update', 'Intake\IntakeController@update');
        Route::post('/intake/{intake}/delete', 'Intake\IntakeController@destroy');

        Route::post('/intake/{intake}/{measureCategory}/attach', 'Intake\IntakeController@attachMeasureRequested');
        Route::post('/intake/{intake}/{measureCategory}/detach', 'Intake\IntakeController@detachMeasureRequested');

        Route::get('/intake/{intake}/tasks', 'Intake\IntakeController@tasks');
        Route::get('/intake/{intake}/notes', 'Intake\IntakeController@notes');
        Route::get('/intake/{intake}/documents', 'Intake\IntakeController@documents');
        Route::get('/intake/{intake}/emails', 'Intake\IntakeController@emails');

        Route::get('/housing-file/grid', 'HousingFile\HousingFileController@grid');
        Route::get('/housing-file/peek', 'HousingFile\HousingFileController@peek');
        Route::get('/housing-file/excel', 'HousingFile\HousingFileController@excelHousingFiles');
        Route::get('/contact/{contact}/housing-file', 'HousingFile\HousingFileController@getStore');
        Route::post('/contact/housing-file', 'HousingFile\HousingFileController@store');
        Route::get('/housing-file/{housingFile}', 'HousingFile\HousingFileController@show');
        Route::post('/housing-file/{housingFile}/update', 'HousingFile\HousingFileController@update');
        Route::post('/housing-file/{housingFile}/update-use', 'HousingFile\HousingFileController@updateUse');
        Route::post('/housing-file/{housingFile}/delete', 'HousingFile\HousingFileController@destroy');

        Route::post('/housing-file/{housingFile}/campaign/{campaign}/create-opportunities', 'HousingFile\HousingFileController@createOpportunities');
        Route::post('/housing-file/{housingFile}/contact/{contact}/create-quotation-requests', 'HousingFile\HousingFileController@createQuotationRequests');
        Route::post('/housing-file/housing-file-specification', 'HousingFile\HousingFileController@addHousingFileSpecification');
        Route::post('/housing-file/housing-file-specification/{housingFileSpecification}/update', 'HousingFile\HousingFileController@updateHousingFileSpecification');
        Route::post('/housing-file/housing-file-specification/{housingFileSpecification}/delete', 'HousingFile\HousingFileController@deleteHousingFileSpecification');
        Route::post('/housing-file/housing-file-housing-status', 'HousingFile\HousingFileController@addHousingFileHousingStatus');
        Route::post('/housing-file/housing-file-housing-status/{housingFileHousingStatus}/update', 'HousingFile\HousingFileController@updateHousingFileHousingStatus');
        Route::post('/housing-file/housing-file-housing-status/{housingFileHousingStatus}/delete', 'HousingFile\HousingFileController@deleteHousingFileHousingStatus');

        Route::get('/housing-file/{housingFile}/notes', 'HousingFile\HousingFileController@notes');
        Route::get('/housing-file/{housingFile}/documents', 'HousingFile\HousingFileController@documents');

        Route::get('/housing-file/selection/building-types/peek', 'HousingFile\HousingFileController@buildingTypesPeek');
        Route::get('/housing-file/selection/roof-types/peek', 'HousingFile\HousingFileController@roofTypesPeek');
        Route::get('/housing-file/selection/energy-labels/peek', 'HousingFile\HousingFileController@energyLabelsPeek');
        Route::get('/housing-file/selection/energy-label-status/peek', 'HousingFile\HousingFileController@energyLabelStatusPeek');
//        Route::get('/housing-file/selection/frame-type-selection/peek', 'HousingFile\HousingFileController@frameTypeSelectionPeek');
        Route::get('/housing-file/selection/cook-type-selection/peek', 'HousingFile\HousingFileController@cookTypeSelectionPeek');
        Route::get('/housing-file/selection/heat-source-selection/peek', 'HousingFile\HousingFileController@heatSourceSelectionPeek');
        Route::get('/housing-file/selection/water-comfort-selection/peek', 'HousingFile\HousingFileController@waterComfortSelectionPeek');
//        Route::get('/housing-file/selection/pitched-roof-heating-selection/peek', 'HousingFile\HousingFileController@pitchedRoofHeatingSelectionPeek');
//        Route::get('/housing-file/selection/flat-roof-heating-selection/peek', 'HousingFile\HousingFileController@flatRoofHeatingSelectionPeek');
//        Route::get('/housing-file/selection/hr3p-glass-frame-current-glass-selection/peek', 'HousingFile\HousingFileController@hr3pGlassFrameCurrentGlassSelectionPeek');
//        Route::get('/housing-file/selection/glass-in-lead-replace-rooms-heated-selection/peek', 'HousingFile\HousingFileController@glassInLeadReplaceRoomsHeatedSelectionPeek');
        Route::get('/housing-file/selection/boiler-setting-comfort-heat-selection/peek', 'HousingFile\HousingFileController@boilerSettingComfortHeatSelectionPeek');
        Route::get('/housing-file/selection/crack-sealing-type-selection/peek', 'HousingFile\HousingFileController@crackSealingTypeSelectionPeek');
        Route::get('/housing-file/selection/current-floor-insulation-selection/peek', 'HousingFile\HousingFileController@currentFloorInsulationSelectionPeek');
//        Route::get('/housing-file/selection/building-heating-application-selection/peek', 'HousingFile\HousingFileController@buildingHeatingApplicationSelectionPeek');
        Route::get('/housing-file/selection/ventilation-type-selection/peek', 'HousingFile\HousingFileController@ventilationTypeSelectionPeek');
        Route::get('/housing-file/selection/current-living-rooms-windows-selection/peek', 'HousingFile\HousingFileController@currentLivingRoomsWindowsSelectionPeek');
        Route::get('/housing-file/selection/current-wall-insulation-selection/peek', 'HousingFile\HousingFileController@currentWallInsulationSelectionPeek');
        Route::get('/housing-file/selection/current-roof-insulation-selection/peek', 'HousingFile\HousingFileController@currentRoofInsulationSelectionPeek');
        Route::get('/housing-file/selection/current-sleeping-rooms-windows-selection/peek', 'HousingFile\HousingFileController@currentSleepingRoomsWindowsSelectionPeek');
        Route::get('/housing-file/selection/has-cavity-wall-selection/peek', 'HousingFile\HousingFileController@hasCavityWallSelectionPeek');
        Route::get('/housing-file/selection/has-solar-panels-selection/peek', 'HousingFile\HousingFileController@hasSolarPanelsSelectionPeek');
        Route::get('/housing-file/selection/heat-source-warm-tap-water-selection/peek', 'HousingFile\HousingFileController@heatSourceWarmTapWaterSelectionPeek');

        Route::get('/housing-file-specification/grid', 'HousingFile\HousingFileSpecificationController@grid');
        Route::post('/housing-file-specification/campaign/{campaign}/create-opportunities', 'HousingFile\HousingFileSpecificationController@createOpportunities');
        Route::post('/housing-file-specification/contact/{contact}/create-quotation-requests', 'HousingFile\HousingFileSpecificationController@createQuotationRequests');
        Route::get('/housing-file-specification/excel-specifications', 'HousingFile\HousingFileSpecificationController@excelSpecifications');

        Route::get('/user/grid', 'User\GridController@index');
        Route::get('/user/rolesPermissionsExcel', 'User\UserController@rolesPermissionsExcel');
        Route::post('/user', 'User\UserController@store');
        Route::get('/user/{user}', 'User\UserController@show');
        Route::post('/user/{user}', 'User\UserController@update');
        Route::get('/user/with-permission/{permission}', 'User\UserController@withPermission');
        Route::post('/user/{user}/roles/add/{role}', 'User\UserController@addRole');
        Route::post('/user/{user}/roles/remove/{role}', 'User\UserController@removeRole');
        Route::post('/user/{user}/reset-two-factor', 'User\UserController@resetTwoFactor');

        Route::post('/address/lvbag', 'Address\AddressController@getLvbagAddress');
        Route::post('/address', 'Address\AddressController@store');
        Route::post('/address/{address}', 'Address\AddressController@update');
        Route::post('/address/{address}/delete', 'Address\AddressController@destroy');

        Route::post('/occupation', 'Occupation\OccupationController@store');
        Route::post('/occupation/{occupationContact}/update', 'Occupation\OccupationController@update');
        Route::post('/occupation/delete', 'Occupation\OccupationController@destroy');

        Route::post('/email-address', 'EmailAddress\EmailAddressController@store');
        Route::post('/email-address/{emailAddress}', 'EmailAddress\EmailAddressController@update');
        Route::post('/email-address/{emailAddress}/delete', 'EmailAddress\EmailAddressController@destroy');

        Route::post('/phone-number', 'PhoneNumber\PhoneNumberController@store');
        Route::post('/phone-number/{phoneNumber}', 'PhoneNumber\PhoneNumberController@update');
        Route::post('/phone-number/{phoneNumber}/delete', 'PhoneNumber\PhoneNumberController@destroy');

        Route::post('/person', 'Person\PersonController@store');
        Route::post('/person/{person}', 'Person\PersonController@update');
        Route::get('/person/peek', 'Person\PersonController@peek');

        Route::post('/organisation', 'Organisation\OrganisationController@store');
        Route::post('/organisation/{organisation}', 'Organisation\OrganisationController@update');
        Route::get('/organisation/peek', 'Organisation\OrganisationController@peek');

        Route::get('/coach-peek', 'Contact\ContactController@peekCoach');
        Route::get('/project-manager-peek', 'Contact\ContactController@peekProjectManager');
        Route::get('/external-party-peek', 'Contact\ContactController@peekExternalParty');

        Route::post('/contact-note', 'ContactNote\ContactNoteController@store');
        Route::post('/contact-note/{contactNote}', 'ContactNote\ContactNoteController@update');
        Route::post('/contact-note/{contactNote}/delete', 'ContactNote\ContactNoteController@destroy');
        Route::post('/contact-portal-user/{portalUser}', 'PortalUser\PortalUserController@update');
        Route::post('/contact-portal-user/{portalUser}/delete', 'PortalUser\PortalUserController@destroy');
        Route::post('/contact-portal-user/{portalUser}/reset-two-factor', 'PortalUser\PortalUserController@resetTwoFactor');

        Route::post('/address-energy-supplier', 'AddressEnergySupplier\AddressEnergySupplierController@store');
        Route::post('/address-energy-supplier/{addressEnergySupplier}', 'AddressEnergySupplier\AddressEnergySupplierController@update');
        Route::post('/address-energy-supplier/{addressEnergySupplier}/delete', 'AddressEnergySupplier\AddressEnergySupplierController@destroy');
        Route::post('/address-energy-supplier-validate', 'AddressEnergySupplier\AddressEnergySupplierController@validateAddressEnergySupplierFormNew');
        Route::post('/address-energy-supplier-validate/{addressEnergySupplier}', 'AddressEnergySupplier\AddressEnergySupplierController@validateAddressEnergySupplierForm');

        Route::get('contact-group/grid', 'ContactGroup\ContactGroupController@grid');
        Route::get('contact-group/peek', 'ContactGroup\ContactGroupController@peek');
        Route::get('contact-group/peek/static/{active?}', 'ContactGroup\ContactGroupController@peekStatic');
        Route::get('contact-group/excel/group-report', 'ContactGroup\ContactGroupController@excelGroupReport');
        Route::get('contact-group/{contactGroup}', 'ContactGroup\ContactGroupController@show');
        Route::get('contact-group/{contactGroup}/csv', 'ContactGroup\ContactGroupController@getCsv');
        Route::get('contact-group/{contactGroup}/name', 'ContactGroup\ContactGroupController@getName');
        Route::post('contact-group/composed/{contactGroup}/{contactGroupToDetach}/detach', 'ContactGroup\ContactGroupController@detachComposedContactGroup');
        Route::post('contact-group/composed/{contactGroup}/{contactGroupToAttach}/attach', 'ContactGroup\ContactGroupController@attachComposedContactGroup');
        Route::post('contact-group/composed/{contactGroup}/{contactGroupToDetach}/detach/except', 'ContactGroup\ContactGroupController@detachComposedExceptedContactGroup');
        Route::post('contact-group/composed/{contactGroup}/{contactGroupToAttach}/attach/except', 'ContactGroup\ContactGroupController@attachComposedExceptedContactGroup');
        Route::post('contact-group/', 'ContactGroup\ContactGroupController@store');
        Route::post('contact-group/{contactGroup}', 'ContactGroup\ContactGroupController@update');
        Route::post('contact-group/{contactGroup}/delete', 'ContactGroup\ContactGroupController@destroy');
        Route::get('contact-group/{contactGroup}/contacts', 'ContactGroup\ContactGroupController@contacts');
        Route::post('contact-group/{contactGroup}/contacts/add/{contact}', 'ContactGroup\ContactGroupController@addContact');
        Route::post('contact-group/{contactGroup}/contacts/remove/{contact}', 'ContactGroup\ContactGroupController@removeContact');
        Route::post('contact-group/{contactGroup}/contacts/update/{contact}', 'ContactGroup\ContactGroupController@updateContact');
        Route::get('contact-group/{contactGroup}/contacts/grid', 'ContactGroup\ContactGroupController@gridContacts');
        Route::post('contact-group/{contactGroup}/contacts/add-many', 'ContactGroup\ContactGroupController@addContacts');
        Route::get('contact-group/{contactGroup}/sync-laposta-list', 'ContactGroup\ContactGroupController@syncContactGroupLapostaList');
        Route::get('contact-group/{contactGroup}/deactivate-laposta-list', 'ContactGroup\ContactGroupController@deActivateContactGroupLapostaList');

        Route::post('distribution/create-revenue-report', 'Project\ProjectRevenueController@createRevenueReport');
        Route::post('distribution/create-payment-invoices', 'Project\ProjectRevenueController@createPaymentInvoices');
        Route::post('distribution/peek-by-ids', 'Project\ProjectRevenueController@peekDistributionByIds');
        Route::post('distribution/{distribution}/preview-pdf', 'Project\ProjectRevenueController@previewPDF');
        Route::post('distribution/{distribution}/preview-email', 'Project\ProjectRevenueController@previewEmail');

        Route::post('distribution-kwh/create-revenues-kwh-report', 'Project\RevenuesKwhController@createRevenuesKwhReport');
        Route::post('distribution-kwh/process-revenues-kwh', 'Project\RevenuesKwhController@processRevenuesKwh');
        Route::post('distribution-kwh/peek-by-ids', 'Project\RevenuesKwhController@peekDistributionKwhByIds');
        Route::post('distribution-kwh/{distributionKwh}/preview-pdf', 'Project\RevenuesKwhController@previewPDF');
        Route::post('distribution-kwh/{distributionKwh}/preview-email', 'Project\RevenuesKwhController@previewEmail');

        Route::post('distribution-part-kwh/process-revenue-parts-kwh', 'Project\RevenuePartsKwhController@processRevenuePartsKwh');
        Route::post('distribution-part-kwh/peek-by-ids', 'Project\RevenuePartsKwhController@peekDistributionKwhPartsByIds');

        Route::post('distribution-part-kwh/create-revenue-parts-kwh-report', 'Project\RevenuePartsKwhController@createRevenuePartsKwhReport');
        Route::post('distribution-part-kwh/{distributionPartsKwh}/preview-pdf', 'Project\RevenuePartsKwhController@previewPDF');
        Route::post('distribution-part-kwh/{distributionPartsKwh}/preview-email', 'Project\RevenuePartsKwhController@previewEmail');

        Route::get('opportunity/grid', 'Opportunity\OpportunityController@grid');
        Route::get('opportunity/peek', 'Opportunity\OpportunityController@peek');
        Route::get('opportunity/csv', 'Opportunity\OpportunityController@csv');
        Route::get('opportunity/amount-active', 'Opportunity\OpportunityController@getAmountOfActiveOpportunities');
        Route::get('opportunity/chart-data', 'Opportunity\OpportunityController@chartData');
        Route::get('opportunity/{opportunity}', 'Opportunity\OpportunityController@show');
        Route::post('opportunity/', 'Opportunity\OpportunityController@store');
        Route::post('opportunity/evaluation/{opportunity}', 'Opportunity\OpportunityController@updateEvaluation');
        Route::post('opportunity/{opportunity}', 'Opportunity\OpportunityController@update');
        Route::post('opportunity/{opportunity}/delete', 'Opportunity\OpportunityController@destroy');

        Route::get('contact-group/{contactGroup}/tasks', 'ContactGroup\ContactGroupController@tasks');

        Route::get('task/grid/tasks', 'Task\TaskController@gridTask');
        Route::get('task/grid/notes', 'Task\TaskController@gridNote');
        Route::get('task/peek', 'Task\TaskController@peek');
        Route::get('task/calendar', 'Task\TaskController@calendar');
        Route::get('task/amount-active', 'Task\TaskController@getAmountOfActiveTasks');
        Route::get('task/{task}', 'Task\TaskController@show');
        Route::post('task', 'Task\TaskController@store');
        Route::post('task/{task}', 'Task\TaskController@update');
        Route::post('task/{task}/duplicate', 'Task\TaskController@duplicate');
        Route::post('task/{task}/delete', 'Task\TaskController@destroy');
        Route::post('task/{task}/finish', 'Task\TaskController@finish');
        Route::post('task/{task}/properties', 'Task\TaskPropertyValueController@store');

        Route::post('task-property-value/{taskPropertyValue}', 'Task\TaskPropertyValueController@update');
        Route::post('task-property-value/{taskPropertyValue}/delete', 'Task\TaskPropertyValueController@destroy');

        Route::get('campaign/grid', 'Campaign\CampaignController@grid');
        Route::get('campaign/peek', 'Campaign\CampaignController@peek');
        Route::get('campaign/peeknotfinished', 'Campaign\CampaignController@peekNotFinished');
        Route::post('campaign/campaignworkflow/{campaignworkflow}/delete', 'Campaign\CampaignWorkflowController@delete');
        Route::get('campaign/{campaign}', 'Campaign\CampaignController@show');
        Route::get('campaign/{campaign}/intakes', 'Campaign\CampaignController@intakes');
        Route::get('campaign/{campaign}/opportunities', 'Campaign\CampaignController@opportunities');
        Route::post('campaign/', 'Campaign\CampaignController@store');
        Route::post('campaign/{campaign}', 'Campaign\CampaignController@update');
        Route::post('campaign/{campaign}/delete', 'Campaign\CampaignController@destroy');
        Route::post('campaign/{campaign}/owner/{user}/associate', 'Campaign\CampaignController@associateOwner');
        Route::post('campaign/{campaign}/response/{contact}/attach', 'Campaign\CampaignController@attachResponse');
        Route::post('campaign/{campaign}/response/{contact}/detach', 'Campaign\CampaignController@detachResponse');
        Route::post('campaign/{campaign}/organisation/{organisation}/attach', 'Campaign\CampaignController@attachOrganisation');
        Route::post('campaign/{campaign}/organisation/{organisation}/detach', 'Campaign\CampaignController@detachOrganisation');
        Route::post('campaign/{campaign}/coach/{coach}/attach', 'Campaign\CampaignController@attachCoach');
        Route::post('campaign/{campaign}/coach/{coach}/detach', 'Campaign\CampaignController@detachCoach');
        Route::post('campaign/{campaign}/projectManager/{projectManager}/attach', 'Campaign\CampaignController@attachProjectManager');
        Route::post('campaign/{campaign}/projectManager/{projectManager}/detach', 'Campaign\CampaignController@detachProjectManager');
        Route::post('campaign/{campaign}/externalParty/{externalParty}/attach', 'Campaign\CampaignController@attachExternalParty');
        Route::post('campaign/{campaign}/externalParty/{externalParty}/detach', 'Campaign\CampaignController@detachExternalParty');

        Route::get('measure/grid', 'Measure\MeasureController@grid');
        Route::get('measure/peek', 'Measure\MeasureController@peek');
        Route::get('measure/{measure}', 'Measure\MeasureController@show');
        Route::post('measure/faq/{measureFaq}/delete', 'Measure\MeasureController@destroyFaq');
        Route::post('measure/faq/{measureFaq}/update', 'Measure\MeasureController@updateFaq');
        Route::post('measure/{measure}/opportunity/{opportunity}/associate', 'Measure\MeasureController@associateOpportunity');
        Route::post('measure/{measure}/supplier/{organisation}/attach', 'Measure\MeasureController@attachSupplier');
        Route::post('measure/{measure}/supplier/{organisation}/detach', 'Measure\MeasureController@detachSupplier');
        Route::post('measure/{measure}/faq', 'Measure\MeasureController@storeFaq');
        Route::post('measure/{measure}', 'Measure\MeasureController@update');
        Route::post('measure/{measure}/delete', 'Measure\MeasureController@destroy');
        Route::get('measure/{measure}/attachments', 'Measure\MeasureController@attachments');

        Route::get('measure-category/jory', 'Measure\MeasureCategoryController@jory');
        Route::post('measure-category/{measureCategory}', 'Measure\MeasureCategoryController@update');

        Route::get('mailbox/grid', 'Mailbox\MailboxController@grid');
        Route::get('mailbox/peek', 'Mailbox\MailboxController@peek');
        Route::get('mailbox/logged-in/only-active', 'Mailbox\MailboxController@loggedInUserOnlyActive');
        Route::get('mailbox/logged-in/email-peek', 'Mailbox\MailboxController@loggedInEmailPeek');
        Route::get('mailbox/for-user/{user}/email-peek', 'Mailbox\MailboxController@forUserEmailPeek');
        Route::get('mailbox/{mailbox}', 'Mailbox\MailboxController@show');
        Route::post('mailbox', 'Mailbox\MailboxController@store');
        Route::post('mailbox/ignore', 'Mailbox\MailboxController@storeIgnore');
        Route::post('mailbox/update-ignore/{mailboxIgnore}', 'Mailbox\MailboxController@updateIgnore');
        Route::post('mailbox/delete-ignore/{mailboxIgnore}', 'Mailbox\MailboxController@deleteIgnore');
        Route::post('mailbox/{mailbox}', 'Mailbox\MailboxController@update');
        Route::post('mailbox/{mailbox}/users/add/{user}', 'Mailbox\MailboxController@addUser');
        Route::post('mailbox/{mailbox}/users/remove/{user}', 'Mailbox\MailboxController@removeUser');
        Route::get('mailbox/{mailbox}/receive', 'Mailbox\MailboxController@receive');
        Route::get('mailbox/receive/from-mailboxes-user', 'Mailbox\MailboxController@receiveMailFromMailboxesUser');
        Route::get('mailbox/{mailbox}/make-primary', 'Mailbox\MailboxController@makePrimary');

        /**
         * Districts
         */
        Route::get('district', [\App\Http\Controllers\Api\District\DistrictController::class, 'index']);
        Route::get('district/{district}', [\App\Http\Controllers\Api\District\DistrictController::class, 'show']);
        Route::get('district/{district}/calendar-items', [\App\Http\Controllers\Api\District\DistrictController::class, 'getCalendarItems']);
        Route::post('district', [\App\Http\Controllers\Api\District\DistrictController::class, 'create']);
        Route::post('district/{district}', [\App\Http\Controllers\Api\District\DistrictController::class, 'update']);
        Route::post('district/{district}/delete', [\App\Http\Controllers\Api\District\DistrictController::class, 'delete']);
        Route::post('district/{district}/coaches/{coach}/detach', [\App\Http\Controllers\Api\District\DistrictController::class, 'detachCoach']);
        Route::post('district/{district}/coaches/{coach}/attach', [\App\Http\Controllers\Api\District\DistrictController::class, 'attachCoach']);

        /**
         * Contact Availabilities
         */
        Route::get('contact/{contact}/availability/by-week', [\App\Http\Controllers\Api\Contact\ContactAvailabilityController::class, 'getByWeek']);
        Route::get('district/{district}/availability/by-week', [\App\Http\Controllers\Api\Contact\ContactAvailabilityController::class, 'getDistrictAvailabilityByWeek']);
        Route::post('contact/{contact}/availability', [\App\Http\Controllers\Api\Contact\ContactAvailabilityController::class, 'update']);
        Route::post('contact/{contact}/availability/copy-weeks', [\App\Http\Controllers\Api\Contact\ContactAvailabilityController::class, 'copyWeeks']);

        Route::get('email/grid/in-folder/{folder}', 'Email\EmailController@grid');
        Route::get('email/search', 'Email\EmailController@search');
        Route::get('email/{email}', 'Email\EmailController@show');
        Route::get('email/{email}/reply', 'Email\EmailController@getReply');
        Route::get('email/{email}/reply-all', 'Email\EmailController@getReplyAll');
        Route::get('email/{email}/forward', 'Email\EmailController@getForward');
        Route::get('email/group/{contactGroup}', 'Email\EmailController@getEmailGroup');
        Route::post('email/{email}/move-to-folder', 'Email\EmailController@moveEmailToFolder');
        Route::post('email/{email}/delete', 'Email\EmailController@destroy');
        Route::post('email/{email}', 'Email\EmailController@update');
        Route::get('email/email-attachment/{emailAttachment}/download', 'Email\EmailController@downloadEmailAttachment');
        Route::post('email/email-attachment/{email}/store', 'Email\EmailController@storeEmailAttachment');
        Route::post('email/email-attachment/{emailAttachment}/delete', 'Email\EmailController@deleteEmailAttachment');
        Route::post('email/concept/{mailbox}/store', 'Email\EmailController@storeConcept');
        Route::post('email/concept/{mailbox}/{email}/store2', 'Email\EmailController@storeConcept2');
        Route::post('email/send/{mailbox}/{email}', 'Email\EmailController@send');
        Route::post('email/concept/{email}/update', 'Email\EmailController@updateConcept');
        Route::post('email/concept/{email}/update2', 'Email\EmailController@updateConcept2');
        Route::post('email/concept/{email}/send', 'Email\EmailController@sendConcept');
        Route::post('email/{email}/status/{emailStatusId}', 'Email\EmailController@setEmailStatus');

        /**
         * Email splitview
         */
        Route::get('email-splitview/select-list', [EmailSplitviewController::class, 'selectList']);
        Route::get('email-splitview/{email}', [EmailSplitviewController::class, 'show']);

        /**
         * Email generic
         */
        Route::post('email-generic/delete-multiple', [EmailGenericController::class, 'deleteMultiple']);
        Route::post('email-generic/update-multiple', [EmailGenericController::class, 'updateMultiple']);
        Route::post('email-generic', [EmailGenericController::class, 'store']);
        Route::post('email-generic/store-group-mail/{contactGroup}', [EmailGenericController::class, 'storeGroupMail']);
        Route::post('email-generic/{email}', [EmailGenericController::class, 'update']);
        Route::post('email-generic/{email}/store-reply', [EmailGenericController::class, 'storeReply']);
        Route::post('email-generic/{email}/store-reply-all', [EmailGenericController::class, 'storeReplyAll']);
        Route::post('email-generic/{email}/store-forward', [EmailGenericController::class, 'storeForward']);
        Route::post('email-generic/{email}/create-contact', [EmailGenericController::class, 'createContact']);
        Route::get('email-generic/amount-open', [EmailGenericController::class, 'getAmountOfOpenEmails']);

        /**
         * Email details
         */
        Route::get('email-details/{email}', [EmailDetailsController::class, 'show']);

        /**
         * Email send modal
         */
        Route::get('email-send/{email}', [EmailSendController::class, 'show']);
        Route::post('email-send/{email}/save-concept', [EmailSendController::class, 'saveConcept']);
        Route::post('email-send/{email}/send', [EmailSendController::class, 'send']);

        /**
         * Email attachments
         */
        Route::get('email-attachment/{emailAttachment}/download', [EmailAttachmentController::class, 'download']);
        Route::post('email-attachment/{emailAttachment}/delete', [EmailAttachmentController::class, 'delete']);
        Route::post('email/{email}/add-documents-as-attachments', [EmailAttachmentController::class, 'addDocumentsAsAttachments']);
        Route::post('email/{email}/attachment', [EmailAttachmentController::class, 'store']);

        Route::get('email-template/grid', 'EmailTemplate\EmailTemplateController@grid');
        Route::get('email-template/peek', 'EmailTemplate\EmailTemplateController@peek');
        Route::get('email-template/{emailTemplate}', 'EmailTemplate\EmailTemplateController@show');
        Route::get('email-template/with-user/{emailTemplate}', 'EmailTemplate\EmailTemplateController@showWithUser');
        Route::post('email-template', 'EmailTemplate\EmailTemplateController@store');
        Route::post('email-template/{emailTemplate}/delete', 'EmailTemplate\EmailTemplateController@destroy');
        Route::post('email-template/{emailTemplate}', 'EmailTemplate\EmailTemplateController@update');

        Route::get('document/grid', 'Document\DocumentController@grid');
        Route::get('document/peek', 'Document\DocumentController@peek');
        Route::get('document/default-email-documents-peek', 'Document\DocumentController@defaultEmailDocumentsPeek');
        Route::get('document/{document}', 'Document\DocumentController@show');
        Route::get('document/{document}/download', 'Document\DocumentController@download');
        Route::post('document/{document}/delete', 'Document\DocumentController@destroy');
        Route::post('document', 'Document\DocumentController@store');
        Route::post('document/{document}', 'Document\DocumentController@update');

        Route::get('document-template/grid', 'DocumentTemplate\DocumentTemplateController@grid');
        Route::get('document-template/peekGeneral', 'DocumentTemplate\DocumentTemplateController@peekGeneral');
        Route::get('document-template/peekNotGeneral', 'DocumentTemplate\DocumentTemplateController@peekNotGeneral');
        Route::get('document-template/{documentTemplate}', 'DocumentTemplate\DocumentTemplateController@show');
        Route::post('document-template', 'DocumentTemplate\DocumentTemplateController@store');
        Route::post('document-template/{documentTemplate}/duplicate', 'DocumentTemplate\DocumentTemplateController@duplicate');
        Route::post('document-template/{documentTemplate}/delete', 'DocumentTemplate\DocumentTemplateController@destroy');
        Route::post('document-template/{documentTemplate}', 'DocumentTemplate\DocumentTemplateController@update');

        Route::get('audit-trail/grid', 'AuditTrail\AuditTrailController@grid');
        Route::get('audit-trail/peek-models', 'AuditTrail\AuditTrailController@peekModels');

        Route::post('general-search', 'GeneralSearch\GeneralSearchController@search');

        Route::get('team/grid', 'Team\TeamController@grid');
        Route::get('team/peek', 'Team\TeamController@peek');
        Route::get('team/{team}', 'Team\TeamController@show');
        Route::post('team', 'Team\TeamController@store');
        Route::post('team/{team}', 'Team\TeamController@update');
        Route::post('team/{team}/delete', 'Team\TeamController@destroy');
        Route::post('team/{team}/{user}/attach', 'Team\TeamController@attachUser');
        Route::post('team/{team}/{user}/detach', 'Team\TeamController@detachUser');
        Route::post('team/{team}/{contactGroup}/attach-contact-group', 'Team\TeamController@attachContactGroup');
        Route::post('team/{team}/{contactGroup}/detach-contact-group', 'Team\TeamController@detachContactGroup');
        Route::post('team/{team}/{documentCreatedFrom}/attach-document-created-from', 'Team\TeamController@attachDocumentCreatedFrom');
        Route::post('team/{team}/{documentCreatedFrom}/detach-document-created-from', 'Team\TeamController@detachDocumentCreatedFrom');

        Route::get('/quotation-request/grid', 'QuotationRequest\QuotationRequestController@grid');
        Route::get('/quotation-request/peek', 'QuotationRequest\QuotationRequestController@peek');
        Route::get('/quotation-request/csv', 'QuotationRequest\QuotationRequestController@csv');
        Route::get('/quotation-request/amount-open', 'QuotationRequest\QuotationRequestController@getAmountOfOpenQuotationRequests');
        Route::get('/opportunity/{opportunity}/{opportunityAction}/quotation-request', 'QuotationRequest\QuotationRequestController@getStore');
        Route::post('/quotation-request', 'QuotationRequest\QuotationRequestController@store');
        Route::get('/quotation-request/{quotationRequest}', 'QuotationRequest\QuotationRequestController@show');
        Route::post('/quotation-request/{quotationRequest}/update', 'QuotationRequest\QuotationRequestController@update');
        Route::post('/quotation-request/{quotationRequest}/delete', 'QuotationRequest\QuotationRequestController@destroy');

        Route::post('project/value-course', 'Project\ProjectValueCourseController@store');
        Route::post('project/value-course/{projectValueCourse}', 'Project\ProjectValueCourseController@update');
        Route::post('project/value-course/{projectValueCourse}/delete', 'Project\ProjectValueCourseController@destroy');

        Route::get('project/revenue/{projectRevenue}', 'Project\ProjectRevenueController@show');
        Route::get('project/revenue/{projectRevenue}/csv', 'Project\ProjectRevenueController@csv');
        Route::post('project/revenue/{projectRevenue}/distribution', 'Project\ProjectRevenueController@getRevenueDistribution');
        Route::post('project/revenue', 'Project\ProjectRevenueController@store');
        Route::post('project/revenue/{projectRevenue}', 'Project\ProjectRevenueController@update');
        Route::post('project/revenue/{projectRevenue}/delete', 'Project\ProjectRevenueController@destroy');

        Route::get('project/revenues-kwh/{revenuesKwh}', 'Project\RevenuesKwhController@show');
        Route::get('project/revenues-kwh/{revenuesKwh}/report/{reportType}', 'Project\RevenuesKwhController@showForReport');
        Route::get('project/revenues-kwh/{revenuesKwh}/csv', 'Project\RevenuesKwhController@csv');
        Route::post('project/revenues-kwh/{revenuesKwh}/distribution-kwh', 'Project\RevenuesKwhController@getRevenueDistribution');
        Route::post('project/revenues-kwh/create-energy-supplier-report/{revenuesKwh}/{documentTemplate}', 'Project\RevenuesKwhController@createEnergySupplierReport');
        Route::post('project/revenues-kwh', 'Project\RevenuesKwhController@store');
        Route::post('project/revenues-kwh/{revenuesKwh}', 'Project\RevenuesKwhController@update');
        Route::post('project/revenues-kwh/{revenuesKwh}/delete', 'Project\RevenuesKwhController@destroy');
        Route::get('project/revenues-kwh/{revenuesKwh}/recalculateRevenuesDistribution', 'Project\RevenuesKwhController@recalculateRevenuesDistribution');

        Route::get('project/revenue-parts-kwh/{revenuePartsKwh}', 'Project\RevenuePartsKwhController@show');
        Route::get('project/revenue-parts-kwh-for-report/{revenuePartsKwh}', 'Project\RevenuePartsKwhController@showForReport');
        Route::get('project/revenue-parts-kwh/{revenuePartsKwh}/csv', 'Project\RevenuePartsKwhController@csv');
        Route::post('project/revenue-parts-kwh/{revenuePartsKwh}/distribution-parts-kwh', 'Project\RevenuePartsKwhController@getRevenueDistributionParts');

        Route::post('project/revenue-parts-kwh/create-energy-supplier-excel/{revenuePartsKwh}', 'Project\RevenuePartsKwhController@reportEnergySupplier');
        Route::post('project/revenue-parts-kwh/{revenuePartsKwh}', 'Project\RevenuePartsKwhController@update');
        Route::post('project/revenue-parts-kwh/{revenuePartsKwh}/delete', 'Project\RevenuePartsKwhController@destroy');

        Route::get('project/participant/grid', 'ParticipationProject\ParticipationProjectController@grid');
        Route::get('project/participant/excel', 'ParticipationProject\ParticipationProjectController@excel');
        Route::get('project/participant/excelParticipants', 'ParticipationProject\ParticipationProjectController@excelParticipants');
        Route::get('project/participant/peek', 'ParticipationProject\ParticipationProjectController@peek');
        Route::get('project/participant/save-as-group', 'ParticipationProject\ParticipationProjectController@saveAsGroup');
        Route::get('project/participant/{participantProject}/peek-members', 'ParticipationProject\ParticipationProjectController@peekContactsMembershipRequired');
        Route::get('project/participant/{participantProject}', 'ParticipationProject\ParticipationProjectController@show');
        Route::post('project/participant', 'ParticipationProject\ParticipationProjectController@store');
        Route::post('project/participant/transfer', 'ParticipationProject\ParticipationProjectController@transfer');
        Route::post('project/participant/create-participant-report/no-pdf/{emailTemplate}', 'ParticipationProject\ParticipationProjectController@createParticipantReportNoPDF');
        Route::post('project/participant/create-participant-report/{documentTemplate}/{emailTemplate}', 'ParticipationProject\ParticipationProjectController@createParticipantReport');
        Route::post('project/participant/preview-email/{emailTemplate}', 'ParticipationProject\ParticipationProjectController@previewEmail');
        Route::post('project/participant/preview-pdf/{documentTemplate}', 'ParticipationProject\ParticipationProjectController@previewPDF');
        Route::post('project/participant/mutation', 'ParticipantMutation\ParticipantMutationController@store');
        Route::post('project/participant/mutation/{participantMutation}', 'ParticipantMutation\ParticipantMutationController@update');
        Route::post('project/participant/mutation/{participantMutation}/delete', 'ParticipantMutation\ParticipantMutationController@destroy');
        Route::post('project/participant/obligation-number', 'ParticipationProject\ObligationNumberController@store');
        Route::post('project/participant/obligation-number/{obligationNumber}', 'ParticipationProject\ObligationNumberController@update');
        Route::post('project/participant/obligation-number/{obligationNumber}/delete', 'ParticipationProject\ObligationNumberController@destroy');
        Route::post('project/participant/peek-by-ids', 'ParticipationProject\ParticipationProjectController@peekParticipantByIds');
        Route::post('project/participant/{participantProject}', 'ParticipationProject\ParticipationProjectController@update');
        Route::post('project/participant/{participantProject}/delete', 'ParticipationProject\ParticipationProjectController@destroy');
        Route::post('project/participant/{participantProject}/terminate', 'ParticipationProject\ParticipationProjectController@terminate');
        Route::post('project/participant/{participantProject}/terminate-obligation', 'ParticipationProject\ParticipationProjectController@terminateObligation');
        Route::post('project/participant/{participantProject}/undo-terminate', 'ParticipationProject\ParticipationProjectController@undoTerminate');

        Route::get('project/grid', 'Project\ProjectController@grid');
        Route::get('project/peek', 'Project\ProjectController@peek');
        Route::get('project/active', 'Project\ProjectController@getActive');
        Route::get('project/chart-status/{project}', 'Project\ProjectController@getChartData');
        Route::get('project/chart-participations-status/{project}', 'Project\ProjectController@getChartDataParticipations');
        Route::get('project/chart-contact-status/{project}', 'Project\ProjectController@getChartDataStatus');
        Route::get('project/{project}', 'Project\ProjectController@show');
        Route::get('project/{project}/obligation-numbers', 'Project\ProjectController@getObligationNumbers');
        Route::post('project', 'Project\ProjectController@store');
        Route::post('project/{project}', 'Project\ProjectController@update');
        Route::post('project/{project}/delete', 'Project\ProjectController@destroy');

        Route::get('postal-code-link/grid', 'PostalCodeLink\PostalCodeLinkController@grid');
        Route::post('postal-code-link', 'PostalCodeLink\PostalCodeLinkController@store');
        Route::post('postal-code-link/{postalCodeLink}', 'PostalCodeLink\PostalCodeLinkController@update');
        Route::post('postal-code-link/{postalCodeLink}/delete', 'PostalCodeLink\PostalCodeLinkController@destroy');


        Route::get('administration/grid', 'Administration\AdministrationController@grid');
        Route::get('administration/peek', 'Administration\AdministrationController@peek');
        Route::get('administration/twinfield-info-administrations', 'Administration\AdministrationController@twinfieldInfoAdministrations');
        Route::get('administration/{administration}', 'Administration\AdministrationController@show');
        Route::get('administration/sepa/{sepa}', 'Administration\AdministrationController@downloadSepa');
        Route::get('administration/{administration}/ledgers', 'Administration\AdministrationController@getLedgers');
        Route::get('administration/{administration}/logo-details', 'Administration\AdministrationController@getLogoDetails');
        Route::get('administration/{administration}/totals-info-administration', 'Administration\AdministrationController@getTotalsInfoAdministration');
        Route::post('administration/sepa/{sepa}/delete', 'Administration\AdministrationController@deleteSepa');
        Route::post('administration', 'Administration\AdministrationController@store');
        Route::post('administration/ledger', 'Administration\AdministrationController@storeLedger');
        Route::post('administration/ledger/{ledger}/update', 'Administration\AdministrationController@updateLedger');
        Route::post('administration/{administration}/ledger/peek', 'Administration\AdministrationController@peekLedgers');
        Route::post('administration/{administration}', 'Administration\AdministrationController@update');
        Route::post('administration/{administration}/sync-contacts-to-twinfield', 'Administration\AdministrationController@syncSentContactsToTwinfield');
        Route::post('administration/{administration}/sync-invoices-to-twinfield', 'Administration\AdministrationController@syncSentInvoicesToTwinfield');
        Route::post('administration/{administration}/sync-invoices-from-twinfield', 'Administration\AdministrationController@syncSentInvoicesFromTwinfield');
        Route::post('administration/{administration}/delete', 'Administration\AdministrationController@destroy');
        Route::post('administration/{administration}/{user}/attach', 'Administration\AdministrationController@attachUser');
        Route::post('administration/{administration}/{user}/detach', 'Administration\AdministrationController@detachUser');

        Route::get('product/grid', 'Product\ProductController@grid');
        Route::get('product/peek', 'Product\ProductController@peek');
        Route::get('product/{product}', 'Product\ProductController@show');
        Route::post('product', 'Product\ProductController@store');
        Route::post('product/price-history', 'Product\ProductController@storePriceHistory');
        Route::post('product/{product}', 'Product\ProductController@update');
        Route::post('product/{product}/delete', 'Product\ProductController@destroy');

        Route::get('order/grid', 'Order\OrderController@grid');
        Route::get('order/csv', 'Order\OrderController@csv');
        Route::get('order/peek', 'Order\OrderController@peek');
        Route::get('order/amount-collection', 'Order\OrderController@getAmountCollection');
        Route::get('order/{order}', 'Order\OrderController@show');
        Route::get('order/{order}/download-preview', 'Order\OrderController@downloadPreview');
        Route::get('order/{order}/email-preview', 'Order\OrderController@getEmailPreview');
        Route::get('order/{contact}/contact-info-for-order', 'Order\OrderController@getContactInfoForOrder');
        Route::post('order', 'Order\OrderController@store');
        Route::post('order/creating', 'Order\OrderController@getOrdersForCreating');
        Route::post('order/create-all', 'Order\OrderController@createAll');
        Route::post('order/order-product', 'Order\OrderController@storeOrderProduct');
        Route::post('order/product-and-order-product', 'Order\OrderController@storeProductAndOrderProduct');
        Route::post('order/product-and-order-product/update', 'Order\OrderController@updateOneTimeProduct');
        Route::post('order/order-product/{orderProduct}/update', 'Order\OrderController@updateOrderProduct');
        Route::post('order/order-product/{orderProduct}/delete', 'Order\OrderController@destroyOrderProduct');
        Route::post('order/{order}', 'Order\OrderController@update');
        Route::post('order/{order}/delete', 'Order\OrderController@destroy');

        Route::get('invoice/grid', 'Invoice\InvoiceController@grid');
        Route::get('invoice/csv', 'Invoice\InvoiceController@csv');
        Route::get('invoice/peek', 'Invoice\InvoiceController@peek');
        Route::post('invoice/sending', 'Invoice\InvoiceController@getInvoicesForSending');
        Route::post('invoice/send-all', 'Invoice\InvoiceController@sendAll');
        Route::get('invoice/amount-unpaid', 'Invoice\InvoiceController@getAmountUnpaid');
        Route::post('invoice/send-all-post', 'Invoice\InvoiceController@sendAllPost');
        Route::post('invoice/create-sepa-for-invoice-ids', 'Invoice\InvoiceController@createSepaForInvoiceIds');
        Route::get('invoice/from-twinfield', 'Invoice\InvoiceController@showFromTwinfield');
        Route::get('invoice/{invoice}', 'Invoice\InvoiceController@show');
        Route::get('invoice/{invoice}/download', 'Invoice\InvoiceController@download');
        Route::get('invoice/{invoice}/email-preview', 'Invoice\InvoiceController@getEmailPreview');
        Route::post('invoice', 'Invoice\InvoiceController@store');
        Route::post('invoice/invoice-product', 'Invoice\InvoiceController@storeInvoiceProduct');
        Route::post('invoice/product-and-invoice-product', 'Invoice\InvoiceController@storeProductAndInvoiceProduct');
        Route::post('invoice/invoice-product/{invoiceProduct}/update', 'Invoice\InvoiceController@updateInvoiceProduct');
        Route::post('invoice/invoice-product/{invoiceProduct}/delete', 'Invoice\InvoiceController@destroyInvoiceProduct');
        Route::post('invoice/send-notifications', 'Invoice\InvoiceController@sendNotifications');
        Route::post('invoice/send-notifications-post', 'Invoice\InvoiceController@sendNotificationsPost');
        Route::post('invoice/set-multiple-paid', 'Invoice\InvoiceController@setMultiplePaid');
        Route::post('invoice/{invoice}', 'Invoice\InvoiceController@update');
        Route::post('invoice/{invoice}/delete', 'Invoice\InvoiceController@destroy');
        Route::post('invoice/{invoice}/irrecoverable', 'Invoice\InvoiceController@setIrrecoverable');
        Route::post('invoice/{invoice}/send', 'Invoice\InvoiceController@send');
        Route::post('invoice/{invoice}/send-post', 'Invoice\InvoiceController@sendPost');
        Route::post('invoice/{invoice}/send-notification', 'Invoice\InvoiceController@sendNotification');
        Route::post('invoice/{invoice}/send-notification-post', 'Invoice\InvoiceController@sendNotificationPost');
        Route::post('invoice/{invoice}/payment/new', 'Invoice\InvoiceController@newPayment');
        Route::post('invoice/{invoicePayment}/payment/update', 'Invoice\InvoiceController@updatePayment');
        Route::post('invoice/payment/{invoicePayment}/delete', 'Invoice\InvoiceController@deletePayment');

        Route::get('payment-invoice/grid', 'PaymentInvoice\PaymentInvoiceController@grid');
        Route::post('payment-invoice/{paymentInvoice}/not-paid', 'PaymentInvoice\PaymentInvoiceController@setNotPaid');

        Route::get('webform/grid', 'Webform\WebformController@grid');
        Route::post('webform', 'Webform\WebformController@store');
        Route::get('webform/{webform}', 'Webform\WebformController@show');
        Route::post('webform/{webform}', 'Webform\WebformController@update');
        Route::post('webform/{webform}/delete', 'Webform\WebformController@delete');

        Route::post('mailgun-event/fetch-from-mailgun', [MailgunEventController::class, 'fetchFromMailgun']);

        Route::get('mailgun-domain/jory', 'Mailbox\MailgunDomainController@jory');
        Route::post('mailgun-domain', 'Mailbox\MailgunDomainController@store');
        Route::post('mailgun-domain/{mailgunDomain}', 'Mailbox\MailgunDomainController@update');

        Route::get('mailgun-domain/{mailgunDomain}/bounce', [MailgunDomainBounceController::class, 'index']);
        Route::post('mailgun-domain/{mailgunDomain}/bounce', [MailgunDomainBounceController::class, 'create']);
        Route::post('mailgun-domain/{mailgunDomain}/bounce/{address}/delete', [MailgunDomainBounceController::class, 'delete']);

        Route::get('mailgun-domain/{mailgunDomain}/complaint', [MailgunDomainComplaintController::class, 'index']);
        Route::post('mailgun-domain/{mailgunDomain}/complaint', [MailgunDomainComplaintController::class, 'create']);
        Route::post('mailgun-domain/{mailgunDomain}/complaint/{address}/delete', [MailgunDomainComplaintController::class, 'delete']);

        Route::get('vat-code/jory', 'VatCode\VatCodeController@jory');
        Route::post('vat-code', 'VatCode\VatCodeController@store');
        Route::post('vat-code/{vatCode}', 'VatCode\VatCodeController@update');

        Route::get('jobs-log/jory', 'JobsLog\JobsLogController@jory');

        Route::get('ledger/jory', 'Ledger\LedgerController@jory');
        Route::post('ledger', 'Ledger\LedgerController@store');
        Route::post('ledger/{ledger}', 'Ledger\LedgerController@update');
        Route::post('ledger/{ledger}/delete', 'Ledger\LedgerController@destroy');

        Route::get('cost-center/jory', 'CostCenter\CostCenterController@jory');
        Route::post('cost-center', 'CostCenter\CostCenterController@store');
        Route::post('cost-center/{costCenter}', 'CostCenter\CostCenterController@update');
        Route::post('cost-center/{costCenter}/delete', 'CostCenter\CostCenterController@destroy');

        Route::get('task-type/jory', 'Task\TaskTypeController@jory');
        Route::post('task-type/{taskType}', 'Task\TaskTypeController@update');
        Route::get('quotation-request-status/jory', 'QuotationRequest\QuotationRequestStatusController@jory');
        Route::post('quotation-request-status/{quotationRequestStatus}', 'QuotationRequest\QuotationRequestStatusController@update');
        Route::get('opportunity-status/jory', 'Opportunity\OpportunityStatusController@jory');
        Route::post('opportunity-status/{opportunityStatus}', 'Opportunity\OpportunityStatusController@update');

        Route::get('setting', 'Setting\SettingController@get');
        Route::get('setting/multiple', 'Setting\SettingController@multiple');
        Route::post('setting', 'Setting\SettingController@store');

        Route::get('financial-overview/jory', 'FinancialOverview\FinancialOverviewController@jory');
        Route::post('financial-overview', 'FinancialOverview\FinancialOverviewController@store');
        Route::post('financial-overview/{financialOverview}', 'FinancialOverview\FinancialOverviewController@update');
        Route::post('financial-overview/{financialOverview}/delete', 'FinancialOverview\FinancialOverviewController@destroy');
        Route::get('financial-overview/{financialOverview}/projects-for-financial-overview', 'FinancialOverview\FinancialOverviewController@getNewProjectsForFinancialOverview');
        Route::get('financial-overview/{financialOverview}/totals-info-financial-overview', 'FinancialOverview\FinancialOverviewController@getTotalsInfoFinancialOverview');

        Route::get('financial-overview-project/grid', 'FinancialOverview\FinancialOverviewProjectController@grid');
        Route::post('financial-overview-project', 'FinancialOverview\FinancialOverviewProjectController@store');
        Route::post('financial-overview-project/{financialOverviewProject}', 'FinancialOverview\FinancialOverviewProjectController@update');
        Route::post('financial-overview-project/{financialOverviewProject}/delete', 'FinancialOverview\FinancialOverviewProjectController@destroy');
        Route::get('financial-overview-project/{financialOverviewProject}/csv', 'FinancialOverview\FinancialOverviewProjectController@csv');

        Route::get('financial-overview-contact/grid', 'FinancialOverview\FinancialOverviewContactController@grid');
        Route::get('financial-overview-contact/{financialOverviewContact}/email-preview', 'FinancialOverview\FinancialOverviewContactController@getEmailPreview');
        Route::get('financial-overview-contact/{financialOverviewContact}/download-preview', 'FinancialOverview\FinancialOverviewContactController@downloadPreview');
        Route::get('financial-overview-contact/{financialOverviewContact}/download', 'FinancialOverview\FinancialOverviewContactController@download');
        Route::get('financial-overview-contact/{financialOverviewContact}/get', 'FinancialOverview\FinancialOverviewContactController@getFinancialOverviewContact');
        Route::post('financial-overview-contact/{financialOverview}/sending/email', 'FinancialOverview\FinancialOverviewContactController@getFinancialOverviewContactsForSendingEmail');
        Route::post('financial-overview-contact/{financialOverview}/sending/post', 'FinancialOverview\FinancialOverviewContactController@getFinancialOverviewContactsForSendingPost');
        Route::post('financial-overview-contact/{financialOverview}/send-all', 'FinancialOverview\FinancialOverviewContactController@sendAll');
        Route::post('financial-overview-contact/{financialOverview}/send-all-post', 'FinancialOverview\FinancialOverviewContactController@sendAllPost');

        Route::get('financial-overview-post/grid', 'FinancialOverview\FinancialOverviewPostController@grid');
        Route::get('financial-overview-post/{financialOverviewPost}/download', 'FinancialOverview\FinancialOverviewPostController@downloadFinancialOverviewPost');
        Route::post('financial-overview-post/{financialOverviewPost}/delete', 'FinancialOverview\FinancialOverviewPostController@deleteFinancialOverviewPost');

        Route::get('portal-settings-layout/jory', 'PortalSettingsLayout\PortalSettingsLayoutController@jory');
        Route::get('portal-settings-layout/default', 'PortalSettingsLayout\PortalSettingsLayoutController@getDefault');
        Route::post('portal-settings-layout', 'PortalSettingsLayout\PortalSettingsLayoutController@store');
        Route::post('portal-settings-layout/{portalSettingsLayout}', 'PortalSettingsLayout\PortalSettingsLayoutController@update');
        Route::post('portal-settings-layout/{portalSettingsLayout}/delete', 'PortalSettingsLayout\PortalSettingsLayoutController@destroy');

        Route::get('portal-settings-dashboard/jory', 'PortalSettingsDashboard\PortalSettingsDashboardController@jory');
        Route::post('portal-settings-dashboard/{portalSettingsDashboard}', 'PortalSettingsDashboard\PortalSettingsDashboardController@update');

        Route::get('portal-settings-dashboard-widget/jory', 'PortalSettingsDashboard\PortalSettingsDashboardWidgetController@jory');
        Route::post('portal-settings-dashboard-widget', 'PortalSettingsDashboard\PortalSettingsDashboardWidgetController@store');
        Route::post('portal-settings-dashboard-widget/{portalSettingsDashboardWidget}', 'PortalSettingsDashboard\PortalSettingsDashboardWidgetController@update');
        Route::post('portal-settings-dashboard-widget/{portalSettingsDashboardWidget}/delete', 'PortalSettingsDashboard\PortalSettingsDashboardWidgetController@destroy');

        Route::get('cooperation', 'Cooperation\CooperationController@show');
        Route::post('cooperation', 'Cooperation\CooperationController@store');
        Route::post('cooperation/{cooperation}', 'Cooperation\CooperationController@update');
        Route::post('cooperation/{cooperation}/sync-all-with-laposta', 'Cooperation\CooperationController@syncAllWithLaposta');
        Route::post('cooperation-hoom-campaign', 'Cooperation\CooperationController@storeHoomCampaign');
        Route::post('cooperation-hoom-campaign/{cooperationHoomCampaign}', 'Cooperation\CooperationController@updateHoomCampaign');
        Route::post('cooperation-hoom-campaign/{cooperationHoomCampaign}/delete', 'Cooperation\CooperationController@destroyHoomCampaign');

        Route::get('free-fields-field/get-for-filter/{tableType}', 'FreeFields\FreeFieldsFieldController@getForFilter');
        Route::get('free-fields-field/grid', 'FreeFields\FreeFieldsFieldController@grid');
        Route::post('free-fields-field/{freeFieldsField}/delete', 'FreeFields\FreeFieldsFieldController@delete');
        Route::post('free-fields-field', 'FreeFields\FreeFieldsFieldController@store');
        Route::get('free-fields-field/{freeFieldsField}', 'FreeFields\FreeFieldsFieldController@show');
        Route::post('free-fields-field/{freeFieldsField}/update', 'FreeFields\FreeFieldsFieldController@update');

        Route::get('free-fields-field-records/get-values', 'FreeFields\FreeFieldsFieldRecordController@getValues');
        Route::post('free-fields-field-records/update-values', 'FreeFields\FreeFieldsFieldRecordController@updateValues');

        Route::get('free-fields-field/free-fields-tables/peek', 'FreeFields\FreeFieldsTableController@peek');
        Route::get('free-fields-field/free-fields-field-formats/peek', 'FreeFields\FreeFieldsFieldFormatController@peek');

        // Apart voor app en portal ivm toepassen aparte middleware
        Route::get('jory', '\\'.JoryController::class.'@multiple')->name('jory.multiple');
        Route::get('jory/{resource}/count', '\\'.JoryController::class.'@count');
        Route::get('jory/{resource}/{id}', '\\'.JoryController::class.'@find');
        Route::get('jory/{resource}', '\\'.JoryController::class.'@get')->name('jory.get');
    });

Route::namespace('Api')
    ->middleware(['auth:api', 'scopes:use-app'])
    ->group(function () {
        Route::middleware([\App\Http\Middleware\CheckPasswordConfirmationHeader::class])->group(function () {
            Route::get('/me/check-password', [\App\Http\Controllers\Api\User\UserController::class, 'checkPassword']);
            Route::post('me/two-factor-authentication', [\App\Http\Controllers\Auth\TwoFactorAuthenticationController::class, 'store']);
            Route::post('me/two-factor-authentication/delete', [\App\Http\Controllers\Auth\TwoFactorAuthenticationController::class, 'destroy']);
            Route::get('me/two-factor-qr-code', [\App\Http\Controllers\Auth\TwoFactorQrCodeController::class, 'show']);
            Route::get('me/two-factor-recovery-codes', [\App\Http\Controllers\Auth\RecoveryCodeController::class, 'index']);
        });

        Route::get('me/two-factor-status', [\App\Http\Controllers\Auth\TwoFactorAuthenticationController::class, 'status']);
        Route::post('me/hide-two-factor-notification', [\App\Http\Controllers\Auth\ConfirmedTwoFactorAuthenticationController::class, 'hideNotification']);
        Route::post('me/confirmed-two-factor-authentication', [\App\Http\Controllers\Auth\ConfirmedTwoFactorAuthenticationController::class, 'store']);
        Route::post('me/two-factor-challenge', [\App\Http\Controllers\Auth\RecoveryCodeController::class, 'recover']);
    });

Route::namespace('Api')
    ->group(function () {
        Route::post('webform/external/{apiKey}', 'Webform\ExternalWebformController@post');
        Route::post('{apiKey}/hoomdossier/woonplan', 'Hoomdossier\EndPointWoonplanController@post');
        Route::post('{apiKey}/hoomdossier/afspraak', 'Hoomdossier\EndPointAfspraakController@post');
        Route::post('{apiKey}/hoomdossier/gebruik', 'Hoomdossier\EndPointGebruikController@post');
        Route::post('{apiKey}/hoomdossier/woning-status', 'Hoomdossier\EndPointWoningStatusController@post');
        Route::post('{apiKey}/hoomdossier/scan-status', 'Hoomdossier\EndPointScanStatusController@post');
        Route::post('{apiKey}/hoomdossier/pdf', 'Hoomdossier\EndPointPdfController@post');
        Route::post('{apiKey}/hoomdossier/delete', 'Hoomdossier\EndPointDeleteHoomDossierController@post');

        Route::post('mollie/webhook', [InvoiceMolliePaymentController::class, 'webhook'])->name('mollie.webhook');
    });
Route::namespace('Api')
    ->middleware([EncryptCookies::class, StartSession::class])
    ->group(function () {
        Route::get('oauth/ms-azure/callback', [MailboxController::class, 'msOauthApiConnectionCallback'])->name('oauth.ms-azure.callback');
    });

