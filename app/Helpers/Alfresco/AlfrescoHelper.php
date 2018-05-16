<?php
/**
 * Created by PhpStorm.
 * User: StagiarSoftware
 * Date: 19-1-2018
 * Time: 11:55
 */

namespace App\Helpers\Alfresco;


use App\Eco\User\User;

class AlfrescoHelper
{
    private $ticket;

    public function __construct($username, $password)
    {
        $this->ticket = $this->getTicket($username, $password);
    }

    /**
     * @param $username String username in Alfresco(User email)
     * @param $password String password in Alfresco(User alfresco_password)
     *
     * @return mixed|string if success returns ticket, else return curl error message
     */
    public function getTicket($username, $password)
    {
        if($password === ''){
            abort(403);
        }
        $url = \Config::get('app.ALFRESCO_URL') . '/authentication/versions/1/tickets';
        $args['userId'] = $username;
        $args['password'] = $password;

        $response = $this->executeCurl($url, $args);

        return base64_encode($response['message']['entry']['id']);

    }

    public function createNewAccount(User $user){
        $prefix = optional($user->lastNamePrefix)->name;

        if($prefix){
            $lastname = $prefix . ' ' . $user->last_name;
        }
        else{
            $lastname = $user->last_name;
        }

        $exists = $this->checkIfAccountExists($user);

        if (!$exists) {
            $url = \Config::get('app.ALFRESCO_URL')
                . '/alfresco/versions/1/people';

            $args['id'] = $user->email;
            $args['firstName'] = $user->first_name;
            $args['lastName'] = $lastname;
            $args['email'] = $user->email;
            $args['password'] = $user->alfresco_password;

            $this->executeCurl($url, $args);
        } else {
            $valid = $this->checkIfValidAccount($user);
            if(!$valid){
                abort(424, 'Gebruiker bestaat al in Alfresco, maar het wachtwoord is verkeerd ingevuld.');
            }
        }

        $response = $this->assignUserToSite($user->email);

        return $response;
    }

    public function checkIfAccountExists(User $user){
        $url = \Config::get('app.ALFRESCO_URL') . '/alfresco/versions/1/people/' . $user->email;

        $response = $this->executeCurl($url, null, 'application/json', false, false);

        $exists = true;

        if($response === null){
            $exists = false;
        }

        return $exists;

    }

    public function checkIfValidAccount(User $user){
        $url = \Config::get('app.ALFRESCO_URL') . '/authentication/versions/1/tickets';
        $args['userId'] = $user->email;
        $args['password'] = $user->alfresco_password;

        $response = $this->executeCurl($url, $args, 'application/json', false, false);

        $valid = true;

        if($response === null){
            $valid = false;
        }

        return $valid;
    }

    public function assignUserToSite($alfresco_username){

        $url = \Config::get('app.ALFRESCO_URL') . "/alfresco/versions/1/sites/" . \Config::get('app.ALFRESCO_SITE_MAP') . "/members";

        $args['role'] = 'SiteContributor';
        $args['id'] = $alfresco_username;

        $response = $this->executeCurl($url, $args);

        return $response['message'];
    }

    public function createFile($file, $filename, $map){

        $url = \Config::get('app.ALFRESCO_URL') . "/alfresco/versions/1/sites/" . \Config::get('app.ALFRESCO_SITE_MAP');

        $response = $this->executeCurl($url);

        if($response['succes']){
            $siteNodeId =  $response['message']['entry']['guid'];
        }else{
            return $response['message'];
        }

        $url = \Config::get('app.ALFRESCO_URL') . "/alfresco/versions/1/nodes/". $siteNodeId . "/children";

        $args['name'] = $filename;
        $args['autoRename'] = 'true';
        $args['relativePath'] = '/documentLibrary/Econobis/' . $map;
        $args['filedata'] = new \CURLFile($file);

        $content_type = 'multipart/form-data';

        $response = $this->executeCurl($url, $args, $content_type);

        return $response['message'];
    }

    public function downloadFile($file_node){

        $url = \Config::get('app.ALFRESCO_URL') . "/alfresco/versions/1/nodes/". $file_node . "/content";

        $response = $this->executeCurl($url, null, 'application/json', true);

        return $response;
    }

    /**
     * @param        $CURLOPT_URL                     string The Alfresco API url
     * @param null   $CURLOPT_POSTFIELDS              Array with the fields to be posted, if present curl will be post instead of get
     * @param string $CURLOPT_HTTPHEADER_CONTENT_TYPE string the content type
     *
     * @param bool   $is_file boolean If response file
     *
     * @return array
     */
    public function executeCurl($CURLOPT_URL, $CURLOPT_POSTFIELDS = null, $CURLOPT_HTTPHEADER_CONTENT_TYPE = 'application/json', $is_file = false, $abort_on_error = true){
        $curl = curl_init();

        curl_setopt_array($curl, array(
            CURLOPT_SSL_VERIFYPEER => \Config::get('app.ALFRESCO_SSL_VERIFYPEER'),
            CURLOPT_SSL_VERIFYHOST => \Config::get('app.ALFRESCO_SSL_VERIFYHOST'),
            CURLOPT_PORT => "443",
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => "",
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 30,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        ));

        curl_setopt($curl, CURLOPT_URL, $CURLOPT_URL);


        if($CURLOPT_POSTFIELDS){
            curl_setopt($curl, CURLOPT_CUSTOMREQUEST, 'POST');

            if($CURLOPT_HTTPHEADER_CONTENT_TYPE == 'application/json') {
                curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode($CURLOPT_POSTFIELDS));
            }
            else{
                curl_setopt($curl, CURLOPT_POSTFIELDS, $CURLOPT_POSTFIELDS);
            }

            $CURLOPT_HTTPHEADER =  array(
                "Accept: application/json",
                "Authorization: Basic " . $this->ticket,
                "Cache-Control: no-cache",
                "Content-Type: " . $CURLOPT_HTTPHEADER_CONTENT_TYPE,
            );
            curl_setopt($curl, CURLOPT_HTTPHEADER, $CURLOPT_HTTPHEADER);
        }
        else{
            curl_setopt($curl, CURLOPT_CUSTOMREQUEST, 'GET');
            $CURLOPT_HTTPHEADER =  array(
                "Accept: application/json",
                "Authorization: Basic " . $this->ticket,
                "Cache-Control: no-cache",
            );

            curl_setopt($curl, CURLOPT_HTTPHEADER, $CURLOPT_HTTPHEADER);
        }

        $response = curl_exec($curl);
        $err = curl_error($curl);

        curl_close($curl);

        //catch curl errors
        if (false) {

            //$err = json_decode($err);
            // abort($err['error']['statusCode']);
        }
        else {
            if($is_file) {
                return $response;
            }
            else{
                $decoded_response = json_decode($response, true);

                //catch alfresco errors
                    if (array_key_exists('error', $decoded_response)) {
                        if($abort_on_error) {
                            abort($decoded_response['error']['statusCode']);
                        }
                    }

                //else success
                else {
                    return [
                        'succes' => true,
                        'message' => $decoded_response
                    ];
                }
            }
        }
    }

}