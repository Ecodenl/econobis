<?php

namespace App\Http\Controllers\Api\PortalSettingsDashboard;

use App\Eco\PortalSettingsDashboard\PortalSettingsDashboard;
use App\Helpers\RequestInput\RequestInput;
use App\Http\Controllers\Controller;
use App\Http\Resources\GenericResource;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use JosKolenberg\LaravelJory\Facades\Jory;
use Config;
use Ramsey\Uuid\Uuid;
use Spatie\Valuestore\Valuestore;

class PortalSettingsDashboardController extends Controller
{

    public function jory()
    {
        return Jory::on(PortalSettingsDashboard::class);
    }

    public function get(Request $request): array {
        $key = $request->input('key');

        if(!$this->isWhiteListed($key)){
            return [];
        }

        return [
            $key => $this->getStore()->get($key)
        ];
    }

    public function multiple(Request $request): array {
        $store = $this->getStore();
        $keys = $this->getWhitelistedKeys($request);

        $response = [];

        foreach ($keys as $key){
            $response[$key] = $store->get($key);
        }

        return $response;
    }

    public function put(Request $request): array {
        $store = $this->getStore();
        $keyValues = $this->getWhitelistedKeyValues($request);

        $store->put($keyValues);

        return $store->all();
    }

    protected function getWhitelistedKeyValues(Request $request): array
    {
        $keyValues = [];
        foreach ($request->all() as $key => $value) {
            if ($this->isWhiteListed($key)) {
                $keyValues[$key] = $value;
            }
        }

        return $keyValues;
    }

    protected function getWhitelistedKeys(Request $request): array
    {
        $keys = [];
        foreach ($request->input('keys', []) as $key) {
            if ($this->isWhiteListed($key)) {
                $keys[] = $key;
            }
        }

        return $keys;
    }

    protected function isWhiteListed($key): bool
    {
        return in_array($key, ['welcomeTitle', 'welcomeMessage', 'widgets']);
    }

    protected function getStore(): Valuestore
    {
        $filePath = (storage_path('app' . DIRECTORY_SEPARATOR . 'portal-settings-dashboard.json'));
        return Valuestore::make($filePath);
    }

    public function store(RequestInput $input, Request $request)
    {
        $data = $input->string('title')->whenMissing('')->onEmpty('')->next()
                ->string('text')->whenMissing('')->onEmpty('')->next()
                ->string('buttonText')->whenMissing('')->onEmpty('')->next()
                ->string('buttonLink')->whenMissing('')->onEmpty('')->next()
                ->get();

        if ($request->file('image') && !$request->file('image')->isValid()) {
            abort('422', 'Error uploading file image.');
        }

        $uuid = Uuid::uuid1();
        $widget = new \stdClass();

        if ($request->file('image')) {
            try {
                $widgetImageFileName = $uuid . '.png';

                if (Config::get('app.env') == "local") {
                    Storage::disk('public_portal_local')->putFileAs('images', $request->file('image'), $widgetImageFileName);
                } else {
                    Storage::disk('public_portal')->putFileAs('images', $request->file('image'), $widgetImageFileName);
                }

                $widget->image = $widgetImageFileName;
            } catch (Exception $exception) {
                Log::error('Opslaan widget afbeelding mislukt : ' . $exception->getMessage());
            }
        }

        $widget->id = $uuid;
        $widget->order = count($this->getStore()['widgets']) + 1;
        $widget->title = $data['title'];
        $widget->text = $data['text'];
        $widget->buttonText = $data['buttonText'];
        $widget->buttonLink = $data['buttonLink'];
        $widget->active = true;

        $this->getStore()->push('widgets', $widget);

        return response()->json($widget);
    }

    public function updateWidget(RequestInput $input, Request $request) {
        $data = $input->string('id')->whenMissing('')->onEmpty('')->next()
            ->get();

        if ($request->file('image') && !$request->file('image')->isValid()) {
            abort('422', 'Error uploading file image.');
        }

        if (!$request->file('image')) {
            return response()->json(['message' => 'Geen bestand gevonden...']);
        }

        try {
            $widgetImageFileName = $data['id'] . '.png';

            if (Config::get('app.env') == "local") {
                Storage::disk('public_portal_local')->putFileAs('images', $request->file('image'), $widgetImageFileName);
            } else {
                Storage::disk('public_portal')->putFileAs('images', $request->file('image'), $widgetImageFileName);
            }

        } catch (Exception $exception) {
            Log::error('Opslaan widget afbeelding mislukt : ' . $exception->getMessage());
            abort('422', 'Opslaan widget afbeelding mislukt : ' . $exception->getMessage());
        }

        return response()->json(['message' => 'Bestand succesvol opgeslagen.']);
    }

    public function update(PortalSettingsDashboard $portalSettingsDashboard, RequestInput $input, Request $request)
    {
        $data = $input->string('welcomeTitle')->whenMissing('')->onEmpty('')->next()
            ->string('welcomeMessage')->whenMissing('')->onEmpty('')->next()
            ->get();

        $portalSettingsDashboard->fill($data);
        $portalSettingsDashboard->save();

        return GenericResource::make($portalSettingsDashboard);
    }

    public function destroy(RequestInput $input, Request $request) {
        $data = $input->string('id')->whenMissing('')->onEmpty('')->next()->get();

        $widgets = $this->getStore()->get('widgets');
        $this->getStore()->forget('widgets');

        Storage::disk('public_portal_local')->delete('images/' . $data['id'] . '.png');

        $widgets = Arr::where($widgets, function ($value, $key) use ($data) {
            return $value['id'] !== $data['id'];
        });

        $this->getStore()->put('widgets', array());

        foreach ($widgets as $widget) {
            $this->getStore()->push('widgets', [$widget]);
        }

        return response()->json($this->getStore()->get('widgets'));
    }
}