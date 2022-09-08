<?php

namespace App\Console\Commands;

use App\Eco\Contact\Contact;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

class alterTablePcrTableOzon extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'pcr:alterTablePcrTableOzon';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Herstel design velden postcode, eancode en klantnaam in pcr tabel';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $this->doAlterTablePcrTableOzon();
//        dd('Einde Herstel ontbrekende portal registration codes.');
    }

    /**
     *
     */
    public function doAlterTablePcrTableOzon()
    {
//        print_r("Start Herstel design velden postcode, eancode en klantnaam in pcr tabel.\n");

        if (Schema::hasTable('pcr' )) {
//            print_r("Heeft pcr tabel.\n");
            DB::statement('ALTER TABLE `pcr` CHANGE `postcode` `postcode` VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL;');
            DB::statement('ALTER TABLE `pcr` CHANGE `eancode` `eancode` VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL;');
            DB::statement('ALTER TABLE `pcr` CHANGE `klantnaam` `klantnaam` VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL;');
//            print_r("Design postcode, eancode and klantnaam aangepast in  tabel pcr.\n");
//        } else {
//            print_r("heeft geen pcr tabel.\n");
        }
    }
}
