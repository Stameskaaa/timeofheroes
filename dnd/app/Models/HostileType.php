<?php

declare(strict_types=1);

namespace App\Models;

enum HostileType: string
{
    case MONSTER = 'monster';
    case RAIDBOSS = 'raidBoss';
}
