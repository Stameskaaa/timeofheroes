<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('spells', function (Blueprint $table) {
            $table->id();
            $table->text('name')->nullable();
            $table->integer('level')->nullable();
            $table->integer('school_id')->nullable();
            $table->text('casting_time')->nullable();
            $table->text('duration')->nullable();
            $table->text('distance')->nullable();
            $table->text('short_description')->nullable();
            $table->text('md_description')->nullable();
            $table->text('components_list')->nullable();
            $table->timestamp('created_at');
            $table->timestamp('updated_at')->nullable();
        });

        DB::statement("
            CREATE TRIGGER spells_timestamps
            BEFORE INSERT OR UPDATE ON spells
            FOR EACH ROW
            EXECUTE FUNCTION update_timestamps();
        ");
    }

    public function down(): void
    {
        DB::statement("DROP TRIGGER IF EXISTS spells_timestamps ON spells;");

        Schema::dropIfExists('spells');
    }
};
