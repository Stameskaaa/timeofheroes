<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('npcs', function (Blueprint $table) {
            $table->id();
            $table->text('name')->nullable();
            $table->text('src')->nullable();
            $table->text('status')->nullable();
            $table->text('fraction')->nullable();
            $table->text('short_description')->nullable();
            $table->text('md_description')->nullable();
            $table->text('md_history')->nullable();
            $table->text('md_fun_facts')->nullable();
            $table->timestamp('created_at');
            $table->timestamp('updated_at')->nullable();
        });

        DB::statement("
            CREATE TRIGGER npcs_timestamps
            BEFORE INSERT OR UPDATE ON npcs
            FOR EACH ROW
            EXECUTE FUNCTION update_timestamps();
        ");
    }

    public function down(): void
    {
        DB::statement("DROP TRIGGER IF EXISTS npcs_timestamps ON npcs;");

        Schema::dropIfExists('npcs');
    }
};
