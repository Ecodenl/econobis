<?php
/**
 * Created by PhpStorm.
 * User: StagiarSoftware
 * Date: 19-1-2018
 * Time: 11:55
 */

namespace App\Helpers\Address;

use App\Eco\Address\Address;
use App\Eco\Administration\Administration;
use App\Eco\Contact\Contact;
use App\Eco\Contact\ContactType;
use App\Eco\Project\Project;

class AddressHelper
{
    public array $messages;

    private $regexPostalCode = '~\A[1-9]\d{3}?[a-zA-Z]{2}\z~';
    private $contact;
    private $address;

    /**
     * TwinfieldHelper constructor.
     *
     * @param Administration $administration
     */
    public function __construct(Contact $contact, Address $address)
    {
        $this->contact = $contact;
        $this->address = $address;
    }


    /**
     * @param Address $address
     * @return bool
     */
    public function checkDoubleAddressAllowed($abort): bool
    {
        foreach ($this->contact->participations as $participation) {
            if ($participation->project->check_double_addresses) {
                if( $this->checkDoubleAddress($participation->project) ) {
                    if($abort){
                        abort(412, 'Er is al een deelnemer ingeschreven op dit adres die meedoet aan een SCE project.');
                    }
                    $this->messages = 'Er is al een deelnemer ingeschreven op dit adres die meedoet aan een SCE project.';
                    return false;
                }
            }
        }
        return true;
    }

    public function checkDoubleAddress(Project $project)
    {
        // For SCE projects with check on double addresses (as long as subsidy isn't provided):
        // Check if all addresses of contact don't already exists as address of other participants.
        $contactAddressesParticipants = [];
        foreach ($project->participantsProject as $participant){
            if($this->contact->id != $participant->contact->id){
                $contactAddressesParticipants = array_unique(array_merge($contactAddressesParticipants, $participant->contact->addressesActive->pluck('id', 'postalCodeNumberAddition')->toArray()));
            }
        }

        $addressIsDouble = false;
        if( array_key_exists($this->address->postalCodeNumberAddition, $contactAddressesParticipants) ){
            $addressIsDouble = true;
        }

        return $addressIsDouble;
    }

    public function checkAddress($projectId, $abort)
    {
        // Bij personen alleen checken indien primary address
        if($this->contact->type_id === ContactType::PERSON && !$this->address->primary) {
            return true;
        }
        // Bij organisaties alleen checken indien eerste visit address
        if($this->contact->type_id === ContactType::ORGANISATION) {
            if($this->contact->addressForPostalCodeCheck && $this->contact->addressForPostalCodeCheck->id !== $this->address->id ) {
                return true;
            }
            if(!$this->contact->addressForPostalCodeCheck && $this->address->type_id !== 'visit' ) {
                return true;
            }
        }

        $messages = [];

        if ($projectId) {
            $project = Project::find($projectId);
            if($project){
                $messages = $this->checkAddressProject($project, $this->address, $messages);
            }
        } else {
            foreach ($this->contact->participations as $participation) {
                $messages = $this->checkAddressProject($participation->project, $this->address, $messages);
            }
        }
        if( !empty($messages) )
        {
            if($abort){
                abort(412, implode(';', $messages));
            }else{
                $this->messages = $messages;
                return false;
            }
        }

        return true;
    }

