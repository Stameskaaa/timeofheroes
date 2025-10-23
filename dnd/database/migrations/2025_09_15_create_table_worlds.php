<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('worlds', function (Blueprint $table) {
            $table->id();
            $table->text('src')->nullable();
            $table->text('name')->nullable();
            $table->text('short_description')->nullable();
            $table->text('md_description')->nullable();
            $table->text('md_history')->nullable();
            $table->timestamp('created_at');
            $table->timestamp('updated_at')->nullable();
        });

        DB::statement("
            CREATE TRIGGER worlds_timestamps
            BEFORE INSERT OR UPDATE ON worlds
            FOR EACH ROW
            EXECUTE FUNCTION update_timestamps();
        ");
    }

    public function down(): void
    {
        DB::statement("DROP TRIGGER IF EXISTS worlds_timestamps ON worlds;");

        Schema::dropIfExists('worlds');
    }
};
