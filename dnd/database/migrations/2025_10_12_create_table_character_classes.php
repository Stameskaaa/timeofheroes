<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('character_classes', function (Blueprint $table) {
            $table->id();
            $table->text('src')->nullable();
            $table->text('name')->nullable();
            $table->text('dice_hit')->nullable();
            $table->text('saving_throws_ids')->nullable();
            $table->text('skills')->nullable();
            $table->text('weapon_skills')->nullable();
            $table->text('tool_skills')->nullable();
            $table->text('armor_ids')->nullable();
            $table->text('start_equipment')->nullable();
            $table->text('md_description')->nullable();
            $table->text('md_table_data')->nullable();
            $table->json('subclass_skills')->nullable();
            $table->timestamp('created_at');
            $table->timestamp('updated_at')->nullable();
        });

        DB::statement("
            CREATE TRIGGER character_classes_timestamps
            BEFORE INSERT OR UPDATE ON character_classes
            FOR EACH ROW
            EXECUTE FUNCTION update_timestamps();
        ");
    }

    public function down(): void
    {
        DB::statement("DROP TRIGGER IF EXISTS character_classes_timestamps ON character_classes;");

        Schema::dropIfExists('character_classes');
    }
};
