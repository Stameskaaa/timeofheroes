<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('origins_features_map', function (Blueprint $table) {
            $table->bigInteger('origin_id')->nullable();
            $table->bigInteger('feature_id')->nullable();
            $table->timestamp('created_at');
            $table->timestamp('updated_at')->nullable();
        });

        DB::statement("
            CREATE TRIGGER origins_features_map_timestamps
            BEFORE INSERT OR UPDATE ON origins_features_map
            FOR EACH ROW
            EXECUTE FUNCTION update_timestamps();
        ");
    }

    public function down(): void
    {
        DB::statement("DROP TRIGGER IF EXISTS origins_features_map_timestamps ON origins_features_map;");

        Schema::dropIfExists('origins_features_map');
    }
};
