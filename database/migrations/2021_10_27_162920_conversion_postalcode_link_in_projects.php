<?php

use App\Eco\Project\Project;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ConversionPostalcodeLinkInProjects extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $projects = Project::withTrashed()->whereNotNull('postalcode_link')->get();
        foreach ($projects as $project){

            // Check /postalcode_link. Postalcodes may be separted by a comma+space ('1001, 1002') => remove spaces ('1001,1002') or space ('1001 1002') => replace space with comma ('1001,1002');
            if (strpos($project->postalcode_link, ',') !== false) {
                $projectPostalcodeLink = str_replace(" ", "", $project->postalcode_link);
            } else {
                $projectPostalcodeLink = str_replace(" ", ",", $project->postalcode_link);
            }
            // If more than 1 space was used between postalcodes, then eliminate double comma's
            while (strpos($projectPostalcodeLink, ',,') !== false) {
                $projectPostalcodeLink = str_replace(",,", ",", $projectPostalcodeLink);
            }

            $project->postalcode_link = $projectPostalcodeLink;
            $project->save();
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
