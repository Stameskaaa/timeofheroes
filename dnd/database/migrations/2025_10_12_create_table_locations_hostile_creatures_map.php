<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('locations_hostile_creatures_map', function (Blueprint $table) {
            $table->bigInteger('location_id')->nullable();
            $table->bigInteger('hostile_creature_id')->nullable();
            $table->timestamp('created_at');
            $table->timestamp('updated_at')->nullable();
        });

        DB::statement("
            CREATE TRIGGER locations_hostile_creatures_map_timestamps
            BEFORE INSERT OR UPDATE ON locations_hostile_creatures_map
            FOR EACH ROW
            EXECUTE FUNCTION update_timestamps();
        ");
    }

    public function down(): void
    {
        DB::statement("DROP TRIGGER IF EXISTS locations_hostile_creatures_map_timestamps ON locations_hostile_creatures_map;");

        Schema::dropIfExists('locations_hostile_creatures_map');
    }
};
