<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('gods', function (Blueprint $table) {
            $table->id();
            $table->text('name')->nullable();
            $table->text('src')->nullable();
            $table->text('md_content')->nullable();
            $table->text('short_description')->nullable();
            $table->timestamp('created_at');
            $table->timestamp('updated_at')->nullable();
        });

        DB::statement("
            CREATE TRIGGER gods_timestamps
            BEFORE INSERT OR UPDATE ON gods
            FOR EACH ROW
            EXECUTE FUNCTION update_timestamps();
        ");
    }

    public function down(): void
    {
        DB::statement("DROP TRIGGER IF EXISTS gods_timestamps ON gods;");

        Schema::dropIfExists('gods');
    }
};
