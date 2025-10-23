<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('hostile_creatures', function (Blueprint $table) {
            $table->id();
            $table->text('name')->nullable();
            $table->text('src')->nullable();
            $table->text('type')->nullable();
            $table->text('short_description')->nullable();
            $table->text('md_description')->nullable();
            $table->text('status')->nullable();
            $table->text('md_history')->nullable();
            $table->text('md_fun_facts')->nullable();
            $table->text('md_statblock')->nullable();
            $table->text('size_id')->nullable();
            $table->text('type_id')->nullable();
            $table->text('hp')->nullable();
            $table->text('speed')->nullable();
            $table->integer('armor_class')->nullable();
            $table->text('saving_throws')->nullable();
            $table->text('skills')->nullable();
            $table->json('damage_immunities')->nullable();
            $table->jsonb('condition_immunities')->nullable();
            $table->jsonb('damage_resistance')->nullable();
            $table->jsonb('condition_resistance')->nullable();
            $table->text('senses')->nullable();
            $table->text('language')->nullable();
            $table->text('challenge')->nullable();
            $table->integer('proficiency_bonus')->nullable();
            $table->jsonb('characteristics')->nullable();
            $table->timestamp('created_at');
            $table->timestamp('updated_at')->nullable();
        });

        DB::statement("
            CREATE TRIGGER hostile_creatures_timestamps
            BEFORE INSERT OR UPDATE ON hostile_creatures
            FOR EACH ROW
            EXECUTE FUNCTION update_timestamps();
        ");
    }

    public function down(): void
    {
        DB::statement("DROP TRIGGER IF EXISTS hostile_creatures_timestamps ON hostile_creatures;");

        Schema::dropIfExists('hostile_creatures');
    }
};
