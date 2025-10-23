<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('spells_character_classes_map', function (Blueprint $table) {
            $table->bigInteger('spell_id')->nullable();
            $table->bigInteger('character_class_id')->nullable();
            $table->timestamp('created_at');
            $table->timestamp('updated_at')->nullable();
        });

        DB::statement("
            CREATE TRIGGER spells_character_classes_map_timestamps
            BEFORE INSERT OR UPDATE ON spells_character_classes_map
            FOR EACH ROW
            EXECUTE FUNCTION update_timestamps();
        ");
    }

    public function down(): void
    {
        DB::statement("DROP TRIGGER IF EXISTS spells_character_classes_map_timestamps ON spells_character_classes_map;");

        Schema::dropIfExists('spells_character_classes_map');
    }
};
