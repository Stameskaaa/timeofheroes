<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('features', function (Blueprint $table) {
            $table->id();
            $table->text('name')->nullable();
            $table->integer('feature_type_id')->nullable();
            $table->text('requirements')->nullable();
            $table->text('md_description')->nullable();
            $table->timestamp('created_at');
            $table->timestamp('updated_at')->nullable();
        });

        DB::statement("
            CREATE TRIGGER features_timestamps
            BEFORE INSERT OR UPDATE ON features
            FOR EACH ROW
            EXECUTE FUNCTION update_timestamps();
        ");
    }

    public function down(): void
    {
        DB::statement("DROP TRIGGER IF EXISTS features_timestamps ON features;");

        Schema::dropIfExists('features');
    }
};
