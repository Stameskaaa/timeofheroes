<?php

declare(strict_types=1);

namespace App\Models;

enum UserRole: string
{
    case ADMIN = 'admin';
    case EDITOR = 'editor';
    case USER = 'user';
}
