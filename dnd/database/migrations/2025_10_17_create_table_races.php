<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('races', function (Blueprint $table) {
            $table->id();
            $table->text('name')->nullable();
            $table->text('src')->nullable();
            $table->text('md_description')->nullable();
            $table->json('features')->nullable();
            $table->text('md_history')->nullable();
            $table->timestamp('created_at');
            $table->timestamp('updated_at')->nullable();
        });

        DB::statement("
            CREATE TRIGGER races_timestamps
            BEFORE INSERT OR UPDATE ON races
            FOR EACH ROW
            EXECUTE FUNCTION update_timestamps();
        ");
    }

    public function down(): void
    {
        DB::statement("DROP TRIGGER IF EXISTS races_timestamps ON races;");

        Schema::dropIfExists('races');
    }
};
