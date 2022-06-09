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
        $keys = $this->getWhitelistedKeys($request->input('keys', []));

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

    protected function getWhitelistedKeys(array $getKeys): array
    {
        $keys = [];
        foreach ($getKeys as $key) {
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
                ->string('name')->whenMissing('')->onEmpty('')->next()
                ->get();

        if ($request->file('image') && !$request->file('image')->isValid()) {
            abort('422', 'Error uploading file image.');
        }

        $uuid = Uuid::uuid1();
        $widget = new \stdClass();

        $fileExtensie = pathinfo($data['name'], PATHINFO_EXTENSION);
        $widgetImageFileName = $uuid . '.' . $fileExtensie;

        if ($request->file('image')) {
            try {
                if (Config::get('app.env') == "local") {
                    Storage::disk('public_portal_local')->putFileAs('images', $request->file('image'), $widgetImageFileName);
                    Storage::disk('customer_portal_app_build_local')->putFileAs('images', $request->file('image'), $widgetImageFileName);
                    Storage::disk('customer_portal_app_public_local')->putFileAs('images', $request->file('image'), $widgetImageFileName);
                } else {
                    Storage::disk('public_portal')->putFileAs('images', $request->file('image'), $widgetImageFileName);
                }
            } catch (\Exception $exception) {
                Log::error('Opslaan widget afbeelding mislukt : ' . $exception->getMessage());
                abort('422', 'Opslaan widget afbeelding mislukt : ' . $exception->getMessage());
            }
        }

        $widget->id = $uuid;
        $widget->order = count($this->getStore()['widgets']) + 1;
        $widget->title = $data['title'];
        $widget->text = $data['text'];
        $widget->image = $widgetImageFileName;
        $widget->buttonText = $data['buttonText'];
        $widget->buttonLink = $data['buttonLink'];
        $widget->active = true;

        $this->getStore()->push('widgets', $widget);

        return response()->json($widget);
    }

    public function updateWidget(RequestInput $input, Request $request) {
        $data = $input->string('id')->whenMissing('')->onEmpty('')->next()
            ->string('name')->whenMissing('')->onEmpty('')->next()
            ->string('type')->whenMissing('')->onEmpty('')->next()
            ->get();

        if ($request->file('image') && !$request->file('image')->isValid()) {
            abort('422', 'Error uploading file image.');
        }

        if (!$request->file('image')) {
            return response()->json(['message' => 'Geen bestand gevonden...']);
        }

        try {
            $fileExtensie = pathinfo($data['name'], PATHINFO_EXTENSION);
            $widgetImageFileName = $data['id'] . '.' . $fileExtensie;

            if (Config::get('app.env') == "local") {
                Storage::disk('public_portal_local')->putFileAs('images', $request->file('image'), $widgetImageFileName);
                Storage::disk('customer_portal_app_build_local')->putFileAs('images', $request->file('image'), $widgetImageFileName);
                Storage::disk('customer_portal_app_public_local')->putFileAs('images', $request->file('image'), $widgetImageFileName);
            } else {
                Storage::disk('public_portal')->putFileAs('images', $request->file('image'), $widgetImageFileName);
            }

            $imageTypeChanged = false;
            $widgets = $this->getStore()->get('widgets');
            $changedWidgets = [];
            foreach ($widgets as $widget) {
                if($widget['id'] === $data['id'] && $widget['image'] !== $widgetImageFileName ) {
                    if (Config::get('app.env') == "local") {
                        Storage::disk('public_portal_local')->delete('images/' . $widget['image']);
                        Storage::disk('customer_portal_app_build_local')->delete('images/' . $widget['image']);
                        Storage::disk('customer_portal_app_public_local')->delete('images/' . $widget['image']);
                    } else {
                        Storage::disk('public_portal')->delete('images/' . $widget['image']);
                    }
                    $widget['image'] = $widgetImageFileName;
                    $imageTypeChanged = true;
                }
                $changedWidgets[] = $widget;
            }
            if($imageTypeChanged){
                $this->getStore()->put('widgets', array());

                foreach ($changedWidgets as $widget) {
                    $this->getStore()->push('widgets', [$widget]);
                }
            }

        } catch (\Exception $exception) {
            Log::error('Opslaan widget afbeelding mislukt : ' . $exception->getMessage());
            abort('422', 'Opslaan widget afbeelding mislukt : ' . $exception->getMessage());
        }

        return response()->json(['message' => 'Bestand succesvol opgeslagen.']);
    }

//    public function update(PortalSettingsDashboard $portalSettingsDashboard, RequestInput $input, Request $request)
//    {
//        $data = $input->string('welcomeTitle')->whenMissing('')->onEmpty('')->next()
//            ->string('welcomeMessage')->whenMissing('')->onEmpty('')->next()
//            ->get();
//
//        $portalSettingsDashboard->fill($data);
//        $portalSettingsDashboard->save();
//
//        return GenericResource::make($portalSettingsDashboard);
//    }

    public function destroy(RequestInput $input, Request $request) {
        $data = $input->string('id')->whenMissing('')->onEmpty('')->next()
            ->string('name')->whenMissing('')->onEmpty('')->next()
            ->string('type')->whenMissing('')->onEmpty('')->next()
            ->get();

//        $widgets = $this->getStore()->get('widgets');
//        $this->getStore()->forget('widgets');

        try {
            $fileExtensie = pathinfo($data['name'], PATHINFO_EXTENSION);
            $widgetImageFileName = $data['id'] . '.' . $fileExtensie;

            if (Config::get('app.env') == "local") {
                Storage::disk('public_portal_local')->delete('images/' . $widgetImageFileName);
                Storage::disk('customer_portal_app_build_local')->delete('images/' . $widgetImageFileName);
                Storage::disk('customer_portal_app_public_local')->delete('images/' . $widgetImageFileName);
            } else {
                Storage::disk('public_portal')->delete('images/' . $widgetImageFileName);
            }

        } catch (\Exception $exception) {
            Log::error('Verwijderen widget afbeelding mislukt : ' . $exception->getMessage());
            abort('422', 'Verwijderen widget afbeelding mislukt : ' . $exception->getMessage());
        }
        $widgets = $this->getStore()->get('widgets');
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