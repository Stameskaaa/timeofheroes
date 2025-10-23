<?php

declare(strict_types=1);

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
use App\Http\Controllers\WorldController;
use Illuminate\Support\Facades\Route;

Route::post('/rules/search', [RuleController::class, 'getRules']);
Route::get('/rules/{id}', [RuleController::class, 'getRule']);

Route::post('/news/search', [NewsController::class, 'getNews']);
Route::get('/news/{id}', [NewsController::class, 'getNewsById']);

Route::post('/characteristics/search', [CharacteristicController::class, 'getCharacteristics']);
Route::get('/characteristics/{id}', [CharacteristicController::class, 'getCharacteristic']);

Route::post('/gods/search', [GodController::class, 'getGods']);
Route::get('/gods/{id}', [GodController::class, 'getGod']);

Route::post('/features/search', [FeatureController::class, 'getFeatures']);
Route::get('/features/{id}', [FeatureController::class, 'getFeature']);

Route::post('/spells/search', [SpellController::class, 'getSpells']);
Route::get('/spells/{id}', [SpellController::class, 'getSpell']);

Route::post('/origins/search', [OriginController::class, 'getOrigins']);
Route::get('/origins/{id}', [OriginController::class, 'getOrigin']);

Route::post('/races/search', [RaceController::class, 'getRaces']);
Route::get('/races/{id}', [RaceController::class, 'getRace']);

Route::post('/character/classes/search', [CharacterClassController::class, 'getCharacterClasses']);
Route::get('/character/classes/{id}', [CharacterClassController::class, 'getCharacterClass']);
Route::post('/countries', [CountryController::class, 'createCountry']);

Route::post('/simple-worlds/search', [SimpleWorldController::class, 'getWorlds']);

Route::post('/worlds/search', [WorldController::class, 'getWorlds']);
Route::get('/worlds/{id}', [WorldController::class, 'getWorld']);

Route::post('/countries/search', [CountryController::class, 'getCountries']);
Route::get('/countries/{id}', [CountryController::class, 'getCountry']);

Route::post('/npc/search', [NpcController::class, 'getNpcSearch']);
Route::get('/npc/{id}', [NpcController::class, 'getNpc']);

Route::post('/locations/search', [LocationController::class, 'getLocations']);
Route::get('/locations/{id}', [LocationController::class, 'getLocation']);

Route::post('/hostile-creatures/search', [HostileCreatureController::class, 'getHostileCreatures']);
Route::get('/hostile-creatures/{id}', [HostileCreatureController::class, 'getHostileCreature']);
