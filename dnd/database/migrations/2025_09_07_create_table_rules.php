<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('rules', function (Blueprint $table) {
            $table->id();
            $table->text('name')->nullable();
            $table->text('short_description')->nullable();
            $table->text('md_content')->nullable();
            $table->enum('type', ['dnd', 'home', 'club'])->nullable();
            $table->json('tags')->nullable();
            $table->timestamp('created_at');
            $table->timestamp('updated_at')->nullable();
        });

        DB::statement("
            CREATE OR REPLACE FUNCTION update_timestamps()
            RETURNS TRIGGER AS $$
            BEGIN
                IF TG_OP = 'INSERT' THEN
                    NEW.created_at := NOW();
                    RETURN NEW;
                ELSIF TG_OP = 'UPDATE' THEN
                    NEW.updated_at := NOW();
                    RETURN NEW;
                END IF;
                RETURN NEW;
            END;
            $$ LANGUAGE plpgsql;
        ");

        DB::statement("
            CREATE TRIGGER rules_timestamps
            BEFORE INSERT OR UPDATE ON rules
            FOR EACH ROW
            EXECUTE FUNCTION update_timestamps();
        ");
    }

    public function down(): void
    {
        DB::statement("DROP TRIGGER IF EXISTS rules_timestamps ON rules;");
       // DB::statement("DROP FUNCTION IF EXISTS update_timestamps();");

        Schema::dropIfExists('rules');
    }
};
