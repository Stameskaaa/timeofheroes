<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('worlds_origins_map', function (Blueprint $table) {
            $table->bigInteger('world_id')->nullable();
            $table->bigInteger('origin_id')->nullable();
            $table->timestamp('created_at');
            $table->timestamp('updated_at')->nullable();
        });

        DB::statement("
            CREATE TRIGGER worlds_origins_map_timestamps
            BEFORE INSERT OR UPDATE ON worlds_origins_map
            FOR EACH ROW
            EXECUTE FUNCTION update_timestamps();
        ");
    }

    public function down(): void
    {
        DB::statement("DROP TRIGGER IF EXISTS worlds_origins_map_timestamps ON worlds_origins_map;");

        Schema::dropIfExists('worlds_origins_map');
    }
};
