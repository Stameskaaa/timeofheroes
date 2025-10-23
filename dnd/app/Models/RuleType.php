<?php

declare(strict_types=1);

namespace App\Models;

enum RuleType: string
{
    case DND = 'dnd';
    case HOME = 'home';
    case CLUB = 'club';
}
