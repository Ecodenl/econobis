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

    public function getTicket($username, $password)
    {
        $curl = curl_init();

        curl_setopt_array($curl, array(
            CURLOPT_SSL_VERIFYPEER => false,
            CURLOPT_SSL_VERIFYHOST => false,
            CURLOPT_PORT => "8443",
            CURLOPT_URL => "https://185.63.154.15:8443/alfresco/api/-default-/public/authentication/versions/1/tickets",
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => "",
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 30,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => "POST",
            CURLOPT_POSTFIELDS => "{\n\t\"userId\": \"$username\",\n\t\"password\": \"$password\"\n}",
            CURLOPT_HTTPHEADER => array(
                "Cache-Control: no-cache",
                "Content-Type: application/json",
            ),
        ));

        $response = curl_exec($curl);
        $err = curl_error($curl);

        curl_close($curl);

        if ($err) {
            return("cURL Error #:" . $err);
        } else {
            $response = json_decode($response, true);
            return base64_encode($response['entry']['id']);
        }
    }

    public function createNewAccount(User $user){
        $prefix = optional($user->lastNamePrefix)->name;

        if($prefix){
            $lastname = $prefix . ' ' . $user->last_name;
        }
        else{
            $lastname = $user->last_name;
        }
        $curl = curl_init();

        curl_setopt_array($curl, array(
            CURLOPT_SSL_VERIFYPEER => false,
            CURLOPT_SSL_VERIFYHOST => false,
            CURLOPT_PORT => "8443",
            CURLOPT_URL => "https://185.63.154.15:8443/alfresco/api/-default-/public/alfresco/versions/1/people",
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => "",
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 30,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => "POST",
            CURLOPT_POSTFIELDS => "{\r\n  \"id\": \"$user->email\",\"firstName\": \"$user->first_name\",\"lastName\": \"$lastname\",\r\n  \"email\": \"$user->email\",\"password\": \"$user->alfresco_password\"}",
            CURLOPT_HTTPHEADER => array(
                "Accept: application/json",
                "Authorization: Basic " . $this->ticket,
                "Cache-Control: no-cache",
                "Content-Type: application/json",
            ),
        ));

        $response = curl_exec($curl);
        $err = curl_error($curl);

        curl_close($curl);

        if ($err) {
            return "cURL Error #:" . $err;
        } else {
            $response = $this->assignUserToSite($user->email);
            return $response;
        }
    }


    public function assignUserToSite($alfresco_username){

        $curl = curl_init();

        curl_setopt_array($curl, array(
            CURLOPT_SSL_VERIFYPEER => false,
            CURLOPT_SSL_VERIFYHOST => false,
            CURLOPT_PORT => "8443",
            CURLOPT_URL => "https://185.63.154.15:8443/alfresco/api/-default-/public/alfresco/versions/1/sites/". env('ALFRESCO_SITE_ID'). "/members",
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => "",
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 30,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => "POST",
            CURLOPT_POSTFIELDS => "{\"role\": \"SiteCollaborator\",\"id\": \"$alfresco_username\"}",
            CURLOPT_HTTPHEADER => array(
                "Accept: application/json",
                "Authorization: Basic " . $this->ticket,
                "Cache-Control: no-cache",
                "Content-Type: application/json",
            ),
        ));

        $response = curl_exec($curl);
        $err = curl_error($curl);

        curl_close($curl);

        if ($err) {
            return "cURL Error #:" . $err;
        } else {
            return json_decode($response, true);
        }
    }

    public function createFile($file, $filename, $map){
        //first get site node
        $curl = curl_init();

        curl_setopt_array($curl, array(
            CURLOPT_SSL_VERIFYPEER => false,
            CURLOPT_SSL_VERIFYHOST => false,
            CURLOPT_PORT => "8443",
            CURLOPT_URL => "https://185.63.154.15:8443/alfresco/api/-default-/public/alfresco/versions/1/sites/" . env('ALFRESCO_SITE_MAP'),
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => "",
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 30,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => "GET",
            CURLOPT_HTTPHEADER => array(
                "Accept: ",
                "Authorization: Basic " . $this->ticket,
                "Cache-Control: no-cache",
            ),
        ));

        $response = curl_exec($curl);
        $err = curl_error($curl);

        curl_close($curl);

        if ($err) {
            dd("cURL Error #:" . $err);
        } else {
            $response = json_decode($response, true);
            $siteNodeId =  $response['entry']['guid'];
        }

        //post file
        $curl = curl_init();

        curl_setopt_array($curl, array(
            CURLOPT_SSL_VERIFYPEER => false,
            CURLOPT_SSL_VERIFYHOST => false,
            CURLOPT_PORT => "8443",
            CURLOPT_URL => "https://185.63.154.15:8443/alfresco/api/-default-/public/alfresco/versions/1/nodes/". $siteNodeId . "/children",
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => "",
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 30,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => "POST",
            CURLOPT_HTTPHEADER => array(
                "Accept: application/json",
                "Authorization: Basic " . $this->ticket,
                "Cache-Control: no-cache",
                "Content-Type: multipart/form-data",
            ),
        ));

        $args['name'] = $filename;
        $args['autoRename'] = 'true';
        $args['relativePath'] = '/documentLibrary/' . $map;
        $args['filedata'] = new \CURLFile($file);

        curl_setopt($curl, CURLOPT_POSTFIELDS, $args);

        $response = curl_exec($curl);
        $err = curl_error($curl);

        curl_close($curl);

        if ($err) {
            dd("cURL Error #:" . $err);
        } else {
            return json_decode($response, true);
        }
    }

    public function downloadFile($file_node){
        $curl = curl_init();

        curl_setopt_array($curl, array(
            CURLOPT_SSL_VERIFYPEER => false,
            CURLOPT_SSL_VERIFYHOST => false,
            CURLOPT_PORT => "8443",
            CURLOPT_URL => "https://185.63.154.15:8443/alfresco/api/-default-/public/alfresco/versions/1/nodes/". $file_node . "/content",
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => "",
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 30,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => "GET",
            CURLOPT_HTTPHEADER => array(
                "Accept: application/json",
                "Authorization: Basic " . $this->ticket,
                "Cache-Control: no-cache",
            ),
        ));

        $response = curl_exec($curl);
        $err = curl_error($curl);

        curl_close($curl);

        if ($err) {
            return "cURL Error #:" . $err;
        } else {
            return $response;
        }
    }

}