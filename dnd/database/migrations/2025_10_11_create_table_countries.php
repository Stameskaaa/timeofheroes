<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('countries', function (Blueprint $table) {
            $table->id();
            $table->text('src')->nullable();
            $table->text('name')->nullable();
            $table->text('short_description')->nullable();
            $table->text('md_description')->nullable();
            $table->timestamp('created_at');
            $table->timestamp('updated_at')->nullable();
        });

        DB::statement("
            CREATE TRIGGER countries_timestamps
            BEFORE INSERT OR UPDATE ON countries
            FOR EACH ROW
            EXECUTE FUNCTION update_timestamps();
        ");
    }

    public function down(): void
    {
        DB::statement("DROP TRIGGER IF EXISTS countries_timestamps ON countries;");

        Schema::dropIfExists('countries');
    }
};
