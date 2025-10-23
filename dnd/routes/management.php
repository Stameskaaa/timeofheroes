<?php

declare(strict_types=1);

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CharacterClassController;
use App\Http\Controllers\CharacteristicController;
use App\Http\Controllers\CountryController;
use App\Http\Controllers\FeatureController;
use App\Http\Controllers\GodController;
use App\Http\Controllers\HostileCreatureController;
use App\Http\Controllers\LocationController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\NpcController;
use App\Http\Controllers\OriginController;
use App\Http\Controllers\RaceController;
use App\Http\Controllers\RuleController;
use App\Http\Controllers\SimpleWorldController;
use App\Http\Controllers\SpellController;
use App\Http\Controllers\UserRoleController;
use App\Http\Controllers\WorldController;
use Illuminate\Support\Facades\Route;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/refresh', [AuthController::class, 'refresh']);

Route::middleware('auth:management')->group(function () {
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);
});

Route::middleware(['auth:management', 'role:admin'])->group(function () {
    Route::post('/role', [UserRoleController::class, 'assignRoleByEmail']);
    Route::get('/role', [UserRoleController::class, 'getEmailsByRole']);
    Route::post('/users/search', [UserRoleController::class, 'getUsers']);
    Route::delete('/users', [UserRoleController::class, 'deleteUser']);
});

Route::middleware(['auth:management', 'role:admin,editor'])->group(function () {
    Route::post('/news/search', [NewsController::class, 'getNews']);
    Route::get('/news/{id}', [NewsController::class, 'getNewsById']);
    Route::post('/news', [NewsController::class, 'createNews']);
    Route::patch('/news/{id}', [NewsController::class, 'updateNews']);
    Route::delete('/news/{id}', [NewsController::class, 'deleteNews']);

    Route::post('/rules/search', [RuleController::class, 'getRules']);
    Route::get('/rules/{id}', [RuleController::class, 'getRule']);
    Route::post('/rules', [RuleController::class, 'createRule']);
    Route::patch('/rules/{id}', [RuleController::class, 'updateRule']);
    Route::delete('/rules/{id}', [RuleController::class, 'deleteRule']);

    Route::post('/characteristics/search', [CharacteristicController::class, 'getCharacteristics']);
    Route::get('/characteristics/{id}', [CharacteristicController::class, 'getCharacteristic']);
    Route::post('/characteristics', [CharacteristicController::class, 'createCharacteristic']);
    Route::patch('/characteristics/{id}', [CharacteristicController::class, 'updateCharacteristic']);
    Route::delete('/characteristics/{id}', [CharacteristicController::class, 'deleteCharacteristic']);

    Route::post('/gods/search', [GodController::class, 'getGods']);
    Route::get('/gods/{id}', [GodController::class, 'getGod']);
    Route::post('/gods', [GodController::class, 'createGod']);
    Route::patch('/gods/{id}', [GodController::class, 'updateGod']);
    Route::delete('/gods/{id}', [GodController::class, 'deleteGod']);

    Route::post('/features/search', [FeatureController::class, 'getFeatures']);
    Route::get('/features/{id}', [FeatureController::class, 'getFeature']);
    Route::post('/features', [FeatureController::class, 'createFeature']);
    Route::patch('/features/{id}', [FeatureController::class, 'updateFeature']);
    Route::delete('/features/{id}', [FeatureController::class, 'deleteFeature']);

    Route::post('/spells/search', [SpellController::class, 'getSpells']);
    Route::get('/spells/{id}', [SpellController::class, 'getSpell']);
    Route::post('/spells', [SpellController::class, 'createSpell']);
    Route::patch('/spells/{id}', [SpellController::class, 'updateSpell']);
    Route::delete('/spells/{id}', [SpellController::class, 'deleteSpell']);

    Route::post('/origins/search', [OriginController::class, 'getOrigins']);
    Route::get('/origins/{id}', [OriginController::class, 'getOrigin']);
    Route::post('/origins', [OriginController::class, 'createOrigin']);
    Route::patch('/origins/{id}', [OriginController::class, 'updateOrigin']);
    Route::delete('/origins/{id}', [OriginController::class, 'deleteOrigin']);

    Route::post('/races/search', [RaceController::class, 'getRaces']);
    Route::get('/races/{id}', [RaceController::class, 'getRace']);
    Route::post('/races', [RaceController::class, 'createRace']);
    Route::patch('/races/{id}', [RaceController::class, 'updateRace']);
    Route::delete('/races/{id}', [RaceController::class, 'deleteRace']);

    Route::post('/character/classes/search', [CharacterClassController::class, 'getCharacterClasses']);
    Route::get('/character/classes/{id}', [CharacterClassController::class, 'getCharacterClass']);
    Route::post('/character/classes', [CharacterClassController::class, 'createCharacterClass']);
    Route::patch('/character/classes/{id}', [CharacterClassController::class, 'updateCharacterClass']);
    Route::delete('/character/classes/{id}', [CharacterClassController::class, 'deleteCharacterClass']);

    Route::post('/simple-worlds/search', [SimpleWorldController::class, 'getWorlds']);

    Route::post('/worlds/search', [WorldController::class, 'getWorlds']);
    Route::get('/worlds/{id}', [WorldController::class, 'getWorld']);
    Route::post('/worlds', [WorldController::class, 'createWorld']);
    Route::patch('/worlds/{id}', [WorldController::class, 'updateWorld']);
    Route::delete('/worlds/{id}', [WorldController::class, 'deleteWorld']);

    Route::post('/countries/search', [CountryController::class, 'getCountries']);
    Route::get('/countries/{id}', [CountryController::class, 'getCountry']);
    Route::post('/countries', [CountryController::class, 'createCountry']);
    Route::patch('/countries/{id}', [CountryController::class, 'updateCountry']);
    Route::delete('/countries/{id}', [CountryController::class, 'deleteCountry']);

    Route::post('/npc/search', [NpcController::class, 'getNpcSearch']);
    Route::get('/npc/{id}', [NpcController::class, 'getNpc']);
    Route::post('/npc', [NpcController::class, 'createNpc']);
    Route::patch('/npc/{id}', [NpcController::class, 'updateNpc']);
    Route::delete('/npc/{id}', [NpcController::class, 'deleteNpc']);

    Route::post('/locations/search', [LocationController::class, 'getLocations']);
    Route::get('/locations/{id}', [LocationController::class, 'getLocation']);
    Route::post('/locations', [LocationController::class, 'createLocation']);
    Route::patch('/locations/{id}', [LocationController::class, 'updateLocation']);
    Route::delete('/locations/{id}', [LocationController::class, 'deleteLocation']);

    Route::post('/hostile-creatures/search', [HostileCreatureController::class, 'getHostileCreatures']);
    Route::get('/hostile-creatures/{id}', [HostileCreatureController::class, 'getHostileCreature']);
    Route::post('/hostile-creatures', [HostileCreatureController::class, 'createHostileCreature']);
    Route::patch('/hostile-creatures/{id}', [HostileCreatureController::class, 'updateHostileCreature']);
    Route::delete('/hostile-creatures/{id}', [HostileCreatureController::class, 'deleteHostileCreature']);
});