    private function checkAddressProject($project, Address $address, array $messages): array
    {
        $validPostalCodeAreas = [];
        $checkPostalCodeAreas = false;
        $validPostalCodes = [];
        $checkPostalCodes = false;
        $validAddressNumbers = [];
        $checkAddressNumbers = false;
        $validAddressNumberAdditions = [];
        $checkAddressNumberAdditions = false;

        if ($project->check_postalcode_link && !empty($project->postalcode_link)) {

            $oneFullPostalCode = preg_match($this->regexPostalCode, $project->postalcode_link, $matches);
            if ($oneFullPostalCode && (!empty($project->address_number_series))) {
                $checkPostalCodes = true;
                $validPostalCodes[] = strtoupper($project->postalcode_link);

                // Check / get array address number series from address_number_series. Address number series may be separted by a  comma ('1,2:5,6-a');
                if (strpos($project->address_number_series, ',') !== false) {
                    $addressNumberSeries = explode(',', $project->address_number_series);
                } else {
                    $addressNumberSeries[] = $project->address_number_series;
                }

                $addressNumberSeriesArrayFormated = [];
                foreach ($addressNumberSeries as $addressNumberSerie) {
                    // Get address numbers from ranges (2:5 is range for address numbers 2,3,4,5);
                    if (strpos($addressNumberSerie, ':') !== false) {
                        $addressNumberSeriesArrayFormated[] = str_replace(":", " t/m ", $addressNumberSerie);

                        $checkAddressNumbers = true;
                        $begin = substr($addressNumberSerie, 0, strpos($addressNumberSerie, ':'));
                        $end = substr($addressNumberSerie, strpos($addressNumberSerie, ':') + 1);
                        if (is_numeric($begin) && is_numeric($end) && $begin <= $end) {
                            for ($number = $begin; $number <= $end; $number++) {
                                $validAddressNumbers[] = strval($number);
                            }
                        }
                    } else {
                        $addressNumberSeriesArrayFormated[] = $addressNumberSerie;

                        // Get address numbers with additions (6-a is address number 6 with addition a);
                        if (strpos($addressNumberSerie, '-') !== false) {
                            $checkAddressNumberAdditions = true;
                            $validAddressNumberAdditions[] = strtoupper($addressNumberSerie);
                        } else {
                            $checkAddressNumbers = true;
                            $validAddressNumbers[] = strtoupper($addressNumberSerie);
                        }
                    }
                }
            } else {

                // Check / get array postalcodes from postalcode_link. Postalcodes may be separted by a comma+space ('1001, 1002') or comma ('1001,1002') or space ('1001 1002');
                if (strpos($project->postalcode_link, ',') !== false) {
                    $projectPostalcodeLink = str_replace(" ", "", $project->postalcode_link);
                    $postalCodes = explode(',', $projectPostalcodeLink);
                } else {
                    $postalCodes = explode(' ', $project->postalcode_link);
                }

                foreach ($postalCodes as $postalCode) {
                    // Split full postalcodes and postalcodeareas
                    $isFullPostalCode = preg_match($this->regexPostalCode, $postalCode, $matches);
                    if ($isFullPostalCode) {
                        $checkPostalCodes = true;
                        $validPostalCodes[] = strtoupper($postalCode);
                    } else {
                        $checkPostalCodeAreas = true;
                        $validPostalCodeAreas[] = $postalCode;
                    }
                }
            }

            if ($checkAddressNumbers || $checkAddressNumberAdditions) {
                if ($addressNumberSeriesArrayFormated) {
                    $addressNumberSeriesFormated = implode(',', $addressNumberSeriesArrayFormated);
                }

                $addressNumberContact = $address->number;
                $addressNumberAdditionContact = strtoupper(str_replace(" ", "", $address->number . '-' . $address->addition));
                $postalcodeLink = strtoupper(str_replace(",", ", ", $project->postalcode_link));
                $addressNumberSeriesFormated = str_replace(",", ", ", $addressNumberSeriesFormated);
                if (!in_array($addressNumberContact, $validAddressNumbers) && !in_array($addressNumberAdditionContact, $validAddressNumberAdditions)) {
                    $messages[] = 'Je kunt niet meedoen in dit project omdat je postcode/huisnummer ' . $address->postal_code . ' nr. ' .  $address->number . ($address->addition ? '-' : '') . ' niet valt binnen postcode gebied "' . $postalcodeLink . '" nr(s) "' . $addressNumberSeriesFormated . '" bij project ' . $project->name . ".";
                    return $messages;
                }
            }

            if ($checkPostalCodeAreas || $checkPostalCodes) {
                $postalCodeAreaContact = substr($address->postal_code, 0, 4);
                $postalCodeContact = strtoupper(str_replace(" ", "", $address->postal_code));
                $postalcodeLink = strtoupper(str_replace(",", ", ", $project->postalcode_link));
                if (!in_array($postalCodeAreaContact, $validPostalCodeAreas) && !in_array($postalCodeContact, $validPostalCodes)) {
                    $messages[] = 'Je kunt niet meedoen in dit project omdat je postcode/huisnummer ' . $address->postal_code . ' nr. ' .  $address->number . ($address->addition ? '-' : '') . ' niet valt binnen postcode gebied "' . $postalcodeLink . '" bij project ' . $project->name . ".";
                    return $messages;
                }
            }
        }
        return $messages;
    }
}