<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SimpleWorld extends Model
{
    protected $table = 'worlds';

    protected $fillable = [
        'src',
        'name',
        'short_description',
    ];
}
