<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('origins', function (Blueprint $table) {
            $table->id();
            $table->text('name')->nullable();
            $table->text('src')->nullable();
            $table->text('skills')->nullable();
            $table->text('tool_skills')->nullable();
            $table->text('start_equipment')->nullable();
            $table->text('md_description')->nullable();
            $table->timestamp('created_at');
            $table->timestamp('updated_at')->nullable();
        });

        DB::statement("
            CREATE TRIGGER origins_timestamps
            BEFORE INSERT OR UPDATE ON origins
            FOR EACH ROW
            EXECUTE FUNCTION update_timestamps();
        ");
    }

    public function down(): void
    {
        DB::statement("DROP TRIGGER IF EXISTS origins_timestamps ON origins;");

        Schema::dropIfExists('origins');
    }
};
